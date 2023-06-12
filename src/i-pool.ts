import { PoolConfig } from 'pg'
import {
  ModuleBase,
  IResult,
  QE400,
  QE404,
  QE409,
  QE500,
  QE401
} from '.'

export type IPoolClient = {
  release(err?: Error | boolean): void
  query: <T>(queryConfig: string | {
    text: string,
    values: unknown[]
  }) => Promise<IQueryResult<T>>,
}

export type IQueryResult<T> = {
  rows: T[], rowCount: number
}

export type IPoolConfig = {
  user: string,
  host: string,
  database: string,
  password: string,
  port?: number,
  max?: number,
  timezone?: string,
  adjustLocalTime?: boolean,
  /** Forcibly release when releasing the database pool. default: false */
  forceRelease?: boolean
} & PoolConfig

export abstract class IPool extends ModuleBase {

  public static init: (dbConnect: IPoolConfig) => IPool

  abstract getConnect(): Promise<IPoolClient>

  abstract releaseConnect(client: IPoolClient, force?: boolean): void

  abstract end(): Promise<void>

  abstract truncate(tableNameList: string[]): Promise<void>

  abstract beginWithClient(): Promise<IPoolClient>
  abstract commitWithRelease(client: IPoolClient, force?: boolean): Promise<void>
  abstract rollbackWithRelease(client: IPoolClient, force?: boolean): Promise<void>

  abstract updateOneOrThrow<T>(
    updateObj: Partial<T>,
    condition: Partial<T>,
    conditionType: 'AND' | 'OR',
    tableName: string,
    client?: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500 | QE404>>

  abstract insertOne<T>(
    insertObj: Partial<T>,
    tableName: string,
    client: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500 | QE409>>

  abstract insert<T>(
    keys: Partial<keyof T>[],
    values: T[Partial<keyof T>][][],
    tableName: string,
    client?: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500 | QE400 | QE409>>

  abstract selectOneOrThrow<T>(
    table: string,
    columns: (keyof T)[] | '*',
    condition: { [key in keyof T]?: T[key] },
    conditionType: 'OR' | 'AND',
    client?: IPoolClient
  ): Promise<IResult<Required<T>, QE500 | QE404>>

  abstract selectOne<T>(
    table: string,
    columns: (keyof T)[],
    condition: { [key in keyof T]?: T[key] },
    client?: IPoolClient
  ): Promise<IResult<Required<T> | null, QE500>>

  abstract select<T>(
    table: string,
    columns: (keyof T)[],
    condition: { [key in keyof T]?: T[key] } | null,
    client?: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500>>

  abstract delete<T>(
    condition: Partial<T>,
    tableName: string,
    client?: IPoolClient
  ): Promise<IResult<T, QE500>>

  abstract deleteOrThrow<T>(
    condition: Partial<T>,
    tableName: string,
    client?: IPoolClient
  ): Promise<IResult<T, QE500 | QE404>>

  abstract replaceOneWithConditionExistAndDeadLine<T>(
    insertObj: Partial<T>,
    tableName: string,
    deadLine: any,
    client: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500 | QE409>>

  abstract retrieveMemberIfSessionPresentOne<T>(
    token: string,
    deadLine: number,
    device: string,
    ip: string,
    memberColumnToRetrieve?: string[] | '*',
    client?: IPoolClient
  ): Promise<IResult<Required<T>, QE500 | QE401>>

  abstract upsertSessionRecord<T>(
    values: Partial<T>,
    onConflictTargets: (keyof T)[],
    updateTargets: (keyof T)[],
    tableName: string,
    client?: IPoolClient
  ): Promise<IResult<IQueryResult<T>, QE500 | QE404>>

}
