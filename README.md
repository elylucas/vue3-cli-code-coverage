# Cypress Code Coverage Example for Vue3 and Vue CLI 5

To get code coverage running in a Vue app with Vue CLI, follow these steps:

## Install `babel-plugin-istanbul`:

```bash
npm i -D babel-plugin-istanbul
```

## Configure the plugin in babel.config.js:

```js
const plugins = [];

if (process.env.NODE_ENV === 'test') {
  plugins.push([
    'babel-plugin-istanbul',
    {
      extension: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
    },
  ]);
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
};
```

Above, we only install the plugin when the NODE_ENV environment variable is set
to 'test'

## Install Cypress Code Coverage Plugin:

```bash
npm i -D @cypress/code-coverage
```

## Update the Cypress config file to register code coverage tasks:

```js
import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {
      if (process.env.NODE_ENV === 'test') {
        codeCoverageTask(on, config);
      }
      return config;
    },
  },
});
```

Above, we only register the task when the NODE_ENV environment variable is set
to 'test'

## Update the support files (./cypress/support/e2e.ts and/or ./cypress/support/component.ts) to include the hook lifecyles:

```js
//Load code coverage hooks in test env
if (process.env.NODE_ENV === 'test') {
  require('@cypress/code-coverage/support');
}
```

Above, we only register the support hooks when the NODE_ENV environment variable
is set to 'test'
