import crypto from 'node:crypto'

export type PaymentLinkProps = {
  id: string
  productId: string
  title: string
  description: string
  priceBtc: number
  priceFiat: number
  stock: number
  expiresAt: Date
  btcAddress: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class PaymentLink {
  private props: PaymentLinkProps

  private constructor(props: PaymentLinkProps) {
    this.props = props
  }

  static create(
    props: Omit<
      PaymentLinkProps,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): PaymentLink {
    const now = new Date()
    return new PaymentLink({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: PaymentLinkProps): PaymentLink {
    return new PaymentLink({ ...props })
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
      Omit<
        PaymentLinkProps,
        'id' | 'btcAddress' | 'createdAt' | 'updatedAt' | 'deletedAt'
      >
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

  toJSON(): PaymentLinkProps {
    return { ...this.props }
  }

  get stock(): number {
    return this.props.stock
  }

  get priceBtc(): number {
    return this.props.priceBtc
  }

  get priceFiat(): number {
    return this.props.priceFiat
  }

  get id(): string {
    return this.props.id
  }

  get productId(): string {
    return this.props.productId
  }

  get btcAddress(): string {
    return this.props.btcAddress
  }

  get expiresAt(): Date {
    return this.props.expiresAt
  }
}
