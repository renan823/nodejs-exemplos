/*
Arquivo controller do usuário.
Um controller é responsavel pelos handlers de cada rota.
Manipulando req e res, o controller pega os dados e manda para um service.
O service realiza a ação e devolde os dados/erros.
O controller recebe o resultado e cuidas das respectivas respostas (erro ou ok).
As funções são exportadas e podem ser importadas em outros arquivos.
O import pode ser separado ou "all in one" (respectivamente):
    const { create } = require("./controller") 
    OU
    const controller = require("./controller")
*/
const service = require("./service");

exports.create = (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.json({ message: "Dados incorretos!" }).status(400);
    }

    const { data, error } = service.user_create(req.body.name, req.body.email);
    if (error) {
        return res.json({ message: error.message }).status(error.status);
    }

    return res.json({ user: data.user }).status(201);
}

exports.update = (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.email) {
        return res.json({ message: "Dados incorretos!" }).status(400);
    }

    const { data, error } = service.user_update(req.body.id, req.body.name, req.body.email);
    if (error) {
        return res.json({ message: error.message }).status(error.status);
    }

    return res.json({ user: data.user }).status(200);
}

exports.all = (req, res) => {
    const { data, error } = service.user_all();
    if (error) {
        return res.json({ message: error.message }).status(error.status);
    }

    return res.json({ users: data.users }).status(200);
}

exports.delete = (req, res) => {
    if (!req.body.id) {
        return res.json({ message: "Dados incorretos!" }).status(400);
    }

    const { data, error } = service.user_delete(req.body.id);
    if (error) {
        return res.json({ message: error.message }).status(error.status);
    }

    return res.json({ user: data.user }).status(200);
}

exports.search = (req, res) => {
    const id = parseInt(req.query.id);
    if (!id) {
        return res.json({ message: "Dados incorretos!" }).status(400);
    }

    const { data, error } = service.user_find_by_id(id);
    if (error) {
        return res.json({ message: error.message }).status(error.status);
    }

    return res.json({ user: data.user }).status(200);
}