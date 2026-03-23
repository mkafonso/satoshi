import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { MemoryProductsRepository } from '../../../__tests__/repositories/memory-products.repository'
import { DeleteProductUsecase } from '../delete-product.usecase'

interface DeleteProductFactoryProps {
  productsRepository?: ProductsRepositoryInterface
  paymentLinksRepository?: PaymentLinksRepositoryInterface
}

export function makeDeleteProductUsecase(
  props: DeleteProductFactoryProps = {},
): DeleteProductUsecase {
  const productsRepository =
    props.productsRepository ?? new MemoryProductsRepository()

  return new DeleteProductUsecase(productsRepository)
}
