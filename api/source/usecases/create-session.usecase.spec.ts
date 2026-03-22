import { beforeEach, describe, expect, it } from 'vitest'
import { makeSession } from '../../__tests__/factories/session.factory'
import { makeUser } from '../../__tests__/factories/user.factory'
import { MemoryPasswordHasher } from '../../__tests__/providers/memory-password-hasher.provider'
import { MemoryTokenProvider } from '../../__tests__/providers/memory-token.provider'
import { MemorySessionsRepository } from '../../__tests__/repositories/memory-sessions.repository'
import { MemoryUsersRepository } from '../../__tests__/repositories/memory-users.repository'
import {
  CreateSessionInput,
  CreateSessionUsecase,
} from './create-session.usecase'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'
import { makeCreateSessionUsecase } from './factories/create-session.factory'

describe('CreateSessionUsecase', () => {
  let usersRepository: MemoryUsersRepository
  let sessionsRepository: MemorySessionsRepository
  let passwordHasher: MemoryPasswordHasher
  let tokenProvider: MemoryTokenProvider
  let usecase: CreateSessionUsecase

  beforeEach(() => {
    usecase = makeCreateSessionUsecase()

    usersRepository = (usecase as any).usersRepository
    sessionsRepository = (usecase as any).sessionsRepository
    passwordHasher = (usecase as any).passwordHasherProvider
    tokenProvider = (usecase as any).tokenProvider
  })

  it('should create a new session for a valid user', async () => {
    const password = '123456'
    const hashed = await passwordHasher.hash(password)
    const user = makeUser({ passwordHash: hashed })
    await usersRepository.create(user)

    const input: CreateSessionInput = { email: user.toJSON().email, password }
    const result = await usecase.execute(input)

    expect(result.userId).toBe(user.toJSON().id)
    expect(result.refreshToken).toBeTruthy()
    expect(result.sessionId).toBeTruthy()

    const session = await sessionsRepository.findByUserId(user.toJSON().id)
    expect(session.length).toBe(1)
    expect(session[0].toJSON().id).toBe(result.sessionId)
  })

  it('should throw InvalidCredentialsError for wrong email', async () => {
    const input: CreateSessionInput = {
      email: 'wrong@email.com',
      password: '123456',
    }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      InvalidCredentialsError,
    )
  })

  it('should throw InvalidCredentialsError for wrong password', async () => {
    const password = '123456'
    const hashed = await passwordHasher.hash(password)
    const user = makeUser({ passwordHash: hashed })
    await usersRepository.create(user)

    const input: CreateSessionInput = {
      email: user.toJSON().email,
      password: 'wrong-password',
    }
    await expect(() => usecase.execute(input)).rejects.toThrow(
      InvalidCredentialsError,
    )
  })

  it('should revoke old sessions when creating a new one', async () => {
    const password = '123456'
    const hashed = await passwordHasher.hash(password)
    const user = makeUser({ passwordHash: hashed })
    await usersRepository.create(user)

    const oldSession = makeSession(user.toJSON().id)
    await sessionsRepository.create(oldSession)

    const input: CreateSessionInput = { email: user.toJSON().email, password }
    const result = await usecase.execute(input)

    const allSessions = await sessionsRepository.findByUserId(user.toJSON().id)
    expect(allSessions.length).toBe(1)
    expect(allSessions[0].toJSON().id).toBe(result.sessionId)
    expect(allSessions[0].toJSON().id).not.toBe(oldSession.toJSON().id)
  })
})
