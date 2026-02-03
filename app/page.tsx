'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Karbon Kurs Plus Logo" 
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-indigo-700">
                  Karbon Kurs Plus
                </h2>
              </div>
            </div>
            
            {/* Başvuru Başlığı */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Bursluluk Sınavı Başvuru Sistemi
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Şube Seçim Ekranı */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-lg text-gray-600">
            Lütfen başvuru yapmak istediğiniz şubeyi seçiniz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Rize Şubesi */}
          <Link href="/rize">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-transparent hover:border-green-500">
                <div className="text-center">
                  <div className="mx-auto mb-4 md:mb-6 h-24 sm:h-32 md:h-32 w-24 sm:w-32 md:w-32 flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="Karbon Kurs Plus Logo" 
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-green-600 transition-colors">
                    Karbon Kurs Plus
                  </h3>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-600 mb-3 md:mb-4">
                    RİZE
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Rize şubemize bursluluk sınavı başvurusu yapmak için tıklayın
                  </p>
                  <div className="inline-flex items-center text-green-600 font-semibold text-sm md:text-base group-hover:gap-3 gap-2 transition-all">
                    <span>Başvuru</span>
                    <svg className="w-4 sm:w-5 md:w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Trabzon Şubesi */}
          <Link href="/trabzon">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-transparent hover:border-blue-500">
                <div className="text-center">
                  <div className="mx-auto mb-4 md:mb-6 h-24 sm:h-32 md:h-32 w-24 sm:w-32 md:w-32 flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="Karbon Kurs Plus Logo" 
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">
                    Karbon Kurs Plus
                  </h3>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-600 mb-3 md:mb-4">
                    TRABZON
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Trabzon şubemize bursluluk sınavı başvurusu yapmak için tıklayın
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold text-sm md:text-base group-hover:gap-3 gap-2 transition-all">
                    <span>Başvuru</span>
                    <svg className="w-4 sm:w-5 md:w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Bilgilendirme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Önemli Bilgilendirme</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Başvurunuzu yapmak istediğiniz şubeyi dikkatle seçiniz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Her şube için ayrı başvuru yapmanız gerekmektedir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>Başvuru formunu eksiksiz doldurunuz</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <div className="text-center text-gray-600 text-sm py-8">
        <p>© 2025 Karbon Kurs Plus Başvuru Sistemi. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}
