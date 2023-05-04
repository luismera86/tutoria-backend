const socket = io();
const user = document.getElementById('user');
const message = document.getElementById('message');
const btn = document.getElementById('btn');
const form = document.getElementById('form');

// Trabajamos con sockets

// Evento del formulario para enviar la información al servidor
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('enviando');
  const newMessage = {
    user: user.value,
    message: message.value,
  };
  // Enviamos el mensaje al servidor para que lo guarde en la DB
  socket.emit('message', newMessage);
  message.value = '';
  
  
});

// Recibimos del servidor los mensajes de la DB y los mostramos en la pantalla del chat
socket.on('messageLog', (data) => {
  const messagesDIV = document.getElementById('messages');
  let mens = "";
  console.log(data)
  data.forEach(m => {
    mens = mens + `${m.user} dice: ${m.message} </br>`
  })

  messagesDIV.innerHTML = mens
  
});