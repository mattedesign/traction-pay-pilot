
import { SmartContext } from '../smartContextBuilder';
import { ChatStateManager } from '../chatStateManager';
import { ContextUtils } from './contextUtils';

export class GeneralContextBuilder {
  static buildGeneralTruckingContext(originalMessage: string): SmartContext {
    const systemPromptAddition = `
${ContextUtils.generateSystemPromptIntro('general_trucking')}

The user has a general trucking/logistics question. Provide expert advice using your comprehensive trucking industry knowledge. Focus on:

- Practical, actionable advice
- Current industry best practices
- Compliance and regulatory guidance
- Cost-saving strategies
- Safety recommendations
- Professional communication

Draw from your knowledge of DOT regulations, HOS rules, freight operations, and industry standards.

${ContextUtils.generateResponseGuidelines('general_trucking')}`;

    return {
      systemPromptAddition,
      enhancedUserMessage: originalMessage,
      contextType: 'general_trucking'
    };
  }

  static buildButtonResponseContext(originalMessage: string): SmartContext {
    const questionState = ChatStateManager.getQuestionState();
    
    const systemPromptAddition = `
${ContextUtils.generateSystemPromptIntro('button_response')}

The user just provided a response (${originalMessage}) to a previous question.
${questionState.context ? `Previous question context: ${questionState.context}` : ''}

${ContextUtils.generateResponseGuidelines('button_response')}`;

    return {
      systemPromptAddition,
      enhancedUserMessage: `[BUTTON RESPONSE] ${originalMessage}`,
      contextType: 'no_context'
    };
  }

  static buildNoContext(originalMessage: string): SmartContext {
    const systemPromptAddition = `
${ContextUtils.generateSystemPromptIntro('no_context')}

The user's query didn't match any specific loads or context. Provide helpful guidance and suggest ways they can:

- Search for specific loads using load IDs or broker names
- Ask about general trucking topics
- Get help with routing, payments, or compliance questions

${ContextUtils.generateResponseGuidelines('no_context')}`;

    return {
      systemPromptAddition,
      enhancedUserMessage: originalMessage,
      contextType: 'no_context'
    };
  }
}
