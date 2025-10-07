import React from 'react';
import Head from 'next/head';
import { SimpleChat } from '../components/SimpleChat';

export default function Home() {

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
              
              <SimpleChat className="w-full" />
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
