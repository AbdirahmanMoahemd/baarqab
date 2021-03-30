import asyncHandler from 'express-async-handler'
// import { protect } from '../middleware/authMiddleware.js'
import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  
  

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }, 
  } : {}

  const products = await Product.find({ ...keyword })
  products.sort((a, b) => (a._id > b._id) ? -1 : 1)

    res.json({products})   
  
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts2 = asyncHandler(async (req, res) => {
  
    

  const products = await Product.find({})

  products.sort((a, b) => (a._id > b._id) ? -1 : 1)
    res.json({products})   
  
})
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProductsCount = asyncHandler(async (req, res) => {
   const products = await Product.find({ })
  
    let counter = 0;
    for (let i = 0; i < products.length; i++) {
       counter++;
  }
  
   
    res.json({counter })    
  
})
// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
export const getProductById = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
      await product.remove()
    res.json({
          message: 'Product removed'
        })
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler (async (req, res) => {
  const product = new Product({
    name: 'Last Shoes',
    user: req.user._id,
    image: '/images/kr-3.jpg',
    description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Shoes', 
    category: 'Shoes',
    type: 'Rag',
    price: 30,
    countInStock: 15,
    numReviews: 12,
    }
  )
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})




// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler (async (req, res) => {
  
  const { name, image, description, brand, category,type, price, countInStock } = req.body
  
  const product = await Product.findById(req.params.id)

  if (product) {
      
    product.name = name
    product.image = image
    product.description = description
    product.brand = brand
    product.category = category
    product.type = type
    product.price = price
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json({
    updatedProduct
  })
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }


  
})



// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler (async (req, res) => {
  
  const { 
    rating, comment  
   } = req.body
  
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) =>item.rating + acc, 0) / product.reviews.length


    await product.save()
    res.status(201).json({
      message: 'Review added'
    })


  }
    
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }


  
})



// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
export const getTopProducts = asyncHandler (async (req, res) => {
  
  const products = await Product.find({}).sort({ rating: -1 }).limit(8)
  products.sort((a, b) => (a._id > b._id) ? -1 : 1)
  res.json(products)
})

// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
export const getManProducts = asyncHandler (async (req, res) => {
  
  const products = await Product.find({ category: 'Electronics' })
 
  res.json(products)
 
  
})


