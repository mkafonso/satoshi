import { User } from '@/entities/user.entity'
import { UsersRepositoryInterface } from '@/repositories/users.repository'

export class MemoryUsersRepository implements UsersRepositoryInterface {
  private users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (u) => u.toJSON().email === email.toLowerCase(),
    )
    return user ?? null
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.toJSON().id === id)
    return user ?? null
  }
}
