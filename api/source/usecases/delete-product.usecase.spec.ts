import { beforeEach, describe, expect, it } from 'vitest'
import { Product } from '@/entities/product.entity'
import { MemoryProductsRepository } from '../../__tests__/repositories/memory-products.repository'
import { DeleteProductUsecase } from './delete-product.usecase'
import { ProductNotFoundError } from './errors/product-not-found.error'
import { makeDeleteProductUsecase } from './factories/delete-product.factory'

describe('DeleteProductUsecase', () => {
  let productsRepository: MemoryProductsRepository
  let usecase: DeleteProductUsecase

  beforeEach(() => {
    usecase = makeDeleteProductUsecase()

    productsRepository = (usecase as any).productsRepository
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

    await usecase.execute({
      productId: product.id,
      userId: 'user-1',
    })

    const deletedProduct = await productsRepository.findById(product.id)
    expect(deletedProduct!.deletedAt).toBeInstanceOf(Date)
  })

  it('should throw ProductNotFoundError for non-existing product', async () => {
    await expect(() =>
      usecase.execute({
        productId: 'non-existent',
        userId: 'user-1',
      }),
    ).rejects.toThrow(ProductNotFoundError)
  })

  it('should throw ProductNotFoundError when user is not the owner', async () => {
    const product = Product.create({
      userId: 'owner-user',
      title: 'Product X',
      description: 'Desc',
      unitPriceBtc: 0.01,
      unitPriceFiat: 100,
      stock: 5,
    })

    await productsRepository.create(product)

    await expect(() =>
      usecase.execute({
        productId: product.id,
        userId: 'another-user',
      }),
    ).rejects.toThrow(ProductNotFoundError)
  })
})
