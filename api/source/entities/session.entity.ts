import crypto from 'node:crypto'

export type SessionProps = {
  id: string
  userId: string
  refreshToken: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Session {
  private props: SessionProps

  private constructor(props: SessionProps) {
    this.props = props
  }

  static create(userId: string, refreshToken: string): Session {
    const now = new Date()

    return new Session({
      id: crypto.randomUUID(),
      userId,
      refreshToken: refreshToken.trim(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: SessionProps): Session {
    return new Session({ ...props })
  }

  private touch(): void {
    const nowMs = Date.now()
    const prevMs = this.props.updatedAt.getTime()
    const nextMs = nowMs <= prevMs ? prevMs + 1 : nowMs
    this.props.updatedAt = new Date(nextMs)
  }

  invalidate(): void {
    this.props.deletedAt = new Date()
    this.touch()
  }

  updateRefreshToken(newToken: string): void {
    this.props.refreshToken = newToken.trim()
    this.touch()
  }

  toJSON(): SessionProps {
    return { ...this.props }
  }
}
