import { Incident } from '@/entities/incident.entity'
import { ServiceStatus } from '@/entities/service-status.entity'
import { UptimePoint } from '@/entities/uptime-point.entity'
import { SystemStatusProviderInterface } from '@/providers/system-status.provider'

export type GetSystemStatusOutput = {
  overallStatus: 'operational' | 'degraded' | 'down'
  lastUpdatedAt: Date
  uptime24h: UptimePoint[]
  services: ServiceStatus[]
  incidents: Incident[]
  metrics: {
    uptimePercentage30d: number
    avgResponseTimeMs: number
    incidentsLast30d: number
  }
}

export class GetSystemStatusUsecase {
  constructor(private statusProvider: SystemStatusProviderInterface) {}

  async execute(): Promise<GetSystemStatusOutput> {
    const [services, uptime24h, metrics, incidents] = await Promise.all([
      this.statusProvider.getServicesStatus(),
      this.statusProvider.getUptime24h(),
      this.statusProvider.getMetrics(),
      this.statusProvider.getRecentIncidents(),
    ])

    const overallStatus = this.calculateOverallStatus(services)

    return {
      overallStatus,
      lastUpdatedAt: new Date(),
      uptime24h,
      services,
      metrics,
      incidents,
    }
  }

  private calculateOverallStatus(
    services: ServiceStatus[],
  ): GetSystemStatusOutput['overallStatus'] {
    if (services.some((s) => s.status === 'down')) return 'down'
    if (services.some((s) => s.status === 'degraded')) return 'degraded'
    return 'operational'
  }
}
