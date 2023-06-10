export type IApiResult<T, S, E extends ErrorBase> = ApiSuccess<T, S> | E
export class ApiSuccess<T, S> {
  readonly statusCode: number
  readonly body: T
  readonly system: S
  constructor(statusCode: number, body: T, system?: S) {
    this.statusCode = statusCode
    this.body = body
    this.system = system as S
  }
  fail = (): this is ErrorBase => false
}

export type IResult<T, E extends ErrorBase> = Success<T> | E
export class Success<T> {
  readonly response: T
  constructor(result: T) {
    this.response = result
  }
  fail = (): this is ErrorBase => false
}

export abstract class ErrorBase extends Error {
  readonly statusCode!: number
  readonly body: { replyCode: number[], message?: string }
  readonly message: string
  constructor(replyCode: number, message?: string) {
    super()
    this.body = { replyCode: [replyCode] }
    this.message = message ?? ''
  }
  pushReplyCode(replyCode: number): this {
    this.body.replyCode.push(replyCode)
    return this
  }
  fail = (): this is ErrorBase => true
}

export class E400 extends ErrorBase {
  readonly type = 'E400'
  readonly statusCode = 400
}

export class E401 extends ErrorBase {
  readonly type = 'E401'
  readonly statusCode = 401
}

export class E403 extends ErrorBase {
  readonly type = 'E403'
  readonly statusCode = 403
}

export class E404 extends ErrorBase {
  readonly type = 'E404'
  readonly statusCode = 404
}

export class E409 extends ErrorBase {
  readonly type = 'E409'
  readonly statusCode = 409
}

export class E429 extends ErrorBase { // Too Many Requests
  readonly type = 'E429'
  readonly statusCode = 429
}

export class E500 extends ErrorBase {
  readonly type = 'E500'
  readonly statusCode = 500
}

export class QE400 extends E400 {}

export class QE401 extends E401 {}

export class QE403 extends E403 {}

export class QE404 extends E404 {}

export class QE409 extends E409 {}

export class QE429 extends E429 {}

export class QE500 extends E500 {}
