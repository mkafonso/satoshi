import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { ProductNotFoundError } from './errors/product-not-found.error'

export type DeleteProductInput = {
  productId: string
  userId: string
}

export type DeleteProductOutput = {}

export class DeleteProductUsecase {
  constructor(private productsRepository: ProductsRepositoryInterface) {}

  async execute(input: DeleteProductInput): Promise<DeleteProductOutput> {
    const product = await this.productsRepository.findById(input.productId)
    if (!product) throw new ProductNotFoundError()

    if (product.userId !== input.userId) throw new ProductNotFoundError()

    product.softDelete()
    await this.productsRepository.update(product)

    return {}
  }
}
