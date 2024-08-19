
// Realiza o require do express, http, e socketio
const app = require('express')();
// passa o express para o http-server
const http = require('http').Server(app);
// passa o http-server par ao socketio
const io = require('socket.io')(http);
 
// cria uma rota para fornecer o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// sempre que o socketio receber uma conexão vai devoltar realizar o broadcast dela
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(socket.id)
  });
});
 
// inicia o servidor na porta informada, no caso vamo iniciar na porta 3000
http.listen(3000, () => {
  console.log('Servidor rodando em: http://localhost:3000');
});