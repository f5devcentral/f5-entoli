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

import Router from 'koa-router';
import { koaServer, device, log } from './service';
import { socket } from './serverSocket';
import { timer } from './timer';

const router = new Router();

router.get('/', async (ctx, next) => {
    log.info("routes", router.stack.map(el => el.path))
})

router.get('/disconnect', async (ctx, next) => {
    ctx.body = '\nquitting -> goodbye!\n\n';
    koaServer.close();
    socket.close();
})

router.post('/as3', async (ctx, next) => {
    console.log('incoming as3 post body', ctx.request.)
    ctx.body = { msg: 'posting as3 started' };
    console.log('\n')
    timer()
})

router.get('/status', async (ctx, next) => {
    log.info('status called')
    ctx.body = { 
        status: 'connected', 
        hostname: device.host?.hostname,
        managementAddress: device.host?.managementAddress,
        version: device.host?.version,
        product: device.host?.product,
        isClustered: device.host?.isClustered,
        isVirtual: device.host?.isVirtual,
        atc: {}
    };
    if(device?.as3) {
        ctx.body.atc.as3 = device.as3.version.version
    }
    if(device?.do) {
        ctx.body.atc.do = device.do.version.version
    }
    // ctx.body = `${JSON.stringify(ctx.body)}\n`
    // ctx.body = ctx.body
    await next();
})

router.get('/status/token', async (ctx, next) => {
    ctx.body = `tokenTimeout: ${device.mgmtClient.tokenTimeout}\n`;
    await next();
})

router.get('/logs', async (ctx, next) => {
    ctx.body = log.journal;
    await next();
})
router.get('/logs/text', async (ctx, next) => {
    ctx.body = [
        log.journal.join('\n'),
        '\n'
    ].join();
    await next();
})


export const routes = router.routes();