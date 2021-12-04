import asyncHandler from 'express-async-handler'
import ProdSize  from '../models/prodsize.js';
import Product from '../models/productModel.js'



export const getSizes = asyncHandler(async (req, res) => {
    
    const sizes = await ProdSize.find().populate('product');
    
    if(!sizes) {
        res.status(500).json({success: false})
    }
    
    res.status(200).json({sizes});
})




export const getSize = asyncHandler(async (req, res) => {

    const size = await ProdSize.findById(req.params.id); 
 
    if (size) { 
        res.json(size) 
    }
    else {
        res.status(404)
        throw new Error('size Not Found')
    }
})


export const careteSize = asyncHandler(async (req, res) => {

     const product = await Product.findById(req.body.product);
    if (!product) return res.status(400).send('Invalid product');
        let newSizeItem = new ProdSize({
            size1: req.body.size1,
            size2: req.body.size2,
            size3: req.body.size3,
            size4: req.body.size4,
            size5: req.body.size5,
            size6: req.body.size6,
            size7: req.body.size7,
            size8: req.body.size8, 
            size9: req.body.size9,
            size10: req.body.size10,
            size11: req.body.size11,
            size12: req.body.size12,
            product: req.body.product,
        })

     
    newSizeItem = await newSizeItem.save(); 
  
    if(!newSizeItem)
    return res.status(400).send('the product sizes cannot be created!')

    res.json(newSizeItem);
})


export const updateSize = asyncHandler(async (req, res) => {
     
    const size = await ProdSize.findByIdAndUpdate(
        
        req.params.id,
        {
            size1: req.body.size1,
            size2: req.body.size2,
            size3: req.body.size3,
            size4: req.body.size4,
            size5: req.body.size5,
            size6: req.body.size6,
            size7: req.body.size7,
            size8: req.body.size8,
            size9: req.body.size9,
            size10: req.body.size10,
            size11: req.body.size11,
            size12: req.body.size12,
            product: req.body.product,
        },
       
    )

    if(!size)
    return res.status(400).send('the size cannot be updated!')

    res.json(size); 
})

export const deleteSize = asyncHandler(async (req, res) => {

    ProdSize.findByIdAndRemove(req.params.id).then(size =>{
        if(size) {
            return res.status(200).json({success: true, message: 'the size is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "size not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

