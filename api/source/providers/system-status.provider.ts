import { Incident } from '@/entities/incident.entity'
import { ServiceStatus } from '@/entities/service-status.entity'
import { UptimePoint } from '@/entities/uptime-point.entity'

export interface SystemStatusProviderInterface {
  getServicesStatus(): Promise<ServiceStatus[]>
  getUptime24h(): Promise<UptimePoint[]>
  getRecentIncidents(): Promise<Incident[]>
  getMetrics(): Promise<{
    uptimePercentage30d: number
    avgResponseTimeMs: number
    incidentsLast30d: number
  }>
}
