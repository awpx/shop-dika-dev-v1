import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Product } from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Paginate } from '../components/Paginate'
import { ProductCarousel } from '../components/ProductCarousel'
import Meta from '../components/Meta'

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
      <Meta />
      {!keyword 
        ? (<ProductCarousel />)
        : (<Link to='/' className='btn btn-primary btn-sm my-3' >Back</Link>)
      }
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
