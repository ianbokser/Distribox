const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json({
    type: "*/*"
}))

app.use(cors());

app.get('/productos', async (req, res) => {
    const listProducts = await connectToDatabase('localhost', 'ian', '123456', 'productos');
    res.send(listProducts);
})

app.listen(port, () => {
    console.log(`executing in http://localhost:${port}`)
})

app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado correctamente.');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(`Bienvenido, ${result[0].username} (${result[0].role})`);
        } else {
            res.status(401).send('Credenciales incorrectas.');
        }
    });
});