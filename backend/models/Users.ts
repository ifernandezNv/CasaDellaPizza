import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export type Address = {
    street: string,
    block: string,
    houseNumber:  string,
}

type Preferences = {
    alergies: string[],
    favoriteIngredients: string[]
}
type UserTypeEnum = "user" | "admin";
interface UserType extends Document {
    name: string;
    password: string;
    email: string;
    orders: typeof mongoose.Schema.Types.ObjectId[];
    token: string;
    confirmed: boolean;
    preferences: Preferences;
    userType: UserTypeEnum;
    address: Address;
    createdAt: string;
    checkPassword(password: string): boolean
}
const userSchema = new mongoose.Schema<UserType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    userType: {
        type: String,
        default: "user"
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Orders"
    },
    token: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    preferences: {
        type: {
            alergies: [],
            favoriteIngredients: []
        } as Preferences,
    },
    address: {
        type: {} as Address,
    },
    createdAt: {
        date: String,
    }
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(passwordRequest: string){
    return await bcrypt.compare(passwordRequest, this.password);
}

const User = mongoose.model("User", userSchema)
export default User;