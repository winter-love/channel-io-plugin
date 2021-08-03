package io.coong.plugins.channelio;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.zoyi.channel.plugin.android.ChannelIO;
import com.zoyi.channel.plugin.android.open.config.BootConfig;
import com.zoyi.channel.plugin.android.open.callback.BootCallback;
import com.zoyi.channel.plugin.android.open.enumerate.BootStatus;

@CapacitorPlugin(name = "ChannelIoPlugin")
public class ChannelIoPluginPlugin extends Plugin {

    private ChannelIoPlugin implementation = new ChannelIoPlugin();

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }
    
    @PluginMethod()
    public void boot(PluginCall call) {
        String pluginKey = call.getString("pluginKey");
        String memberId = call.getString("memberId");
        String memberHash = call.getString("memberHash");
        Boolean hidePopup = call.getBoolean("hidePopup");
        Boolean trackDefaultEvent = call.getBoolean("trackDefaultEvent");
        BootConfig bootConfig = BootConfig.create(pluginKey);
        bootConfig.setMemberId(memberId);
        bootConfig.setMemberHash(memberHash);
        bootConfig.setHidePopup(hidePopup);
        bootConfig.setTrackDefaultEvent(trackDefaultEvent);
        BootCallback bootCallback = (bootStatus, user) -> {
            JSObject ret = new JSObject();
            if (bootStatus == BootStatus.SUCCESS && user != null) {
                ret.put("name", user.getName());
                ret.put("id", user.getId());
                ret.put("memberId", user.getMemberId());
                ret.put("avatarUrl", user.getAvatarUrl());
                ret.put("language", user.getLanguage());
                ret.put("unsubscribed", user.isUnsubscribed());
                ret.put("alert", user.getAlert());
                call.resolve(ret);
            } else {
                call.reject(pluginKey);
            }
        };
        ChannelIO.boot(bootConfig, bootCallback);
    }
    
    @PluginMethod()
    public void show(PluginCall call) {
        ChannelIO.showChannelButton();
        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }

    @PluginMethod()
    public void hide(PluginCall call) {
        ChannelIO.hideChannelButton();
        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }

    @PluginMethod()
    public void shutdown(PluginCall call) {
        ChannelIO.shutdown();
        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }
}
