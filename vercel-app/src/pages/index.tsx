import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChatKit } from '../components/ChatKit';

export default function Home() {
  const [clientToken, setClientToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Sayfa yüklendiğinde session oluştur
    createSession();
  }, []);

  const createSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/chatkit/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 500 && errorData.details?.includes('API key')) {
          throw new Error('OpenAI API anahtarı yapılandırılmamış. Lütfen sistem yöneticisine başvurun.');
        }
        throw new Error(errorData.error || 'Session oluşturulamadı');
      }

      const data = await response.json();
      setClientToken(data.client_secret);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">ChatBot başlatılıyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Hata: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={createSession}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI ChatBot - Dosyalardan Öğrenen Asistan</title>
        <meta name="description" content="Dosyalardan öğrenen ve sorularınızı yanıtlayan AI asistanı" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AI ChatBot
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Dosyalardan öğrenen ve sorularınızı yanıtlayan AI asistanı
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Çevrimiçi</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Nasıl Kullanılır?
                </h2>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dosyalarınızı yükleyin (PDF, Word, TXT, MD formatları desteklenir)</li>
                  <li>• Dosyalar hakkında sorular sorun</li>
                  <li>• AI asistanı dosyalardaki bilgileri kullanarak size yardımcı olacak</li>
                </ul>
              </div>
              
              {clientToken && (
                <ChatKit 
                  clientToken={clientToken} 
                  className="w-full"
                />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-8">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>
                Powered by OpenAI GPT-4 Turbo • Built with Next.js & ChatKit
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
