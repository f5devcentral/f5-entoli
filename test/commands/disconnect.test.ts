import {expect, test} from '@oclif/test'

describe('disconnect', () => {
  test
  .stdout()
  .command(['disconnect'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['disconnect', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
