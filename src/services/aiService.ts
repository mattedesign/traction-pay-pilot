
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
  private corsProxy = 'https://cors-anywhere.herokuapp.com/';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(
    messages: AIMessage[],
    systemPrompt: string = "You are a helpful AI assistant specialized in trucking operations, logistics, and transportation industry knowledge. Provide practical, accurate, and industry-specific advice."
  ): Promise<AIResponse> {
    try {
      console.log('Sending request to Claude 4 Sonnet via CORS proxy...');
      
      const response = await fetch(`${this.corsProxy}${this.baseUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', // Updated to latest Claude 4 Sonnet
          max_tokens: 2048, // Increased for more detailed responses
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
      console.log('Claude 4 Sonnet response received successfully');
      
      return {
        content: data.content[0].text
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        return {
          content: "❌ **Connection Error**\n\nUnable to connect to the AI service. This could be due to:\n\n1. **CORS Proxy Issues**: The demo CORS proxy might be down\n2. **Network Problems**: Check your internet connection\n3. **API Key Issues**: Verify your Anthropic API key is correct\n\n**Alternative Solutions:**\n- Try refreshing the page and entering your API key again\n- For production use, consider setting up your own CORS proxy\n- Or use Lovable's Supabase integration for secure backend functionality",
          error: 'Network/CORS error'
        };
      }
      
      return {
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
