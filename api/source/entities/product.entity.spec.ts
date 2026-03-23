import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Product } from './product.entity'

describe('Product Entity', () => {
  let product: Product

  const props = {
    userId: 'user-123',
    title: 'Satoshi One Edition',
    description:
      'The Satoshi One features EAL6+ secure element chips and a custom-built OS for air-gapped signing. Designed for the sovereign individual who demands zero compromise on security.',
    unitPriceBtc: 0.00342,
    unitPriceFiat: 159,
    stock: 5,
  }

  beforeEach(() => {
    product = Product.create(props)
  })

  it('should create a new Product with correct properties', () => {
    const json = product.toJSON()

    expect(json.id).toBeTypeOf('string')
    expect(json.userId).toBe(props.userId)
    expect(json.title).toBe(props.title)
    expect(json.description).toBe(props.description)
    expect(json.unitPriceBtc).toBe(props.unitPriceBtc)
    expect(json.unitPriceFiat).toBe(props.unitPriceFiat)
    expect(json.stock).toBe(props.stock)
    expect(json.createdAt).toBeInstanceOf(Date)
    expect(json.updatedAt).toBeInstanceOf(Date)
    expect(json.deletedAt).toBeNull()
  })

  it('should update product details', () => {
    const newTitle = 'Satoshi One Edition Updated'
    const newStock = 3

    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeUpdate = product.toJSON().updatedAt
    product.updateDetails({ title: newTitle, stock: newStock })
    const json = product.toJSON()

    expect(json.title).toBe(newTitle)
    expect(json.stock).toBe(newStock)
    expect(json.updatedAt.getTime()).toBeGreaterThan(beforeUpdate.getTime())

    vi.restoreAllMocks()
  })

  it('should soft delete the product', () => {
    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeDelete = product.toJSON().updatedAt
    product.softDelete()
    const json = product.toJSON()

    expect(json.deletedAt).toBeInstanceOf(Date)
    expect(json.updatedAt.getTime()).toBeGreaterThan(beforeDelete.getTime())

    vi.restoreAllMocks()
  })

  it('should decrement stock', () => {
    const initialStock = product.stock
    product.decrementStock(1)
    expect(product.stock).toBe(initialStock - 1)
  })

  it('should throw error when decrementing more stock than available', () => {
    expect(() => product.decrementStock(product.stock + 1)).toThrow(
      'Not enough stock',
    )
  })

  it('should restore a product from props', () => {
    const props = product.toJSON()
    const restored = Product.restore(props)
    const restoredProps = restored.toJSON()

    expect(restoredProps).toEqual(props)
    expect(restoredProps).not.toBe(props)
  })

  it('should increment updatedAt if current time is before previous updatedAt', () => {
    const oldUpdatedAt = product.toJSON().updatedAt
    const now = oldUpdatedAt.getTime() - 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(now)

    product.updateDetails({ title: 'Another Update' })
    const json = product.toJSON()

    expect(json.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime())

    vi.restoreAllMocks()
  })

  it('should return correct userId via getter', () => {
    expect(product.userId).toBe(props.userId)
  })

  it('should return correct description via getter', () => {
    expect(product.description).toBe(props.description)
  })

  it('should return correct title via getter', () => {
    expect(product.title).toBe(props.title)
  })

  it('should return correct unitPriceBtc via getter', () => {
    expect(product.unitPriceBtc).toBe(props.unitPriceBtc)
  })

  it('should return correct unitPriceFiat via getter', () => {
    expect(product.unitPriceFiat).toBe(props.unitPriceFiat)
  })

  it('should return correct id via getter', () => {
    expect(product.id).toBe(product.toJSON().id)
  })
})
