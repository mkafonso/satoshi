import { Incident, type IncidentProps } from '@/entities/incident.entity'

type IncidentCreateProps = Omit<IncidentProps, 'id' | 'createdAt' | 'updatedAt'>

export function makeIncident(overrides?: Partial<IncidentCreateProps>) {
  const defaultProps: IncidentCreateProps = {
    title: 'Test Incident',
    status: 'resolved',
    description: 'Test incident description',
    startedAt: new Date(),
    durationMinutes: 10,
  }

  return Incident.create({ ...defaultProps, ...overrides })
}
