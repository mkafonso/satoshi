import { beforeEach, describe, expect, it } from 'vitest'
import { makeProduct } from '../../__tests__/factories/product.factory'
import { MemoryBtcAddressProvider } from '../../__tests__/providers/memory-btc-address.provider'
import { MemoryPaymentLinksRepository } from '../../__tests__/repositories/memory-payment-links.repository'
import { MemoryProductsRepository } from '../../__tests__/repositories/memory-products.repository'
import { CreatePaymentLinkUsecase } from './create-payment-link.usecase'
import { OutOfStockError } from './errors/out-of-stock.error'
import { ProductNotFoundError } from './errors/product-not-found.error'
import { makeCreatePaymentLinkUsecase } from './factories/create-payment-link.factory'

describe('CreatePaymentLinkUsecase', () => {
  let productsRepository: MemoryProductsRepository
  let paymentLinksRepository: MemoryPaymentLinksRepository
  let btcAddressProvider: MemoryBtcAddressProvider
  let usecase: CreatePaymentLinkUsecase

  beforeEach(() => {
    usecase = makeCreatePaymentLinkUsecase()

    productsRepository = (usecase as any).productsRepository
    paymentLinksRepository = (usecase as any).paymentLinksRepository
    btcAddressProvider = (usecase as any).btcAddressProvider
  })

  it('should create a new payment link for a valid product', async () => {
    const product = makeProduct({ stock: 5 })
    await productsRepository.create(product)

    const input = { productId: product.id, quantity: 2 }
    await usecase.execute(input)

    const links = await paymentLinksRepository.findById(
      (await paymentLinksRepository.findById(product.id))?.id ?? '',
    )
    expect(links).toBeTruthy()
    expect(links!.stock).toBe(2)
    expect(links!.productId).toBe(product.id)
    expect(links!.priceBtc).toBe(product.unitPriceBtc * 2)
    expect(links!.priceFiat).toBe(product.unitPriceFiat * 2)
    expect(links!.btcAddress).toBeTruthy()
    expect(links!.expiresAt.getTime()).toBeGreaterThan(Date.now())
  })

  it('should throw ProductNotFoundError for non-existing product', async () => {
    const input = { productId: 'non-existent-id', quantity: 1 }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      ProductNotFoundError,
    )
  })

  it('should throw OutOfStockError when quantity exceeds stock', async () => {
    const product = makeProduct({ stock: 1 })
    await productsRepository.create(product)

    const input = { productId: product.id, quantity: 5 }
    await expect(() => usecase.execute(input)).rejects.toThrow(OutOfStockError)
  })

  it('should trim the productId input', async () => {
    const product = makeProduct({ stock: 3 })
    await productsRepository.create(product)

    const input = { productId: ` ${product.id} `, quantity: 1 }
    await usecase.execute(input)

    const link = await paymentLinksRepository.findById(
      (await paymentLinksRepository.findById(product.id))?.id ?? '',
    )
    expect(link).toBeTruthy()
    expect(link!.productId).toBe(product.id)
  })
})
