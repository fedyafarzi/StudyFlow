# Smart Linguistics Platform — V1.0

## Stack
Next.js + TypeScript + Supabase.

## 1. Install
npm install

## 2. Environment
Copy `.env.example` to `.env.local` and fill the Supabase URL/key.

## 3. Database
Open Supabase SQL Editor and run `supabase/schema.sql`.

## 4. Run
npm run dev

Open http://localhost:3000/login

## V1.0 scope
- Login UI
- Role model: admin / teacher / student / parent
- Students, groups, courses
- Tasks and submissions
- Tests, questions, attempts
- Materials
- Attendance
- Payments
- XP/ranking data
- Certificates

Next step: connect Supabase Auth and add secure RLS policies.
