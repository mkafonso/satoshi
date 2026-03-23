import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { MemoryPaymentLinksRepository } from '../../../__tests__/repositories/memory-payment-links.repository'
import { MemoryProductsRepository } from '../../../__tests__/repositories/memory-products.repository'
import { GetPaymentLinkDetailsUsecase } from '../get-payment-link-details.usecase'

interface GetPaymentLinkDetailsFactoryProps {
  paymentLinksRepository?: PaymentLinksRepositoryInterface
  productsRepository?: ProductsRepositoryInterface
}

export function makeGetPaymentLinkDetailsUsecase(
  props: GetPaymentLinkDetailsFactoryProps = {},
): GetPaymentLinkDetailsUsecase {
  const paymentLinksRepository =
    props.paymentLinksRepository ?? new MemoryPaymentLinksRepository()
  const productsRepository =
    props.productsRepository ?? new MemoryProductsRepository()

  return new GetPaymentLinkDetailsUsecase(
    paymentLinksRepository,
    productsRepository,
  )
}
