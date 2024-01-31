import mysql from 'mysql'
import bcryptjs from 'bcryptjs';

async function cargarProductos(_host, _user, _password, _database) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }
            connection.query('SELECT * FROM productoss', (err, rows) => {
                resolve(rows);
                connection.end();
            });
        });
    });
}

export function productos(_host, _user, _password, _database) {
    return new Promise(async (resolve, reject) => {
        try {
            const productos = await cargarProductos(_host, _user, _password, _database)
            resolve(productos);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}

async function verificarUsuarioExiste(_host, _user, _password, _database, usuario, email) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const queryUsuario = 'SELECT * FROM Clientes WHERE Nom_Cliente = ?';
            const queryEmail = 'SELECT * FROM Clientes WHERE Mail_Cliente = ?';

            connection.query(queryUsuario, [usuario], (errorUsuario, resultsUsuario) => {
                if (errorUsuario) {
                    console.error('Error al ejecutar la consulta de usuario:', errorUsuario);
                    reject(errorUsuario);
                    return;
                }

                connection.query(queryEmail, [email], (errorEmail, resultsEmail) => {
                    if (errorEmail) {
                        console.error('Error al ejecutar la consulta de email:', errorEmail);
                        reject(errorEmail);
                        return;
                    }
                    const usuarioExiste = resultsUsuario.length > 0 || resultsEmail.length > 0;
                    resolve(usuarioExiste);
                    connection.end();
                });
            });
        });
    });
}


export function usuarioExiste(_host, _user, _password, _database, usuario, email) {
    return new Promise(async (resolve, reject) => {
        try {
            const productos = await verificarUsuarioExiste(_host, _user, _password, _database, usuario, email)
            resolve(productos);
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
        }
    });
}

export async function agregarNuevoCliente(_host, _user, _password, _database, usuario, email, contraseña) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }
            const query = 'INSERT INTO Clientes (Nom_Cliente, Mail_Cliente, Contraseña_Cliente) VALUES (?, ?, ?)';
            connection.query(query, [usuario, email, contraseña], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta de inserción:', error);
                    reject(error);
                } else {
                    resolve();
                }
                connection.end();
            });
        });
    });
}

export async function verificarUsuarioYContraseña(_host, _user, _password, _database, usuario, password) {
    const connection = mysql.createConnection({
        host: _host,
        user: _user,
        password: _password,
        database: _database,
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
                reject(err);
                return;
            }

            const queryUsuario = 'SELECT * FROM Clientes WHERE Nom_Cliente = ?';

            connection.query(queryUsuario, [usuario], async (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta de usuario:', error);
                    reject(error);
                    return;
                }

                if (results.length > 0) {
                    const usuarioEncontrado = results[0];
                    const storedHashedPassword = usuarioEncontrado.Contraseña_Cliente;
                    const contraseñaCoincide = await bcryptjs.compare(password.toString(), storedHashedPassword.toString());
                    if (contraseñaCoincide) {
                        resolve(usuarioEncontrado.Nom_Cliente);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }

                connection.end();
            });
        });
    });
}