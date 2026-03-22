export interface TokenProviderInterface {
  generateToken(): Promise<string>
}
