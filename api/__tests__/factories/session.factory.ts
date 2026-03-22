import { Session } from '@/entities/session.entity'

export function makeSession(userId: string, refreshToken?: string) {
  return Session.create(userId, refreshToken ?? 'default-refresh-token')
}
