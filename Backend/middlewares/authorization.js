import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function admin(req, res, next) {
    next();
}

function client(req, res, next) {
    next();
}



export const methods = {
    client,
    admin,
}