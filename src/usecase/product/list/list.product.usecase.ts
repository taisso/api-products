import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper";
import { OutListProductDto } from "./list.product.dto";


export default class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(): Promise<OutListProductDto> {
    const products = await this.productRepository.findAll();

    return { products: products.map(ProductMapper.toOutMapper) };
  }
}
