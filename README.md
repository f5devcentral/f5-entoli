f5-entoli
=========

f5 oss cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/f5-entoli.svg)](https://npmjs.org/package/f5-entoli)
[![Downloads/week](https://img.shields.io/npm/dw/f5-entoli.svg)](https://npmjs.org/package/f5-entoli)
[![License](https://img.shields.io/npm/l/f5-entoli.svg)](https://github.com/f5devcentral/f5-entoli/blob/master/package.json)

# notes

command (english) => εντολή (entoli -> greek)

F5 Open sourcee command line interface based on vscode-f5 extension capabilities

## Goals

- provide an open source cli that utilizes functionality found in vscode-f5 and vscode-f5-chariot that can be integrated in other solutions like repo actions
  - Can also be used with vscode to deploy an entire repo
- mirror some of the original F5-cli functionality/flow
  - <https://clouddocs.f5.com/sdk/f5-cli/>
  - <https://github.com/f5devcentral/f5-sdk-python>
  - <https://hub.docker.com/r/f5devcentral/f5-cli>
- take heavy inspiration from kubectl form and function
  - heavy focus on declarative work flows
  - support different config object output types like json and yaml
  - support yaml input files

# Table of Contents
<!-- toc -->
* [notes](#notes)
* [Table of Contents](#table-of-contents)
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
* [`entoli as3:declare [FILE]`](#entoli-as3declare-file)
* [`entoli as3:delete [FILE]`](#entoli-as3delete-file)
* [`entoli autocomplete [SHELL]`](#entoli-autocomplete-shell)
* [`entoli commands`](#entoli-commands)
* [`entoli connect DEVICE USERNAME [PASSWORD]`](#entoli-connect-device-username-password)
* [`entoli declare`](#entoli-declare)
* [`entoli devices:add [FILE]`](#entoli-devicesadd-file)
* [`entoli devices:list [FILE]`](#entoli-deviceslist-file)
* [`entoli disconnect`](#entoli-disconnect)
* [`entoli help [COMMAND]`](#entoli-help-command)
* [`entoli status`](#entoli-status)

## `entoli as3:declare [FILE]`

post as3 file (or directory)

```
USAGE
  $ entoli as3:declare [FILE]

ARGUMENTS
  FILE  folder or file to declare

OPTIONS
  -d, --device=device      (required) device to as3 with
  -h, --help               show CLI help
  -p, --password=password  password for provided username
  -u, --username=username  [default: admin] username to connect to device with
  -v, --provider=provider  [default: tmos] device provider
  --port=port              [default: 443] device port
```

_See code: [src/commands/as3/declare.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/as3/declare.ts)_

## `entoli as3:delete [FILE]`

describe the command here

```
USAGE
  $ entoli as3:delete [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/as3/delete.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/as3/delete.ts)_

## `entoli autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ entoli autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ entoli autocomplete
  $ entoli autocomplete bash
  $ entoli autocomplete zsh
  $ entoli autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `entoli commands`

list all the commands

```
USAGE
  $ entoli commands

OPTIONS
  -h, --help              Show CLI help.
  -j, --json              display unfiltered api data in json format
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --hidden                show hidden commands
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.0.1/src/commands/commands.ts)_

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

## `entoli declare`

declare environment via AS3/DO

```
USAGE
  $ entoli declare

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ entoli up
  $ entoli deploy
```

_See code: [src/commands/declare.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/declare.ts)_

## `entoli devices:add [FILE]`

describe the command here

```
USAGE
  $ entoli devices:add [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/devices/add.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/devices/add.ts)_

## `entoli devices:list [FILE]`

describe the command here

```
USAGE
  $ entoli devices:list [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/devices/list.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/devices/list.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.17/src/commands/help.ts)_

## `entoli info`

Project version and environment details

```
USAGE
  $ entoli info

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/info.ts](https://github.com/f5devcentral/f5-entoli/blob/v0.1.0/src/commands/info.ts)_


<!-- commandsstop -->
