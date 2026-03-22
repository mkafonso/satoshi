import { beforeEach, describe, expect, it, vi } from 'vitest'
import { User } from './user.entity'

describe('User Entity', () => {
  let user: User
  const name = 'Dolores Madrigal'
  const email = 'Dolores.Madrigal@email.com'
  const passwordHash = 'hashedPassword123'

  beforeEach(() => {
    user = User.create(name, email, passwordHash)
  })

  it('should create a new user with correct properties', () => {
    const props = user.toJSON()

    expect(props.id).toBeTypeOf('string')
    expect(props.name).toBe(name)
    expect(props.email).toBe(email.toLowerCase())
    expect(props.passwordHash).toBe(passwordHash)
    expect(props.createdAt).toBeInstanceOf(Date)
    expect(props.updatedAt).toBeInstanceOf(Date)
    expect(props.deletedAt).toBeNull()
  })

  it('should update the user profile', () => {
    const newName = 'Bruno Madrigal'
    const newEmail = 'Bruno.Madrigal@email.com'

    // ensure updatedAt will be different
    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeUpdate = user.toJSON().updatedAt
    user.updateProfile(newName, newEmail)
    const props = user.toJSON()

    expect(props.name).toBe(newName)
    expect(props.email).toBe(newEmail.toLowerCase())
    expect(props.updatedAt.getTime()).toBeGreaterThan(beforeUpdate.getTime())

    vi.restoreAllMocks()
  })

  it('should update only the name if email is not provided', () => {
    const oldEmail = user.toJSON().email
    const newName = 'Antonio Madrigal'

    user.updateProfile(newName)
    const props = user.toJSON()

    expect(props.name).toBe(newName)
    expect(props.email).toBe(oldEmail)
  })

  it('should update only the email if name is not provided', () => {
    const oldName = user.toJSON().name
    const newEmail = 'antonio.m@email.com'

    user.updateProfile(undefined, newEmail)
    const props = user.toJSON()

    expect(props.name).toBe(oldName)
    expect(props.email).toBe(newEmail.toLowerCase())
  })

  it('should soft delete the user', () => {
    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeDelete = user.toJSON().updatedAt
    user.softDelete()
    const props = user.toJSON()

    expect(props.deletedAt).toBeInstanceOf(Date)
    expect(props.updatedAt.getTime()).toBeGreaterThan(beforeDelete.getTime())

    vi.restoreAllMocks()
  })

  it('should restore a user from props', () => {
    const props = user.toJSON()
    const restoredUser = User.restore(props)
    const restoredProps = restoredUser.toJSON()

    expect(restoredProps).toEqual(props)
    expect(restoredProps).not.toBe(props)
  })

  it('should increment updatedAt if current time is before previous updatedAt (touch edge case)', () => {
    const oldUpdatedAt = user.toJSON().updatedAt
    const now = oldUpdatedAt.getTime() - 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(now)

    user.updateProfile('Test')
    const props = user.toJSON()

    expect(props.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime())

    vi.restoreAllMocks()
  })
})
