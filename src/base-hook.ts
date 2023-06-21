import {
  MemberInsert,
  SessionInsert,
  ErrorBase,
  IResult,
  Success,
  LendType,
  IPoolClient
} from '.'

/**
 * Const assertions for specifying the points to apply the hook.
 */
export const HookPoint = [
  'beforePasswordCheck',
  'onTransactionLast'
] as const
export type HookPointType = typeof HookPoint[number]

/**
 * Type of the set of properties to pass to the hook.
 */
export type HookAccept = {
  req: any,
  props?: Required<MemberInsert | (MemberInsert & SessionInsert)>,
  claims?: any,
  others?: any,
  connection?: IPoolClient
}

export type HooksObjType = {
  hookPoint: HookPointType,
  hook: (
    lend: LendType,
    accept: HookAccept
  ) => Promise<IResult<any, ErrorBase>>
}

export async function hookCall(
  hookPoint: HookPointType,
  lend: Record<string, unknown>,
  accept: HookAccept
): Promise<IResult<null, ErrorBase>> {

  const _hooks = (accept as any).req.options.hooks

  const hs = _hooks.filter((h: { hookPoint: string; }) => h.hookPoint === hookPoint)
  for (const h of hs) {
    const res = await h.hook(lend, fillProps(accept))
    if (res.fail()) return res
  }
  return new Success(null)
}

function fillProps(accept: any) {
  accept.req.pass = /* istanbul ignore next */ accept.req.pass ?? accept.req.options.pass
  accept.req.name = /* istanbul ignore next */ accept?.others?.claims?.m_name ?? accept.req.name ?? accept.props?.m_name
  accept.req.mail = /* istanbul ignore next */ accept?.others?.claims?.m_mail ?? accept.req.mail ?? accept.props?.m_mail
  accept.req.role = /* istanbul ignore next */ accept?.others?.claims?.m_role ?? accept.req.role ?? accept.props?.m_role ?? accept.req.options?.role
  return accept
}
