import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import request from 'http'

export default class As3 extends Command {
  static description = 'post as3 file (or directory)'

  static flags = {
    help: flags.help({char: 'h'}),
    declare: flags.string({
      char: 'd',
      description: 'post as3 file',
    }),
  }

  // static args = [{
  //   name: 'file',
  //   required: true
  // }]

  async run() {
    const {args, flags} = this.parse(As3)

    this.log('as3 call', args, flags)

    const data = JSON.stringify(flags.declare)

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/as3',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    request.request(options, (res) => {
      res.pipe(process.stdout);
    });

    // if (flags.declare) {
    //   await fs.readJSON(flags.declare)
    //     .then( obj => {

    //   })

    // }


  }
}


// https://nodejs.dev/learn/make-an-http-post-request-using-nodejs