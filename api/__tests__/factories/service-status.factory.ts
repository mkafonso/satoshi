import {
  ServiceStatus,
  type ServiceStatusProps,
} from '@/entities/service-status.entity'

export function makeServiceStatus(overrides?: Partial<ServiceStatusProps>) {
  const defaultProps: ServiceStatusProps = {
    name: 'API',
    status: 'operational',
    uptimePercentage: 99.9,
    avgResponseTimeMs: 100,
  }

  return ServiceStatus.create({ ...defaultProps, ...overrides })
}
