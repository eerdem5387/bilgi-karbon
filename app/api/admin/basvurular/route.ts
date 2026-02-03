import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const kurumSube = session.user.kurumSube

    if (!kurumSube) {
      return NextResponse.json(
        { error: "Kurum şubesi bilgisi bulunamadı" },
        { status: 500 }
      )
    }

    const tumBasvurular = await prisma.basvuru.findMany({
      select: {
        id: true,
        adSoyad: true,
        sinif: true,
        okul: true,
        telefon: true,
        kurumSube: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const basvurular = tumBasvurular.filter(b => b.kurumSube === kurumSube)

    return NextResponse.json(basvurular)
  } catch (error) {
    console.error("Başvurular getirme hatası:", error)
    if (error && typeof error === 'object' && 'code' in error) {
      if ((error as { code: string }).code === 'P1001' || (error as { code: string }).code === 'P1002') {
        return NextResponse.json(
          { error: "Veritabanı bağlantı hatası" },
          { status: 503 }
        )
      }
    }
    return NextResponse.json(
      {
        error: "Başvurular getirilirken bir hata oluştu",
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}
