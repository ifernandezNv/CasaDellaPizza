import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String
    },
    sizePiecesGrams: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: String,
            quantity: Number
        }
    ],
    image: {
        type: String,
    }
})

const Products = mongoose.model("Products", productSchema)
export default Products;