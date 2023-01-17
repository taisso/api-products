import { createProductMock } from "../../../utils/product/create.mock";
import { app, sequelize } from "../express";
import request from "supertest";

const createProduct = () => {
  return Array.from({ length: 2 }).map(() => createProductMock());
};

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const product = createProductMock();
    const response = await request(app)
      .post("/products")
      .send(product)
      .expect(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price,
    });
  });

  it("should not create a product", async () => {
    await request(app)
      .post("/products")
      .send({ name: "product 1" })
      .expect(500);
  });

  it("should list all product", async () => {
    const productsMock = createProduct();

    await request(app).post("/products").send(productsMock[0]).expect(200);
    await request(app).post("/products").send(productsMock[1]).expect(200);

    const listResponse = await request(app).get("/products").send().expect(200);

    expect(listResponse.body.products.length).toBe(productsMock.length);
    listResponse.body.products.forEach((product: any, index: number) => {
      const productMock = productsMock[index];
      expect(product.id).toBeDefined();
      expect(product.name).toBe(productMock.name);
      expect(product.price).toBe(productMock.price);
    });
  });
});
