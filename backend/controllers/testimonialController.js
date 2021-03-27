import asyncHandler from 'express-async-handler'
import Testimonials from '../models/testimonialsModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonials.find({})
    testimonials.sort((a, b) => (a._id > b._id) ? -1 : 1)
    res.json(testimonials)

})

// @desc    Delete by Id 
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonials = await Testimonials.findById(req.params.id)
    
    if (testimonials) {
        await testimonials.remove()
        res.json({ message: 'User removed' })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})



// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createTestimonials = asyncHandler (async (req, res) => {
  const testimonials = new Testimonials({
    name: 'Kaahiye',
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: '/images/per2.png',
    }
  )
  const createdTestimonials = await testimonials.save()
  res.status(201).json(createdTestimonials)
})


// @desc    Get user by Id 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getTestimonialById = asyncHandler(async (req, res) => {
    const testimonials = await Testimonials.findById(req.params.id)

    if (testimonials) {
        res.json(testimonials) 
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})



// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updatetestimonials = asyncHandler (async (req, res) => {
  
  const { name, image, comment} = req.body
  
  const testimonials = await Testimonials.findById(req.params.id)

  if (testimonials) {
      
    testimonials.name = name
    testimonials.image = image
    testimonials.comment = comment
    

    const updatedtestimonials = await testimonials.save()
    res.json({
    updatedtestimonials
  })
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }


  
})