import {Command, flags} from '@oclif/command'
import { extHttp } from '../service'
import { exec } from 'child_process'
import request from 'http'

export default class Disconnect extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {

    request.get(`http://localhost:3000/disconnect`, (res) => {
      res.pipe(process.stdout);
    });
    
  }
}
