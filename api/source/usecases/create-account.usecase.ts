import { User } from '@/entities/user.entity'
import { PasswordHasherProviderInterface } from '@/providers/password-hasher.provider'
import { UsersRepositoryInterface } from '@/repositories/users.repository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

type CreateAccountInput = {
  name: string
  email: string
  password: string
}

type CreateAccountOutput = {}

export class CreateAccountUsecase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private passwordHasherProvider: PasswordHasherProviderInterface,
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const data = this.sanitize(input)

    const existingUser = await this.usersRepository.findByEmail(data.email)
    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await this.passwordHasherProvider.hash(data.password)

    const user = User.create(data.name, data.email, passwordHash)

    await this.usersRepository.create(user)

    return {}
  }

  private sanitize(input: CreateAccountInput): CreateAccountInput {
    return {
      ...input,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
    }
  }
}
