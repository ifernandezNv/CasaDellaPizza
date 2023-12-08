import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pricePerPortion: {
        type: Number,
        required: true,
    },
    zIndex: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    avaliable: {
        type: Boolean,
        default: true
    }
})

const Ingredients = mongoose.model("Ingredients", ingredientSchema)
export default Ingredients;