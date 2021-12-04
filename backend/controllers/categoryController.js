import asyncHandler from 'express-async-handler'
import Category from '../models/category.js'


export const  getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find();

    if(!categories) {
        res.status(500).json({success: false})
    } 
    res.status(200).json({categories});
})

export const getCategoryById = asyncHandler (async (req, res) => {
  const category = await Category.findById(req.params.id)

    if (category) { 
        res.json(category) 
    }
    else {
        res.status(404)
        throw new Error('category Not Found')
    }
})


export const createCategory = asyncHandler (async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
}) 




export const updateCategory = asyncHandler (async (req, res) => {
    const { name, icon, color  } = req.body
  
   const category = await Category.findById(req.params.id)

  if (category) {
      
    category.name = name
    category.icon = icon
    category.color = color

    const updatedCategory = await category.save()
    res.json(updatedCategory) 
    }
    else {
        res.status(404)
        throw new Error('Category Not Found')
    }
}) 

export const deleteCategory = asyncHandler (async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

