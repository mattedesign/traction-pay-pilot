
interface ButtonResponseContext {
  questionId: string;
  questionText: string;
  timestamp: Date;
  responseGiven: boolean;
  userResponse?: string;
}

interface QuestionState {
  lastQuestionId?: string;
  pendingResponse: boolean;
  context?: string;
}

export class ChatStateManager {
  private static buttonResponseHistory: Map<string, ButtonResponseContext> = new Map();
  private static currentQuestionState: QuestionState = { pendingResponse: false };

  static trackButtonResponse(questionId: string, questionText: string, userResponse: string) {
    console.log('ChatStateManager: Tracking button response:', { questionId, userResponse });
    
    this.buttonResponseHistory.set(questionId, {
      questionId,
      questionText,
      timestamp: new Date(),
      responseGiven: true,
      userResponse
    });

    // Clear pending response state
    this.currentQuestionState = { pendingResponse: false };
  }

  static hasRecentResponseToQuestion(questionText: string): boolean {
    const recentThreshold = 30000; // 30 seconds
    const now = new Date();
    
    for (const context of this.buttonResponseHistory.values()) {
      if (context.questionText.toLowerCase().includes(questionText.toLowerCase()) &&
          context.responseGiven &&
          (now.getTime() - context.timestamp.getTime()) < recentThreshold) {
        console.log('ChatStateManager: Found recent response to similar question');
        return true;
      }
    }
    return false;
  }

  static setQuestionState(questionId: string, pending: boolean, context?: string) {
    console.log('ChatStateManager: Setting question state:', { questionId, pending, context });
    this.currentQuestionState = {
      lastQuestionId: questionId,
      pendingResponse: pending,
      context
    };
  }

  static getQuestionState(): QuestionState {
    return this.currentQuestionState;
  }

  static clearQuestionState() {
    console.log('ChatStateManager: Clearing question state');
    this.currentQuestionState = { pendingResponse: false };
  }

  static shouldSuppressQuestion(questionText: string): boolean {
    const state = this.getQuestionState();
    const hasRecent = this.hasRecentResponseToQuestion(questionText);
    
    console.log('ChatStateManager: Should suppress question?', {
      questionText: questionText.substring(0, 50) + '...',
      hasPendingResponse: state.pendingResponse,
      hasRecentResponse: hasRecent
    });

    return state.pendingResponse || hasRecent;
  }
}
