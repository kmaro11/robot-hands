import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const body = await req.json()
  const { fullName, company, phone, email, formType, website } = body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })

  const mailOptions = {
    from: process.env.SMTP_USER!,
    to: process.env.SMTP_USER!,
    subject: 'Nauja registracija iš formos',
    text: `
        Svetainė: ${website}
        Tipas: ${formType}
        Vardas Pavardė: ${fullName || '-'}
        Įmonė: ${company || '-'}
        Telefonas: ${phone || '-'}
        El. paštas: ${email}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
