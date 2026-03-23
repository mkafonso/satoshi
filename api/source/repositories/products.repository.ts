import { Product } from '@/entities/product.entity'

export interface ProductsRepositoryInterface {
  findById(id: string): Promise<Product | null>
  update(product: Product): Promise<void>
  create(product: Product): Promise<void>
  delete(product: Product): Promise<void>
}
