import {expect, test} from '@oclif/test'
import * as path from 'path';

describe('as3', () => {

  const as3 = path.join(__dirname, '..', '..', '..', 'tenants', 'app1.as3.json')
  test
  .stdout()
  .command(['as3:declare', as3, '-d', '10.200.244.5', '-p', 'benrocks'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain("tenant: 'Sample_01'")
  })


})
