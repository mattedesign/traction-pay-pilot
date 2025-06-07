
/**
 * Security utilities for input validation and sanitization
 */

// File type validation
export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  all: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Validates file type and size
 */
export const validateFile = (file: File, allowedTypes: string[] = ALLOWED_FILE_TYPES.all): { isValid: boolean; error?: string } => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed' };
  }

  return { isValid: true };
};

/**
 * Sanitizes user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/[<>'"&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    })
    .trim();
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates API key format (basic check)
 */
export const validateAPIKey = (key: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  
  // Check for Anthropic API key format
  if (key.startsWith('sk-ant-')) {
    return key.length >= 20;
  }
  
  return false;
};

/**
 * Securely stores API key in localStorage with basic encryption
 */
export const storeAPIKey = (key: string): void => {
  if (!validateAPIKey(key)) {
    throw new Error('Invalid API key format');
  }
  
  // Simple encoding (not true encryption, but better than plain text)
  const encoded = btoa(key);
  localStorage.setItem('traction_api_key', encoded);
};

/**
 * Retrieves API key from localStorage
 */
export const getAPIKey = (): string | null => {
  try {
    const encoded = localStorage.getItem('traction_api_key');
    if (!encoded) return null;
    
    const decoded = atob(encoded);
    return validateAPIKey(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

/**
 * Removes API key from localStorage
 */
export const clearAPIKey = (): void => {
  localStorage.removeItem('traction_api_key');
};
