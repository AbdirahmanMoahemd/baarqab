import asyncHandler from 'express-async-handler'
import Settings from '../models/settingsModel.js'

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getSettings = asyncHandler(async (req, res) => {
    const settings = await Settings.find({})
    
    res.json(settings)

})


// @desc    Get user by Id 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getSettingsById = asyncHandler(async (req, res) => {
    const settings = await Settings.findById(req.params.id)
    if (settings) {
        res.json(settings) 
    }
    else {
        res.status(404)
        throw new Error('Settings not found')
    }

})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateSettings = asyncHandler (async (req, res) => {
  
    const { phoneNumber, serviceTitle1, serviceDecs1, serviceTitle2,
        serviceDecs2, serviceTitle3, serviceDecs3,about, aboutImg } = req.body
  
  const settings = await Settings.findById(req.params.id)

  if (settings) {
      
    settings.phoneNumber = phoneNumber
    settings.serviceTitle1 = serviceTitle1
    settings.serviceDecs1 = serviceDecs1
    settings.serviceTitle2 = serviceTitle2
    settings.serviceDecs2 = serviceDecs2
    settings.serviceTitle3 = serviceTitle3
    settings.serviceDecs3 = serviceDecs3
    settings.about = about
    settings.aboutImg = aboutImg
    

    const updatedSettings = await settings.save()
    res.json({
    updatedSettings
  })
    }
    else {
        res.status(404)
        throw new Error('Settings Not Found')
    }


  
})


export const createSettings = asyncHandler (async (req, res) => {
    let settings = new Settings({
        phoneNumber : req.body.phoneNumber,
        serviceTitle1 : req.body.serviceTitle1,
        serviceDecs1 : req.body.serviceDecs1,
        serviceTitle2 : req.body.serviceTitle2,
        serviceDecs2 : req.body.serviceDecs2,
        serviceTitle3 : req.body.serviceTitle3,
        serviceDecs3 : req.body.serviceDecs3,
        about : req.body.about,
        aboutImg : req.body.aboutImg,
       
    })
    settings = await settings.save();

    if(!settings)
    return res.status(400).send('the settings cannot be created!')

    res.send(settings);
}) 