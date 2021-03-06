import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMidlleware.js'
import connectDB from './config/db2.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import filterRoutes from './routes/filter.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import slidesRoutes from './routes/slidesRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import uploadRoutes7 from './routes/uploadRoutes-7.js'
import uploadRoutes6 from './routes/uploadRoutes-6.js'
import uploadRoutes2 from './routes/uploadRoutes-2.js'
import uploadRoutes3 from './routes/uploadRoutes-3.js'
import uploadRoutes4 from './routes/uploadRoutes-4.js'
import uploadRoutes5 from './routes/uploadRoutes-5.js'
import iconupload from './routes/iconuploader.js'
import subcategory from './routes/subcategory.js'
import slideImageRoutes from './routes/slideImageRoutes.js'
import packagesRoutes from './routes/packagesRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'

dotenv.config()
connectDB()  
const app = express()
const NODE_ENV = 'production'
const PAYPAL_CLIENT_ID = 'Aco1TcQKB5upzXYFcbOP1Z5alYYCESWJs4AQwdES_rX3PiVm3VAHtsx4lNM0ZX2Yq6'
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
  
app.use(express.json()) 




app.use('/api/products', productRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/slides', slidesRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/upload7', uploadRoutes7)
app.use('/api/upload6', uploadRoutes6)
app.use('/api/upload2', uploadRoutes2)
app.use('/api/upload3', uploadRoutes3)
app.use('/api/upload4', uploadRoutes4)
app.use('/api/upload5', uploadRoutes5)
app.use('/api/upload5', uploadRoutes5)
app.use('/api/iconupload', iconupload)
app.use('/api/slideupload', slideImageRoutes)
app.use('/api/subcategory', subcategory)
app.use('/api/filter', filterRoutes); 
app.use('/api/packages', packagesRoutes); 
app.use('/api/settings', settingsRoutes); 


app.get('/api/config/paypal', (req, res) =>
    res.send(PAYPAL_CLIENT_ID)
)



const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
      ) 
}
else {
    app.get('/',(req, res) => {
    res.send("API is runnin...")
})
} 


app.use(notFound)
app.use(errorHandler)

const PORT =  process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold))

 