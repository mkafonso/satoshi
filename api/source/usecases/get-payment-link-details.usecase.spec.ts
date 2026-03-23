import { beforeEach, describe, expect, it } from 'vitest'
import { makePaymentLink } from '../../__tests__/factories/payment-link.factory'
import { makeProduct } from '../../__tests__/factories/product.factory'
import { MemoryPaymentLinksRepository } from '../../__tests__/repositories/memory-payment-links.repository'
import { MemoryProductsRepository } from '../../__tests__/repositories/memory-products.repository'
import { PaymentLinkNotFoundError } from './errors/payment-link-not-found.error'
import { ProductNotFoundError } from './errors/product-not-found.error'
import { makeGetPaymentLinkDetailsUsecase } from './factories/get-payment-link-details.factory'

describe('GetPaymentLinkDetailsUsecase', () => {
  let productsRepository: MemoryProductsRepository
  let paymentLinksRepository: MemoryPaymentLinksRepository
  let usecase: ReturnType<typeof makeGetPaymentLinkDetailsUsecase>

  beforeEach(() => {
    productsRepository = new MemoryProductsRepository()
    paymentLinksRepository = new MemoryPaymentLinksRepository()

    usecase = makeGetPaymentLinkDetailsUsecase({
      paymentLinksRepository,
      productsRepository,
    })
  })

  it('should return payment link details for a valid link', async () => {
    const product = makeProduct({ stock: 5 })
    await productsRepository.create(product)

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1h
    const paymentLink = makePaymentLink({
      productId: product.id,
      title: product.title,
      description: product.description,
      stock: 3,
      priceBtc: product.unitPriceBtc * 2,
      priceFiat: product.unitPriceFiat * 2,
      btcAddress: 'btc-address-123',
      expiresAt,
    })
    await paymentLinksRepository.create(paymentLink)

    const output = await usecase.execute({ paymentLinkId: paymentLink.id })

    expect(output.productId).toBe(product.id)
    expect(output.title).toBe(product.title)
    expect(output.description).toBe(product.description)
    expect(output.unitPriceBtc).toBe(product.unitPriceBtc)
    expect(output.unitPriceFiat).toBe(product.unitPriceFiat)
    expect(output.stock).toBe(paymentLink.stock)
    expect(output.btcAddress).toBe(paymentLink.btcAddress)
    expect(output.expiresAt.getTime()).toBe(paymentLink.expiresAt.getTime())
    expect(output.totalPriceBtc).toBe(paymentLink.priceBtc)
    expect(output.totalPriceFiat).toBe(paymentLink.priceFiat)
  })

  it('should throw PaymentLinkNotFoundError for non-existing link', async () => {
    await expect(() =>
      usecase.execute({ paymentLinkId: 'non-existent-link' }),
    ).rejects.toThrow(PaymentLinkNotFoundError)
  })

  it('should throw ProductNotFoundError if linked product does not exist', async () => {
    const paymentLink = makePaymentLink({
      productId: 'non-existent-product',
      title: 'Some title',
      description: 'Some description',
      stock: 1,
      priceBtc: 0.01,
      priceFiat: 200,
      btcAddress: 'btc-address-456',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    })
    await paymentLinksRepository.create(paymentLink)

    await expect(() =>
      usecase.execute({ paymentLinkId: paymentLink.id }),
    ).rejects.toThrow(ProductNotFoundError)
  })
})
