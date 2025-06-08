
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  systemPrompt: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, systemPrompt }: ChatRequest = await req.json()

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured')
    }

    console.log('Sending request to Claude Sonnet 4...')
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', // Updated to correct model name
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Anthropic API Error:', errorText)
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Anthropic API key.')
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.')
      } else {
        throw new Error(`API request failed: ${response.status} - ${errorText}`)
      }
    }

    const data = await response.json()
    console.log('Claude Sonnet 4 response received successfully')
    
    return new Response(JSON.stringify({
      content: data.content[0].text
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Claude chat error:', error)
    
    return new Response(JSON.stringify({
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
