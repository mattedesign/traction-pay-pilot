
export class ContextUtils {
  static getStatusDescription(status: string): string {
    const descriptions: Record<string, string> = {
      "pending_pickup": "Load is scheduled for pickup and waiting for driver arrival",
      "in_transit": "Load is currently being transported to destination",
      "delivered": "Load has been successfully delivered",
      "delayed": "Load is experiencing delays in transit",
      "cancelled": "Load has been cancelled"
    };
    return descriptions[status] || "Status information not available";
  }

  static generateSystemPromptIntro(contextType: string): string {
    const intros: Record<string, string> = {
      specific_load: "**LOAD-SPECIFIC CONTEXT ACTIVE**",
      multiple_loads: "**LOAD SEARCH RESULTS CONTEXT**",
      general_trucking: "**GENERAL TRUCKING CONSULTATION MODE**",
      button_response: "**BUTTON RESPONSE PROCESSING**",
      no_context: "**GENERAL ASSISTANCE MODE**"
    };
    return intros[contextType] || "**ASSISTANCE MODE**";
  }

  static generateResponseGuidelines(contextType: string): string {
    const guidelines: Record<string, string> = {
      specific_load: `**RESPONSE GUIDELINES:**
- Provide specific, actionable information based on the load data
- Reference actual load details when responding
- If the user asks for information you have, provide it directly without asking permission
- Only ask clarifying questions if you genuinely need more information to help them`,
      
      multiple_loads: `**RESPONSE GUIDELINES:**
- Present the matching loads clearly and organized
- If user asks about a specific aspect, compare across all matching loads
- Help user identify which load they might be looking for
- Provide specific information without asking unnecessary questions`,
      
      general_trucking: `**RESPONSE GUIDELINES:**
- Provide direct, helpful answers
- Use specific examples when possible
- Be concise but thorough
- Avoid asking unnecessary follow-up questions unless clarification is truly needed`,
      
      button_response: `**RESPONSE GUIDELINES:**
- This is a direct answer to a previous question
- DO NOT ask new questions unless absolutely necessary
- Provide helpful information or take appropriate action based on their response
- If they said "yes", proceed with the suggested action
- If they said "no", offer alternative assistance
- Keep response concise and actionable`,
      
      no_context: `**RESPONSE GUIDELINES:**
- Be helpful and guide them toward more specific questions if possible
- Provide direct assistance when you can
- Avoid asking questions unless truly necessary for clarification`
    };
    return guidelines[contextType] || guidelines.no_context;
  }
}
