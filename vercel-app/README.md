# AI ChatBot - Dosyalardan Öğrenen Asistan

Bu proje, dosyalardan öğrenen ve kullanıcı sorularını yanıtlayan bir AI chatbot uygulamasıdır. OpenAI GPT-4 Turbo ve ChatKit kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Dosya Yükleme**: PDF, Word, TXT, Markdown dosyalarını yükleyebilirsiniz
- **Akıllı Analiz**: Yüklenen dosyalar AI tarafından analiz edilir
- **Soru-Cevap**: Dosyalardaki bilgiler hakkında sorular sorabilirsiniz
- **Modern UI**: Tailwind CSS ile tasarlanmış responsive arayüz
- **Gerçek Zamanlı**: Streaming yanıtlar ile hızlı etkileşim

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 Turbo, ChatKit
- **Deployment**: Vercel
- **File Handling**: Formidable, Multer

## 📦 Kurulum

### 1. Projeyi Klonlayın

\`\`\`bash
git clone <repository-url>
cd vercel-app
\`\`\`

### 2. Bağımlılıkları Yükleyin

\`\`\`bash
npm install
# veya
yarn install
\`\`\`

### 3. Environment Variables Ayarlayın

\`.env.local\` dosyası oluşturun:

\`\`\`env
# OpenAI API Key (Gerekli)
OPENAI_API_KEY=sk-your_openai_api_key_here

# Optional: Custom domain for your deployment
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Development mode
NODE_ENV=development
\`\`\`

**⚠️ ÖNEMLİ**: 
- OpenAI API key'inizi [OpenAI Platform](https://platform.openai.com/api-keys) adresinden alın
- API key'inizi asla kod içinde hardcode etmeyin
- \`.env.local\` dosyasını git'e commit etmeyin (zaten .gitignore'da)

### 4. Geliştirme Sunucusunu Başlatın

\`\`\`bash
npm run dev
# veya
yarn dev
\`\`\`

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🚀 Vercel'de Deploy Etme

### 1. Vercel CLI ile Deploy

\`\`\`bash
# Vercel CLI yükleyin
npm i -g vercel

# Deploy edin
vercel

# Environment variables ekleyin
vercel env add OPENAI_API_KEY
\`\`\`

### 2. Vercel Dashboard ile Deploy

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi bağlayın
4. Environment variables ekleyin:
   - \`OPENAI_API_KEY\`: OpenAI API anahtarınız
5. Deploy butonuna tıklayın

## 📝 API Endpoints

### POST /api/chatkit/session
ChatKit session oluşturur.

**Response:**
\`\`\`json
{
  "client_secret": "session_token",
  "session_id": "session_id"
}
\`\`\`

### POST /api/upload
Dosya yükler ve OpenAI'ye gönderir.

**Request:** Multipart form data ile dosya

**Response:**
\`\`\`json
{
  "file_id": "file_id",
  "filename": "filename.pdf",
  "size": 12345,
  "type": "application/pdf"
}
\`\`\`

## 🔧 Konfigürasyon

### Desteklenen Dosya Türleri

- **Metin**: .txt, .md
- **PDF**: .pdf
- **Word**: .doc, .docx

### Dosya Limitleri

- **Maksimum Boyut**: 10MB
- **Maksimum Dosya Sayısı**: 5 dosya

## 🎨 Özelleştirme

### Tema Ayarları

ChatKit bileşeninde tema ayarlarını değiştirebilirsiniz:

\`\`\`tsx
const options = {
  theme: {
    colorScheme: 'light' | 'dark',
    // Diğer tema ayarları...
  },
};
\`\`\`

### Başlangıç Mesajları

\`src/components/ChatKit.tsx\` dosyasında başlangıç mesajlarını özelleştirebilirsiniz.

## 🐛 Sorun Giderme

### Yaygın Hatalar

1. **"Session oluşturulamadı"**: OpenAI API key'inizi kontrol edin
2. **Dosya yüklenemiyor**: Dosya boyutu ve türünü kontrol edin
3. **ChatKit yüklenmiyor**: İnternet bağlantınızı kontrol edin

### Logları İnceleme

Vercel'de deploy ettikten sonra, Vercel Dashboard > Functions sekmesinden logları inceleyebilirsiniz.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit yapın (\`git commit -m 'Add amazing feature'\`)
4. Push yapın (\`git push origin feature/amazing-feature\`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya iletişime geçebilirsiniz.
