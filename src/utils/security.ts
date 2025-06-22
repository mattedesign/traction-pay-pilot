
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potential XSS attempts and limit length
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, 1000);
};

export const validateAPIKey = (key: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  
  // Basic Anthropic API key format validation
  return key.startsWith('sk-ant-') && key.length > 20;
};

export const clearAPIKey = () => {
  // Clear any stored API keys from localStorage if used in the future
  try {
    localStorage.removeItem('anthropic_api_key');
  } catch (error) {
    console.warn('Could not clear API key from localStorage:', error);
  }
};
