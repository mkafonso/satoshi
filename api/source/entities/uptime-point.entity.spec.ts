import { describe, expect, it } from 'vitest'
import { UptimePoint } from './uptime-point.entity'

describe('UptimePoint Entity', () => {
  it('should create a uptime point correctly', () => {
    const timestamp = new Date()

    const point = UptimePoint.create({
      timestamp,
      uptimePercentage: 99.95,
    })

    const props = point.toJSON()

    expect(props.timestamp).toBe(timestamp)
    expect(props.uptimePercentage).toBe(99.95)
  })

  it('should restore a uptime point', () => {
    const point = UptimePoint.create({
      timestamp: new Date(),
      uptimePercentage: 99,
    })

    const props = point.toJSON()
    const restored = UptimePoint.restore(props)

    expect(restored.toJSON()).toEqual(props)
    expect(restored.toJSON()).not.toBe(props)
  })
})
