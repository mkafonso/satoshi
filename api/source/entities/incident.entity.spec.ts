import { beforeEach, describe, expect, it } from 'vitest'
import { Incident } from './incident.entity'

describe('Incident Entity', () => {
  let incident: Incident

  beforeEach(() => {
    incident = Incident.create({
      title: 'API Down',
      status: 'ongoing',
      description: 'API is not responding',
      startedAt: new Date(),
      durationMinutes: 10,
    })
  })

  it('should create a new incident with correct properties', () => {
    const props = incident.toJSON()

    expect(props.id).toBeTypeOf('string')
    expect(props.title).toBe('API Down')
    expect(props.status).toBe('ongoing')
    expect(props.description).toBe('API is not responding')
    expect(props.startedAt).toBeInstanceOf(Date)
    expect(props.durationMinutes).toBe(10)
    expect(props.createdAt).toBeInstanceOf(Date)
    expect(props.updatedAt).toBeInstanceOf(Date)
  })

  it('should create an incident without durationMinutes', () => {
    const incident = Incident.create({
      title: 'Scheduled Maintenance',
      status: 'scheduled',
      description: 'Maintenance window',
      startedAt: new Date(),
    })

    const props = incident.toJSON()
    expect(props.durationMinutes).toBeUndefined()
  })

  it('should restore an incident from props', () => {
    const props = incident.toJSON()
    const restored = Incident.restore(props)

    expect(restored.toJSON()).toEqual(props)
    expect(restored.toJSON()).not.toBe(props)
  })

  it('should return correct status via getter', () => {
    expect(incident.status).toBe('ongoing')
  })
})
