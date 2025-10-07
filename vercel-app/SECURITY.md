# 🔒 Güvenlik Rehberi

Bu dosya, AI ChatBot uygulamasının güvenli bir şekilde deploy edilmesi için önemli güvenlik notlarını içerir.

## 🚨 ÖNEMLİ GÜVENLİK UYARILARI

### 1. API Key Güvenliği

**⚠️ ASLA YAPMAYIN:**
- OpenAI API key'inizi kod içinde hardcode etmeyin
- API key'inizi GitHub'a commit etmeyin
- API key'inizi public repository'de paylaşmayın
- API key'inizi client-side kodda kullanmayın

**✅ DOĞRU YAKLAŞIM:**
- API key'inizi environment variable olarak saklayın
- `.env.local` dosyasını `.gitignore`'a ekleyin
- Vercel'de environment variables kullanın
- Production'da API key'inizi güvenli bir şekilde saklayın

### 2. Environment Variables

```bash
# ❌ YANLIŞ - Kod içinde hardcode
const openai = new OpenAI({
  apiKey: "sk-your-api-key-here"  // ASLA YAPMAYIN!
});

# ✅ DOĞRU - Environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // GÜVENLİ
});
```

### 3. Dosya Güvenliği

- Kullanıcıların yüklediği dosyaları validate edin
- Dosya boyutu limitlerini uygulayın
- Desteklenen dosya türlerini kontrol edin
- Yüklenen dosyaları geçici olarak saklayın ve sonra silin

### 4. API Endpoint Güvenliği

- Sadece gerekli HTTP methodlarına izin verin
- Input validation yapın
- Error handling'i güvenli bir şekilde yapın
- Rate limiting uygulayın (opsiyonel)

## 🔧 Güvenlik Kontrol Listesi

### Development:
- [ ] `.env.local` dosyası `.gitignore`'da
- [ ] API key kod içinde hardcode edilmemiş
- [ ] Environment validation çalışıyor
- [ ] Dosya yükleme validasyonu aktif

### Production (Vercel):
- [ ] Environment variables Vercel'de ayarlanmış
- [ ] API key doğru formatda (`sk-` ile başlıyor)
- [ ] Production URL güvenli
- [ ] HTTPS kullanılıyor
- [ ] Error mesajları kullanıcı dostu (sensitive bilgi içermiyor)

## 🚨 Yaygın Güvenlik Hataları

### 1. API Key Exposed
```bash
# ❌ Bu hata mesajı API key'i expose eder
console.error("API Key:", process.env.OPENAI_API_KEY);

# ✅ Bu güvenli
console.error("OpenAI API key is not configured");
```

### 2. Environment Variable Missing
```bash
# ❌ Bu crash'e neden olur
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

# ✅ Bu güvenli
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required");
}
```

### 3. File Upload Security
```bash
# ❌ Dosya türü kontrolü yok
const file = req.file;

# ✅ Güvenli dosya kontrolü
const allowedTypes = ['text/plain', 'application/pdf'];
if (!allowedTypes.includes(file.mimetype)) {
  return res.status(400).json({ error: 'Invalid file type' });
}
```

## 🔍 Güvenlik Testleri

Deploy sonrası şu testleri yapın:

1. **API Key Testi:**
   ```bash
   curl -X POST https://your-app.vercel.app/api/chatkit/session
   # "API key is not configured" hatası almalısınız (eğer key yoksa)
   ```

2. **File Upload Testi:**
   ```bash
   # Geçersiz dosya türü yüklemeyi deneyin
   # "Invalid file type" hatası almalısınız
   ```

3. **Error Handling Testi:**
   - Tüm error mesajları kullanıcı dostu olmalı
   - Sensitive bilgi içermemeli
   - Stack trace production'da görünmemeli

## 📞 Güvenlik Sorunları

Eğer bir güvenlik sorunu keşfederseniz:

1. API key'inizi hemen değiştirin
2. Vercel'de environment variable'ı güncelleyin
3. Sorunu detaylı olarak rapor edin
4. Gerekirse uygulamayı geçici olarak kapatın

## 🛡️ Ek Güvenlik Önlemleri

### Rate Limiting (Opsiyonel)
```javascript
// API endpoint'lerde rate limiting ekleyebilirsiniz
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // limit her IP için 100 request
});
```

### CORS Ayarları
```javascript
// Gerekirse CORS ayarları ekleyin
const cors = require('cors');
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true
}));
```

---

**Unutmayın:** Güvenlik sürekli bir süreçtir. Düzenli olarak güvenlik güncellemelerini takip edin ve uygulamanızı güncel tutun.
