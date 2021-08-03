import {WebPlugin} from '@capacitor/core'

import type {ChannelIoPluginPlugin, BootOptions, BootResult} from './definitions'

interface ChannelIoFunc {
  (kind: 'boot', options: BootOptions, callback: (error: any, user: BootResult) => any): void

  (kind: 'showChannelButton'): void

  (kind: 'hideChannelButton'): void
}

const getWebChannelIo = (): ChannelIoFunc | false => {
  const ChannelIO = window.ChannelIO
  if (ChannelIO) {
    return ChannelIO
  }
  return false
}

export class ChannelIoPluginWeb
  extends WebPlugin
  implements ChannelIoPluginPlugin {
  async echo(options: {value: string}): Promise<{value: string}> {
    console.log('ECHO', options)
    return options
  }
  
  boot(options: BootOptions): Promise<BootResult | false> {
    const {pluginKey, ...rest} = options
    const channelIo = getWebChannelIo()
    if (!channelIo) {
      return Promise.resolve(false)
    }
    return new Promise((resolve, reject) => {
      channelIo('boot', {
        ...rest,
        hideChannelButtonOnBoot: true,
        pluginKey,
      }, (error: any, user: BootResult) => {
        if (error) {
          reject(new Error('boot error'))
          return
        }
        resolve(user)
      })
    })
  }

  hide(): Promise<boolean> {
    const channelIo = getWebChannelIo()
    if (!channelIo) {
      return Promise.resolve(false)
    }
    channelIo('showChannelButton')
    return Promise.resolve(true)
  }

  show(): Promise<boolean> {
    const channelIo = getWebChannelIo()
    if (!channelIo) {
      return Promise.resolve(false)
    }
    channelIo('hideChannelButton')
    return Promise.resolve(true)
  }
  
  shutdown(): Promise<boolean> {
    return Promise.resolve(true)
  }
}
