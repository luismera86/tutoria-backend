import { faker } from "@faker-js/faker";

const generateProducts = () => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      thumbnail: "",
      status: faker.datatype.boolean(),
      stock: faker.number.int(20),
      code: faker.number.int(10000, 99999),
      category: faker.commerce.department(),
    };

    products.push(product);
  }

  return products;
};

export { generateProducts };
