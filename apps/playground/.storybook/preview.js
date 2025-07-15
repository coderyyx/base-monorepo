import './global.scss';

import { setupPlugins } from './setup';

export const decorators = [
  (story) => ({
    components: { story },
    template: `
      <div>
        <story />
      </div>
    `,
  }),
];

setupPlugins();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
