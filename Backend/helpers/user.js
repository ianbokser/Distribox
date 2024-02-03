import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

function user(req, res) {
    const token = req.body.token;
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ ok: true, user: decoded.name});
}

export const methods = {
    user,
}