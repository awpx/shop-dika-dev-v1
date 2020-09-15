import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc       create new order
//@route      POST /api/v1/orders
//@access     private
export const addOrderItems = asyncHandler( async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      user: req.user._id,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


//@desc       get order by id
//@route      POST /api/v1/orders/:id
//@access     private
export const getOrderById = asyncHandler( async (req, res) => {
  const order = await Order
    .findById(req.params.id)
    .populate('user', 'name email')

  if(order){
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})