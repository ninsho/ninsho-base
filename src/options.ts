export type IOptions = {
  sessionExpirationSec: number,
  tableName: {
    members: string,
    sessions: string
  }
}

export const defaultOptions: IOptions = {
  sessionExpirationSec: 86400,
  tableName: {
    members: 'members',
    sessions: 'sessions'
  }
}
