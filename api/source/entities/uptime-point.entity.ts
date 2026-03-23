export type UptimePointProps = {
  timestamp: Date
  uptimePercentage: number
}

export class UptimePoint {
  private props: UptimePointProps

  private constructor(props: UptimePointProps) {
    this.props = props
  }

  static create(props: UptimePointProps): UptimePoint {
    return new UptimePoint({ ...props })
  }

  static restore(props: UptimePointProps): UptimePoint {
    return new UptimePoint({ ...props })
  }

  toJSON(): UptimePointProps {
    return { ...this.props }
  }
}
