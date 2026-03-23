import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryProductsRepository } from '../../__tests__/repositories/memory-products.repository'
import { makeCreateProductUsecase } from './factories/create-product.factory'

describe('CreateProductUsecase', () => {
  let productsRepository: MemoryProductsRepository
  let usecase: ReturnType<typeof makeCreateProductUsecase>

  beforeEach(() => {
    usecase = makeCreateProductUsecase()
    productsRepository = (usecase as any).productsRepository
  })

  it('should create a new product', async () => {
    const input = {
      userId: 'user-1',
      title: 'Product Test',
      description: 'Product description',
      unitPriceBtc: 0.01,
      unitPriceFiat: 100,
      stock: 5,
    }

    const { id } = await usecase.execute(input)

    const product = await productsRepository.findById(id)
    expect(product).toBeTruthy()
    expect(product!.title).toBe(input.title)
    expect(product!.description).toBe(input.description)
    expect(product!.unitPriceBtc).toBe(input.unitPriceBtc)
    expect(product!.unitPriceFiat).toBe(input.unitPriceFiat)
    expect(product!.stock).toBe(input.stock)
  })

  it('should trim title and description', async () => {
    const input = {
      userId: 'user-2',
      title: '  Trim Title  ',
      description: '  Trim Description  ',
      unitPriceBtc: 0.02,
      unitPriceFiat: 200,
      stock: 3,
    }

    const { id } = await usecase.execute(input)
    const product = await productsRepository.findById(id)

    expect(product).toBeTruthy()
    expect(product!.title).toBe('Trim Title')
    expect(product!.description).toBe('Trim Description')
  })
})
