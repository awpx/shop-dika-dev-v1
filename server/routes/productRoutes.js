import express from 'express'
import { 
  getProducts, 
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts, 
}  from '../controllers/productController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/top', getTopProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router