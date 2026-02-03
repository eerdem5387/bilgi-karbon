import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import * as XLSX from "xlsx"

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const tarihBaslangic = searchParams.get('tarihBaslangic')
    const tarihBitis = searchParams.get('tarihBitis')
    const sinif = searchParams.get('sinif')
    const okul = searchParams.get('okul')

    const kurumSube = session.user.kurumSube

    const where: Prisma.BasvuruWhereInput = {
      kurumSube: kurumSube
    }

    if (tarihBaslangic || tarihBitis) {
      where.createdAt = {}
      if (tarihBaslangic) {
        (where.createdAt as Prisma.DateTimeFilter).gte = new Date(tarihBaslangic)
      }
      if (tarihBitis) {
        (where.createdAt as Prisma.DateTimeFilter).lte = new Date(tarihBitis + 'T23:59:59')
      }
    }

    if (sinif) {
      where.sinif = sinif
    }

    if (okul) {
      where.okul = okul
    }

    const basvurular = await prisma.basvuru.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const excelData = basvurular.map((b, index) => ({
      'Sıra': index + 1,
      'Kurum Şubesi': b.kurumSube,
      'Ad Soyad': b.adSoyad,
      'Sınıf': b.sinif,
      'Okul': b.okul,
      'Telefon': b.telefon,
      'Başvuru Tarihi': new Date(b.createdAt).toLocaleString('tr-TR'),
    }))

    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Başvurular")

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="bilgi-formu-basvurular-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    })
  } catch (error) {
    console.error("Excel export hatası:", error)
    if (error && typeof error === 'object' && 'code' in error) {
      if ((error as { code: string }).code === 'P1001' || (error as { code: string }).code === 'P1002') {
        return NextResponse.json(
          { error: "Veritabanı bağlantı hatası" },
          { status: 503 }
        )
      }
    }
    return NextResponse.json(
      { error: "Excel dosyası oluşturulurken bir hata oluştu" },
      { status: 500 }
    )
  }
}
