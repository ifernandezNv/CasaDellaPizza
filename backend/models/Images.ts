import mongoose from "mongoose";

type ImageFormat = "png" | "jpg" | "webp" | "jpeg" | "avif"
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        virtuals: true
    }
})

imageSchema.virtual("ingredientImage", {
    ref: "Ingredients",
    localField: "reference",
    foreignField: "_id",
    justOne: true
})
imageSchema.virtual("promotionImage", {
    ref: "Promotions",
    localField: "reference",
    foreignField: "_id",
    justOne: true
})
imageSchema.virtual("productImage", {
    ref: "Products",
    localField: "reference",
    foreignField: "_id",
    justOne: true
})

const Images = mongoose.model("Images", imageSchema)
export default Images;