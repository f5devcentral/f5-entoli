import {expect, test} from '@oclif/test'

describe('info', () => {
  test
  .stdout()
  .command(['info'])
  .it('runs info', ctx => {

    // capture and parse output to json
    const outPut = JSON.parse(ctx.stdout);

    expect(outPut).to.have.keys([
      "name",
      "description",
      "version",
      "license",
      "homepage",
      "arch",
      "userAgent",
      "shell"
    ])
    
  })
})
