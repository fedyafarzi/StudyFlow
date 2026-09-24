-- SMART LINGUISTICS V1.0
create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin','teacher','student','parent');
create type public.enrollment_status as enum ('active','paused','completed','left');
create type public.task_status as enum ('pending','submitted','checked');
create type public.payment_status as enum ('paid','pending','overdue');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.user_role not null default 'student',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course_id uuid references public.courses(id) on delete set null,
  teacher_id uuid references public.profiles(id) on delete set null,
  schedule text,
  created_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  status public.enrollment_status not null default 'active',
  joined_at date not null default current_date,
  unique(student_id, group_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.groups(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz,
  points integer not null default 10,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.task_submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status public.task_status not null default 'pending',
  score numeric(5,2),
  teacher_comment text,
  submitted_at timestamptz,
  unique(task_id, student_id)
);

create table public.tests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level text,
  duration_minutes integer,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.test_questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  question_text text not null,
  options jsonb not null,
  correct_answer text not null,
  points integer not null default 1,
  position integer not null default 1
);

create table public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  score numeric(7,2),
  percentage numeric(5,2),
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null,
  url text,
  level text,
  course_id uuid references public.courses(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  lesson_date date not null,
  present boolean not null default false,
  unique(student_id, group_id, lesson_date)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  status public.payment_status not null default 'pending',
  payment_date date,
  due_date date,
  note text,
  created_at timestamptz not null default now()
);

create table public.student_points (
  student_id uuid primary key references public.profiles(id) on delete cascade,
  xp integer not null default 0,
  updated_at timestamptz not null default now()
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  certificate_type text not null,
  level text not null,
  issued_at date not null default current_date,
  certificate_url text
);

-- Basic RLS activation. Detailed policies will be added in the auth/security step.
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.groups enable row level security;
alter table public.enrollments enable row level security;
alter table public.tasks enable row level security;
alter table public.task_submissions enable row level security;
alter table public.tests enable row level security;
alter table public.test_questions enable row level security;
alter table public.test_attempts enable row level security;
alter table public.materials enable row level security;
alter table public.attendance enable row level security;
alter table public.payments enable row level security;
alter table public.student_points enable row level security;
alter table public.certificates enable row level security;
