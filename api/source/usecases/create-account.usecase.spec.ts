import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryPasswordHasher } from '../../__tests__/providers/memory-password-hasher.provider'
import { MemoryUsersRepository } from '../../__tests__/repositories/memory-users.repository'
import { CreateAccountUsecase } from './create-account.usecase'

describe('CreateAccountUsecase', () => {
  let usecase: CreateAccountUsecase
  let usersRepository: MemoryUsersRepository
  let passwordHasher: MemoryPasswordHasher

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository()
    passwordHasher = new MemoryPasswordHasher()
    usecase = new CreateAccountUsecase(usersRepository, passwordHasher)
  })

  it('should create a new user successfully', async () => {
    const input = {
      name: 'Dolores Madrigal',
      email: 'Dolores@email.com',
      password: '123456',
    }

    await usecase.execute(input)

    const user = await usersRepository.findByEmail(input.email.toLowerCase())

    expect(user).not.toBeNull()
    expect(user!.toJSON().name).toBe(input.name)
    expect(user!.toJSON().email).toBe(input.email.toLowerCase())
    expect(user!.toJSON().passwordHash).toBe(
      await passwordHasher.hash(input.password),
    )
  })

  it('should trim name and lowercase email when creating user', async () => {
    const input = {
      name: '  Bruno Madrigal  ',
      email: ' Bruno.M@email.com  ',
      password: 'password123',
    }

    await usecase.execute(input)
    const user = await usersRepository.findByEmail('bruno.m@email.com')

    expect(user).not.toBeNull()
    expect(user!.toJSON().name).toBe('Bruno Madrigal')
    expect(user!.toJSON().email).toBe('bruno.m@email.com')
  })

  it('should not allow duplicate emails', async () => {
    const input = {
      name: 'Dolores',
      email: 'dolores@email.com',
      password: '123',
    }

    await usecase.execute(input)

    await expect(() => usecase.execute(input)).rejects.toThrow()
  })
})
