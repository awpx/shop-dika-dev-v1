import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Product } from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Paginate } from '../components/Paginate'

export const HomePages = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h2>Latest Products</h2>
      {loading
        ? ( <Loader /> )
        : error
        ? ( <Message variant='danger'>{error}</Message> )
        : (
          <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate 
            page={page} 
            pages={pages} 
            keyword={keyword ? keyword : ''} 
          />
          </>
        )  
      }
      
    </>
  )
}
