# @studiohyperdrive/pagination

## General

This repo contains a set of tools for pagination.

It is build with:
- node: `v14.x.x` ( ~ `lts/fermium`)
- npm: `6.14.11`

For a complete list of packages and their version check out the `package.json` file.

## Use

### Install

You can install this package by doing:
``` bash
$ npm install @studiohyperdrive/pagination
```
or if you use Yarn:
``` bash
$ yarn add @studiohyperdrive/pagination
```

### In your code
In your code, you can use this package and it's interfaces like this:

```typescript
import { Pagination, IPagination } from '@studiohyperdrive/pagination';

class ItemController {
  public async findAll(page: number, size: number, query: Record<string, unknown>): Promise<IPagination<IItem>> {
    const [items, total]: [IItem[], number] = await this.itemRepository.findAndCount(page, size);

    return Pagination<IItem>({
      items,
      page,
      path,
      query,
      size,
      total,
    });
  }
}
```

This will transform your entities and count to a HAL formatted response which you can return to the client.

### What's in the package?
This package exposes the following functions:
- `calculateTotalPages`: Calculate the total amount of pages based on the total amount of elements and the page size
- `formatQuerystring`: Format the querystring based on the page, the size and the current request querystring
- `formatLink`: Format a link based on the path, the page, the size and the current request querystring
- `Pagination`: This function is the main one which will use the above and your input to transform your input to a pagination object

And the following interfaces:
- `IPagination`: An interface for the formatted pagination object
## Setup for contribution

### Clone and install dependencies
To setup this project, clone the repo and run `yarn` to install the dependencies.

### Commands
The available commands for building the project are:

| command      | runs                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------|
| build        | This script runs rollup to compile your code (target to the `dist` folder)                                |
<br>

The available commands for testing the project are:

| command      | runs                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------|
| lint         | This script will run linting                                                                              |
| lint:fix     | This script will run linting and fix what it can                                                          |
| test         | This script will run your Jest tests for the library and create a coverage report                         |
| test:watch   | This script will run your Jest tests but with the `--watch` flag. It does not create a coverage report    |
<br>

## Publish

This project can be published to the npm registry. To do so follow these steps:
1. Run `npm version <major | minor | patch>` to create a new version and commit + tag it.
2. Open a Merge Request on Github.
3. Once your changes have been commited to the main-branch, you can publish to the repo.
4. Run `npm publish`.

## Team

This project has been created by:
- Niels Bril: niels.bril@studiohyperdrive.be

It is currently maintained by:
- Niels Bril: niels.bril@studiohyperdrive.be
