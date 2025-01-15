const express = require('express')
const mysql = require('mysql2')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const port = 8083



require('dotenv').config();
dotenv.config();


const app = express()



app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})) //bodyParser
app.use(cookieParser());


// Configuração do EJS como motor de templates
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//conexão com banco de dados

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME 
})

db.connect((err) =>{
    if (err) throw err
    console.log('Banco de dados funcionado sem problemas!')
})


//-----------------Rotas para pagina de login//-----------------
app.get('/login', (req,res)=>{
    res.render('login')// Renderiza a página de login 
})


////----------------- Rota para a página de cadastro//-----------------
app.get('/cadastra', (req, res) => {
    res.render('cadastra'); // Renderiza a página de cadastro
});







//----------------- Rota de cadastro-----------------

app.post('/cadastra', (req,res)=>{
    const {email, senha} = req.body


    if (!email || !senha){
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }


    db.query('SELECT * FROM usuarios')
})























app.listen(port, (req,res)=>{
    console.log(`servidor rodando na porta ${port}!`)
})






