# Qubic

## Overview

It's easy to getting started:

```zsh
yarn create @qubic/project # or npx @qubic/create-project
> Project name? (qubic-app) [enter]
cd qubic-app
yarn start
```

Then you can open http://localhost:8000 in your browser (if it wasn't open automatically) to see your application.

So here we go! You **don't** need to configure Webpack/Parcel etc.
Just focus on your code.

We already configured `webpack`, `babel` and `typescript` to provide you best developer experience by making applications with **React** and **TypeScript** together.

### Build

It's also easy to make _production-ready_ bundle, just follow these command:

```zsh
yarn build
```

And that's pretty much it!

#### Environment files

By the way, you can provide `--env` command to builder, so it will be used with `.env` files, for example:

```zsh
yarn build --env stage # Will use .env.stage file if it exists
```

**NOTE:** `--env` set to _production_ by default for build script, and _development_ for start script. But setting `--env` to other values dosen't affect to `NODE_ENV`, it always set `production` for build script (need for Webpack).

So basically, default behavior looks like that:

```zsh
yarn start # Uses .env.development by default
yarn build # Uses .env.production by default
yarn build --env foo # Uses .env.foo
yarn build --env bar # Uses .env.bar
```

You can access variables from `.env` files just by `process.env` object, like that:

```
# .env.development
MY_CUSTOM_ENV=foo
```

```js
// Your TypeScript code
process.env.MY_CUSTOM_ENV; // "foo"
```

**NOTE:** You cannot access variables object by `process.env`, you should always define your variable with full path.
