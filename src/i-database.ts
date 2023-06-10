export type MemberInsert<T = any> = {
  id: number,
  m_name: string,
  m_pass: string,
  m_mail: string,
  m_custom: T,
  m_ip: string,
  m_role: number,
  m_status: number,
  otp_hash: string | null,
  created_at: string,
  updated_at: string,
  pass_upd_at: string,
  failed_attempts: number,
  last_failed_attempts_at: string | null,
  version: number
}

export type SessionInsert = {
  id: number,
  members_id: number,
  m_name: string,
  m_ip: string,
  m_device: string,
  m_role: number,
  created_time: number,
  token: string,
  created_at: null | string
}

export type MembersCol = { [K in keyof MemberInsert]: `members.${string & K}` }[keyof MemberInsert]
export type SessionCol = { [K in keyof SessionInsert]: `${string & K}` }[keyof SessionInsert]

export const MStatus = {
  PENDING: 0,
  ACTIVE: 1,
  INACTIVE: 9,
} as const
export type MStatusType = typeof MStatus[keyof typeof MStatus]

export const MRole = {
  User: 0,
  Prime: 10,
  Admin: 9000,
  SuperAdministrator: 10000
} as const
export type MRoleType = typeof MRole[keyof typeof MRole]
