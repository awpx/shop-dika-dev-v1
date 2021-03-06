import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold.underline)
    process.exit(1)
  }
}


export default connectDB