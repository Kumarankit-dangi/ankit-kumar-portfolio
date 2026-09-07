/*
# Create project_enquiries table

1. New Tables
- `project_enquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — the name of the person submitting the enquiry
  - `email` (text, not null) — the email address of the person submitting the enquiry
  - `project_type` (text, not null) — the type of project requested (Business Website, Landing Page, React Website, E-Commerce, Website Fix, Other)
  - `budget` (text, not null) — the estimated budget range selected by the client
  - `message` (text, not null) — the project description / message from the client
  - `status` (text, not null, default 'New') — the enquiry status (New, Contacted, Completed, Archived)
  - `created_at` (timestamptz, default now()) — when the enquiry was submitted

2. Security
- Enable RLS on `project_enquiries`.
- Public (anon, authenticated) can INSERT new enquiries — this is the contact form.
- Only authenticated admin users can SELECT, UPDATE, and DELETE enquiries.
- No public read/update/delete access — protects client data privacy.

3. Important Notes
1. The contact form on the public website inserts rows as the `anon` role.
2. The admin dashboard at /admin authenticates via Supabase Auth and uses the `authenticated` role to read/manage enquiries.
3. The `status` column defaults to 'New' so every new enquiry is immediately distinguishable from previously handled ones.
*/

CREATE TABLE IF NOT EXISTS project_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'New',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_enquiries ENABLE ROW LEVEL SECURITY;

-- Public can insert new enquiries (contact form)
DROP POLICY IF EXISTS "public_insert_enquiries" ON project_enquiries;
CREATE POLICY "public_insert_enquiries"
ON project_enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admin users can read enquiries
DROP POLICY IF EXISTS "admin_read_enquiries" ON project_enquiries;
CREATE POLICY "admin_read_enquiries"
ON project_enquiries FOR SELECT
TO authenticated
USING (true);

-- Only authenticated admin users can update enquiries
DROP POLICY IF EXISTS "admin_update_enquiries" ON project_enquiries;
CREATE POLICY "admin_update_enquiries"
ON project_enquiries FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated admin users can delete enquiries
DROP POLICY IF EXISTS "admin_delete_enquiries" ON project_enquiries;
CREATE POLICY "admin_delete_enquiries"
ON project_enquiries FOR DELETE
TO authenticated
USING (true);
