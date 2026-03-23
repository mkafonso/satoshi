import { describe, expect, it, vi } from 'vitest'
import { parseEnv } from './env'

describe('env validation', () => {
  it('should use defaults when no env is provided', () => {
    const result = parseEnv({})

    expect(result).toEqual({
      PORT: 3001,
      NODE_ENV: 'dev',
      PAYMENT_LINK_EXPIRES_IN_MINUTES: 15,
    })
  })

  it('should parse valid env variables', () => {
    const result = parseEnv({
      PORT: '4000',
      NODE_ENV: 'prd',
      PAYMENT_LINK_EXPIRES_IN_MINUTES: '30',
    })

    expect(result).toEqual({
      PORT: 4000,
      NODE_ENV: 'prd',
      PAYMENT_LINK_EXPIRES_IN_MINUTES: 30,
    })
  })

  it('should throw on invalid NODE_ENV', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      parseEnv({
        NODE_ENV: 'invalid',
      }),
    ).toThrow('Invalid environment variables')

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  it('should coerce PORT to number', () => {
    const result = parseEnv({
      PORT: '1234',
    })

    expect(result.PORT).toBe(1234)
  })

  it('should use default for PAYMENT_LINK_EXPIRES_IN_MINUTES when not provided', () => {
    const result = parseEnv({})

    expect(result.PAYMENT_LINK_EXPIRES_IN_MINUTES).toBe(15)
  })

  it('should parse PAYMENT_LINK_EXPIRES_IN_MINUTES to number', () => {
    const result = parseEnv({
      PAYMENT_LINK_EXPIRES_IN_MINUTES: '30',
    })

    expect(result.PAYMENT_LINK_EXPIRES_IN_MINUTES).toBe(30)
  })
})
