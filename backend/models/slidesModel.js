import mongoose from 'mongoose'

const slideSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comment1: {
        type: String,
    },
    comment2: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    pos: { 
        type: Number,
    },
}, {
    timestamps: true
})



const Slide = mongoose.model('Slide', slideSchema)

export default Slide