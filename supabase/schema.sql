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
  intent_after text
);

create index if not exists responses_created_at_idx on public.responses (created_at desc);

alter table public.responses enable row level security;

-- Anonims: només inserció (recollida del client; el client limita a URL de producció)
create policy "anon_insert_responses"
  on public.responses for insert
  to anon
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
--   alter table public.responses
--     add column if not exists intent_before text,
--     add column if not exists intent_after text;
-- ---------------------------------------------------------------------------
