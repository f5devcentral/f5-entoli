import { expect, test } from '@oclif/test'
import * as path from 'path';
import { 
  atcMetaData,
  AuthTokenReqBody, 
  getFakeToken, 
  iControlEndpoints, 
  ipv6Host,
  deviceInfoIPv6,
  as3InfoApiReponse
} from 'f5-conx-core';

describe('as3', () => {

  const as3App1 = path.join(__dirname, '..', '..', '..', 'tenants', 'app1.as3.json')

  // test
  // .stdout()
  // .command(['as3:declare'])
  // .it('as3 command, no input, should return help', ctx => {
  //   expect(ctx.stdout).to.contain("help")
  // })


  test
    .stdout()
    .nock(`https://${ipv6Host}`, api => api
      .post(iControlEndpoints.login)
      .reply(200, (uri, reqBody: AuthTokenReqBody) => {
          return getFakeToken(reqBody.username, reqBody.loginProviderName);
      })
      //discover endpoint
      .get(iControlEndpoints.tmosInfo)
      .reply(200, deviceInfoIPv6)
      .get(atcMetaData.as3.endPoints.info)
      .reply(200, as3InfoApiReponse)
    )
    .command([
      'as3:declare', as3App1, '-d', '192.168.255.131', '-p', 'benrocks'
    ])
    .it('basic as3 with file as arg', ctx => {
      const x = ctx.stdout;
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })

  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-f', './tenants/app1.as3.json'
    ])
    .it('basic as3 with file as flag', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })

  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-f', './tenants/app1.as3.json',
      '-f', './tenants/app2.as3.json'
    ])
    .it('2 as3 as file flags', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_02'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })


  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-f', './tenants/app1.as3.json',
      '-f', './tenants/app2.as3.json',
      '-f', './tenants/app3.as3.json'
    ])
    .it('3 as3 as file flags', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_02'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_03'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })




  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-F', './tenants',
    ])
    .it('post as3 files from folder flag', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_02'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_03'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })



  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-F', './tenants',
      '-F', './tenants2'
    ])
    .it('post as3 files from 2 folder flags', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_02'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_03'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_04'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_05'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_06'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })


  test
    .stdout()
    .command([
      'as3:declare', '-d', '192.168.255.131', '-p', 'benrocks',
      '-F', './tenants',
      '-x', 'app*.as3.json'
    ])
    .it('post as3 files from folder flags with filter', ctx => {
      expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_02'")
      expect(ctx.stdout).to.contain("tenant: 'Sample_03'")
      expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
    })




})
