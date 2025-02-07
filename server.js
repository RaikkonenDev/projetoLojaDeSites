const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000



require('dotenv').config();
dotenv.config();


const app = express()


app.use(express.static('public'))//usar css e js
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





app.get('/inicio',(req,res)=>{
    res.render('index')// Renderiza a página de inicio 
})

//----------------- Rota de cadastro-----------------

const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/; //usar pra obrigar a ter que coloca email reais

app.post('/cadastra', (req,res)=>{
    const {email, senha} = req.body


    if(!emailRegex.test(email)){
        return res.status(400).json({message: "E-mail inválido. Utilize um e-mail válido do Gmail, Outlook, Hotmail ou Yahoo.'"})
    }  

    

    if (!email || !senha){
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }


    db.query('SELECT * FROM usuarios WHERE email = ?',[email], async (err, result)=>{
        if (err) throw err
        if(result.length > 0){
            return res.status(400).json({ message: 'Email já está em uso' });
        }


        const hashedPassword = await bcrypt.hash(senha, 10);


        db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)',[email, hashedPassword], (err, result)=>{
            if (err) throw err

            const token  = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '1h'})
        })
   

        


        
        
    

    })
})





// ----------------- Rota de login -----------------
app.post('/login', (req,res)=>{
    const {email,senha} = req.body



    db.query('SELECT * FROM usuarios WHERE email = ?',[email], async (err, results)=>{
        if (err) return res.status(500).send('Erro no banco de dados')
        
        if(results.length === 0) return res.status(400).send('Usuarios não encontrado')

   ;
       const user = results[0]

    // Verificar senha
    const match = await bcrypt.compare(senha, user.senha)
    if(!match) return res.status(400).send('senha incorreta')

    //criar token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})


    //salvar o token na sessão ou enviar no cookie 
    res.cookie('auth_token', token, {httpOnly: true, maxAge:3600000}) // 1 hora de validade
    res.redirect('/inicio')




    
    })
})





//----------------- Rota de logout -----------------
app.get('/logout', (req,res)=>{
    res.clearCookie('auth_token')// Limpar o cookie de autenticação
    return res.status(200).send('Deslogado com sucesso')
    res.redirect('/login')
})


app.post('/logout', (req,res)=>{
    res.clearCookie('auth_token')
    return res.status(200).send('login')
})






















app.listen(port, (req,res)=>{
    console.log(`servidor rodando na porta ${port}!`)
})






