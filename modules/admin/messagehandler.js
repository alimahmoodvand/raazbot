module.exports= {
    start: function (msg, admin, status) {
        usermodel.find({
            messageforadmin: {
                $elemMatch: {
                    status: status,
                    message: {$ne: null}
                }
            }
        }, null, {sort: {"messageforadmin.send": -1}}, function (err, users) {
            btns = [];
            for (ci = 0; ci < users.length; ci++) {

                btns.push([adminbot.inlineButton(users[ci].username, {callback: 'messagelistopration' + status + "-" + users[ci].chatid})])
            }
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminbot.sendMessage(msg.from.id, adminvarsm.messages.userlist, {markup}).then(re => {
                new adminutilm.saveLastMessage(admin, re);
            })
        })

    }
    ,

    messagelist: function (msg, admin, status) {
        usermodel.find({
            messageforadmin: {
                $elemMatch: {
                    status: status,
                    message: {$ne: null}
                }
            }
        }, null, {sort: {"messageforadmin.send": -1}}, function (err, users) {
            btns = [];
            for (ci = 0; ci < users.length; ci++) {
                btns.push([adminbot.inlineButton(users[ci].username, {callback: 'messagelistopration' + status + "-" + users[ci].chatid})])
            }
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.userlist,
                markup
            )
        })
    }
    ,
    messagelistopration: function (msg, admin, status) {
        var params = msg.data.split('-')
        var dateFormat = require('dateformat')
        usermodel.findOne({chatid: params[1]}, null, {sort: {"messageforadmin.send": +1}}, function (err, user) {
            btns = [];
            //console.log(user.messageforadmin)
            for (mi = 0; mi < user.messageforadmin.length; mi++) {
                if (user.messageforadmin[mi].status == status && user.messageforadmin[mi]['_id']) {
                    console.log(user.messageforadmin[mi])
                    btns.push(
                        [adminbot.inlineButton(user.messageforadmin[mi].message ?
                                user.messageforadmin[mi].message.substr(0, 75) : ""
                            ,
                            {callback: 'messagelistoprationread' + status + '-' + user.messageforadmin[mi]['_id']})]
                    )
                }
            }
            btns.push([adminbot.inlineButton('بازگشت',
                {callback: 'messagelist' + status + '-' + params[1]}
            )])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;

//console.log(user.messageforadmin)
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                "نام کاربری : @" + user.username + "\r\n", markup
            )
        })
    }
    ,
    messagereaded: function (msg, admin, status) {
        var params = msg.data.split('-')
        usermodel.findOne({messageforadmin: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[1])}}}, function (err, user) {
            for (mi = 0; mi < user.messageforadmin.length; mi++) {
                if (user.messageforadmin[mi]['_id'] == params[1]) {
                    mesg = user.messageforadmin[mi].message;
                    user.messageforadmin[mi].status = "raededmessage"
                    user.save();
                    break;
                }
            }
            btns = [];

            btns.push([adminbot.inlineButton('بازگشت',
                {callback: 'messagelistopration' + status + '-' + user.chatid}
            )])
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                "@" + user.username + "\r\n" +
                mesg,
                markup
            )
            if (status == "sentmessage") {

                if (user.number)
                    markup = uservarsm.markups.justmenu
                else
                    markup = uservarsm.markups.menu

                userbot.sendMessage(user.chatid, adminvarsm.messages.messagereaded, {markup});
            }
        })
    },
    messagedoread: function (msg, admin) {
        var params = msg.data.split('-')
        usermodel.findOne({chatid: params[1]}, function (err, user) {
            user.step = "block";
            user.save();
            if (user.number)
                markup = uservarsm.markups.justmenu
            else
                markup = uservarsm.markups.menu

            return userbot.sendMessage(params[1], adminvarsm.messages.blocked, {markup});
        })
    }
}