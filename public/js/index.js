const socket = io();

// enviar un emit dentro de una petición POST

const productForm = document.getElementById("productForm");
const formDelete = document.getElementById("formDelete");

productForm.addEventListener("submit", (e) => {
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

  fetch("http://localhost:8080/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      socket.emit("products", data);
    });

  productForm.reset();
});

formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = e.target.id.value;

  fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      socket.emit("products", data);
    });

  formDelete.reset();
});

// Recibimos los productos desde el servidor con socket.io y los mostramos en el DOM
socket.on("products", (data) => {
  if (data) {
    const products = data;
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      productsContainer.innerHTML += `
      <div class="col-4">
        <div class="card p-3 m-2 ">
          <p>Id: ${product.id}</p>
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <a href="/product/${product.id}" class="btn btn-primary">Ver más</a>
          </div>
        </div>
      </div>
      `;
    });
  }
});
