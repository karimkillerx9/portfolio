/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `projectInterest` (text, optional)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy to allow anonymous inserts for contact form submissions
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_interest text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact submissions"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
