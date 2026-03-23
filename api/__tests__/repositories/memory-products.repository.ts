import { Product } from '@/entities/product.entity'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'

export class MemoryProductsRepository implements ProductsRepositoryInterface {
  private products: Product[] = []

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.toJSON().id === id)
    return product ?? null
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.toJSON().id === product.id)
    if (index === -1) throw new Error('Product not found')
    this.products[index] = product
  }

  async delete(product: Product): Promise<void> {
    this.products = this.products.filter((p) => p.toJSON().id !== product.id)
  }
}
