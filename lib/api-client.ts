import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3000, // Reduced from 10000ms to 3000ms for faster fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only log errors in development and if it's not a timeout
    if (process.env.NODE_ENV === 'development' && error.code !== 'ECONNABORTED') {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError!;
};