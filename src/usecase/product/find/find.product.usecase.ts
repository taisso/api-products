import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutFindProductDto } from "./find.product.dto";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutFindProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return ProductMapper.toOutMapper(product);
  }
}
