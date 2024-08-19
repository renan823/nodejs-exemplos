//Importando o módulo do express
const express = require("express");

//Criando a instancia do express (nosso app)
const app = express();

//Usando um adapatador para receber json (antigo body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
Criando um sistema com usuraios
Rotas:
    - "/" listar todos
    - "/cadastrar/" cadastrar novo usuario
    - "/buscar/" mostrar o usuario com o id (ou erro)
    - "/atualizar/" atualizar dados do usuario (com base no id)
    - "/excluir/" excluir usuario (com base no id)

Um usuario tem nome, email e id
Para simular um banco em memória usaremos um vetor de usuarios
(declarado abaixo)
O idAtual será explicado mais para frente no codigo!
*/

const usuarios = [];
let idAtual = 1;

/*
Começando pelas rotas que já sabemos fazer (rotas de listagem são mais intuitivas)
Aqui, por serem rotas do usuario, é justo colocar um nome coerente.
Nomes de rotas devem ser coerentes, sem acento e de preferencia minusculos
*/
app.get("/usuarios/", (req, res) => {
    return res.json({ usuarios });
})
/*
Ai meu deus, o que é ({ usuarios })? SOCORRO!!!!
Calma!
O javascript (mesmo não sendo uma linguagem séria) possui umas funcionalidades legais.
Em python, dicionarios são key: value.
Em js temos os objetos { key: "value", key2: 1836 } por aí vai
Um json veio dos objetos js, então a sintaxe é praticamente igual!
Os objetos possuem metodos, e muitas outras coisas.
No nosso caso, estaremos usando eles como um json.
Um funcionalidade desses objetos é criar automaticamente um campo por meio de uma variavel qualquer.
por exemplo:
    nome = "Jose"
    idade = 15

    return { nome: nome, idade: idade }

    isso é igual a fazer:

    return { nome, idade }

As chaves criadas terão o mesmo nome da variavel passada!
então, se for usado:
    nome = "josé"
    obj = { nome }

    obj.nome é jose!

Vale lembrar que podemos ter listas dentro de objetos, objetos dentro de lista dentro de objeto...
*/

/*
Criando a rota de busca com id.
Se o id não existir, retornar http 404 e uma mensagem de erro
http 404 => not found (o cliente tentou acessar algo que não existe)
Essa rota vai usar os query params.

Aqui, para pegar o id usamos:
    const id = req.query.id;
Para encontrar o usuário, usamos o find.
Se o find retornar um usuário valido (diferente de undefined), retornamos o usuario e ok (200)
Senão, erro!
*/
app.get("/usuarios/buscar/", (req, res) => {
    const id = parseInt(req.query.id);

    if (!id) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const usuario = usuarios.find(usuario => usuario.id === id);
    if (!usuario) {
        return res.json({ mensagem: "Usuário não encontrado!" }).status(404);
    }

    return res.json({ usuario }).status(200);
})

/*
Criando a rota de cadastro do usuário.
Metodo POST!
Os dados do usuário devem ser passados no req.body (corpo da requisição).

NUNCA DEIXE O CLIENTE ESCOLHER O ID DE UM ITEM!!!!!!!
Existem metodos para criar ids unicos!
Usar um contador, UUID, Snowflake id etc...
Aqui, por simplicidade, usaremos um contador!
Em um projeto real, o banco de dados faz isso pra você!
Em SQL (MySql, postgres, sqlite) usando ID INTEGER PRIMARY KEY AUTO INCREMENTENT 
Bancos NoSQL (mongo, cassadnra, etc) geram os proprios ids.

Ao receber os dados iremos salvar o usuário na lista, colocando junto o id que geramos.
É sempre bom verificar se os dados estão certos (validar, etc). 
A validação aqui é ver se eles existem. (Bem fraca por sinal)

Se tudo der certo, retornamos um ok (HTTP 201 CREATED) e o usuario criado.
Se por acaso o corpo da requisição não conter o que precisamos,
retorne um erro HTTP 400 (BAD REQUEST);
Quando cadastrar o usuário, lembre de aumentar o idAtual!
*/
app.post("/usuarios/cadastrar/", (req, res) => {
    if (!req.body) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const nome = req.body.nome;
    const email = req.body.email;

    if (!nome || !email) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const usuario = { nome, email, id: idAtual }
    usuarios.push(usuario);

    idAtual++;

    return res.json({ mensagem: "Usuário criado!", usuario });
})

/*
Atualizar usuario.
Muito parecido com o cadastro
Metodo PUT (poderia ser POST).
Recebe os dados do usuário (nome, email e id).
Se o id existir, substitua o nome e email pelos novos. Retorne ok e o usuário modificado.
Senão, retorne erro.
Para atualizar o usuario na lista, buscamos sua posição na lista usando o findIndex.
Se a posição for != -1 (ou seja, o usuário existe na lista) é só atualizar.
Senão, erro!
*/
app.put("/usuarios/atualizar/", (req, res) => {
    if (!req.body) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;

    if (!nome || !email || !id) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const posicao = usuarios.findIndex(usuario => usuario.id === id)
    if (posicao === -1) {
        return res.json({ mensagem: "Usuário não encontrado!" }).status(400);
    }
   
    const usuario = { nome, email, id: idAtual }
    usuarios[posicao] = usuario;

    return res.json({ mensagem: "Usuário atualizado!", usuario });
})

/* 
Remover usuário.
Meotodo DELETE (poderia ser POST).
Recebe o id do usuario.
Busca o usuário na lista.
Se o usuáiro existir, remova-o. Retorne ok e o usuário removido.
Senão, erro!
Para bsucar a posição, usamos o findIndex
Se a posição for != -1 (usuario esta na lista), remove essa posição.
O array.slice() faz essa remoção. Recebe o indice de remoção e quantos item serão removidos.
*/
app.delete("/usuarios/remover/", (req, res) => {
    if (!req.body) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const id = req.body.id;
    if (!id) {
        return res.json({ mensagem: "Dados inválidos!" }).status(400);
    }

    const posicao = usuarios.findIndex(usuario => usuario.id === id)
    if (posicao === -1) {
        return res.json({ mensagem: "Usuário não encontrado!" }).status(400);
    }

    const usuario = usuarios.splice(posicao, 1)[0]
    return res.json({ mensagem: "Usuário removido!", usuario });
})

/* 
Criando uma rota base "/", só para não ter uma tela vazia ao acessar a raiz da pagina
*/
app.get("/", (req, res) => {
    return res.json({ mensagem: "Hello world!" }).status(200);
})

/*
Colocando o servidor para rodar 
a função listen só precisa receber a porta (primeiro parametro)
O segundo parametro (opcional) é uma função, geralmente usada para 
mostrar que o servidor está rodando
*/
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"))