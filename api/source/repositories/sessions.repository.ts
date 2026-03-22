import { Session } from '../entities/session.entity'

export interface SessionsRepositoryInterface {
  create(session: Session): Promise<void>
  findById(id: string): Promise<Session | null>
  findByUserId(userId: string): Promise<Session[]>
  delete(id: string): Promise<void>
}
