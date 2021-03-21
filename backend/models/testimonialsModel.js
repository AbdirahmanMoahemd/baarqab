import mongoose from 'mongoose'

const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true
})



const Testimonials = mongoose.model('Testimonials', testimonialSchema)

export default Testimonials