import crypto from 'node:crypto'

export type IncidentProps = {
  id: string
  title: string
  status: 'resolved' | 'ongoing' | 'scheduled'
  description: string
  startedAt: Date
  durationMinutes?: number
  createdAt: Date
  updatedAt: Date
}

export class Incident {
  private props: IncidentProps

  private constructor(props: IncidentProps) {
    this.props = props
  }

  static create(
    props: Omit<IncidentProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Incident {
    const now = new Date()

    return new Incident({
      ...props,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    })
  }

  static restore(props: IncidentProps): Incident {
    return new Incident({ ...props })
  }

  toJSON(): IncidentProps {
    return { ...this.props }
  }

  get status() {
    return this.props.status
  }
}
