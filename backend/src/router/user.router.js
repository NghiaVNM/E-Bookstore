import { Router } from 'express';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import { sample_users } from '../data.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json(generateTokenResponse(user));
        return;
    }
    res.status(BAD_REQUEST).json({ message: 'Invalid email or password' });
});

const generateTokenResponse = user => {
    const token = jwt.sign({ 
        id: user.id, 
        email: user.email,
        isAdmin: user.isAdmin   
    }, "SomeRandomText", { 
        expiresIn: '30d' 
    });
    return { 
        id: user.id, 
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    };
}

export default router;