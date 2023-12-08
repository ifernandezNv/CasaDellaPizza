import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    importantDetail: {
        type: String,
    },
    endDate: {
        type: String,
    },
    image: {
        type: String,
    },
    available: {
        type: Boolean,
    },
    product: [
        {
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
        }
    ]
})

const Promotions = mongoose.model("Promotions", promotionSchema)
export default Promotions;