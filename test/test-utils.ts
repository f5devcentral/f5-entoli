import {opendirSync} from 'fs'
import {join} from 'path'
import {glob} from 'glob'

export {expect, test} from '@oclif/test'

function preloadCommands() {
  // Adjust the path below if you put this module somewhere other than a top-level "test" directory
  const commandsDir = opendirSync(join(__dirname, 'commands'))

  const allTsFileNames = glob.sync('**/*.ts', {cwd: commandsDir.path})
  const testFileNames = glob.sync('**/*.test.ts', {cwd: commandsDir.path})

  allTsFileNames.forEach(filename => {
    if (!testFileNames.includes(filename)) {
      const commandPath = join(commandsDir.path, filename)
      require(commandPath)
    }
  })
}

preloadCommands()