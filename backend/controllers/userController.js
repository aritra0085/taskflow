import User from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TOKEN_EXPIRE = '24hr'; // Token expiration time

const createToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });


//Register Function
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false , message: 'all fields are required' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false , message: 'invalid email' });
    }
    if(password.length < 8) {
        return res.status(400).json({ success: false , message: 'password must be at least 8 characters' });
    }

    try {
        if(await User.findOne({ email })) {
            return res.status(409).json({ success: false , message: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        const token = createToken(user._id);

        res.status(201).json({ success: true ,token, user: {  id: user._id, name: user.name, email: user.email } });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ success: false , message: 'Internal server error' });
    }
}      

//Login Function