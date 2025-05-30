import mongoose from 'mongoose'

const Schema = mongoose.Schema


const productSchema = new Schema({
    code: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    name: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    image: {type: String, required: true}
})


export default mongoose.model("Product", productSchema)