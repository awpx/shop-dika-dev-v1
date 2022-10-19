import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc       Fetch all product/serach product
//@route      GET /api/v1/products
//@access     public
export const getProducts = asyncHandler( async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword 
  ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } 
  : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .sort({"createdAt":-1})
    .limit(pageSize)
    .skip(pageSize * (page -1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc       Fetch single product
//@route      GET /api/v1/products/:id
//@access     public
export const getProductById = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
    
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


//@desc       Admin: delete product
//@route      GET /api/v1/products/:id
//@access     private/admin
export const deleteProduct = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    await product.remove()
    res.json({ success: true, message: 'product removed' })
    
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc       Admin: create product
//@route      POST /api/v1/products/
//@access     private/admin
export const createProduct = asyncHandler( async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc       Admin: update product
//@route      PUT /api/v1/products/:id
//@access     private/admin
export const updateProduct = asyncHandler( async (req, res) => {
  const { 
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock 
  } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else{
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc       create new review
//@route      POST /api/v1/products/:id/reviews
//@access     private
export const createProductReview = asyncHandler( async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if(alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ success: true, message: 'review added'})

  } else{
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc       get top product
//@route      GET /api/v1/products/top
//@access     public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4)

  res.json(products)
})