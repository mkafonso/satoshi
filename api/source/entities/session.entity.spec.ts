import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Session } from './session.entity'

describe('Session Entity', () => {
  let session: Session
  const userId = 'user-123'
  const refreshToken = 'initial-refresh-token'

  beforeEach(() => {
    session = Session.create(userId, refreshToken)
  })

  it('should create a new session with correct properties', () => {
    const props = session.toJSON()

    expect(props.id).toBeTypeOf('string')
    expect(props.userId).toBe(userId)
    expect(props.refreshToken).toBe(refreshToken)
    expect(props.createdAt).toBeInstanceOf(Date)
    expect(props.updatedAt).toBeInstanceOf(Date)
    expect(props.deletedAt).toBeNull()
  })

  it('should update the refresh token', () => {
    const newToken = 'new-refresh-token'

    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeUpdate = session.toJSON().updatedAt
    session.updateRefreshToken(newToken)
    const props = session.toJSON()

    expect(props.refreshToken).toBe(newToken)
    expect(props.updatedAt.getTime()).toBeGreaterThan(beforeUpdate.getTime())

    vi.restoreAllMocks()
  })

  it('should invalidate (soft delete) the session', () => {
    const fakeTime = Date.now() + 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(fakeTime)

    const beforeDelete = session.toJSON().updatedAt
    session.invalidate()
    const props = session.toJSON()

    expect(props.deletedAt).toBeInstanceOf(Date)
    expect(props.updatedAt.getTime()).toBeGreaterThan(beforeDelete.getTime())

    vi.restoreAllMocks()
  })

  it('should restore a session from props', () => {
    const props = session.toJSON()
    const restoredSession = Session.restore(props)
    const restoredProps = restoredSession.toJSON()

    expect(restoredProps).toEqual(props)
    expect(restoredProps).not.toBe(props)
  })

  it('should increment updatedAt if current time is before previous updatedAt (touch edge case)', () => {
    const oldUpdatedAt = session.toJSON().updatedAt
    const now = oldUpdatedAt.getTime() - 1000
    vi.spyOn(global.Date, 'now').mockReturnValue(now)

    session.updateRefreshToken('edge-case-token')
    const props = session.toJSON()

    expect(props.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime())

    vi.restoreAllMocks()
  })
})
