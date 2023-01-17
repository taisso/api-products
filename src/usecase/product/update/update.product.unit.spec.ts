import { createProductWithIdMock } from "../../../utils/product/create.mock";
import UpdateProductUseCase from "./update.product.usecase";

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
    const input = createProductWithIdMock();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    return { productRepository, input, productUpdateUseCase }
}

describe("Unit test create product use case", () => {
  it("should update a product", async () => {
    const { input, productUpdateUseCase } = makeSut()

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

});
