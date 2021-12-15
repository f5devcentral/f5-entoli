import {Command, flags} from '@oclif/command'
import keytar from 'keytar'
import { STATICS } from '../../index'

export default class DevicesList extends Command {
  static description = 'list known devices -> known devices have cached passwords'
  // private static enableJsonFlag = true

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    await keytar.findCredentials(STATICS.KEYTAR_KEYCHAIN_NAME)
    .then( acc_list => {
      const accounts = acc_list.map( item => {
        return item.account
      })

      this.log(JSON.stringify(accounts))
      return accounts
    })

  }
}


// keytar initiall didn't work
// was getting "Error: GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.freedesktop.secrets was not provided by any .service files"
// fix
// https://github.com/Foundry376/Mailspring/issues/681