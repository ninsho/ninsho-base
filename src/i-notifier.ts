import { ModuleBase } from '.'

export type INotifierConfig = {
  mailer: {
    Service: string,
    SendMailAddress: string,
    SMTPPassword: string
  }
}

export abstract class INotifier extends ModuleBase {

  static Init: (config?: INotifierConfig) => INotifier
  static InitForTest: () => INotifier

  abstract sender(
    m_mail: string,
    mailSubject: string,
    mailBody: string,
    context: { [keys: string]: any }
  ): Promise<void>

}
