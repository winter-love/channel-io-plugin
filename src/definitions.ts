export interface BootOptions {
  /**
   * hide channel io button after boot
   * web only
   * @default false
   */
  hideChannelButtonOnBoot?: boolean
  hidePopup?: string
  memberHash?: string
  memberId?: string
  pluginKey: string
  trackDefaultEvent?: string
}

export interface BootResult {
  name: string
}

export interface ChannelIoPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  boot(options: BootOptions): Promise<BootResult | false>
  hide(): Promise<boolean>
  show(): Promise<boolean>
  shutdown(): Promise<boolean>
}
