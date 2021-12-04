import mongoose from 'mongoose'

const colorSchema = mongoose.Schema({
    color1: {
        type: String,
        required: true,
    },
    color2: {
        type: String,
    },
    color3: {
        type: String,
    },
    color4: {
        type: String,
    },
    color5: {
        type: String,
    },
    color6: {
        type: String,
    },
    color7: {
        type: String,
    },
    color8: {
        type: String,
    },
    color9: {
        type: String,
    },
    color10: {
        type: String,
    },
    color11: {
        type: String,
    },
    color12: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    }
})


colorSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

const Color = mongoose.model('Color', colorSchema);

export default Color