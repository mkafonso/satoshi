import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { MemoryProductsRepository } from '../../../__tests__/repositories/memory-products.repository'
import { CreateProductUsecase } from '../create-product.usecase'

interface CreateProductFactoryProps {
  productsRepository?: ProductsRepositoryInterface
}

export function makeCreateProductUsecase(
  props: CreateProductFactoryProps = {},
): CreateProductUsecase {
  const productsRepository =
    props.productsRepository ?? new MemoryProductsRepository()

  return new CreateProductUsecase(productsRepository)
}
