const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const parsePayload = (json: unknown) => {
  if (json && typeof json === 'object' && 'data' in json) {
    return (json as { data: unknown }).data;
  }
  return json;
};


// ============================================
// ANALYSIS
// ============================================

/**
 * Obtener porcentaje de conversión
 */
export const getConversionRate = async (queryParams: string, token : string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/conversion${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener tasa de conversión:', error);
    throw error;
  }
};

/**
 * Distribución de emociones detectadas
 */
export const getSentimentDistribution = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/sentiment${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener distribución de sentimientos:', error);
    throw error;
  }
};

/**
 * Top de palabras clave
 */
export const getTopKeywords = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/keywords${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener palabras clave:', error);
    throw error;
  }
};

/**
 * Resumen de conversaciones de usuarios
 */
export const getConversationSummaries = async (token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/summaries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener resúmenes de conversaciones:', error);
    throw error;
  }
};

/**
 * Análisis general de usuarios
 */
export const getGeneralAnalysis = async (token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener análisis general:', error);
    throw error;
  }
};


/**
 * Análisis general de usuarios
 */
export const getAnalysisChannels = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/channels${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener análisis general:', error);
    throw error;
  }
};

/**
 * Promedio ejecución de respuestas
 */
export const getAverageResponseTime = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/average_execution_time${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener tiempo promedio de respuesta:', error);
    throw error;
  }
};



/**
 * Tasa de conversión a lo largo del tiempo
 */
export const getConversionRateOverTime = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/conversion-over-time${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    return data;

  } catch (error) {
    console.error('Error al obtener tiempo promedio de respuesta:', error);
    throw error;
  }
};

/**
 * Tasa de conversaciones a lo largo del tiempo
 */
export const getConversationsOverTime = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/conversations-over-time${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    console.log('ConversationsOverTime data:', data);
    return data;

  } catch (error) {
    console.error('Error al obtener tiempo promedio de respuesta:', error);
    throw error;
  }
};


/**
 * Tasa de citas a lo largo del tiempo
 */
export const getAppointmentsOverTime = async (queryParams: string, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/Tenancy/dashboard/appointments_over_time${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();
    const data = parsePayload(json);
    console.log('AppointmentsOverTime data:', data);
    return data;

  } catch (error) {
    console.error('Error al obtener tiempo promedio de respuesta:', error);
    throw error;
  }
};






