export interface BtcAddressProviderInterface {
  getAddress(): Promise<string>
}
