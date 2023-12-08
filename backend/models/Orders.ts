import mongoose from "mongoose";
import { Address } from "./Users";
const orderSchema = new mongoose.Schema({
    products: {
        products: [
            {
                product: {
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
                },
                quantity: {
                    type: Number
                }
            }
        ],
        promotion: [
            {
                promotion: {
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
                },
                quantity: {
                    type: Number
                }
            }
        ],
    },  
    statusOrder: {
        type: String,
    },
    userId: {
        type: String,
    },
    address: {
        type: {} as Address,
    },
    date: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
})

const Orders = mongoose.model("Orders", orderSchema)
export default Orders;