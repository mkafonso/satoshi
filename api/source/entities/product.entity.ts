import crypto from 'node:crypto'

export type ProductProps = {
  id: string
  userId: string
  title: string
  description: string
  hardwareSpec: string
  unitPriceBtc: number
  unitPriceFiat: number
  stock: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Product {
  private props: ProductProps

  private constructor(props: ProductProps) {
    this.props = props
  }

  static create(
    props: Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Product {
    const now = new Date()
    return new Product({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: ProductProps): Product {
    return new Product({ ...props })
  }

  private touch(): void {
    const nowMs = Date.now()
    const prevMs = this.props.updatedAt.getTime()
    const nextMs = nowMs <= prevMs ? prevMs + 1 : nowMs
    this.props.updatedAt = new Date(nextMs)
  }

  softDelete(): void {
    this.props.deletedAt = new Date()
    this.touch()
  }

  updateDetails(
    details: Partial<
      Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): void {
    Object.assign(this.props, details)
    this.touch()
  }

  decrementStock(quantity: number = 1): void {
    if (quantity > this.props.stock) throw new Error('Not enough stock')
    this.props.stock -= quantity
    this.touch()
  }

  toJSON(): ProductProps {
    return { ...this.props }
  }

  get stock(): number {
    return this.props.stock
  }

  get unitPriceBtc(): number {
    return this.props.unitPriceBtc
  }

  get unitPriceFiat(): number {
    return this.props.unitPriceFiat
  }

  get userId(): string {
    return this.props.userId
  }

  get id(): string {
    return this.props.id
  }

  get title(): string {
    return this.props.title
  }

  get description(): string {
    return this.props.description
  }
}
