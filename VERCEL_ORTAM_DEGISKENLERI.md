# Vercel Ortam Değişkenleri (bilgi.karbonkurs.com)

`/api/auth/error` 500 hatası alıyorsanız büyük ihtimalle **NEXTAUTH_SECRET** veya **NEXTAUTH_URL** Vercel'de tanımlı değildir. Aşağıdaki değişkenleri mutlaka ekleyin.

## Vercel'de ayarlanacak değişkenler

1. **Vercel Dashboard** → Projeniz (bilgi-karbon) → **Settings** → **Environment Variables**

2. Şu değişkenleri ekleyin:

| Key | Value | Ortam |
|-----|--------|--------|
| `DATABASE_URL` | Neon PostgreSQL bağlantı dizeniz (`postgresql://...?sslmode=require`) | Production, Preview |
| `NEXTAUTH_SECRET` | En az 32 karakter rastgele gizli anahtar | Production, Preview |
| `NEXTAUTH_URL` | Site adresiniz | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Site adresiniz (opsiyonel, metadata için) | Production, Preview |

### NEXTAUTH_URL değeri

- **Vercel URL kullanıyorsanız:** `https://bilgi-karbon.vercel.app`
- **Özel domain kullanıyorsanız:** `https://bilgi.karbonkurs.com`

Hangi adresten siteye giriyorsanız `NEXTAUTH_URL` o olmalı.

### NEXTAUTH_SECRET oluşturma

Terminalde:

```bash
openssl rand -base64 32
```

Veya: [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) — üretilen değeri kopyalayıp `NEXTAUTH_SECRET` olarak yapıştırın.

---

## Değişkenleri ekledikten sonra

**Redeploy** yapın: **Deployments** → son deployment → **⋯** → **Redeploy**.

Ortam değişkenleri sadece yeni build’lerde yüklenir; kaydettikten sonra mutlaka yeniden deploy edin.
