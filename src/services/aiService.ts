
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
      console.log('Sending request to Claude via Anthropic API...');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', // Use the latest Claude 4 Sonnet
          max_tokens: 2048,
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
          return {
            content: "❌ **Invalid API Key**\n\nYour Anthropic API key appears to be invalid. Please check your key and try again.",
            error: 'Invalid API key'
          };
        } else if (response.status === 429) {
          return {
            content: "❌ **Rate Limit Exceeded**\n\nYou've hit the rate limit for the Anthropic API. Please wait a moment before trying again.",
            error: 'Rate limit exceeded'
          };
        } else {
          return {
            content: `❌ **API Error**\n\nAPI request failed with status ${response.status}. Please try again.`,
            error: `API request failed: ${response.status}`
          };
        }
      }

      const data = await response.json();
      console.log('Claude API response received successfully');
      
      return {
        content: data.content[0].text
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          content: "❌ **Connection Error**\n\nUnable to connect to the Anthropic API. This could be due to:\n\n1. **Network Issues**: Check your internet connection\n2. **CORS Issues**: The browser may be blocking the request\n3. **API Availability**: The Anthropic API might be temporarily unavailable\n\n**Try refreshing the page and entering your API key again.**",
          error: 'Network/Connection error'
        };
      }
      
      return {
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
