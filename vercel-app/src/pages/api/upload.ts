import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import formidable from 'formidable';
import fs from 'fs';
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

// API route handler
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
    // Dosya yükleme işlemi
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: 'Dosya bulunamadı' });
    }

    // Desteklenen dosya türlerini kontrol et
    const allowedTypes = [
      'text/plain',
      'text/markdown',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.mimetype || '')) {
      // Geçici dosyayı sil
      if (file.filepath) {
        fs.unlinkSync(file.filepath);
      }
      return res.status(400).json({ error: 'Desteklenmeyen dosya türü' });
    }

    // Dosyayı OpenAI'ye yükle
    const fileBuffer = fs.readFileSync(file.filepath);
    const uploadedFile = await openai.files.create({
      file: new File([fileBuffer], file.originalFilename || 'uploaded-file', {
        type: file.mimetype || 'text/plain',
      }),
      purpose: 'assistants',
    });

    // Geçici dosyayı sil
    fs.unlinkSync(file.filepath);

    res.status(200).json({
      file_id: uploadedFile.id,
      filename: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Dosya yükleme hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata',
    });
  }
}

// Body parser'ı devre dışı bırak
export const config = {
  api: {
    bodyParser: false,
  },
};
