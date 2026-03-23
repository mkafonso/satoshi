import { BtcAddressProviderInterface } from '@/providers/btc-address.provider'
import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { MemoryBtcAddressProvider } from '../../../__tests__/providers/memory-btc-address.provider'
import { MemoryPaymentLinksRepository } from '../../../__tests__/repositories/memory-payment-links.repository'
import { MemoryProductsRepository } from '../../../__tests__/repositories/memory-products.repository'
import { CreatePaymentLinkUsecase } from '../create-payment-link.usecase'

interface CreatePaymentLinkFactoryProps {
  paymentLinksRepository?: PaymentLinksRepositoryInterface
  productsRepository?: ProductsRepositoryInterface
  btcAddressProvider?: BtcAddressProviderInterface
}

export function makeCreatePaymentLinkUsecase(
  props: CreatePaymentLinkFactoryProps = {},
): CreatePaymentLinkUsecase {
  const paymentLinksRepository =
    props.paymentLinksRepository ?? new MemoryPaymentLinksRepository()
  const productsRepository =
    props.productsRepository ?? new MemoryProductsRepository()
  const btcAddressProvider =
    props.btcAddressProvider ?? new MemoryBtcAddressProvider()

  return new CreatePaymentLinkUsecase(
    paymentLinksRepository,
    productsRepository,
    btcAddressProvider,
  )
}
