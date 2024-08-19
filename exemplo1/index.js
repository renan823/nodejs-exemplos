//Importando o módulo do express
const express = require("express");

//Criando a instancia do express (nosso app)
const app = express();

//Usando um adapatador para receber json (antigo body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Criando uma rota

Uma rota é um caminho dentro do seu servidor.
Ao acessar um link, por exemplo "moodle.com/login",
especificamos o site que estamos acessando e o endpoint.
Endpoint (no exemplo é "/login") é uma rota/caminho dentro do seu site,
disponivel para ser acessada.

Com express, definimos uma rota usando o app.
A rota deve ter: 
    - metodo http permitido (GET, POST, PUT, etc)
    - nome do endpoint (pode ter parametros!)
    - handler (função que vai processar a requisição e enviar resposta)

Ver exemplo:
*/

app.get("/", (req, res) => {
    return res.json({ mensagem: "Hello world!" }).status(200);
})
/* 
No exemplo, definimos o metodo http com app.get().
O express permite passar quantos parametros forem necessários nessa função
Por que?
O mais importante são os "extremos", o primeiro e o ultimo parametro.
O primeiro parametro da função é o endpoint (nesse caso, / é a pagina inicial)
O ultimo indica como a requisição será processada, é o handler (uma função)
Os parametros que podem aparecer (lembrando, é opcional), são os chamados middlewares.
Um middleware, como o nome sugere, é algo que fica no meio.
Assunto para o futuro...
Nesse exemplo, nossa função handler recebe o objeto req e res, devolvendo um json qualquer.
O express permite devolver varios tipos de dados, basta ajustar a função.
O status 200 (HTTP OK) indica que tudo deu certo no processo.
*/

/*
Colocando o servidor para rodar 
a função listen só precisa receber a porta (primeiro parametro)
O segundo parametro (opcional) é uma função, geralmente usada para 
mostrar que o servidor está rodando
*/
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"))
