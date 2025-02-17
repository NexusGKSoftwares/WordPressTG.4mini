create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.themes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  description text,
  specification jsonb,
  code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.themes enable row level security;

-- Create policies
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can insert own data" on public.themes
  for insert with check (auth.uid() = user_id);

create policy "Users can view own themes" on public.themes
  for select using (auth.uid() = user_id);

