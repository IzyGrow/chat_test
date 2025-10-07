# Vercel Deployment Rehberi

Bu dosya, AI ChatBot uygulamasını Vercel'de deploy etmek için gerekli adımları içerir.

## 🚀 Hızlı Deploy

### 1. GitHub'a Push Et

```bash
cd vercel-app
git init
git add .
git commit -m "Initial commit: AI ChatBot with file upload"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel'de Deploy Et

#### Seçenek A: Vercel CLI ile

```bash
# Vercel CLI yükleyin (global olarak)
npm install -g vercel

# Proje dizininde
cd vercel-app
vercel

# Environment variables ekleyin
vercel env add OPENAI_API_KEY
# OpenAI API key'inizi girin

# Production'a deploy edin
vercel --prod
```

#### Seçenek B: Vercel Dashboard ile

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Project Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `vercel-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Environment Variables ekleyin:
   - **OPENAI_API_KEY**: `your_openai_api_key_here`
6. "Deploy" butonuna tıklayın

## 🔧 Environment Variables

**⚠️ ÖNEMLİ**: Aşağıdaki environment variable'ları Vercel'de ayarlamanız **ZORUNLUDUR**:

| Variable | Zorunlu | Açıklama | Örnek |
|----------|---------|----------|-------|
| `OPENAI_API_KEY` | ✅ **EVET** | OpenAI API anahtarınız | `sk-proj-...` |
| `NEXT_PUBLIC_APP_URL` | ❌ Hayır | Uygulama URL'i (opsiyonel) | `https://your-app.vercel.app` |
| `NODE_ENV` | ❌ Hayır | Ortam türü (opsiyonel) | `production` |

### OpenAI API Key Alma:

1. [OpenAI Platform](https://platform.openai.com/api-keys) adresine gidin
2. "Create new secret key" butonuna tıklayın
3. Key'inize bir isim verin
4. Key'i kopyalayın ve güvenli bir yerde saklayın
5. Vercel'de environment variable olarak ekleyin

### Vercel'de Environment Variable Ekleme:

1. Vercel Dashboard > Project > Settings > Environment Variables
2. "Add New" butonuna tıklayın
3. Name: `OPENAI_API_KEY`
4. Value: OpenAI API key'inizi yapıştırın
5. "Save" butonuna tıklayın

## 📝 Deployment Sonrası Kontroller

1. **Ana Sayfa**: Uygulama yükleniyor mu?
2. **ChatBot**: ChatKit bileşeni görünüyor mu?
3. **Dosya Yükleme**: Dosya yükleme çalışıyor mu?
4. **API Endpoints**: 
   - `/api/chatkit/session` çalışıyor mu?
   - `/api/upload` çalışıyor mu?

## 🐛 Yaygın Sorunlar

### 1. "Session oluşturulamadı" Hatası

**Çözüm**: OpenAI API key'inizi kontrol edin
- Vercel Dashboard > Project > Settings > Environment Variables
- `OPENAI_API_KEY` doğru ayarlanmış mı?

### 2. Dosya Yükleme Hatası

**Çözüm**: Dosya boyutu ve türünü kontrol edin
- Maksimum dosya boyutu: 10MB
- Desteklenen formatlar: PDF, Word, TXT, MD

### 3. ChatKit Yüklenmiyor

**Çözüm**: İnternet bağlantısını kontrol edin
- ChatKit CDN'den yükleniyor
- Firewall veya proxy ayarlarını kontrol edin

## 📊 Monitoring

Deploy sonrası monitoring için:

1. **Vercel Dashboard**: Function logs'ları kontrol edin
2. **OpenAI Dashboard**: API kullanımını takip edin
3. **Browser Console**: Client-side hataları kontrol edin

## 🔄 Güncelleme

Kod değişikliklerini deploy etmek için:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel otomatik olarak yeni deploy başlatacaktır.

## 📞 Destek

Sorun yaşarsanız:

1. Vercel Function logs'larını kontrol edin
2. Browser developer tools'u kullanın
3. GitHub issues'da sorun bildirin
