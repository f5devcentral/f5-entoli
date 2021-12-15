import {expect, test} from '@oclif/test'

describe('devices:add', () => {
  test
  .stdout()
  .command(['devices:add', 'device1.test.io'])
  .it('entoli device:add', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })


})
