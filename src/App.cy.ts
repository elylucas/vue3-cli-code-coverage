import App from './App.vue';

describe('<App>', () => {
  it('mounts', () => {
    cy.mount(App);
  });
});
