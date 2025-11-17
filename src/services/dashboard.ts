const VITE_API_SPECTRUM_URL = import.meta.env.VITE_API_SPECTRUM_URL;
/**
 * Listar todas las citas
 */
export const getAllAppointments = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/appointments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
};

/**
 * Contar total de citas
 */
export const countAppointments = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/appointments/count_appointments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al contar citas:', error);
    throw error;
  }
};

// ============================================
// USERS
// ============================================

/**
 * Listar todos los usuarios
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Listar canales de usuarios
 */
export const getUserChannels = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/users/channels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener canales de usuarios:', error);
    throw error;
  }
};

// ============================================
// CHAT HISTORIES
// ============================================

/**
 * Listar todos los historiales de chat
 */
export const getAllChatHistories = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/chat_histories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener historiales de chat:', error);
    throw error;
  }
};

/**
 * Contar total de historiales de chat
 */
export const countChatHistories = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/chat_histories/count_chat_histories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al contar historiales de chat:', error);
    throw error;
  }
};

// ============================================
// DOCUMENTS
// ============================================

/**
 * Listar todos los documentos
 */
export const getAllDocuments = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/documents/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
};

// ============================================
// ANALYSIS
// ============================================

/**
 * Obtener porcentaje de conversión
 */
export const getConversionRate = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/analysis/conversion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener tasa de conversión:', error);
    throw error;
  }
};

/**
 * Distribución de emociones detectadas
 */
export const getSentimentDistribution = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/analysis/sentiment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener distribución de sentimientos:', error);
    throw error;
  }
};

/**
 * Top de palabras clave
 */
export const getTopKeywords = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/analysis/keywords`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener palabras clave:', error);
    throw error;
  }
};

/**
 * Resumen de conversaciones de usuarios
 */
export const getConversationSummaries = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/analysis/summaries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener resúmenes de conversaciones:', error);
    throw error;
  }
};

/**
 * Análisis general de usuarios
 */
export const getGeneralAnalysis = async () => {
  try {
    const response = await fetch(`${VITE_API_SPECTRUM_URL}/analysis/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener análisis general:', error);
    throw error;
  }
};
