import Foundation

@objc public class ChannelIoPlugin: NSObject {
    @objc public func echo(_ value: String) -> String {
        return value
    }
}
