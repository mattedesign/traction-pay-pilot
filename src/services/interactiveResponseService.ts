
import { InteractiveButton } from "../hooks/useChatMessages";

export interface ProcessedResponse {
  mainContent: string;
  questionContent?: string;
  interactiveButtons?: InteractiveButton[];
}

export class InteractiveResponseService {
  static processResponse(aiResponse: string): ProcessedResponse {
    // Look for yes/no questions in the response
    const yesNoPatterns = [
      /would you like to (.*?)\?/gi,
      /do you want to (.*?)\?/gi,
      /should i (.*?)\?/gi,
      /would you like me to (.*?)\?/gi,
      /shall i (.*?)\?/gi,
    ];

    let foundQuestion = null;
    let questionMatch = null;

    // Check for yes/no patterns
    for (const pattern of yesNoPatterns) {
      const match = aiResponse.match(pattern);
      if (match) {
        foundQuestion = match[0];
        questionMatch = match;
        break;
      }
    }

    // If no interactive question found, return original response
    if (!foundQuestion) {
      return { mainContent: aiResponse };
    }

    // Extract the main content (everything except the question)
    const mainContent = aiResponse.replace(foundQuestion, '').trim();
    
    // Generate appropriate buttons based on the question context
    const buttons = this.generateButtonsForQuestion(foundQuestion, questionMatch);

    return {
      mainContent,
      questionContent: foundQuestion,
      interactiveButtons: buttons
    };
  }

  private static generateButtonsForQuestion(question: string, match: RegExpMatchArray): InteractiveButton[] {
    const questionLower = question.toLowerCase();
    
    // Check for load-related questions
    if (questionLower.includes('load') || questionLower.includes('track')) {
      return [
        {
          id: 'yes-load',
          text: 'Yes',
          action: 'navigate',
          actionData: {
            path: '/load/1234',
            message: 'Yes, show me the load details'
          }
        },
        {
          id: 'no-load',
          text: 'No',
          action: 'continue_chat',
          actionData: {
            message: 'No, I need something else'
          }
        }
      ];
    }

    // Check for route-related questions
    if (questionLower.includes('route') || questionLower.includes('navigate') || questionLower.includes('directions')) {
      return [
        {
          id: 'yes-route',
          text: 'Yes',
          action: 'navigate',
          actionData: {
            path: '/route-options',
            message: 'Yes, show me route options'
          }
        },
        {
          id: 'no-route',
          text: 'No',
          action: 'continue_chat',
          actionData: {
            message: 'No, I need something else'
          }
        }
      ];
    }

    // Check for payment/invoice questions
    if (questionLower.includes('payment') || questionLower.includes('invoice') || questionLower.includes('quickpay')) {
      return [
        {
          id: 'yes-payment',
          text: 'Yes',
          action: 'navigate',
          actionData: {
            path: '/invoices',
            message: 'Yes, show me payment options'
          }
        },
        {
          id: 'no-payment',
          text: 'No',
          action: 'continue_chat',
          actionData: {
            message: 'No, I need something else'
          }
        }
      ];
    }

    // Default yes/no buttons
    return [
      {
        id: 'yes-default',
        text: 'Yes',
        action: 'continue_chat',
        actionData: {
          message: 'Yes'
        }
      },
      {
        id: 'no-default',
        text: 'No',
        action: 'continue_chat',
        actionData: {
          message: 'No'
        }
      }
    ];
  }
}
