import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

export const OrderPages = ({ match}) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId))

  }, [])

  return (
    loading
      ? ( <Loader /> )
      : error
      ? ( <Message variant='danger'>{error}</Message> )
      : 
      <>
        <h2>Order {order._id}</h2>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p><strong>Name: </strong>{order.user.name}</p>
                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>

                {order.isDelivered 
                  ? (<Message variant='success'>Paid on {order.deliveredAt}</Message>)
                  : (<Message variant='danger'>Not Delivered</Message>)
                }

              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment Method</h3>

                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>

                {order.isPaid 
                  ? (<Message variant='success'>Paid on {order.paidAt}</Message>)
                  : (<Message variant='danger'>Not Paid</Message>)
                }
                  
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Order Items</h3>
                {order.orderItems.length === 0
                  ? (<Message>Order is empty</Message>)
                  : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>

                            <Col md={6}>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x {item.price} = IDR {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )
                }
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>IDR {order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>IDR {order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>IDR {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>TOTAL</Col>
                    <Col>IDR {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
  )  
}
