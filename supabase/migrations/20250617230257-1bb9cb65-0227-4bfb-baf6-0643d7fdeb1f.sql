
-- Create demo users with correct auth.users table structure
-- First, let's clean up any existing demo users
DELETE FROM auth.users WHERE email IN (
  'factor.demo@tractionpay.com',
  'carrier.demo@tractionpay.com', 
  'newcarrier.demo@tractionpay.com',
  'broker.demo@tractionpay.com'
);

-- Create a function to properly create demo users
CREATE OR REPLACE FUNCTION create_demo_user(
  user_email text,
  user_password text,
  user_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Generate a new UUID for the user
  user_id := gen_random_uuid();
  
  -- Insert into auth.users with minimal required fields
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
    role,
    aud
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    user_metadata,
    now(),
    now(),
    'authenticated',
    'authenticated'
  );
  
  RETURN user_id;
END;
$$;

-- Create the demo users
SELECT create_demo_user(
  'factor.demo@tractionpay.com',
  'NewDemo123!',
  '{"first_name": "Factor", "last_name": "Demo", "company_name": "Factor Demo LLC", "user_type": "carrier", "phone": "555-0199"}'::jsonb
);

SELECT create_demo_user(
  'carrier.demo@tractionpay.com',
  'NewDemo123!',
  '{"first_name": "Mike", "last_name": "Rodriguez", "company_name": "Rodriguez Trucking LLC", "user_type": "carrier", "phone": "555-0123"}'::jsonb
);

SELECT create_demo_user(
  'newcarrier.demo@tractionpay.com',
  'NewDemo123!',
  '{"first_name": "Sarah", "last_name": "Johnson", "company_name": "Johnson Logistics", "user_type": "carrier", "phone": "555-0156"}'::jsonb
);

SELECT create_demo_user(
  'broker.demo@tractionpay.com',
  'NewDemo123!',
  '{"first_name": "David", "last_name": "Chen", "company_name": "Chen Freight Brokers", "user_type": "broker", "phone": "555-0178"}'::jsonb
);

-- Clean up the function after use
DROP FUNCTION create_demo_user(text, text, jsonb);
