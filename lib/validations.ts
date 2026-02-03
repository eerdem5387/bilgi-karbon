import { z } from "zod"

// Bilgi ve iletişim formu - sadece Ad Soyad, Sınıf, Okul, Telefon (tümü zorunlu)
export const basvuruSchema = z.object({
  adSoyad: z.string()
    .min(3, "Ad soyad en az 3 karakter olmalıdır")
    .max(100, "Ad soyad en fazla 100 karakter olabilir")
    .regex(/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/, "Sadece harf ve boşluk kullanılabilir"),

  sinif: z.string()
    .min(1, "Sınıf seçimi zorunludur"),

  okul: z.string()
    .min(1, "Okul seçimi zorunludur"),

  telefon: z.string()
    .min(10, "Telefon numarası en az 10 haneli olmalıdır")
    .max(10, "Telefon numarası en fazla 10 haneli olmalıdır")
    .regex(/^5\d{9}$/, "Geçerli bir cep telefonu numarası giriniz (5XXXXXXXXX - tam 10 hane)"),

  kurumSube: z.enum(["Rize", "Trabzon"]).optional(),
})

export type BasvuruFormData = z.infer<typeof basvuruSchema>
