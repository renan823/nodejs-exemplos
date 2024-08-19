const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Post = require('./models/Post')

//Template engine (Handlebars)
app.engine('handlebars',handlebars.engine({
	defaultLayout: 'main',
	runtimeOptions: {
    	allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars')


//Body Parser(atualized to Express)
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//Routes (Express)
app.get('/', function(req, res){
	Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
		res.render('home', {posts: posts})
	})
})
app.get('/cad', function(req, res){
	res.render('formulario')
})
app.post('/add', function(req, res){
	try{
		Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo,
		})
		let msg = "Postagem adicionada!"
		res.render('message', {msg: msg})
	}
	catch(erro){
		res.send(erro)
	}
})
app.get('/del/:id', function(req, res){
	try{
		Post.destroy({where:{'id':req.params.id}})
		let msg = "Postagem excluída!"
		res.render('message', {msg: msg})
	}
	catch(erro){
	}
})


//HTTP server (Express)
app.listen(8081, function(){
	console.log("Server running!")
})