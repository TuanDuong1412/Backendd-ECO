const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
    console.log('new order', newOrder);
    return new Promise(async (resolve, reject) => {
        const { orderItems,paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone,user } = newOrder
        try {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city, phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                })
                if (createdOrder) {
                    resolve({
                        status: 'OK',
                        message: 'success',
                        data:createOrder
                    })
                }
            
        } catch (e) {
          console.log('e', e)
            reject(e)
        }
    })
}

module.exports = {
    createOrder
}