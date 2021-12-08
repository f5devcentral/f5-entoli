import {Command, flags} from '@oclif/command'
import request from 'http';

export default class Status extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    request.get(`http://localhost:3000/status`, (res) => {
      res.pipe(process.stdout);
    });
  }
}
