import mysql from 'mysql';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import { usuarioExiste, agregarNuevoCliente, verificarUsuarioYContraseña } from '../functionsBack.js';

dotenv.config();

const DB_host = process.env.DB_host;
const DB_user = process.env.DB_user;
const DB_password = process.env.DB_password;
const DB_database = process.env.DB_database;

async  function login(req, res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
    }

    const usuarioAResvisar = await verificarUsuarioYContraseña(DB_host, DB_user, DB_password, DB_database, user, password);

    if(!usuarioAResvisar){
        return res.status(400).send({status:"Error",message:"Error durante login"})
    }
    else{
        const token = jsonwebtoken.sign(
            {user:usuarioAResvisar.user},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRATION}
        );
        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
            }
        res.cookie("jwt",token,cookieOption);
        res.send({status:"ok",message:"Usuario loggeado",redirect:"../index.html"});
    }
}

async function register(req, res) {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if (!user || !email || !password) {
        return res.status(400).send({ status: "error", Message: "los campos están incompletos" });
    }

    try {
        const usuarioARevisar = await usuarioExiste(DB_host, DB_user, DB_password, DB_database, user, email);

        if (usuarioARevisar) {
            return res.status(400).send({ status: "error", Message: "este usuario ya existe" });
        } else {
            const salt = await bcryptjs.genSalt(5);
            const hashPassword = await bcryptjs.hash(password, salt);
            try {
                agregarNuevoCliente(DB_host, DB_user, DB_password, DB_database, user, email, hashPassword);
                return res.status(201).send({Status:"ok",Message: "usuario agregado",redirect:"./login.html"});
            } catch (error) {
                console.error('Error al agregar usuario:', error);
                return res.status(400).send({ status: "error",message: "error al agregar al usuario"});
            }
        }
    } catch (error) {
        console.error('Error al verificar usuario:', error);
        return res.status(500).send({ status: "error", Message: "Error al verificar usuario" });
    }
}


export const methods = {
    login,
    register
}