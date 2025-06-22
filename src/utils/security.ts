
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

// File validation utilities
export const ALLOWED_FILE_TYPES = {
  documents: ['.pdf', '.doc', '.docx', '.txt'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  all: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.webp']
};

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedExtensions = ALLOWED_FILE_TYPES.all;
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }
  
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return { isValid: false, error: 'File type not supported' };
  }
  
  return { isValid: true };
};

// API key storage utilities (for client-side fallback)
export const storeAPIKey = (key: string) => {
  try {
    localStorage.setItem('anthropic_api_key', key);
  } catch (error) {
    console.warn('Could not store API key:', error);
  }
};

export const getAPIKey = (): string => {
  try {
    return localStorage.getItem('anthropic_api_key') || '';
  } catch (error) {
    console.warn('Could not retrieve API key:', error);
    return '';
  }
};
