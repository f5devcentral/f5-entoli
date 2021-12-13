import {Command, flags} from '@oclif/command'


/**
 * 
 enoli declare (aliases: up/deploy)

  base command should deploy repo via f5 ATC service declarations
 */

export default class Declare extends Command {
  static description = 'declare environment via AS3/DO'
  static aliases = ['up', 'deploy']

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args, flags} = this.parse(Declare)

    // read config file enotoli.yml
    // assume we are deploying through bigiq
    // 

  }
}
