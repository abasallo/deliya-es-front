import jwt from 'jsonwebtoken'

import nodemailer from 'nodemailer'

import dotenv from 'dotenv'

dotenv.config() // TODO - Separate dotenv init (just once)

export const getUserFromToken = token => (token ? jwt.verify(token, process.env.JWT_SECRET).email : '')

export const getTokenFromRequest = request => (request.headers.authorization || '').split(' ')[1]

export const nodemailerTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

export const sendEmail = async (email, token) => {
  console.log(nodemailerTransporter)
  const sentEmail = await nodemailerTransporter.sendMail({
    from: 'Equipo deliya.es',
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<b>http://localhost:3000/password-change/${token}</b>`
  })
  console.log('Message sent: %s', sentEmail.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(sentEmail))
}
