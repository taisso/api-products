import { v4 as uuid } from 'uuid'
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutCreateProductDto,
} from "./create.product.dto";
import Product from '../../../domain/product/entity/product';
import { ProductMapper } from '../../../infrastructure/mappers/product.mapper';

export default class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutCreateProductDto> {
    const id = uuid()
    const product = new Product(id, input.name, input.price)

    await this.productRepository.create(product)

    return ProductMapper.toOutMapper(product)
  }
}
