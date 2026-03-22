import crypto from 'node:crypto'

export type UserProps = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class User {
  private props: UserProps

  private constructor(props: UserProps) {
    this.props = props
  }

  static create(name: string, email: string, passwordHash: string): User {
    const now = new Date()

    return new User({
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: UserProps): User {
    return new User({ ...props })
  }

  private touch(): void {
    const nowMs = Date.now()
    const prevMs = this.props.updatedAt.getTime()
    const nextMs = nowMs <= prevMs ? prevMs + 1 : nowMs
    this.props.updatedAt = new Date(nextMs)
  }

  softDelete(): void {
    this.props.deletedAt = new Date()
    this.touch()
  }

  updateProfile(name?: string, email?: string): void {
    if (name) this.props.name = name.trim()
    if (email) this.props.email = email.trim().toLowerCase()
    this.touch()
  }

  toJSON(): UserProps {
    return { ...this.props }
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get passwordHash(): string {
    return this.props.passwordHash
  }
}
