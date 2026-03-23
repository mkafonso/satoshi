export class PaymentLinkNotFoundError extends Error {
  constructor() {
    super('Payment link not found.')
  }
}
