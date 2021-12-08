f5-entoli
=========

f5 oss cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/f5-entoli.svg)](https://npmjs.org/package/f5-entoli)
[![Downloads/week](https://img.shields.io/npm/dw/f5-entoli.svg)](https://npmjs.org/package/f5-entoli)
[![License](https://img.shields.io/npm/l/f5-entoli.svg)](https://github.com/f5devcentral/f5-entoli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g f5-entoli
$ entoli COMMAND
running command...
$ entoli (-v|--version|version)
f5-entoli/0.1.0 linux-x64 node-v14.18.2
$ entoli --help [COMMAND]
USAGE
  $ entoli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`entoli as3 [FILE]`](#entoli-as3-file)
* [`entoli connect DEVICE USERNAME [PASSWORD]`](#entoli-connect-device-username-password)
* [`entoli declare [FILE]`](#entoli-declare-file)
* [`entoli disconnect [FILE]`](#entoli-disconnect-file)
* [`entoli hello`](#entoli-hello)
* [`entoli help [COMMAND]`](#entoli-help-command)
* [`entoli info`](#entoli-info)
* [`entoli status`](#entoli-status)

## `entoli as3 [FILE]`

describe the command here

```
USAGE
  $ entoli as3 [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/as3.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/as3.ts)_

## `entoli connect DEVICE USERNAME [PASSWORD]`

Connect/Discover

```
USAGE
  $ entoli connect DEVICE USERNAME [PASSWORD]

ARGUMENTS
  DEVICE    f5 device to connect to
  USERNAME  username to connect with
  PASSWORD  password to go with username

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/connect.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/connect.ts)_

## `entoli declare [FILE]`

describe the command here

```
USAGE
  $ entoli declare [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/declare.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/declare.ts)_

## `entoli disconnect [FILE]`

describe the command here

```
USAGE
  $ entoli disconnect [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/disconnect.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/disconnect.ts)_

## `entoli hello`

describe the command here

```
USAGE
  $ entoli hello

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ entoli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/hello.ts)_

## `entoli help [COMMAND]`

display help for entoli

```
USAGE
  $ entoli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.14/src/commands/help.ts)_

## `entoli info`

Project version and environment details

```
USAGE
  $ entoli info

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/info.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/info.ts)_

## `entoli status`

describe the command here

```
USAGE
  $ entoli status

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/status.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/status.ts)_
<!-- commandsstop -->