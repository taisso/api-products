import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { createProductMock } from "../../../utils/product/create.mock";
import CreateProductUseCase from "./create.product.usecase";

const makeSut = () => {
  const productRepository = new ProductRepository();
  const input = createProductMock();
  const productCreateUseCase = new CreateProductUseCase(productRepository);

  return { productRepository, input, productCreateUseCase };
};

describe("Test integration create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const { productCreateUseCase, input } = makeSut();

    const result = await productCreateUseCase.execute(input);

    expect(result).toEqual({
        id: expect.any(String),
        name: input.name,
        price: input.price
    });
  });

});
