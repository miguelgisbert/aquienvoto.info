-- Taula de respostes del test (aquienvoto.info)
create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang text not null default 'es',
  answers jsonb not null,
  user_agent text,
  completed_at timestamptz,
  duration_ms integer,
  intent_before text,
  intent_after text,
  country text,
  region text,
  city text,
  tz text,
  referrer text
);

create index if not exists responses_created_at_idx on public.responses (created_at desc);

alter table public.responses enable row level security;

-- Anonims: només inserció (recollida del client; el client limita a URL de
-- producció i usa `Prefer: return=minimal` — `return=representation` faria un
-- RETURNING que Postgres avalua amb les polítiques de SELECT, i l'anon no en
-- té, per això NO recrear cap select per a anon).
create policy "anon_insert_responses"
  on public.responses for insert
  to anon
  with check (true);

-- Les intencions (pregunta opcional posterior als resultats) s'actualitzen
-- des del client anònim via RPC SECURITY DEFINER: el camí PATCH/RLS a la
-- taula afectava 0 files malgrat les polítiques, i la funció a més torna el
-- nombre de files tocades (autoverificable des del client).
create or replace function public.set_intents(p_id uuid, p_before text, p_after text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  update public.responses
  set intent_before = p_before, intent_after = p_after
  where id = p_id;
  get diagnostics n = row_count;
  return n;
end;
$$;

revoke execute on function public.set_intents(uuid, text, text) from public, anon, authenticated;
grant execute on function public.set_intents(uuid, text, text) to anon;

-- Lectura: només usuaris autenticats (panell d'admin)
create policy "authenticated_select_responses"
  on public.responses for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Migració per a un desplegament ja existent (executar al SQL editor):
--
--   drop policy if exists "anon_select_responses" on public.responses;
--   create policy "authenticated_select_responses"
--     on public.responses for select to authenticated using (true);
--   drop policy if exists "anon_update_intents" on public.responses;  -- obsoleta
--   revoke update on public.responses from anon;  -- obsoleta (ara via RPC)
--   create or replace function public.set_intents(p_id uuid, p_before text, p_after text)
--   returns integer language plpgsql security definer set search_path = public
--   as $$ declare n integer; begin
--     update public.responses set intent_before = p_before, intent_after = p_after
--     where id = p_id;
--     get diagnostics n = row_count;
--     return n;
--   end; $$;
--   revoke execute on function public.set_intents(uuid, text, text) from public, anon, authenticated;
--   grant execute on function public.set_intents(uuid, text, text) to anon;
--   alter table public.responses
--     add column if not exists intent_before text,
--     add column if not exists intent_after text,
--     add column if not exists country text,
--     add column if not exists region text,
--     add column if not exists city text,
--     add column if not exists tz text,
--     add column if not exists referrer text;
-- ---------------------------------------------------------------------------
