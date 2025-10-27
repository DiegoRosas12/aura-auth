const AUTH_TOKEN_KEY = 'auth_token'

export class TokenStorage {
  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  static setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }

  static removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  static hasToken(): boolean {
    return this.getToken() !== null
  }
}
