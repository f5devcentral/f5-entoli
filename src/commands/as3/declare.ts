import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs-extra'
import * as path from 'path'
import request from 'http'
import Logger from 'f5-conx-core/dist/logger'
import { ExtHttp, F5Client } from 'f5-conx-core'
import { EventEmitter } from 'events';


const eventer = new EventEmitter();
export const extHttp = new ExtHttp({ rejectUnauthorized: false, eventEmitter: eventer });

export const conxLog = new Logger('F5_ENTOLI_LOG');
conxLog.console = false;

const cacheDir = path.join(__dirname, 'cache');
// process.env.F5_ENTOLI_AGENT = `${packageJson.name}/${packageJson.version}`;
// process.env.F5_ENTOLI_CACHE = cacheDir;


export default class Declare extends Command {
  static description = 'post as3 file (or directory)'

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
  }

  static args = [{
    name: 'file',
    description: 'folder or file to declare'
  }]



  async run() {
    const { args, flags } = this.parse(Declare)

    extHttp.cacheDir = this.config.cacheDir;

    const declaration = await fs.readJSONSync(args.file)

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


    // if no flags/options -> try to deploy the repo (everything)

    // if file arg

    conxLog.info('oclif/entoli cache dir', this.config.cacheDir);

    // extHttp.

    eventer
      .on('log-http-request', msg => conxLog.httpRequest(msg))
      .on('log-http-response', msg => conxLog.httpResponse(msg))
      .on('log-debug', msg => conxLog.debug(msg))
      .on('log-info', msg => conxLog.info(msg))
      .on('log-warn', msg => conxLog.warn(msg))
      .on('log-error', msg => conxLog.error(msg))
      .on('failedAuth', msg => {
        conxLog.error('Failed Authentication Event!', msg);
      });


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

    if (device.as3) {
      conxLog.info('sending as3')
      await device.as3.postDec(declaration)
        .then(resp => {
          const results = resp.data.results;

          conxLog.info('as3-post-complete', resp.status, resp.statusText, results)

        })
        .catch(err => {
          conxLog.error(err)
        })
    }

    device.clearLogin();
    conxLog.info('done')

  }
}


// https://nodejs.dev/learn/make-an-http-post-request-using-nodejs