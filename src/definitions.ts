export interface ChannelIoPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
