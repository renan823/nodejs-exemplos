const express = require("express")
const app = express()
const path = require("path")

//Colocar ejs como engine
app.set("view engine", "ejs")
app.set("views", "./views")

//Substituto body.parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Usando public
app.use("/public/", express.static("public"));

const users = [
  {nome: "Josefino"},
  {nome: "Clarabela"},
  {nome: "Eldemira"},
  {nome: "Astolfânio"},
]
//Servir arquivo e passar dados (users)
app.get("/", (req, res, next)=>{
  res.render("index", {users: users, body: "body", title: "Home"})
})

//Servir arquivo login
app.get("/login", (req, res, next)=>{
  res.render("index", {body: "login", title: "Login"})
})

//Recebendo dados de login
app.post("/login", (req, res, next)=>{
  let user = {nome: req.body.nome}
  users.push(user)
  res.send({status: "OK"})
})

app.get("/create", (req, res, next)=>{
  res.render("index", {body: "create", title: "Cadastro"})
})

//Recebendo dados de login
app.post("/create", (req, res, next)=>{
  let user = {nome: req.body.nome}
  if(users.contains(user)){
    res.send({status: "INVALID"})
  }
  else{
    res.send()
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log("Server ready!")
})
