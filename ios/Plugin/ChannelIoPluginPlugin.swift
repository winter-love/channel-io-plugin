import Foundation
import Capacitor


import Capacitor
import ChannelIO
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(ChannelIoPluginPlugin)
public class ChannelIoPluginPlugin: CAPPlugin {
    private let implementation = ChannelIoPlugin()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
    
    @objc func boot(_ call: CAPPluginCall) {
        let pluginKey = call.getString("pluginKey") ?? ""
        let memberId = call.getString("memberId") ?? nil
        let memberHash = call.getString("memberHash") ?? nil
        let hidePopup = call.getBool("hidePopup") ?? false
        let trackDefaultEvent = call.getBool("trackDefaultEvent") ?? true
        let bootConfig = BootConfig(pluginKey: pluginKey, memberId: memberId, memberHash: memberHash, hidePopup: hidePopup, trackDefaultEvent: trackDefaultEvent)

        ChannelIO.boot(with: bootConfig) { (completion, user) in
            if completion == .success, let user = user {
                call.resolve([
                    "name": user.name,
                    "id": user.id,
                    "memberId": user.memberId,
                    "avatarUrl": user.avatarUrl ?? "",
                    "language": user.language ?? "",
                    "unsubscribed": user.unsubscribed,
                    "alert": user.alert,
                ])
            } else {
                call.reject(pluginKey)
            }
        }
    }
    
        @objc func show(_ call: CAPPluginCall) {
            ChannelIO.showChannelButton()
            call.resolve(["value": true])
        }
    
        @objc func hide(_ call: CAPPluginCall) {
            ChannelIO.hideChannelButton()
            call.resolve(["value": true])
        }
    
        @objc func shutdown(_ call: CAPPluginCall) {
            ChannelIO.shutdown()
            call.resolve(["value": true])
        }
}
