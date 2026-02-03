'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { basvuruSchema, type BasvuruFormData } from '@/lib/validations'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Trabzon ve Rize okul listeleri (mevcut listeler kısaltılmadan kullanılıyor)
import { trabzonOkullari, rizeOkullari } from '@/lib/okullar'

// Her iki şehir için ortak sınıf listesi
const siniflar = [
  '4. Sınıf',
  '5. Sınıf',
  '6. Sınıf',
  '7. Sınıf',
  '8. Sınıf',
  '9. Sınıf',
  '10. Sınıf',
  '11. Sınıf',
  '12. Sınıf',
  'Mezun',
]

interface BasvuruFormuProps {
  sube: 'Rize' | 'Trabzon'
}

export default function BasvuruFormu({ sube }: BasvuruFormuProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<{ message: string; details?: Array<{ path: string[]; message: string }> } | null>(null)
  const [kvkkOnay, setKvkkOnay] = useState(false)
  const [okulSearch, setOkulSearch] = useState('')

  const okullar = sube === 'Trabzon' ? trabzonOkullari : rizeOkullari

  const filteredOkullar = useMemo(() => {
    if (!okulSearch) return okullar
    return okullar.filter(okul =>
      okul.toLowerCase().includes(okulSearch.toLowerCase())
    )
  }, [okulSearch, okullar])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BasvuruFormData>({
    resolver: zodResolver(basvuruSchema),
  })

  const onSubmit = async (data: BasvuruFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const dataWithSube = { ...data, kurumSube: sube }

      const response = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataWithSube),
      })

      const result = await response.json()

      if (!response.ok) {
        throw {
          message: result.error || 'Başvuru gönderilemedi',
          details: result.details || null
        }
      }

      setSubmitSuccess(true)
      reset()
      setOkulSearch('')
      setKvkkOnay(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        setSubmitError({
          message: (error as { message: string }).message,
          details: 'details' in error ? (error as { details?: Array<{ path: string[]; message: string }> }).details : undefined
        })
      } else {
        setSubmitError({ message: error instanceof Error ? error.message : 'Bir hata oluştu' })
      }
      setTimeout(() => setSubmitError(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                  <Image src="/logo.png" alt="Karbon Kurs Plus Logo" width={80} height={80} className="h-full w-full object-contain" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">Karbon Kurs Plus</h2>
                  <p className={`text-lg font-semibold ${sube === 'Rize' ? 'text-green-600' : 'text-blue-600'}`}>
                    {sube} Şubesi
                  </p>
                </div>
              </div>
              <div className="hidden sm:block h-16 w-px bg-gray-300"></div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Bilgi Alma ve İletişim Formu
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Bilgi almak ve sizinle iletişime geçmemiz için formu doldurunuz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {submitSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Başvurunuz Alındı</h3>
              <p className="text-gray-600 mb-6">
                En kısa sürede sizinle iletişime geçilecektir.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSubmitSuccess(false)
                    reset()
                    setOkulSearch('')
                    setKvkkOnay(false)
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                >
                  Aynı Şubede Yeni Form
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-lg"
                >
                  Ana Sayfaya Dön
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {submitError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
            >
              <div className="text-center mb-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gönderilemedi</h3>
                <p className="text-red-600 font-semibold mb-4">{submitError.message}</p>
              </div>
              {submitError.details && submitError.details.length > 0 && (
                <div className="mb-6 text-left bg-red-50 border border-red-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <ul className="space-y-2">
                    {submitError.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        <span className="font-semibold">{detail.path.join('.')}:</span> {detail.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => setSubmitError(null)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition duration-200"
              >
                Tamam
              </button>
            </motion.div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-500">
                Bilgileriniz
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('adSoyad')}
                    onChange={(e) => setValue('adSoyad', e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                  {errors.adSoyad && (
                    <p className="mt-1 text-sm text-red-600">{errors.adSoyad.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sınıf <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('sinif')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">Seçiniz</option>
                    {siniflar.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.sinif && (
                    <p className="mt-1 text-sm text-red-600">{errors.sinif.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('telefon')}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setValue('telefon', value)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                    placeholder="5XXXXXXXXX (10 hane)"
                  />
                  {errors.telefon && (
                    <p className="mt-1 text-sm text-red-600">{errors.telefon.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Okul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={okulSearch}
                    onChange={(e) => setOkulSearch(e.target.value)}
                    placeholder="Okul adı yazarak arayın..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 mb-2"
                  />
                  <select
                    {...register('okul')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">
                      {filteredOkullar.length === 0 && okulSearch ? 'Arama sonucu bulunamadı...' : 'Seçiniz'}
                    </option>
                    {filteredOkullar.map((okul) => (
                      <option key={okul} value={okul}>{okul}</option>
                    ))}
                  </select>
                  {errors.okul && (
                    <p className="mt-1 text-sm text-red-600">{errors.okul.message}</p>
                  )}
                </div>
              </div>
            </section>

            <div className="pt-4 pb-4">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <input
                  type="checkbox"
                  id="kvkkOnay"
                  checked={kvkkOnay}
                  onChange={(e) => setKvkkOnay(e.target.checked)}
                  className="mt-1 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                />
                <label htmlFor="kvkkOnay" className="flex-1 text-sm text-gray-700 cursor-pointer">
                  <span className="text-red-500 font-semibold">*</span>{' '}
                  <Link href="/kvkk" target="_blank" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                    KVKK Aydınlatma Metni
                  </Link>
                  {' '}ni okudum, anladım ve kişisel verilerimin işlenmesine onay veriyorum.
                </label>
              </div>
              {!kvkkOnay && (
                <p className="mt-2 text-sm text-red-600">
                  Formu göndermek için KVKK metnini okumanız ve onaylamanız gerekmektedir.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !kvkkOnay}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Gönderiliyor...
                  </span>
                ) : (
                  'Gönder'
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              <span className="text-red-500">*</span> ile işaretli alanlar zorunludur.
            </p>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2025 Karbon Kurs Plus. Tüm hakları saklıdır.</p>
        </div>
      </main>
    </div>
  )
}
