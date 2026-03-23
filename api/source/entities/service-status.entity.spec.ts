import { describe, expect, it } from 'vitest'
import { ServiceStatus } from './service-status.entity'

describe('ServiceStatus Entity', () => {
  it('should create a service status with correct properties', () => {
    const service = ServiceStatus.create({
      name: ' API Service ',
      status: 'operational',
      uptimePercentage: 99.9,
      avgResponseTimeMs: 50,
    })

    const props = service.toJSON()

    expect(props.name).toBe('API Service')
    expect(props.status).toBe('operational')
    expect(props.uptimePercentage).toBe(99.9)
    expect(props.avgResponseTimeMs).toBe(50)
  })

  it('should create without avgResponseTimeMs', () => {
    const service = ServiceStatus.create({
      name: 'Blockchain',
      status: 'degraded',
      uptimePercentage: 98.5,
    })

    const props = service.toJSON()
    expect(props.avgResponseTimeMs).toBeUndefined()
  })

  it('should restore a service status', () => {
    const service = ServiceStatus.create({
      name: 'API',
      status: 'operational',
      uptimePercentage: 99,
    })

    const props = service.toJSON()
    const restored = ServiceStatus.restore(props)

    expect(restored.toJSON()).toEqual(props)
    expect(restored.toJSON()).not.toBe(props)
  })

  it('should return correct status via getter', () => {
    const service = ServiceStatus.create({
      name: 'API',
      status: 'down',
      uptimePercentage: 80,
    })

    expect(service.status).toBe('down')
  })
})
