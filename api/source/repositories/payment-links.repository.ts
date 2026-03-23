import { PaymentLink } from '@/entities/payment-link.entity'

export interface PaymentLinksRepositoryInterface {
  findById(id: string): Promise<PaymentLink | null>
  create(link: PaymentLink): Promise<void>
  delete(link: PaymentLink): Promise<void>
}
