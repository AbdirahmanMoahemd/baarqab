import mongoose from 'mongoose'

const settingsSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    
    serviceTitle1: {
        type: String,
        required: true,
    },
    
    serviceDecs1:{
        type: String,
        required: true,
    },
    serviceTitle2: {
        type: String,
        required: true,
    },
    serviceDecs2:{
        type: String,
        required: true,
    },
    serviceTitle3: {
        type: String,
        required: true,
    },
    serviceDecs3:{
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
        
    },
    aboutImg: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})
settingsSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


const Settings = mongoose.model('Settings', settingsSchema)

export default Settings