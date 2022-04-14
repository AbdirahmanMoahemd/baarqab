import mongoose from 'mongoose'

const packageSchema = mongoose.Schema({
    packageName: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        unique: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
        
    },
    icon: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})
packageSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


const Package = mongoose.model('Package', packageSchema)

export default Package