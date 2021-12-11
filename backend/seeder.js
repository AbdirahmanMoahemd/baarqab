import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import slides from './data/slide.js'
import promotions from './data/promotion.js'
import testimonials from './data/testimonials.js'
import User from './models/userModel.js'
import Testimonials from './models/testimonialsModel.js'
import Slide from './models/slidesModel.js'
import Oder from './models/oderModel.js'
import Promotions from './models/promotionModel.js'
import Product from './models/productModel.js'
import connectDB from './config/db2.js'


dotenv.config()

connectDB()

const importData = async () => {
    try {
        // await Oder.deleteMany()
        // await Product.deleteMany()
        // await User.deleteMany()
        // await Slide.deleteMany()

        const createUsers = await User.insertMany(users)

        // const adminUser = createUsers[0]._id
        // const sampleProducts = products.map(product => {
        //     return {...product, user: adminUser}
        // })

        // await Product.insertMany(sampleProducts)

        // await Slide.insertMany(slides)
         await Promotions.insertMany(promotions)
       // await Testimonials.insertMany(testimonials)

        // const adminUser2 = createUsers[0]._id
        // const sampleSlides = products.map(product => {
        //     return {...product, user: adminUser2}
        // })

        // await Slide.insertMany(sampleSlides)
        console.log('Data Imported! '.green.inverse)
        process.exit()
 
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Oder.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        
        console.log('Data Destroyed! '.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
}
else {
    importData()
}