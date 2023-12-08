import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI ?? '')
        const url = `${connection.connection.host}: ${connection.connection.port}`
        console.log("MongoDb conectado en: ", url)
    } catch (error) {
        console.log("hubo un error")
        console.log(`error: `, error)
        process.exit(1)
    }
}