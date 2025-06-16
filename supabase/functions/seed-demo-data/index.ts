
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DemoUser {
  email: string;
  password: string;
  user_type: 'carrier' | 'broker';
  first_name: string;
  last_name: string;
  company_name: string;
  phone?: string;
  onboarding_completed?: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const demoUsers: DemoUser[] = [
      {
        email: 'carrier.demo@tractionpay.com',
        password: 'Demo123!',
        user_type: 'carrier',
        first_name: 'Mike',
        last_name: 'Rodriguez',
        company_name: 'Rodriguez Trucking LLC',
        phone: '555-0123',
        onboarding_completed: true
      },
      {
        email: 'broker.demo@tractionpay.com',
        password: 'Demo123!',
        user_type: 'broker',
        first_name: 'Sarah',
        last_name: 'Johnson',
        company_name: 'Johnson Freight Brokerage',
        phone: '555-0456',
        onboarding_completed: true
      },
      {
        email: 'newcarrier.demo@tractionpay.com',
        password: 'Demo123!',
        user_type: 'carrier',
        first_name: 'Alex',
        last_name: 'Thompson',
        company_name: 'Thompson Transport',
        phone: '555-0789',
        onboarding_completed: false
      }
    ];

    const results = [];

    for (const demoUser of demoUsers) {
      console.log(`Creating demo user: ${demoUser.email}`);
      
      // First, check if user already exists by listing users and filtering by email
      const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (listError) {
        console.error(`Error listing users:`, listError);
        results.push({
          email: demoUser.email,
          status: 'error',
          error: listError.message
        });
        continue;
      }

      const existingUser = existingUsers.users.find(user => user.email === demoUser.email);
      
      if (existingUser) {
        console.log(`User ${demoUser.email} already exists, skipping...`);
        results.push({
          email: demoUser.email,
          status: 'already_exists',
          user_id: existingUser.id
        });
        continue;
      }

      // Create the user with admin API
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: demoUser.email,
        password: demoUser.password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          first_name: demoUser.first_name,
          last_name: demoUser.last_name,
          user_type: demoUser.user_type,
          company_name: demoUser.company_name,
          phone: demoUser.phone
        }
      });

      if (authError) {
        console.error(`Error creating user ${demoUser.email}:`, authError);
        results.push({
          email: demoUser.email,
          status: 'error',
          error: authError.message
        });
        continue;
      }

      if (!authData.user) {
        console.error(`No user data returned for ${demoUser.email}`);
        results.push({
          email: demoUser.email,
          status: 'error',
          error: 'No user data returned'
        });
        continue;
      }

      console.log(`Successfully created user: ${demoUser.email} with ID: ${authData.user.id}`);
      
      // The profile will be automatically created by the database trigger
      // Let's wait a moment and then verify it was created
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify profile was created
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error(`Profile not found for user ${demoUser.email}:`, profileError);
        results.push({
          email: demoUser.email,
          status: 'user_created_profile_missing',
          user_id: authData.user.id,
          error: profileError.message
        });
      } else {
        console.log(`Profile confirmed for user: ${demoUser.email}`);
        results.push({
          email: demoUser.email,
          status: 'success',
          user_id: authData.user.id,
          profile_id: profile.id
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Demo data seeding completed',
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in seed-demo-data function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
