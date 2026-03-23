export type ServiceStatusProps = {
  name: string
  status: 'operational' | 'degraded' | 'down'
  uptimePercentage: number
  avgResponseTimeMs?: number
}

export class ServiceStatus {
  private props: ServiceStatusProps

  private constructor(props: ServiceStatusProps) {
    this.props = props
  }

  static create(props: ServiceStatusProps): ServiceStatus {
    return new ServiceStatus({
      ...props,
      name: props.name.trim(),
    })
  }

  static restore(props: ServiceStatusProps): ServiceStatus {
    return new ServiceStatus({ ...props })
  }

  toJSON(): ServiceStatusProps {
    return { ...this.props }
  }

  get status() {
    return this.props.status
  }
}
