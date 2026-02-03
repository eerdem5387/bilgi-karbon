import { config } from 'dotenv'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

config({ path: '.env.local' })
config()

const ADMINS = [
  {
    email: 'admin@karbonkurs.com',
    password: 'QAZWSX.90',
    name: 'Rize Admin',
    kurumSube: 'Rize',
  },
  {
    email: 'trabzon@karbonkurs.com',
    password: 'Trabzon2025!',
    name: 'Trabzon Admin',
    kurumSube: 'Trabzon',
  },
] as const

async function main() {
  console.log('🔐 Admin kullanıcıları oluşturuluyor...\n')

  for (const admin of ADMINS) {
    const existing = await prisma.admin.findUnique({
      where: { email: admin.email },
    })

    const hashedPassword = await bcrypt.hash(admin.password, 12)

    if (existing) {
      await prisma.admin.update({
        where: { email: admin.email },
        data: {
          password: hashedPassword,
          name: admin.name,
          kurumSube: admin.kurumSube,
        },
      })
      console.log(`✅ Güncellendi: ${admin.email} (${admin.kurumSube})`)
    } else {
      await prisma.admin.create({
        data: {
          email: admin.email,
          password: hashedPassword,
          name: admin.name,
          kurumSube: admin.kurumSube,
        },
      })
      console.log(`✅ Oluşturuldu: ${admin.email} (${admin.kurumSube})`)
    }
  }

  console.log('\n✅ Tüm admin kullanıcıları hazır.')
  console.log('\n📧 Rize:  admin@karbonkurs.com')
  console.log('📧 Trabzon: trabzon@karbonkurs.com')
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
