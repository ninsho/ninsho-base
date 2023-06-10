import { ModuleBase } from '.'
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type IMailerConfig = {
    SendMailAddress: string,
    throwOnReplaceFailed: boolean,
}

export abstract class IMailer extends ModuleBase {

  constructor() {
    super()
  }

  public _config: IMailerConfig = {} as IMailerConfig

  _mailer: any

  static init: (
    _nodemailer: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
    config: IMailerConfig
  ) => IMailer

  static initForTest: () => IMailer
  static clearTestStorage: () => void

  abstract sender(
    m_mail: string,
    mailSubject: string,
    mailBody: string,
    context: { [keys: string]: any },
    html?: string
  ): Promise<void>

}
