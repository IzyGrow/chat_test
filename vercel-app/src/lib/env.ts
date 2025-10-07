/**
 * Environment variables validation utility
 * Bu dosya, gerekli environment variable'ların varlığını kontrol eder
 */

export function validateEnvironment() {
  const requiredEnvVars = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  };

  const missingVars: string[] = [];
  const invalidVars: string[] = [];

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value || value.trim() === '') {
      missingVars.push(key);
    } else if (key === 'OPENAI_API_KEY' && !value.startsWith('sk-')) {
      invalidVars.push(`${key} (should start with 'sk-')`);
    }
  }

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (invalidVars.length > 0) {
    const errorMessage = `Invalid environment variables: ${invalidVars.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return true;
}

export function getEnvironmentConfig() {
  return {
    openaiApiKey: process.env.OPENAI_API_KEY!,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
  };
}
