import { BtcAddressProviderInterface } from '@/providers/btc-address.provider'
import crypto from 'node:crypto'

export class MemoryBtcAddressProvider implements BtcAddressProviderInterface {
  private usedAddresses = new Set<string>()

  async getAddress(): Promise<string> {
    let address: string

    do {
      address = `btc_${crypto.randomBytes(8).toString('hex')}`
    } while (this.usedAddresses.has(address))

    this.usedAddresses.add(address)
    return address
  }
}
