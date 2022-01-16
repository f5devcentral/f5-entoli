import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs-extra'
import * as path from 'path'
import { As3Declaration, F5Client } from 'f5-conx-core'
import { extHttp, conxLog, eventer } from '../../f5Worker'
import minimatch from 'minimatch';


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
    file: flags.string({
      char: 'f',
      description: 'as3 file to declare',
      multiple: true,
    }),
    folder: flags.string({
      char: 'F',
      description: 'as3 folder to declare ( filter=*.as3.json )',
      multiple: true,
    }),
    filter: flags.string({
      char: 'x',
      description: 'file filter for folder flag',
      default: '*.as3.json'
    })
  }

  static args = [{
    name: 'file',
  }]



  async run() {
    const { args, flags } = this.parse(Declare)

    // re-assing this/cli logging function
    const cliLogger = this.log;

    // redirect conx logger through the cli logger
    conxLog.output = function (x: string) {
      cliLogger(x);
    };

    const decs: {
      path: string;
      dec: As3Declaration
    }[] = [];

    // did we get a file argument (not flag)?
    if (args.file) {
      const filePath = args.file
      try {
        decs.push({
          path: filePath,
          dec: fs.readJSONSync(filePath)
        })
      } catch (e) {
        this.log(`could not read/jsonify ${filePath}`)
      }
    }

    // loop through folders and read in files with filter
    if (flags.folder) {
      flags.folder.map(async dirPath => {
        fs.readdirSync(dirPath)
          .map(item => {
            const filePath = path.join(dirPath, item)
            const found = minimatch(item, flags.filter)
            // debugger;
            if (found) {
              // try to read the file and parse to json
              try {
                decs.push({
                  path: filePath,
                  dec: fs.readJSONSync(filePath)
                })
              } catch (e) {
                this.log(`could not read/jsonify ${filePath}`)
              }
            }
          })
      });
    }


    // add in any specific files
    if (flags.file) {
      flags.file.map(async filePath => {
        try {
          decs.push({
            path: filePath,
            dec: fs.readJSONSync(filePath)
          })
        } catch (e) {
          this.log(`could not read/jsonify ${filePath}`)
        }
      })
    }


    // validate declarations with schema?

    // if no password, prompt user
    if (!flags.password) {
      flags.password = await cli.prompt('Password?', { type: 'hide' })
    }


    conxLog.info('oclif/entoli cache dir', this.config.cacheDir);

    // debugger;

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
      for await (const d of decs) {
        conxLog.info(`posting ${d.path}`)
        await device.as3.postDec(d.dec)
          .then(resp => {
            const results = resp.data.results;
            conxLog.info('as3-post-complete', resp.status, resp.statusText, results)
          })
          .catch(err => {
            conxLog.error(err);
            throw err;
          })
      }
    }

    device.clearLogin();
    conxLog.info('done')

  }
}


// https://nodejs.dev/learn/make-an-http-post-request-using-nodejs