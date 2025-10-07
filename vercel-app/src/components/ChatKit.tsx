'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'openai-chatkit': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface ChatKitProps {
  clientToken: string;
  className?: string;
}

export const ChatKit: React.FC<ChatKitProps> = ({ clientToken, className }) => {
  const chatKitRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const chatKit = chatKitRef.current;
    if (!chatKit) return;

    const options = {
      api: {
        getClientSecret: async (existing: string | null) => {
          if (existing) {
            // Token yenileme logic'i buraya eklenebilir
            return existing;
          }
          return clientToken;
        },
      },
      theme: {
        colorScheme: 'light' as const,
      },
      composer: {
        placeholder: 'Dosyalardan öğrenen AI asistanınıza soru sorun...',
        attachments: {
          enabled: true,
          maxSize: 10 * 1024 * 1024, // 10MB
          maxCount: 5,
          accept: {
            'text/*': ['.txt', '.md'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          },
        },
      },
      startScreen: {
        greeting: 'Merhaba! Ben dosyalardan öğrenen AI asistanınızım. Size nasıl yardımcı olabilirim?',
        prompts: [
          {
            label: 'Dosya Analizi',
            prompt: 'Yüklediğim dosyaları analiz et ve özetle',
            icon: 'document',
          },
          {
            label: 'Sorular',
            prompt: 'Dosyalardaki bilgiler hakkında sorular sorabilir miyim?',
            icon: 'circle-question',
          },
          {
            label: 'Arama',
            prompt: 'Belirli bir konuyu dosyalarda ara',
            icon: 'search',
          },
        ],
      },
      threadItemActions: {
        feedback: true,
        retry: true,
      },
    };

    // ChatKit script yüklenene kadar bekle
    const initChatKit = () => {
      if (typeof window !== 'undefined' && (window as any).ChatKit) {
        chatKit.setOptions(options);
      } else {
        setTimeout(initChatKit, 100);
      }
    };

    initChatKit();
  }, [clientToken]);

  return (
    <>
      <script
        src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
        async
      />
      <openai-chatkit
        ref={chatKitRef}
        className={className}
        style={{ height: '600px', width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px' }}
      />
    </>
  );
};
