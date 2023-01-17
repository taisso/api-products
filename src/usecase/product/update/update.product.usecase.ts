import Product from "../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { ProductMapper } from "../../../infrastructure/mappers/product.mapper"
import { InputUpdateProductDto, OutUpdateProductDto } from "./update.product.dto"

export default class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutUpdateProductDto> {
    const product = new Product(input.id, input.name, input.price)

    await this.productRepository.update(product)

    return ProductMapper.toOutMapper(product)
  }
}
