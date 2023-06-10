import { ModuleBase } from '.'

type DeepPartial<T> = { [K in keyof T]?: T[K] extends Record<string, unknown>
  ? DeepPartial<T[K]>
  : T[K] }

export type ConfigType = {
  secretKey: string,
  bcrypt: {
    bcrypt_salt_rounds: number,
  },
  crypt: {
    crypto_algorithm: string,
  },
  override: {
    toHashForPassword: ((pass: string) => string) | null,
    checkHashPassword: ((pass: string, hash: string) => boolean) | null,
    createUUID: (() => string) | null,
    toHashForSessionToken: ((userToken: string) => string) | null,
    createSessionTokenWithHash: (() => {
      sessionToken: string
      hashToken: string
    }) | null
  }
}

export abstract class ISecure extends ModuleBase {

  public config: ConfigType = {} as ConfigType

  public static init: (options: DeepPartial<ConfigType>) => ISecure

  abstract toHashForPassword(pass: string): string

  abstract checkHashPassword(pass: string, hash: string): boolean

  abstract createUUID(): string

  abstract toHashForSessionToken(userToken: string): string

  abstract createSessionTokenWithHash(): {
    sessionToken: string
    hashToken: string
  }

}
