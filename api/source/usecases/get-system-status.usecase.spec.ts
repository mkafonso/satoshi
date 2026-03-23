import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeIncident } from '../../__tests__/factories/incident.factory'
import { makeServiceStatus } from '../../__tests__/factories/service-status.factory'
import { makeUptimePoint } from '../../__tests__/factories/uptime-point.factory'
import { MemorySystemStatusProvider } from '../../__tests__/providers/memory-system-status.provider'
import { makeGetSystemStatusUsecase } from './factories/get-system-status.factory'
import { GetSystemStatusUsecase } from './get-system-status.usecase'

describe('GetSystemStatusUsecase', () => {
  let systemStatusProvider: MemorySystemStatusProvider
  let usecase: GetSystemStatusUsecase

  beforeEach(() => {
    usecase = makeGetSystemStatusUsecase()
    systemStatusProvider = (usecase as any).systemStatusProvider
  })

  it('should return system status correctly', async () => {
    systemStatusProvider.services = [
      makeServiceStatus({
        name: 'API',
        status: 'operational',
        uptimePercentage: 99.9,
      }),
    ]

    systemStatusProvider.uptime = [makeUptimePoint({ uptimePercentage: 99.9 })]

    systemStatusProvider.incidents = [
      makeIncident({
        title: 'Test Incident',
        status: 'resolved',
        description: 'desc',
      }),
    ]

    const result = await usecase.execute()

    expect(result.services).toHaveLength(1)
    expect(result.uptime24h).toHaveLength(1)
    expect(result.incidents).toHaveLength(1)
    expect(result.metrics).toEqual(systemStatusProvider.metrics)
    expect(result.lastUpdatedAt).toBeInstanceOf(Date)
  })

  it('should return overallStatus as operational', async () => {
    systemStatusProvider.services = [
      makeServiceStatus({
        name: 'API',
        status: 'operational',
        uptimePercentage: 99,
      }),
      makeServiceStatus({
        name: 'DB',
        status: 'operational',
        uptimePercentage: 99,
      }),
    ]

    const result = await usecase.execute()

    expect(result.overallStatus).toBe('operational')
  })

  it('should return overallStatus as degraded if any service is degraded', async () => {
    systemStatusProvider.services = [
      makeServiceStatus({
        name: 'API',
        status: 'operational',
        uptimePercentage: 99,
      }),
      makeServiceStatus({
        name: 'DB',
        status: 'degraded',
        uptimePercentage: 95,
      }),
    ]

    const result = await usecase.execute()

    expect(result.overallStatus).toBe('degraded')
  })

  it('should return overallStatus as down if any service is down', async () => {
    systemStatusProvider.services = [
      makeServiceStatus({
        name: 'API',
        status: 'degraded',
        uptimePercentage: 90,
      }),
      makeServiceStatus({ name: 'DB', status: 'down', uptimePercentage: 0 }),
    ]

    const result = await usecase.execute()

    expect(result.overallStatus).toBe('down')
  })

  it('should prioritize down over degraded', async () => {
    systemStatusProvider.services = [
      makeServiceStatus({
        name: 'API',
        status: 'degraded',
        uptimePercentage: 90,
      }),
      makeServiceStatus({ name: 'DB', status: 'down', uptimePercentage: 0 }),
    ]

    const result = await usecase.execute()

    expect(result.overallStatus).toBe('down')
  })

  it('should call all provider methods', async () => {
    const spyServices = vi.spyOn(systemStatusProvider, 'getServicesStatus')
    const spyUptime = vi.spyOn(systemStatusProvider, 'getUptime24h')
    const spyMetrics = vi.spyOn(systemStatusProvider, 'getMetrics')
    const spyIncidents = vi.spyOn(systemStatusProvider, 'getRecentIncidents')

    await usecase.execute()

    expect(spyServices).toHaveBeenCalled()
    expect(spyUptime).toHaveBeenCalled()
    expect(spyMetrics).toHaveBeenCalled()
    expect(spyIncidents).toHaveBeenCalled()
  })
})
