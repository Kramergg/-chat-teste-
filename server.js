// Importando o módulo Express
const express = require('express');

// Criando uma instância do Express
const app = express();

// Configurando o servidor para ouvir na porta 3000
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Servindo arquivos estáticos da pasta public
app.use(express.static('public'));

// Configurando o Socket.IO
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('message', (message) => {
    console.log('Mensagem recebida:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});
