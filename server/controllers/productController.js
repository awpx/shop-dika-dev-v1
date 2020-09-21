import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc       Fetch all product
//@route      GET /api/v1/products
//@access     public
export const getProducts = asyncHandler( async (req, res) => {
  const products = await Product.find({})

  res.json(products)
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