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


//@desc       uodate order to paid
//@route      POST /api/v1/orders/:id/pay
//@access     private
export const updateOrderToPaid = asyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order){
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


//@desc       get logged in user order
//@route      POST /api/v1/orders/myorders
//@access     private
export const getMyOrders = asyncHandler( async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)

})


//@desc       Admin: get all order
//@route      POST /api/v1/orders
//@access     private/admin
export const getOrders = asyncHandler( async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})