/*
Esse exemplo envolve duas APIs: usuarios e livros.
Os arquivos tem responsabilidades diferentes!
    - services: manipulam diretamente os dados (por ex. banco de dados)
    - controllers: são handlers (recebem req e res). Usam os services.
    - routers: são as rotas do app. Usam os controllers.
*/

const express = require("express");
const app = express();

//Definindo uma porta padrão
const PORT = 3000;

//Adaptador JSON (antigo body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

/*
Importando o arquivo de rotas do usuario.
Usando o arquivo de rotas do usuario.
Aqui, definimos um nome para o grupo de rotas!
Ou seja, todas as rotas do user_router vão receber "/users" antes do nome!
O app.use() permite adicionar middlewares e rotas!
*/
const user_router = require("./src/users/router");
app.use("/users", user_router);

/* 
Inclua aqui abaixo as rotas criadas para livro!
*/

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));