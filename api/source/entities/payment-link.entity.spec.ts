import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PaymentLink } from './payment-link.entity'

describe('PaymentLink Entity', () => {
  let paymentLink: PaymentLink

  const props = {
    productId: 'product-123',
    title: 'Satoshi One Edition',
    description: 'Special Bitcoin hardware wallet',
    priceBtc: 0.00342,
    priceFiat: 159,
    stock: 5,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    btcAddress: 'bc1q8c6fsclzhxlvj6j8u863h64ayz779qxs8ykkax',
  }

  beforeEach(() => {
    paymentLink = PaymentLink.create(props)
  })

  it('should create a new PaymentLink with correct properties', () => {
    const json = paymentLink.toJSON()

    expect(json.id).toBeTypeOf('string')
    expect(json.productId).toBe(props.productId)
    expect(json.title).toBe(props.title)
    expect(json.description).toBe(props.description)
    expect(json.priceBtc).toBe(props.priceBtc)
    expect(json.priceFiat).toBe(props.priceFiat)
    expect(json.stock).toBe(props.stock)
    expect(json.expiresAt).toEqual(props.expiresAt)
    expect(json.btcAddress).toBe(props.btcAddress)
    expect(json.createdAt).toBeInstanceOf(Date)
    expect(json.updatedAt).toBeInstanceOf(Date)
    expect(json.deletedAt).toBeNull()
  })

  it('should update details', () => {
    const newTitle = 'Satoshi One Edition Updated'
    const newStock = 3

    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeUpdate = paymentLink.toJSON().updatedAt
    paymentLink.updateDetails({ title: newTitle, stock: newStock })
    const json = paymentLink.toJSON()

    expect(json.title).toBe(newTitle)
    expect(json.stock).toBe(newStock)
    expect(json.updatedAt.getTime()).toBeGreaterThan(beforeUpdate.getTime())

    vi.restoreAllMocks()
  })

  it('should soft delete the PaymentLink', () => {
    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeDelete = paymentLink.toJSON().updatedAt
    paymentLink.softDelete()
    const json = paymentLink.toJSON()

    expect(json.deletedAt).toBeInstanceOf(Date)
    expect(json.updatedAt.getTime()).toBeGreaterThan(beforeDelete.getTime())

    vi.restoreAllMocks()
  })

  it('should decrement stock', () => {
    const initialStock = paymentLink.stock
    paymentLink.decrementStock(1)
    expect(paymentLink.stock).toBe(initialStock - 1)
  })

  it('should throw error when decrementing more stock than available', () => {
    expect(() => paymentLink.decrementStock(paymentLink.stock + 1)).toThrow(
      'Not enough stock',
    )
  })

  it('should restore a PaymentLink from props', () => {
    const props = paymentLink.toJSON()
    const restored = PaymentLink.restore(props)
    const restoredProps = restored.toJSON()

    expect(restoredProps).toEqual(props)
    expect(restoredProps).not.toBe(props)
  })

  it('should increment updatedAt if current time is before previous updatedAt', () => {
    const oldUpdatedAt = paymentLink.toJSON().updatedAt
    const now = oldUpdatedAt.getTime() - 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(now)

    paymentLink.updateDetails({ title: 'Another Update' })
    const json = paymentLink.toJSON()

    expect(json.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime())

    vi.restoreAllMocks()
  })
})
