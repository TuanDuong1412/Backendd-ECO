const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()



const sendEmailCreateOrder = async (email,orderItems) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_ACCOUNT, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    }); 
   

    let listItem = '';
   
    orderItems.forEach((order) => {
      listItem += `<div>
      <div>
        Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
        <div>Bên dưới là hình ảnh của sản phẩm</div>
      </div>`
      
    })

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: "Bạn đã đặt hàng tại shop TITI", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công </b></div>${listItem}`,
       
      });
}

module.exports = {
    sendEmailCreateOrder
}