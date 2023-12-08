import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/Users';
import dotenv from "dotenv";

dotenv.config();
const checkAuth = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { msg: string; }): any; new(): any; }; }; }, next: () => any) => {
    if(req?.headers?.authorization &&  req?.headers?.authorization.startsWith('Bearer') ){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
            req.usuario = await User.findById(decoded).select('-password -confirmado -token -createdAt');
            return next();
        } catch (error) {
            return res.status(404).json({msg: 'Hubo un error'})
        }
    }else{
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
}
export default checkAuth;