const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()
const app = express()

app.use(express.json())

app.post('/orders', async (req, res) => {
  const order = req.body

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS  
    }
  })

  let mailOptions = {
    from: 'gdansksushi@gmail.com',
    to: 'gdansksushi@gmail.com',
    subject: 'Заказ',
    text: `Товары: ${order.items}, Общая сумма: ${order.totalPrice}, Общее количество: ${order.totalItemCount}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send('Произошла ошибка при отправке заказа')
    } else {
      console.log('Email sent: ' + info.response)
      res.status(200).send('Заказ успешно отправлен')
    }
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})