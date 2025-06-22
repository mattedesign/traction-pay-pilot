
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  systemPrompt?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Claude chat function called')
    
    const { messages, systemPrompt }: ChatRequest = await req.json()
    console.log('Request payload:', { 
      messagesCount: messages?.length, 
      systemPromptLength: systemPrompt?.length 
    })

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY not found in environment')
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), 
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Making request to Anthropic API...')
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', // Use latest Claude 4 Sonnet
        max_tokens: 2048,
        system: systemPrompt || 'You are a helpful AI assistant specialized in trucking operations, logistics, and transportation industry knowledge. Provide practical, accurate, and industry-specific advice.',
        messages: messages
      })
    })

    console.log('Anthropic API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API error:', response.status, errorText)
      
      let errorMessage = `API request failed with status ${response.status}`
      if (response.status === 401) {
        errorMessage = 'Invalid API key'
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded'
      } else if (response.status === 400) {
        errorMessage = 'Invalid request format'
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const data = await response.json()
    console.log('Anthropic API success - response length:', data.content?.[0]?.text?.length || 0)

    return new Response(
      JSON.stringify({ content: data.content[0].text }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in claude-chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
