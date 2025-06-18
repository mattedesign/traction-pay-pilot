
-- Add the new user type to the existing enum
ALTER TYPE user_type_enum ADD VALUE IF NOT EXISTS 'habitually_late_carrier';

-- Update the profiles table check constraint to include the new user type
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check 
  CHECK (user_type IN ('carrier', 'broker', 'habitually_late_carrier'));

-- Create the habitually late carrier demo user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) 
SELECT 
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'latecarrier.demo@tractionpay.com',
  crypt('NewDemo123!', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Alex", "last_name": "Turner", "company_name": "Always Late Logistics", "user_type": "habitually_late_carrier", "phone": "555-0299"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'latecarrier.demo@tractionpay.com'
);
