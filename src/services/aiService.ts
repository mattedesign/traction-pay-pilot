
interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  error?: string;
}

export class AIService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(
    messages: AIMessage[],
    systemPrompt: string = "You are a helpful AI assistant specialized in trucking operations, logistics, and transportation industry knowledge. Provide practical, accurate, and industry-specific advice."
  ): Promise<AIResponse> {
    try {
      console.log('Attempting to send request to Anthropic API...');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          system: systemPrompt,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Anthropic API key.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else {
          throw new Error(`API request failed: ${response.status} - ${errorText}`);
        }
      }

      const data = await response.json();
      console.log('API Response received successfully');
      
      return {
        content: data.content[0].text
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Handle network/CORS errors specifically
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        return {
          content: "❌ **Browser Security Limitation**\n\nDirect API calls to Anthropic from the browser are blocked by CORS (Cross-Origin Resource Sharing) policies for security reasons.\n\n**To use AI features, you need:**\n1. A backend server to proxy API calls\n2. Or use Lovable's Supabase integration for secure AI functionality\n\n**Recommended Solution:**\nConnect this project to Supabase using the green button in the top-right corner, then create an Edge Function to handle AI requests securely.",
          error: 'CORS/Network error - Direct browser calls to Anthropic API are not supported'
        };
      }
      
      return {
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
