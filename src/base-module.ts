import { IOptions } from '.'

export abstract class ModuleBase {
  type = 'module'

  public options = {} as IOptions
  public setOptions(options: IOptions): this {
    this.options = options
    return this
  }
}
