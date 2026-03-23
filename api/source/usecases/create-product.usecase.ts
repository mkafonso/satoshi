import { Product } from '@/entities/product.entity'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'

export type CreateProductInput = {
  userId: string
  title: string
  description: string
  unitPriceBtc: number
  unitPriceFiat: number
  stock: number
}

export type CreateProductOutput = {
  id: string
}

export class CreateProductUsecase {
  constructor(private productsRepository: ProductsRepositoryInterface) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const data = this.sanitize(input)

    const product = Product.create({
      userId: data.userId,
      title: data.title,
      description: data.description,
      unitPriceBtc: data.unitPriceBtc,
      unitPriceFiat: data.unitPriceFiat,
      stock: data.stock,
    })

    await this.productsRepository.create(product)

    return { id: product.id }
  }

  private sanitize(input: CreateProductInput): CreateProductInput {
    return {
      ...input,
      title: input.title.trim(),
      description: input.description.trim(),
    }
  }
}
