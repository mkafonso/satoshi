import { TokenProviderInterface } from '@/providers/token.provider'
import crypto from 'node:crypto'

export class MemoryTokenProvider implements TokenProviderInterface {
  private tokens = new Set<string>()

  async generateToken(): Promise<string> {
    const token = crypto.randomUUID()
    this.tokens.add(token)
    return token
  }

  async verifyToken(token: string): Promise<boolean> {
    return this.tokens.has(token)
  }
}
