import jwt, { Secret } from 'jsonwebtoken';

const generateJWT = (id: Secret)=>{
    return jwt.sign({id}, process.env.JWT_SECRET as Secret, {
        expiresIn: '7d'
    })
}
export default generateJWT;