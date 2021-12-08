import * as os from 'os';

import { Command, flags } from '@oclif/command'

export default class Info extends Command {
  static description = 'Project version and environment details'

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {

    const config = this.config

    this.log(JSON.stringify({
        name: this.config.pjson.name,
        description: this.config.pjson.description,
        version: this.config.pjson.version,
        license: this.config.pjson.license,
        homepage: this.config.pjson.homepage,
        arch: this.config.arch,
        userAgent: this.config.userAgent,
        shell: this.config.shell
    }))

}
}
