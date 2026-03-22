import { User } from '@/entities/user.entity'

export function makeUser(overrides?: Partial<ReturnType<typeof User.create>>) {
  const name = 'Dolores Madrigal'
  const email = 'Dolores.Madrigal@email.com'
  const passwordHash = 'hashedPassword123'

  return User.create(
    overrides?.name ?? name,
    overrides?.email ?? email,
    overrides?.passwordHash ?? passwordHash,
  )
}
