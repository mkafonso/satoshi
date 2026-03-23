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
  const product = overrides?.productId ? null : makeProduct()
  const defaultProps = {
    productId: overrides?.productId ?? product!.id,
    title: overrides?.title ?? 'Gaming Laptop Payment',
    description:
      overrides?.description ?? 'Pay for your high-end gaming laptop',
    priceBtc: overrides?.priceBtc ?? product!.unitPriceBtc,
    priceFiat: overrides?.priceFiat ?? product!.unitPriceFiat,
    stock: overrides?.stock ?? product!.stock,
    expiresAt:
      overrides?.expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    btcAddress:
      overrides?.btcAddress ?? `btc_${Math.random().toString(16).slice(2)}`,
  }

  return PaymentLink.create(defaultProps)
}
