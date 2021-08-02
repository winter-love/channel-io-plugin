import { WebPlugin } from '@capacitor/core';

import type { ChannelIoPluginPlugin } from './definitions';

export class ChannelIoPluginWeb
  extends WebPlugin
  implements ChannelIoPluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
