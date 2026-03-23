import { Incident } from '@/entities/incident.entity'
import { ServiceStatus } from '@/entities/service-status.entity'
import { UptimePoint } from '@/entities/uptime-point.entity'
import { SystemStatusProviderInterface } from '@/providers/system-status.provider'

export class MemorySystemStatusProvider
  implements SystemStatusProviderInterface
{
  services: ServiceStatus[] = []
  uptime: UptimePoint[] = []
  incidents: Incident[] = []
  metrics = {
    uptimePercentage30d: 99.97,
    avgResponseTimeMs: 98,
    incidentsLast30d: 2,
  }

  async getServicesStatus(): Promise<ServiceStatus[]> {
    return this.services
  }

  async getUptime24h(): Promise<UptimePoint[]> {
    return this.uptime
  }

  async getMetrics() {
    return this.metrics
  }

  async getRecentIncidents(): Promise<Incident[]> {
    return this.incidents
  }
}
