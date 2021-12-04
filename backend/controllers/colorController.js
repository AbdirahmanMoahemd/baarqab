import asyncHandler from 'express-async-handler'
import Color from '../models/colors.js'
import Product from '../models/productModel.js'



export const getColors = asyncHandler(async (req, res) => {
    const colors = await Color.find().populate('product');
    
    if(!colors) {
        res.status(500).json({success: false})
    }
    
    res.status(200).json({colors});
})

export const getColor = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id); 
 
    if (color) { 
        res.json(color) 
    }
    else {
        res.status(404)
        throw new Error('color Not Found')
    }
})



export const createColor = asyncHandler(async (req, res) => {

     const product = await Product.findById(req.body.product);
    if (!product) return res.status(400).send('Invalid Product');

    let color = new Color({
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3, 
        color4: req.body.color4,
        color5: req.body.color5,
        color6: req.body.color6,
        color7: req.body.color7,
        color8: req.body.color8,
        color9: req.body.color9,
        color10: req.body.color10,
        color11: req.body.color11,
        color12: req.body.color12,
        product: req.body.product,
    })
    color = await color.save();

    if(!color)
    return res.status(400).send('the color cannot be created!')

    res.send(color); 
})


export const updateColor = asyncHandler(async (req, res) => {
    const color = await Color.findByIdAndUpdate(
        req.params.id,
        {
            color1: req.body.color1,
            color2: req.body.color2,
            color3: req.body.color3,
            color4: req.body.color4,
            color5: req.body.color5,
            color6: req.body.color6,
            color7: req.body.color7,
            color8: req.body.color8,
            color9: req.body.color9,
            color10: req.body.color10,
            color11: req.body.color11,
            color12: req.body.color12,
            product: req.body.product,
        },
       
    )

    if(!color)
    return res.status(400).send('the color cannot be updated!')

    res.send(color); 
})

export const deleteColor = asyncHandler(async (req, res) => {

    Color.findByIdAndRemove(req.params.id).then(color =>{
        if(color) {
            return res.status(200).json({success: true, message: 'the color is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "color not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

 