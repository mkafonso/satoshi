import { PasswordHasherProviderInterface } from '@/providers/password-hasher.provider'
import { TokenProviderInterface } from '@/providers/token.provider'
import { SessionsRepositoryInterface } from '@/repositories/sessions.repository'
import { UsersRepositoryInterface } from '@/repositories/users.repository'
import { MemoryPasswordHasher } from '../../../__tests__/providers/memory-password-hasher.provider'
import { MemoryTokenProvider } from '../../../__tests__/providers/memory-token.provider'
import { MemorySessionsRepository } from '../../../__tests__/repositories/memory-sessions.repository'
import { MemoryUsersRepository } from '../../../__tests__/repositories/memory-users.repository'
import { CreateSessionUsecase } from '../create-session.usecase'

interface CreateSessionFactoryProps {
  usersRepository?: UsersRepositoryInterface
  passwordHasher?: PasswordHasherProviderInterface
  sessionsRepository?: SessionsRepositoryInterface
  tokenProvider?: TokenProviderInterface
}

export function makeCreateSessionUsecase(
  props: CreateSessionFactoryProps = {},
): CreateSessionUsecase {
  const usersRepository = props.usersRepository ?? new MemoryUsersRepository()
  const passwordHasher = props.passwordHasher ?? new MemoryPasswordHasher()
  const sessionsRepository =
    props.sessionsRepository ?? new MemorySessionsRepository()
  const tokenProvider = props.tokenProvider ?? new MemoryTokenProvider()

  return new CreateSessionUsecase(
    usersRepository,
    passwordHasher,
    sessionsRepository,
    tokenProvider,
  )
}
