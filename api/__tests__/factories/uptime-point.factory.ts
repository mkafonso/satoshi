import {
  UptimePoint,
  type UptimePointProps,
} from '@/entities/uptime-point.entity'

export function makeUptimePoint(overrides?: Partial<UptimePointProps>) {
  const defaultProps: UptimePointProps = {
    timestamp: new Date(),
    uptimePercentage: 99.9,
  }

  return UptimePoint.create({ ...defaultProps, ...overrides })
}
