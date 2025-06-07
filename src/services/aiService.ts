
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
      console.log('Sending request to Anthropic API...');
      
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
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          content: "Network error: Unable to connect to the AI service. Please check your internet connection and try again.",
          error: 'Network connection failed'
        };
      }
      
      return {
        content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
