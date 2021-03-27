import asyncHandler from 'express-async-handler'
import Promotions from '../models/promotionModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getPromotions = asyncHandler(async (req, res) => {
    const promotions = await Promotions.find({})
    promotions.sort((a, b) => (a._id > b._id) ? -1 : 1)
    res.json(promotions)

})

// @desc    Delete by Id 
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deletePromotions = asyncHandler(async (req, res) => {
    const promotions = await Promotions.findById(req.params.id)
    
    if (promotions) {
        await promotions.remove()
        res.json({ message: 'Promotion removed' })
    }
    else {
        res.status(404)
        throw new Error('Promotion not found')
    }

})



// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createPromotions = asyncHandler (async (req, res) => {
  const promotions = new Promotions({
    name: 'shoes',
    image: '/images/2.png',
    }
  ) 
  const createdPromotions = await promotions.save()
  res.status(201).json(createdPromotions)
})


// @desc    Get user by Id 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getPromotionsById = asyncHandler(async (req, res) => {
    const promotions = await Promotions.findById(req.params.id)

    if (promotions) {
        res.json(promotions) 
    }
    else {
        res.status(404)
        throw new Error('Promotion not found')
    }

})



// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updatePromotions = asyncHandler (async (req, res) => {
  
  const { name, image} = req.body
  
  const promotions = await Promotions.findById(req.params.id)

  if (promotions) {
      
    promotions.name = name
    promotions.image = image
    
    

    const updatedPromotions = await promotions.save()
    res.json({
    updatedPromotions
  })
    }
    else {
        res.status(404)
        throw new Error('Promotion Not Found')
    }


  
})