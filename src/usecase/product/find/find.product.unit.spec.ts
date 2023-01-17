import { createProductWithIdMock } from "../../../utils/product/create.mock";
import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const makeSut = () => {
  const input = createProductWithIdMock();
  const productRepository = MockRepository();
  productRepository.find.mockResolvedValue(input)

  const productFindUseCase = new FindProductUseCase(productRepository);

  return { productRepository, input, productFindUseCase };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const { input, productFindUseCase } = makeSut();

    const output = await productFindUseCase.execute({ id: input.id });

    expect(output).toEqual(input);
  });

  it("should not find a product", async () => {
    const { input, productFindUseCase, productRepository } = makeSut();
    productRepository.find.mockResolvedValue(null);

    const output = productFindUseCase.execute(input);

    await expect(output).rejects.toThrow("Product not found");
  });
});
