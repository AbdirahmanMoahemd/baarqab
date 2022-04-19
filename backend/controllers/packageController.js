import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getPackages = asyncHandler(async (req, res) => {
    const packages = await Package.find({ }).populate('category');
    
    res.json(packages)

})


// @desc    Delete by Id 
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deletePackage = asyncHandler(async (req, res) => {
    const packages = await Package.findById(req.params.id)
    
    if (packages) {
        await packages.remove()
        res.json({ message: 'Package removed' })
    }
    else {
        res.status(404)
        throw new Error('Package not found')
    }

})

// @desc    Get user by Id 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getPackageById = asyncHandler(async (req, res) => {
    const packages = await Package.findById(req.params.id).populate('category');

    if (packages) {
        res.json(packages) 
    }
    else {
        res.status(404)
        throw new Error('packages not found')
    }

})

export const createPackage = asyncHandler (async (req, res) => {
    let packages = new Package({
        packageName: req.body.packageName,
        category: req.body.category,
        icon:req.body.icon,
        isFeatured: req.body.isFeatured,

       
    })
    packages = await packages.save();

    if(!packages)
    return res.status(400).send('the package cannot be created!')

    res.send(packages);
}) 


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updatePackage = asyncHandler (async (req, res) => {
  
  const { packageName,category,isFeatured, icon  } = req.body
  
  const packages = await Package.findById(req.params.id)

  if (packages) {
      
    packages.packageName = packageName
    packages.category = category
    packages.isFeatured = isFeatured
    packages.icon = icon
    

    const updatedpackages = await packages.save()
    res.json({
    updatedpackages
  })
    }
    else {
        res.status(404)
        throw new Error('packages Not Found')
    }


  
})