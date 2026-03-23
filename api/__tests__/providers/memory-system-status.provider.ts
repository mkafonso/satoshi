import { Incident } from '@/entities/incident.entity'
import { ServiceStatus } from '@/entities/service-status.entity'
import { UptimePoint } from '@/entities/uptime-point.entity'
import { SystemStatusProviderInterface } from '@/providers/system-status.provider'

export class MemorySystemStatusProvider
  implements SystemStatusProviderInterface
{
  async getServicesStatus(): Promise<ServiceStatus[]> {
    return [
      ServiceStatus.create({
        name: 'API Service',
        status: 'operational',
        uptimePercentage: 99.98,
        avgResponseTimeMs: 45,
      }),
      ServiceStatus.create({
        name: 'Blockchain Sync',
        status: 'operational',
        uptimePercentage: 99.95,
      }),
      ServiceStatus.create({
        name: 'Payment Processor',
        status: 'degraded',
        uptimePercentage: 99.7,
        avgResponseTimeMs: 120,
      }),
    ]
  }

  async getUptime24h(): Promise<UptimePoint[]> {
    const now = Date.now()

    return Array.from({ length: 24 }).map((_, i) =>
      UptimePoint.create({
        timestamp: new Date(now - i * 60 * 60 * 1000),
        uptimePercentage: 99.9 + Math.random() * 0.1,
      }),
    )
  }

  async getMetrics(): Promise<{
    uptimePercentage30d: number
    avgResponseTimeMs: number
    incidentsLast30d: number
  }> {
    return {
      uptimePercentage30d: 99.97,
      avgResponseTimeMs: 98,
      incidentsLast30d: 2,
    }
  }

  async getRecentIncidents(): Promise<Incident[]> {
    return [
      Incident.create({
        title: 'Brief API Slowdown',
        status: 'resolved',
        description: 'API response times were elevated for a short period',
        startedAt: new Date(Date.now() - 1000 * 60 * 30),
        durationMinutes: 5,
      }),
      Incident.create({
        title: 'Scheduled Maintenance',
        status: 'scheduled',
        description: 'Planned database maintenance',
        startedAt: new Date(Date.now() + 1000 * 60 * 60),
        durationMinutes: 30,
      }),
    ]
  }
}
