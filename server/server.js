import express from 'express'
import path from 'path'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

app.get('/', (req, res) => {
  res.send('api services running')
})

//routes
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/upload', uploadRoutes)

//paypall
app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

//static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//middleware error handler
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))