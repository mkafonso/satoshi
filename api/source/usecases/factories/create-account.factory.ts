import { PasswordHasherProviderInterface } from '@/providers/password-hasher.provider'
import { UsersRepositoryInterface } from '@/repositories/users.repository'
import { MemoryPasswordHasher } from '../../../__tests__/providers/memory-password-hasher.provider'
import { MemoryUsersRepository } from '../../../__tests__/repositories/memory-users.repository'
import { CreateAccountUsecase } from '../create-account.usecase'

interface CreateAccountFactoryProps {
  usersRepository?: UsersRepositoryInterface
  passwordHasher?: PasswordHasherProviderInterface
}

export function makeCreateAccountUsecase(
  props: CreateAccountFactoryProps = {},
): CreateAccountUsecase {
  const usersRepository = props.usersRepository ?? new MemoryUsersRepository()
  const passwordHasher = props.passwordHasher ?? new MemoryPasswordHasher()

  return new CreateAccountUsecase(usersRepository, passwordHasher)
}
