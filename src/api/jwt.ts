import { jwtDecode } from 'jwt-decode'

interface MinimalJwtPayload {
  sub: string
  exp: number
}

export function isTokenValid(token: string): boolean {
  try {
    const payload = jwtDecode<MinimalJwtPayload>(token)
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}