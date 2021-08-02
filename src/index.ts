import { registerPlugin } from '@capacitor/core';

import type { ChannelIoPluginPlugin } from './definitions';

const ChannelIoPlugin = registerPlugin<ChannelIoPluginPlugin>(
  'ChannelIoPlugin',
  {
    web: () => import('./web').then(m => new m.ChannelIoPluginWeb()),
  },
);

export * from './definitions';
export { ChannelIoPlugin };
