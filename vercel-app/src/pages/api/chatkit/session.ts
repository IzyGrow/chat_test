import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { validateEnvironment, getEnvironmentConfig } from '../../lib/env';

// Environment validation
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error);
}

const envConfig = getEnvironmentConfig();
const openai = new OpenAI({
  apiKey: envConfig.openaiApiKey,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API key kontrolü
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is not set');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'OpenAI API key is not configured'
    });
  }

  try {
    // ChatKit için basit bir client token oluştur
    // Gerçek implementasyonda OpenAI'nin ChatKit API'sini kullanmanız gerekir
    const clientToken = `chatkit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.status(200).json({ 
      client_secret: clientToken,
      session_id: `session_${Date.now()}`
    });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create ChatKit session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
