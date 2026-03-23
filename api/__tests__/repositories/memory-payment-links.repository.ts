import { PaymentLink } from '@/entities/payment-link.entity'
import { PaymentLinksRepositoryInterface } from '@/repositories/payment-links.repository'

export class MemoryPaymentLinksRepository
  implements PaymentLinksRepositoryInterface
{
  private links: PaymentLink[] = []

  async create(link: PaymentLink): Promise<void> {
    this.links.push(link)
  }

  async findById(id: string): Promise<PaymentLink | null> {
    const link =
      this.links.find((l) => l.toJSON().id === id) ??
      this.links.find((l) => l.toJSON().productId === id)
    return link ?? null
  }

  async delete(link: PaymentLink): Promise<void> {
    this.links = this.links.filter((l) => l.toJSON().id !== link.id)
  }
}
