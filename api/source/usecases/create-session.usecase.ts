import { Session } from '@/entities/session.entity'
import { PasswordHasherProviderInterface } from '@/providers/password-hasher.provider'
import { TokenProviderInterface } from '@/providers/token.provider'
import { SessionsRepositoryInterface } from '@/repositories/sessions.repository'
import { UsersRepositoryInterface } from '@/repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

export type CreateSessionInput = {
  email: string
  password: string
}

export interface CreateSessionOutput {
  userId: string
  sessionId: string
  refreshToken: string
}

export class CreateSessionUsecase {
  constructor(
    private usersRepository: UsersRepositoryInterface,
    private passwordHasherProvider: PasswordHasherProviderInterface,
    private sessionsRepository: SessionsRepositoryInterface,
    private tokenProvider: TokenProviderInterface,
  ) {}

  async execute(input: CreateSessionInput): Promise<CreateSessionOutput> {
    const data = this.sanitize(input)

    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const userProps = user.toJSON()

    const isPasswordValid = await this.passwordHasherProvider.compare(
      input.password,
      userProps.passwordHash,
    )

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    await this.revokeOldSessions(userProps.id)

    const refreshToken = await this.tokenProvider.generateToken()
    const session = Session.create(userProps.id, refreshToken)
    await this.sessionsRepository.create(session)

    return {
      userId: userProps.id,
      sessionId: session.toJSON().id,
      refreshToken,
    }
  }

  protected async revokeOldSessions(userId: string): Promise<void> {
    const oldSessions = await this.sessionsRepository.findByUserId(userId)
    for (const session of oldSessions) {
      await this.sessionsRepository.delete(session.toJSON().id)
    }
  }

  private sanitize(input: CreateSessionInput): CreateSessionInput {
    return {
      ...input,
      email: input.email.trim().toLowerCase(),
    }
  }
}
