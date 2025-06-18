
-- First, update the check constraint to include the new user type
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check 
  CHECK (user_type IN ('carrier', 'broker', 'habitually_late_carrier'));

-- Clean up any existing habitually late carrier demo user first
DELETE FROM auth.users WHERE email = 'latecarrier.demo@tractionpay.com';
DELETE FROM public.profiles WHERE email = 'latecarrier.demo@tractionpay.com';

-- Create the habitually late carrier demo user
-- The handle_new_user trigger will automatically create the profile
DO $$
DECLARE
    new_user_id uuid;
BEGIN
    -- Generate a consistent UUID for this demo user
    new_user_id := gen_random_uuid();
    
    -- Insert the user into auth.users - the trigger will handle profile creation
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
        aud,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES (
        new_user_id,
        '00000000-0000-0000-0000-000000000000',
        'latecarrier.demo@tractionpay.com',
        crypt('NewDemo123!', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"first_name": "Alex", "last_name": "Turner", "company_name": "Always Late Logistics", "user_type": "habitually_late_carrier", "phone": "555-0299"}',
        now(),
        now(),
        'authenticated',
        'authenticated',
        '',
        '',
        '',
        ''
    );
    
    RAISE NOTICE 'Created habitually late carrier demo user with ID: %', new_user_id;
END $$;
