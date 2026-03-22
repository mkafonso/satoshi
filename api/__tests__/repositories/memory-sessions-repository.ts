import { Session } from '@/entities/session.entity'
import { SessionsRepositoryInterface } from '@/repositories/sessions.repository'

export class InMemorySessionsRepository implements SessionsRepositoryInterface {
  private items: Session[] = []

  async create(session: Session): Promise<void> {
    this.items.push(session)
  }

  async findById(id: string): Promise<Session | null> {
    const session = this.items.find((s) => s.toJSON().id === id)
    return session ? session : null
  }

  async findByUserId(userId: string): Promise<Session[]> {
    return this.items.filter(
      (s) => s.toJSON().userId === userId && !s.toJSON().deletedAt,
    )
  }

  async delete(id: string): Promise<void> {
    const session = this.items.find((s) => s.toJSON().id === id)
    if (session) {
      session.invalidate()
    }
  }
}
