const socket = io();

// encviar un emmit dentro de una petición POST

const productForm = document.getElementById("productForm");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: e.target.title.value,
    price: e.target.price.value,
    thumbnail: e.target.thumbnail.value,
    stock: e.target.stock.value,
    code: e.target.code.value,
    description: e.target.description.value,
    category: e.target.category.value,
    status: e.target.status.value,
  };
  socket.emit("new-product", data);
  form.reset();
}
);


