import { createProductMock } from "../../../utils/product/create.mock";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const makeSut = () => {
    const productRepository = MockRepository();
    const input = createProductMock();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    return { productRepository, input, productCreateUseCase }
}

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const { input, productCreateUseCase } = makeSut()

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const { input, productCreateUseCase } = makeSut()

    input.name = "";
    const output = productCreateUseCase.execute(input);

    await expect(output).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const { input, productCreateUseCase } = makeSut()

    input.price = -1;
    const output = productCreateUseCase.execute(input);

    await expect(output).rejects.toThrow("Price must be greater than zero");
  });
});
