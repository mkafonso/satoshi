import { PaymentLink } from '@/entities/payment-link.entity'
import { env } from '@/helpers/env'
import { BtcAddressProviderInterface } from '@/providers/btc-address.provider'
import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { OutOfStockError } from './errors/out-of-stock.error'
import { ProductNotFoundError } from './errors/product-not-found.error'

type CreatePaymentLinkInput = {
  productId: string
  quantity: number
}

interface CreatePaymentLinkOutput {}

export class CreatePaymentLinkUsecase {
  constructor(
    private paymentLinksRepository: PaymentLinksRepositoryInterface,
    private productsRepository: ProductsRepositoryInterface,
    private btcAddressProvider: BtcAddressProviderInterface,
  ) {}

  async execute(
    input: CreatePaymentLinkInput,
  ): Promise<CreatePaymentLinkOutput> {
    const data = this.sanitize(input)

    const product = await this.productsRepository.findById(data.productId)
    if (!product) throw new ProductNotFoundError()

    if (product.stock < data.quantity) throw new OutOfStockError()

    const btcAddress = await this.btcAddressProvider.getAddress()

    const expiresAt = new Date(
      Date.now() + env.PAYMENT_LINK_EXPIRES_IN_MINUTES * 60 * 1000,
    )

    const paymentLink = PaymentLink.create({
      productId: product.id,
      title: product.title,
      description: product.description,
      priceBtc: product.unitPriceBtc * data.quantity,
      priceFiat: product.unitPriceFiat * data.quantity,
      stock: data.quantity,
      expiresAt,
      btcAddress,
    })

    await this.paymentLinksRepository.create(paymentLink)

    return {}
  }

  private sanitize(input: CreatePaymentLinkInput): CreatePaymentLinkInput {
    return {
      productId: input.productId.trim(),
      quantity: input.quantity,
    }
  }
}
