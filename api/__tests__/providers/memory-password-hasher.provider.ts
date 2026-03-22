import { PasswordHasherProviderInterface } from '@/providers/password-hasher.provider'

export class MemoryPasswordHasher implements PasswordHasherProviderInterface {
  private hashes = new Map<string, string>()

  async hash(password: string): Promise<string> {
    const hashed = `hashed-${password}`
    this.hashes.set(password, hashed)
    return hashed
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const expected = this.hashes.get(password) ?? `hashed-${password}`
    return expected === hash
  }
}
