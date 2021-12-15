import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import inquirer from 'inquirer'
import { F5Client } from 'f5-conx-core'
import { extHttp, conxLog, eventer } from '../../f5Worker'
import Choice from 'inquirer/lib/objects/choice'

export default class As3Delete extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    device: flags.string({
      char: 'd',
      env: 'ENTOLI_DEVICE',
      description: 'device to as3 with',
      required: true,
    }),
    username: flags.string({
      char: 'u',
      env: 'ENTOLI_USERNAME',
      default: 'admin',
      description: 'username to connect to device with',
    }),
    password: flags.string({
      char: 'p',
      description: 'password for provided username',
    }),
    port: flags.integer({
      default: 443,
      description: 'device port'
    }),
    provider: flags.string({
      char: 'v',
      default: 'tmos',
      description: 'device provider'
    }),
    tenant: flags.string({
      char: 't',
      description: 'as3 tenant to delete/remove',
      multiple: true
    }),
    listTenant: flags.boolean({
      char: 'l',
      description: 'list existing tenants to select'
    })
  }

  async run() {
    const { args, flags } = this.parse(As3Delete)
    // this.log(JSON.stringify({args, flags}))

    // re-assing this/cli logging function
    const cliLogger = this.log;

    // redirect conx logger through the cli logger
    conxLog.output = function (x: string) {
      cliLogger(x);
    };

    // if no password, prompt user
    if (!flags.password) {
      flags.password = await cli.prompt('Password?', { type: 'hide' })
    }



    const device = new F5Client(
      flags.device,
      flags.username,
      flags.password || '',
      {
        port: flags.port,
        provider: flags.provider
      },
      eventer,
      extHttp
    )


    await device
      .discover()
      .then(disc => {
        conxLog.info('connected', disc, '\n');
      })
      .catch(err => {
        conxLog.error('connect err', err);
      })


    let choices;
    if (!flags.tenant) {
      choices = await device.as3?.getDecs()
        .then(async resp => {
          const tenDecs = await device.as3?.parseDecs(resp.data) || []
          return tenDecs.map(x => {
            return Object.keys(x)[0]
          })
        })

    }

    if (flags.listTenant) {

      const answer = await inquirer.prompt([{
        type: 'list',
        name: 'tenant',
        message: 'Which tenant to delete?',
        choices
      }])

      flags.tenant = [answer.tenant];
    }

    if (!flags.tenant && !flags.listTenant) {
      await cli.prompt('Do you want to delete all tenants on destination device?', {
        required: true
      })
      flags.tenant = choices || [];
    }


    if (device.as3 && flags.tenant) {
      conxLog.info('deleting as3 tenants', flags.tenant)

      for await (const tenant of flags.tenant) {

        conxLog.info(`deleting ${tenant}`);
        await device.as3.deleteTenant(tenant)
          .then(resp => {
            const results = resp.data.results;

            conxLog.info(`as3-tenant-delete-complete: ${tenant}`, resp.status, resp.statusText, results)

          })
          .catch(err => {
            conxLog.error(err)
          })
      }
    }

    device.clearLogin();
    conxLog.info('done')

  }
}
