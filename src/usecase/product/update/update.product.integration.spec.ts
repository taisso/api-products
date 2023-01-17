import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { createProductWithIdMock } from "../../../utils/product/create.mock";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const makeSut = () => {
  const productRepository = new ProductRepository();
  const input = createProductWithIdMock();
  const productUpdateUseCase = new UpdateProductUseCase(productRepository);

  return { productRepository, input, productUpdateUseCase };
};

describe("Test integration update product use case", () => {
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

  it("should update a product", async () => {
    const { productUpdateUseCase, input, productRepository } = makeSut();
    const product = new Product(input.id, input.name, input.price);

    await productRepository.update(product);

    const result = await productUpdateUseCase.execute(input);

    expect(result).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });
});
