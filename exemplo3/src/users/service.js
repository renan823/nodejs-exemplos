/*
Serviço exclusivo do usuário.
Aqui as operações são feitas no "banco de dados".
Todas as funções devem retornar algum dado e um erro.
Sem erro? O parametro error é null.
Sem dados? O parametro data é null.

Padrão de retorno: { data: seus dados, error: { message: "", status: codigo http }}

As funções são exportadas e podem ser importadas em outros arquivos.
O import pode ser separado ou "all in one" (respectivamente):
    const { user_all } = require("./service") 
    OU
    const service = require("./service")
*/

const users = [];
let ID = 1;

exports.user_create = (name, email) => {
    const user = { name, email, id: ID };
    users.push(user);

    ID++;

    return { data: { user }, error: null };
}

exports.user_update = (name, email, id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return { data: null, error: { message: "Usuário não encontrado", status: 400 } };
    }

    const user = { name, email, id };
    users[index] = user;

    return { data: { user }, error: null };
}

exports.user_all = () => {
    return { data: { users }, error: null };
}

exports.user_delete = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return { data: null, error: { message: "Usuário não encontrado", status: 400 } };
    }

    const user = users.splice(index, 1)[0];

    return { data: { user }, error: null };
}

exports.user_find_by_id = (id) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        return { data: null, error: { message: "Usuário não encontrado", status: 400 } };
    }

    return { data: { user }, error: null };
}