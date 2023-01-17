import Product from "../../domain/product/entity/product";

export class ProductMapper {
    static toOutMapper(product: Product) {
        return { id: product.id, name: product.name, price: product.price }
    }
}