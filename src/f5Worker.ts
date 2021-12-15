
import * as fs from 'fs-extra'
import * as path from 'path'

import Command from '@oclif/command'
import { Config } from '@oclif/config'
import Logger from 'f5-conx-core/dist/logger'
import { ExtHttp, F5Client } from 'f5-conx-core'
import { EventEmitter } from 'events';


export const eventer = new EventEmitter();
export const extHttp: ExtHttp = new ExtHttp({ rejectUnauthorized: false, eventEmitter: eventer });

export const conxLog = new Logger('F5_ENTOLI_LOG');
conxLog.console = false;

const cacheDir = path.join(__dirname, 'cache');
// process.env.F5_ENTOLI_AGENT = `${packageJson.name}/${packageJson.version}`;
// process.env.F5_ENTOLI_CACHE = cacheDir;

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


// export class F5Command extends Command {

//     extHttp.cacheDir = this.config.cacheDir;

//     // re-assing this/cli logging function
//     const cliLogger = this.log;

//     // redirect conx logger through the cli logger
//     conxLog.output = function (x: string) {
//         cliLogger(x);
//     };

// }