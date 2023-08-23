const socket = io();

const chatForm = document.getElementById("chatForm");
const chatMessages = document.getElementById("chatMessages");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    message: e.target.elements.message.value,
    user: e.target.elements.user.value,
  };
  socket.emit("chatMessage", data);
  e.target.elements.message.value = "";
  e.target.elements.message.focus();
});

socket.on("messages", (data) => {
  console.log(data.length);
  if(data.length > 0){
    chatMessages.innerHTML = "";
    data.forEach((message) => {
      chatMessages.innerHTML += `<div class="message"><strong>${message.user}</strong>: ${message.message}</div>`;
    });
  }
  else {
    chatMessages.innerHTML = `<div class="message"><strong>Server</strong>: No hay mensajes</div>`;
  }
});



