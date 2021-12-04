import mongoose from 'mongoose'


const prodsizeSchema = mongoose.Schema({
    size1: {
        type: String,
        required: true,
    },
    size2: {
        type: String,
    },
    size3: {
        type: String,
    },
    size4: {
        type: String,
    },
    size5: {
        type: String,
    },
    size6: {
        type: String,
    },
    size7: {
        type: String,
    },
    size8: {
        type: String,
    },
    size9: {
        type: String,
    },
    size10: {
        type: String,
    },
    size11: {
        type: String,
    },
    size12: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    }
    
   
})


prodsizeSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

const ProdSize = mongoose.model('ProdSize', prodsizeSchema);


export default ProdSize