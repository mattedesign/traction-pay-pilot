
import { ChatStateManager } from '../chatStateManager';
import { QueryRoutingResult } from './types';

export class ButtonResponseHandler {
  static handle(query: string): QueryRoutingResult {
    console.log('EnhancedQueryRouter: Detected button response, tracking in state manager');
    const questionState = ChatStateManager.getQuestionState();
    if (questionState.lastQuestionId) {
      ChatStateManager.trackButtonResponse(
        questionState.lastQuestionId,
        questionState.context || '',
        query
      );
    }
    
    return {
      queryType: 'button_response',
      confidence: 90,
      suggestedActions: ['Process button response', 'Continue conversation'],
      requiresAI: true
    };
  }
}
