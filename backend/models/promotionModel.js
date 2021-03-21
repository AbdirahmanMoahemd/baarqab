import mongoose from 'mongoose'

const promotionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true
})



const Promotions = mongoose.model('Promotions', promotionSchema)

export default Promotions