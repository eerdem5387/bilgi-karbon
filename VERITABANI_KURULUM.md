# Veritabanı ve Admin Kurulumu

## 1. Bağlantı ayarı

Proje kökünde `.env` veya `.env.local` dosyası oluşturun (`.env.example` örnek alınabilir):

```bash
# Zorunlu: PostgreSQL bağlantı dizesi
DATABASE_URL="postgresql://KULLANICI:SIFRE@HOST:5432/VERITABANI_ADI"

# NextAuth (admin girişi için)
NEXTAUTH_SECRET="en-az-32-karakter-rastgele-bir-anahtar"
NEXTAUTH_URL="https://bilgi.karbonkurs.com"
```

Örnek (yerel PostgreSQL):

```env
DATABASE_URL="postgresql://postgres:sifre@localhost:5432/karbon_bilgi"
```

## 2. Migration ve admin kullanıcıları

Aşağıdaki komut hem şemayı veritabanına uygular hem de Rize + Trabzon admin hesaplarını oluşturur:

```bash
npm run db:setup
```

Bu komut:

1. `prisma db push` ile mevcut şemayı veritabanına yazar (mevcut `Basvuru` tablosu yeni yapıya güncellenir, eski kolonlar kaldırılır).
2. `scripts/seed-admins.ts` ile iki admin kullanıcısı oluşturur veya günceller.

## 3. Oluşturulan admin hesapları

| Şube   | E-posta               | Şifre       |
|--------|------------------------|-------------|
| Rize   | admin@karbonkurs.com   | QAZWSX.90   |
| Trabzon| trabzon@karbonkurs.com | Trabzon2025! |

Giriş: `/admin/login` sayfasından ilgili e-posta ve şifre ile yapılır. Her admin sadece kendi şubesinin başvurularını görür.

## 4. Sadece adminleri yeniden oluşturmak

Şema zaten uygulandıysa ve sadece admin şifrelerini sıfırlamak / hesapları yeniden oluşturmak istiyorsanız:

```bash
npm run seed-admins
```

## 5. Manuel migration (isteğe bağlı)

Migration geçmişi ile çalışmak isterseniz:

```bash
npx prisma migrate dev --name bilgi_formu
```

Bu komut yeni bir migration dosyası üretir ve uygular. Mevcut veritabanı eski şemadaysa önce `npx prisma migrate reset` ile sıfırlamanız gerekebilir.
