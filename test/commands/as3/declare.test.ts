import {expect, test} from '@oclif/test'
import * as path from 'path';

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
  .command(['as3:declare', as3App1, '-d', '10.200.244.5', '-p', 'benrocks'])
  .it('basic as3 with file as arg', ctx => {
    expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
    expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
  })

  test
  .stdout()
  .command(['as3:declare', '-d', '10.200.244.5', '-p', 'benrocks', '-f', './tenants/app1.as3.json'])
  .it('basic as3 with file as arg', ctx => {
    expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
    expect(ctx.stdout).to.contain("as3-post-complete 200 OK")
  })


})
