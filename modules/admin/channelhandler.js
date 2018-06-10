module.exports= {
    start: function (msg, admin) {

        markup = adminvarsm.markups.channelopration
        return adminbot.sendMessage(msg.from.id, adminvarsm.messages.channellist, {markup}).then(re => {
            new adminutilm.saveLastMessage(admin, re);
        })
    }
    ,
    channelopration: function (msg, admin) {

        markup = adminvarsm.markups.channelopration
        adminutilm.updatemessage(
            msg.from.id,
            admin.messages[admin.messages.length - 1].messageid,
            adminvarsm.messages.channellist,
            markup
        )
    }
    ,
    channellist: function (msg, admin, step) {
        var params = msg.data.split('~')

        if (params.length == 1) {
            params.push(0);
        }
        //console.log('ski[p',step,parseInt(params[1]))
        adminutilm.getchannels(step, parseInt(params[1]), 20, function (err, channels) {
            //console.log(channels.length);
            if (channels && channels.length > 0) {
                channels = channels[0].channels;
                console.log(channels.length);
                btns = [];
                part = step
                if (step == "waitforverify") {
                    part = "list"
                }
                for (ci = 0; ci < channels.length; ci++) {
                    if (channels[ci].tag && channels[ci]['_id']) {
                        console.log(channels[ci].tag + "---" + channels[ci]['_id'])

                        btns.push([adminbot.inlineButton(channels[ci].tag, {callback: 'channel' + part + '-' + channels[ci]['_id']})])
                    }
                }
                forcb = (params[0] + "~" + (parseInt(params[1]) + 1).toString()).toString("utf8")
                backcb = (parseInt(params[1]) === 0 ? params[0] + "~0" : params[0] + "~" + (parseInt(params[1]) - 1).toString()).toString("utf8")
                //console.log('for',forcb,'back' ,backcb)
                btns.push([
                    adminbot.inlineButton('<<', {callback: forcb}),
                    adminbot.inlineButton('>>', {callback: backcb})
                ])
                btns.push([adminbot.inlineButton('بازگشت', {callback: 'backtochannelopration'})])
                btns = adminbot.inlineKeyboard(btns);
                markup = btns;
                adminutilm.updatemessage(
                    msg.from.id,
                    admin.messages[admin.messages.length - 1].messageid,
                    adminvarsm.messages.channellist,
                    markup
                )
            } else {
                markup = adminvarsm.markups.channelopration
                adminutilm.updatemessage(
                    msg.from.id,
                    admin.messages[admin.messages.length - 1].messageid,
                    adminvarsm.messages.channellist,
                    markup
                )
                return adminbot.answerCallbackQuery(msg.id, {
                    text: adminvarsm.messages.channelnotexistopration,
                    showAlert: true
                });
            }
        })
    }
    ,
    channellistopration: function (msg, admin, step, back) {
        var params = msg.data.split('-')
        console.log(step);
        adminutilm.getchannel(params[1], step, function (err, channel, user) {
            if (user) {
                console.log(user)
                btns = [];
                if (step != "requestfordelete") {
                    btns.push([adminbot.inlineButton('تغییر دسته', {callback: 'channelcategories-' + msg.data})])
                    if (step != "verified")
                        btns.push([adminbot.inlineButton('تایید', {callback: 'channeldoverify-' + msg.data})])
                    if (step != "blocked")
                        btns.push([adminbot.inlineButton('مسدود', {callback: 'channeldoblock-' + msg.data})])
                    if (step != "deleted")
                        btns.push([adminbot.inlineButton('حذف', {callback: 'channeldodelete-' + msg.data})])
                }
                else {
                    btns.push([adminbot.inlineButton("حذف", {callback: 'channeldodeleted-' + params[1]})])
                    btns.push([adminbot.inlineButton("رد حذف کانال", {callback: 'channeldenydeleted-' + params[1]})])
                }
                if (step == "blocked") {
                    btns = [];
                    btns.push([adminbot.inlineButton('خروج از بلاکی', {callback: 'channeldoverify-' + msg.data})])
                }
                if (params.length == 2) {
                    btns.push([adminbot.inlineButton('بازگشت', {callback: back})])
                }
                btns = adminbot.inlineKeyboard(btns);
                // console.log(channel);
                markup = btns;
                adminutilm.updatemessage(
                    msg.from.id,
                    admin.messages[admin.messages.length - 1].messageid,
                    'ادمین کانال :@' + user.username + "\r\n" +
                    adminvarsm.messages.channeloprations
                        .replace('~tag', channel.tag)
                        .replace('~cardno', channel.cardno)
                        .replace('~shebano', channel.shebano)
                        .replace('~setltype', channel.setltype || "")
                        .replace('~cardname', channel.cardname || "")
                        .replace('~categories', channel.categories.join("\r\n"))
                    + (channel.otherchannels ? "کانال  های مشارکت کننده:" + channel.otherchannels : ""
                    ),
                    markup
                )
            }
        })
    }
    ,
    channeldodelete: function (msg, admin) {
        // var parts=msg.data.split('~')
        var params = msg.data.split('-')
        btns = [];
        for (ci = 0; ci < adminvarsm.constants.channeldeleteopration.length; ci++) {
            btns.push([adminbot.inlineButton(adminvarsm.constants.channeldeleteopration[ci], {callback: 'channeldodeleted-' + params[2] + '-' + ci})])
        }
        btns.push([adminbot.inlineButton('بازگشت', {callback: params[1]})])
        btns = adminbot.inlineKeyboard(btns);
        markup = btns;
        adminutilm.updatemessage(
            msg.from.id,
            admin.messages[admin.messages.length - 1].messageid,
            adminvarsm.messages.chooseoption,
            markup
        )
    },
    channeldoblock: function (msg, admin) {
        var params = msg.data.split('-')
        btns = [];
        for (ci = 0; ci < adminvarsm.constants.channelblockopration.length; ci++) {
            btns.push([adminbot.inlineButton(adminvarsm.constants.channelblockopration[ci], {callback: 'channeldoblocked-' + params[2] + '-' + ci})])
        }
        btns.push([adminbot.inlineButton('بازگشت', {callback: params[1]})])
        btns = adminbot.inlineKeyboard(btns);
        markup = btns;
        adminutilm.updatemessage(
            msg.from.id,
            admin.messages[admin.messages.length - 1].messageid,
            adminvarsm.messages.chooseoption,
            markup
        )
    }
    ,
    channeldoverify: function (msg, admin) {
        var params = msg.data.split('-')
        // console.log(params);
        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[2])}}}, function (err, user) {
            for (ci = 0; ci < user.channels.length; ci++) {
                if (user.channels[ci]['_id'] == params[2]) {
                    user.channels[ci]['step'] = "verified";
                    targetchannel = user.channels[ci]
                    user.save();
                    new adminutilm.sendChannelData(
                        user.channels[ci]['otherchannels'],
                        user.channels[ci]['tag'],
                        user.channels[ci]['categories'],
                        user.chatid,
                        user.username,
                        'verify'
                    );
                }
            }
            adminbot.answerCallbackQuery(msg.id, {text: adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(user.chatid,
                adminvarsm.messages.channelverified + "\r\n" +
                adminvarsm.messages.channeloprations
                    .replace('~tag', targetchannel.tag)
                    .replace('~cardno', targetchannel.cardno)
                    .replace('~shebano', targetchannel.shebano)
                    .replace('~setltype', targetchannel.setltype || "")
                    .replace('~cardname', targetchannel.cardname || "")
                    .replace('~categories', targetchannel.categories.join("\r\n"))
                + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                ), {markup});

        })

    }
    ,
    channeldoblocked: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[1])}}}, function (err, user) {
            for (ci = 0; ci < user.channels.length; ci++) {
                if (user.channels[ci]['_id'] == params[1]) {
                    user.channels[ci]['step'] = "blocked";
                    targetchannel = user.channels[ci]
                    user.save();
                    new adminutilm.sendChannelData(
                        user.channels[ci]['otherchannels'],
                        user.channels[ci]['tag'],
                        user.channels[ci]['categories'],
                        user.chatid,
                        user.username,
                        'block'
                    );
                }
            }

            adminbot.answerCallbackQuery(msg.id,{text:adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(user.chatid,
                adminvarsm.messages.channelblocked + "\r\n" +
                adminvarsm.constants.channelblockopration[params[2]] + "\r\n" +
                adminvarsm.messages.channeloprations
                    .replace('~tag', targetchannel.tag)
                    .replace('~cardno', targetchannel.cardno)
                    .replace('~shebano', targetchannel.shebano)
                    .replace('~setltype', targetchannel.setltype || "")
                    .replace('~cardname', targetchannel.cardname || "")
                    .replace('~categories', targetchannel.categories.join("\r\n"))
                + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                ), {markup});

        })

    }
    ,
    channeldodeleted: function (msg, admin) {
        var params = msg.data.split('-')
        //console.log(params);
        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[1])}}}, function (err, user) {
            //console.log(user.chatid);
            for (ci = 0; ci < user.channels.length; ci++) {
                if (user.channels[ci]['_id'] == params[1]) {
                    user.channels[ci]['step'] = "deleted";
                    targetchannel = user.channels[ci]
                    user.save();
                    new adminutilm.sendChannelData(
                        user.channels[ci]['otherchannels'],
                        user.channels[ci]['tag'],
                        user.channels[ci]['categories'],
                        user.chatid,
                        user.username,
                        'delete'
                    );
                }
            }
            reason = "";
            if (params.length == 3) {
                reason = adminvarsm.constants.channeldeleteopration[params[2]]
            }
            else {
                reason = "درخواست کاربر"
            }
            adminbot.answerCallbackQuery(msg.id,{text:adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(user.chatid,
                adminvarsm.messages.channeldeleted + "\r\n" +
                reason + "\r\n" +
                adminvarsm.messages.channeloprations
                    .replace('~tag', targetchannel.tag)
                    .replace('~cardno', targetchannel.cardno)
                    .replace('~shebano', targetchannel.shebano)
                    .replace('~setltype', targetchannel.setltype || "")
                    .replace('~cardname', targetchannel.cardname || "")
                    .replace('~categories', targetchannel.categories.join("\r\n"))
                + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                ), {markup});

        })

    }
    ,
    channeldenydeleted: function (msg, admin) {
        var params = msg.data.split('-')
        //console.log(params);
        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[1])}}}, function (err, user) {
            //console.log(user.chatid);
            for (ci = 0; ci < user.channels.length; ci++) {
                if (user.channels[ci]['_id'] == params[1]) {
                    user.channels[ci]['step'] = "verified";
                    targetchannel = user.channels[ci]
                    user.save();
                    new adminutilm.sendChannelData(
                        user.channels[ci]['otherchannels'],
                        user.channels[ci]['tag'],
                        user.channels[ci]['categories'],
                        user.chatid,
                        user.username,
                        'verify'
                    );
                }
            }
            adminbot.answerCallbackQuery(msg.id,{text:adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(user.chatid,
                adminvarsm.messages.deletedeny + "\r\n" +
                adminvarsm.messages.channeloprations
                    .replace('~tag', targetchannel.tag)
                    .replace('~cardno', targetchannel.cardno)
                    .replace('~shebano', targetchannel.shebano)
                    .replace('~setltype', targetchannel.setltype || "")
                    .replace('~cardname', targetchannel.cardname || "")
                    .replace('~categories', targetchannel.categories.join("\r\n"))
                + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                ), {markup});

        })

    }

}