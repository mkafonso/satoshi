import {
  PaymentLink,
  type PaymentLinkProps,
} from '@/entities/payment-link.entity'
import { makeProduct } from './product.factory'

export function makePaymentLink(
  overrides?: Partial<
    Omit<PaymentLinkProps, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
  >,
) {
  if (overrides?.productId) {
    return PaymentLink.create({
      productId: overrides.productId,
      title: overrides.title ?? 'Gaming Laptop Payment',
      description:
        overrides.description ?? 'Pay for your high-end gaming laptop',
      priceBtc: overrides.priceBtc ?? 0.01,
      priceFiat: overrides.priceFiat ?? 200,
      stock: overrides.stock ?? 1,
      expiresAt:
        overrides.expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      btcAddress:
        overrides.btcAddress ?? `btc_${Math.random().toString(16).slice(2)}`,
    })
  }

  const product = makeProduct()

  const defaultProps = {
    productId: product.id,
    title: overrides?.title ?? product.title,
    description: overrides?.description ?? product.description,
    priceBtc: overrides?.priceBtc ?? product.unitPriceBtc,
    priceFiat: overrides?.priceFiat ?? product.unitPriceFiat,
    stock: overrides?.stock ?? product.stock,
    expiresAt:
      overrides?.expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    btcAddress:
      overrides?.btcAddress ?? `btc_${Math.random().toString(16).slice(2)}`,
  }

  return PaymentLink.create(defaultProps)
}
