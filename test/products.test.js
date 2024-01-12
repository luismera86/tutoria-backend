import * as productDao from "../src/dao/mongo/product.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";

mongoose.connect("mongodb://localhost:27017/tutoria-test");

describe("Test Products", () => {
  beforeEach(function () {
    this.timeout(5000);
  });

  it("Create new product", async function () {
    const product = {
      name: "test",
      price: 100,
      stock: 10,
    };
    const result = await productDao.addProduct(product);
    expect(result).to.be.an("object");
  });

  it("Get all products", async function () {
    const result = await productDao.getAllProducts();
    
    expect(result).to.have.property("docs").to.be.an("array");
  });

  it("Get product by id", async function () {
    const product = {
      name: "test",
      price: 100,
      stock: 10,
    };
    const newProduct = await productDao.addProduct(product);
    const result = await productDao.getProductById(newProduct._id);
    expect(result).to.be.an("object");
  });
});
