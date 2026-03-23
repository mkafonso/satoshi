import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'
import { ProductsRepositoryInterface } from '@/repositories/products.repository'
import { PaymentLinkNotFoundError } from './errors/payment-link-not-found.error'
import { ProductNotFoundError } from './errors/product-not-found.error'

export interface PaymentLinkDetailsInput {
  paymentLinkId: string
}

export interface PaymentLinkDetailsOutput {
  productId: string
  title: string
  description: string
  unitPriceBtc: number
  unitPriceFiat: number
  stock: number
  btcAddress: string
  expiresAt: Date
  totalPriceBtc: number
  totalPriceFiat: number
}

export class GetPaymentLinkDetailsUsecase {
  constructor(
    private paymentLinksRepository: PaymentLinksRepositoryInterface,
    private productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(
    input: PaymentLinkDetailsInput,
  ): Promise<PaymentLinkDetailsOutput> {
    const data = this.sanitize(input)

    const paymentLink = await this.paymentLinksRepository.findById(
      data.paymentLinkId,
    )

    if (!paymentLink) throw new PaymentLinkNotFoundError()

    const product = await this.productsRepository.findById(
      paymentLink.productId,
    )

    if (!product) throw new ProductNotFoundError()

    return {
      productId: product.id,
      title: product.title,
      description: product.description,
      unitPriceBtc: product.unitPriceBtc,
      unitPriceFiat: product.unitPriceFiat,
      stock: paymentLink.stock,
      btcAddress: paymentLink.btcAddress,
      expiresAt: paymentLink.expiresAt,
      totalPriceBtc: paymentLink.priceBtc,
      totalPriceFiat: paymentLink.priceFiat,
    }
  }

  private sanitize(input: PaymentLinkDetailsInput): PaymentLinkDetailsInput {
    return {
      ...input,
    }
  }
}
