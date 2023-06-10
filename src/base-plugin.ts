import { IOptions, ModuleBase, IMailer, INotifier, IPool, ISecure } from '.'

export type ModulesStoreType = {
  options: IOptions,
  pool: IPool,
  mailer: IMailer,
  notifier: INotifier,
  secure: ISecure
}

export type LendType = {
  options: IOptions,
  modules: ModulesStoreType,
}

export abstract class PluginBase{
  static type = 'plugin'

  protected lend: LendType = {
    options: {} as IOptions,
    modules: {} as ModulesStoreType,
  }

  protected storeModules = <T>(
    modules: { [keys: string]: ModuleBase | IOptions },
    pluginName: string,
    dependencyModuleList: T
  ): void => {
    if (dependencyModuleList) {
      for (const key of (dependencyModuleList as [])) {
        if (!(modules as any)[key]) {
          throw new Error(`${pluginName} requires '${key}', but '${key}' cannot be loaded`)
        }
        (this.lend.modules as any)[key] = (modules as any)[key]
      }
    }
    
    this.lend.options = (modules as any)['options']
  }
}
