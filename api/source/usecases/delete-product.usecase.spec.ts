import { Product } from '@/entities/product.entity'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryPaymentLinksRepository } from '../../__tests__/repositories/memory-payment-links.repository'
import { MemoryProductsRepository } from '../../__tests__/repositories/memory-products.repository'
import { ProductNotFoundError } from './errors/product-not-found.error'
import { makeDeleteProductUsecase } from './factories/delete-product.factory'

describe('DeleteProductUsecase', () => {
  let productsRepository: MemoryProductsRepository
  let paymentLinksRepository: MemoryPaymentLinksRepository
  let deleteProductUsecase: ReturnType<typeof makeDeleteProductUsecase>

  beforeEach(() => {
    productsRepository = new MemoryProductsRepository()
    paymentLinksRepository = new MemoryPaymentLinksRepository()
    deleteProductUsecase = makeDeleteProductUsecase({
      productsRepository,
      paymentLinksRepository,
    })
  })

  it('should soft delete a product', async () => {
    const product = Product.create({
      userId: 'user-1',
      title: 'Product A',
      description: 'Description',
      unitPriceBtc: 0.01,
      unitPriceFiat: 100,
      stock: 5,
    })

    await productsRepository.create(product)

    await deleteProductUsecase.execute({
      productId: product.id,
      userId: 'user-1',
    })

    const deletedProduct = await productsRepository.findById(product.id)
    expect(deletedProduct!.deletedAt).toBeInstanceOf(Date)
  })

  it('should throw ProductNotFoundError for non-existing product', async () => {
    await expect(() =>
      deleteProductUsecase.execute({
        productId: 'non-existent',
        userId: 'user-1',
      }),
    ).rejects.toThrow(ProductNotFoundError)
  })
})
