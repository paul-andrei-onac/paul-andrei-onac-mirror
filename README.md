# Paul Andrei Onac | Hugo Website 

Setup to build and publish Paul Andrei Onac | Hugo Website.

## Requirements

You need the following packages installed:

| Name          | Link                                             |
|---------------|--------------------------------------------------|
| `bash`        | https://www.gnu.org/software/bash/               |
| `npm`         | https://docs.docker.com/engine/install/          |
| `git`         | https://git-scm.com/                             |

## Setup

### Pull

Clone from repository

### Install

```bash
npm install
```

> If the project does not have Hugo Extended installed, or you do not have it installed on your machine. **Please install it globally or locally.** Your choice.

### Hugo Extended

Or Globally
```bash
npm i -g hugo-extended
```

Or Locally
```bash
npm i hugo-extended
```

### Build

```bash
npx hugo
```

### Run

```bash
npx hugo server --disableFastRender
```

#### Side Note
> After you made changes run this command to clean up the public folder.

```bash
rm -r public && hugo
```
