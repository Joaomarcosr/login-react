const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "react_crud"
});

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    db.connect(() => {

        let sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result.length > 0) {
                bcrypt.compare(senha, result[0].senha, (err, result) => {
                    if (result) {
                        res.send({ msg: "Usuário logado" })
                    } else {
                        res.send({ msg: "Senha incorreta" })
                    }
                })
            } else {
                res.send({ msg: "Email não encontrado" })
            }
        })
    })
})

app.post('/cad', (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    db.connect(() => {

        console.log("Connected!");

        let select = "SELECT * FROM users WHERE email = ?";
        let insert = "INSERT INTO users (email, senha) VALUES (?, ?)";

        db.query(select, [email], (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result.length == 0) {
                bcrypt.hash(senha, saltRounds, (err, hash) => {
                    db.query(insert, [email, hash], (err, result) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send({ msg: 'Usuário cadastrado' })
                    })
                })

            } else {
                res.send({ msg: 'Usuário já cadastrado' })
            }
        });
    });

})

app.get('/', (req, res) => {
    res.json({ mensagem: 'Conectado' })
})

app.listen(8080, () => {
    console.log('Servidor online na url http://localhost:8080')
})