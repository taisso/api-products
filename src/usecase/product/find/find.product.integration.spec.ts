import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { createProductWithIdMock } from "../../../utils/product/create.mock";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";


const makeSut = () => {
  const productRepository = new ProductRepository();
  const input = createProductWithIdMock();
  const productFindUseCase = new FindProductUseCase(productRepository);

  return { productRepository, input, productFindUseCase };
};

describe("Test integration find product use case", () => {
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

  it("should find a product", async () => {
    const { productFindUseCase, input, productRepository } = makeSut();
    const product = new Product(input.id, input.name, input.price)

    await productRepository.create(product)

    const output = await productFindUseCase.execute(input);

    expect(output).toEqual({
        id: input.id,
        name: input.name,
        price: input.price
    });
  });

});
