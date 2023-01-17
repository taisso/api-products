import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { createProductWithIdMock } from "../../../utils/product/create.mock";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const makeSut = () => {
  const productRepository = new ProductRepository();
  const inputs = Array.from({ length: 2 }).map(() => createProductWithIdMock());
  const productListUseCase = new ListProductUseCase(productRepository);

  return { productRepository, inputs, productListUseCase };
};

describe("Test integration list product use case", () => {
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

  it("should list a product", async () => {
    const { productListUseCase, inputs, productRepository } = makeSut();
    const products = inputs.map(
      (input) => new Product(input.id, input.name, input.price)
    );

    await productRepository.create(products[0]);
    await productRepository.create(products[1]);

    const output = await productListUseCase.execute();

    expect(output.products.length).toBe(inputs.length);
    output.products.forEach((product, index) => {
      const input = inputs[index];
      expect(product.id).toEqual(input.id);
      expect(product.name).toEqual(input.name);
      expect(product.price).toEqual(input.price);
    });
  });
});
