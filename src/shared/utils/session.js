const SESSION_ID_KEY = 'tohfae_session_id';

export const generateSessionId = () => {
  if (typeof window === 'undefined') return null;
  
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${random}`;
};

export const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    
    return sessionId;
  } catch (error) {
    console.error('Failed to get session ID:', error);
    return generateSessionId();
  }
};

export const clearSessionId = () => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(SESSION_ID_KEY);
  } catch (error) {
    console.error('Failed to clear session ID:', error);
  }
};

