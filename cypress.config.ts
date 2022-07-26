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
