module.exports= {
    start: function (msg, admin) {
        markup = adminvarsm.markups.useropration
        return adminbot.sendMessage(msg.from.id, adminvarsm.messages.userlist, {markup}).then(re => {
            new adminutilm.saveLastMessage(admin, re);
        })
    },
    useropration: function (msg, admin) {
        markup = adminvarsm.markups.useropration
        adminutilm.updatemessage(
            msg.from.id,
            admin.messages[admin.messages.length - 1].messageid,
            adminvarsm.messages.userlist,
            markup
        )
    },
    userlist: function (msg, admin) {
        var params = msg.data.split('~')

        if (params.length == 1) {
            params.push(0);
        }

        usermodel.find({step: 'ok'}, null, {
            sort: {create: -1},
            skip: 20 * parseInt(params[1]),
            limit: 20
        }, function (err, users) {
            btns = [];
            for (ci = 0; ci < users.length; ci++) {
                btns.push([adminbot.inlineButton(users[ci].username, {callback: 'userlist-' + users[ci].chatid})])
            }
            forcb = (params[0] + "~" + (parseInt(params[1]) + 1).toString()).toString("utf8")
            backcb = (parseInt(params[1]) === 0 ? params[0] + "~0" : params[0] + "~" + (parseInt(params[1]) - 1).toString()).toString("utf8")
            //console.log('for',forcb,'back' ,backcb)
            btns.push([
                adminbot.inlineButton('<<', {callback: forcb}),
                adminbot.inlineButton('>>', {callback: backcb})
            ])
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'backtouseropration'})])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.userlist,
                markup
            )
        })
    },
    userlistopration: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({chatid: params[1]}, function (err, user) {
            btns = [];
            btns.push([adminbot.inlineButton('مسدود', {callback: 'userdoblock-' + params[1]})])
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'userlist'})])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.userinfo.replace('~username', user.username).replace('~name', user.name)
                + (user.number ? "\r\nشماره :" + user.number : "")
                ,
                markup
            )
        })
    },
    userdoblock: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({chatid: params[1]}, function (err, user) {
            user.step = "block";
            user.save();
            adminbot.answerCallbackQuery(msg.id, {text: adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(params[1], adminvarsm.messages.blocked, {markup});
        })
    },
    userblock: function (msg, admin) {
        var params = msg.data.split('~')

        if (params.length == 1) {
            params.push(0);
        }
        usermodel.find({step: 'block'}, null, {
            sort: {create: -1},
            skip: 20 * parseInt(params[1]),
            limit: 20
        }, function (err, users) {
            btns = [];
            for (ci = 0; ci < users.length; ci++) {
                btns.push([adminbot.inlineButton(users[ci].username, {callback: 'userblock-' + users[ci].chatid})])
            }
            forcb = (params[0] + "~" + (parseInt(params[1]) + 1).toString()).toString("utf8")
            backcb = (parseInt(params[1]) === 0 ? params[0] + "~0" : params[0] + "~" + (parseInt(params[1]) - 1).toString()).toString("utf8")
            //console.log('for',forcb,'back' ,backcb)
            btns.push([
                adminbot.inlineButton('<<', {callback: forcb}),
                adminbot.inlineButton('>>', {callback: backcb})
            ])
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'backtouseropration'})])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.userlist,
                markup
            )
        })
    },
    userblockopration: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({chatid: params[1]}, function (err, user) {
            btns = [];
            btns.push([adminbot.inlineButton('خروج از بلاکی', {callback: 'userdook-' + params[1]})])
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'userblock'})])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.userinfo.replace('~username', user.username).replace('~name', user.name)
                + (user.number ? "\r\nشماره :" + user.number : "")
                , markup
            )
        })
    },
    userdook: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({chatid: params[1]}, function (err, user) {
            user.step = "ok";
            user.save()
            adminbot.answerCallbackQuery(msg.id, {text: adminvarsm.messages.done, showAlert: true});
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(params[1], adminvarsm.messages.verified, {markup});
        })
    }
}