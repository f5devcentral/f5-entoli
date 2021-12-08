/**
 * Copyright 2021 F5 Networks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import Koa from 'koa';
import path from 'path';

import logger from 'koa-logger';
import json from 'koa-json';
import { routes } from './routes';

import Logger from 'f5-conx-core/dist/logger'
import { ExtHttp, F5Client } from 'f5-conx-core'
import { EventEmitter } from 'events';
//  import { socket } from './serverSocket'

// SETUP SERVICE DETAILS

const port = 3000;
const app = new Koa();
const args = process.argv;

export const log = new Logger('F5_ENTOLI_LOG');
log.console = true

console.log('\n')
// log.info('entoli_service_args', args)

const host = args[2]
const user = args[3]
const password = args[4];
const debug = args[5];

if (!host || !user || !password) {
  log.info('---not right envs passed in---')
}

process.on('message', msg => log.info('message in child from parent', msg))

const eventer = new EventEmitter();

const cacheDir = path.join(__dirname, 'cache');
// process.env.F5_ENTOLI_AGENT = `${packageJson.name}/${packageJson.version}`;
// process.env.F5_ENTOLI_CACHE = cacheDir;

log.info('cache dir', cacheDir);

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const extHttp = new ExtHttp({ rejectUnauthorized: false, eventEmitter: eventer });

extHttp.cacheDir = cacheDir;
// extHttp.

eventer
  .on('log-http-request', msg => log.httpRequest(msg))
  .on('log-http-response', msg => log.httpResponse(msg))
  .on('log-debug', msg => log.debug(msg))
  .on('log-info', msg => log.info(msg))
  .on('log-warn', msg => log.warn(msg))
  .on('log-error', msg => log.error(msg))
  .on('failedAuth', msg => {
    log.error('Failed Authentication Event!', msg);
  });


export const device = new F5Client(host, user, password)

device
  .discover()
  .then(disc => {
    log.info('connected', disc, '\n');
    //  socket.listen();
  })
  .catch(err => {
    console.error('connect err', err);
    koaServer.close();
  })

// middlewares
app.use(json({ pretty: false, param: 'pretty' }));
if (debug) {
  app.use(logger());
}

app.use(routes);

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    ctx.status = error.statusCode || error.status;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Application error logging.
app.on('error', err => console.error('koa-err: ', err));

export const koaServer = app.listen(port, () => {
  log.info('started entoli service on:', port)
})



/**
 * disable token clear in f5-conx-core mgmtClient.ts cline 267
 */


