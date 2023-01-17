import { createProductWithIdMock } from "../../../utils/product/create.mock";
import ListProductUseCase from "./list.product.usecase";
const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

const makeSut = () => {
  const inputs = Array.from({ length: 2 }).map(() => createProductWithIdMock());
  const productRepository = MockRepository();
  productRepository.findAll.mockResolvedValue(inputs)

  const productListUseCase = new ListProductUseCase(productRepository);

  return { productRepository, inputs, productListUseCase };
};

describe("Unit test list product use case", () => {
  it("should list a product", async () => {
    const { inputs, productListUseCase } = makeSut();

    const output = await productListUseCase.execute();

    expect(output.products.length).toBe(inputs.length)
    output.products.forEach((product, index) => {
        const input = inputs[index]
        expect(product.id).toEqual(input.id)
        expect(product.name).toEqual(input.name)
        expect(product.price).toEqual(input.price)
    })

  });
});
