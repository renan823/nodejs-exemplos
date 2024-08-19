/*
Definindo um roteador do express.
Atua como um app "reduzido".
Possui apenas as funcionalidades de roteamento.
Para usa-lo, passamos a rota e depois a função handler.
As funções handler foram definidas no arquivo controller.
Se for necessario um middleware, importe-o e coloque nas rotas!
O router é exportado para ser usado no app padrão (index)
*/ 
const router = require("express").Router()
const controller = require("./controller");

router.get("/", controller.all)
router.post("/new", controller.create)
router.get("/search", controller.search)
router.put("/update", controller.update)
router.delete("/delete", controller.delete)

export default router;