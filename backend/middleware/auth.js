import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function authMiddleware(req, res, next) {
    //grab the bearer token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
        .status(401)
        .json({ success: false, message: 'Not Authorized, token missing' });
    }
    const token = authHeader.split(' ')[1];

    //verify and attach user object

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if(!user) {
            return res.status(401).json({ success: false, message: 'Not Authorized, user not found' });
        }
        req.user = user; //attach user to request object   
        next(); 
    }
    catch (err) {
        console.log('JWT verification failed', err);
        return res.status(401).json({ success: false, message: 'token invalid or expired' });
    }    
}