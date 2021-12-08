import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import { fork } from 'child_process'

export default class Connect extends Command {
  static description = 'Connect/Discover'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // device: flags.string({
    //   char: 'd',
    //   description: 'F5 device to connect to',
    //   required: true
    // }),
    // // flag with no value (-f, --force)
    // username: flags.string({
    //   char: 'u',
    //   description: 'username to connect with',
    //   required: true
    // }),
    // password: flags.string({
    //   char: 'p',
    //   description: 'password to go with username',
    // }),

  }

  static args = [
    {
      name: 'device',
      description: 'f5 device to connect to',
      required: true,
    },
    {
      name: 'username',
      description: 'username to connect with',
      required: true
    },
    {
      name: 'password',
      description: 'password to go with username',
    }
  ]

  async run() {
    const { args, flags } = this.parse(Connect)

    if (!args.password) {
      args.password = await cli.prompt('Password?', { type: 'hide' })
    }

    // this.log('args', args)
    // this.log('flags', flags)

    // https://github.com/TypeStrong/ts-node/issues/619
    // const subprocess = fork('./src/service.ts', [args.device, args.username, args.password], {
    const subprocess = fork('./lib/service.js', [args.device, args.username, args.password], {
      detached: true,
      stdio: [0, 1, 2, 'ipc']
    });

    subprocess.on('error', (err) => {
      // This will be called with err being an AbortError if the controller aborts
      console.log('subprocess-fork-error', err)
    });

    subprocess.on('data', function (data) {
      console.log('subprocess-logs', data.toString());
    });
    subprocess.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })

    console.log('pid:', subprocess.pid)
    // console.log('pid:', subprocess.)
    subprocess.send(subprocess.pid)


    subprocess.unref();
    subprocess.disconnect();

  }
}
