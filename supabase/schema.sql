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
-- des del client anònim: només eixes dues columnes, cap més.
grant update (intent_before, intent_after) on public.responses to anon;

create policy "anon_update_intents"
  on public.responses for update
  to anon
  using (true)
  with check (true);

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
--   grant update (intent_before, intent_after) on public.responses to anon;
--   drop policy if exists "anon_update_intents" on public.responses;
--   create policy "anon_update_intents"
--     on public.responses for update to anon using (true) with check (true);
--   alter table public.responses
--     add column if not exists intent_before text,
--     add column if not exists intent_after text,
--     add column if not exists country text,
--     add column if not exists region text,
--     add column if not exists city text,
--     add column if not exists tz text,
--     add column if not exists referrer text;
-- ---------------------------------------------------------------------------
