import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import keytar from 'keytar'
import { STATICS } from '../..'

export default class DevicesAdd extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    password: flags.string({ char: 'p', description: 'password' }),
  }

  static args = [{
    name: 'device',
    description: 'device/hostname/ip'
  }]

  async run() {
    const { args, flags } = this.parse(DevicesAdd)

    // // if no password, prompt user
    // if (!flags.password) {
    //   flags.password = await cli.prompt('Password?', { type: 'hide' })
    //   .catch( err => { 
    //     throw new Error("password required!!!")
    //   })
    // }

    // if (!flags.password) {
    //   debugger;
    // }

    await keytar.setPassword('f5Hosts', 'device1', 'passSomething')

  }
}
