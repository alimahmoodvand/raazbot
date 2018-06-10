module.exports = {
    admin: function (msg) {
        {
            return adminbot.sendMessage(msg.from.id, adminvarsm.messages.adminid, {ask: 'id'}).then(re => {
            })
        }
    },
    id: function (msg) {
        {
            m = new adminmodel;
            m.chatid = msg.text;
            m.role = "admin";
            m.status = "0";
            m.create = new Date().getTime();
            m.save()
            return adminbot.sendMessage(msg.from.id, adminvarsm.messages.adminname, {ask: 'name'}).then(re => {
            })
        }
    },
    name: function (msg) {
        adminmodel.findOne({status: "0"}, function (err, admin) {
            admin.name = msg.text;
            admin.status = "1";

            admin.save()
            return adminbot.sendMessage(msg.from.id, adminvarsm.messages.adminadded).then(re => {
            })
        })
    },
    adminlist: function (msg, admin) {
        adminmodel.find({status: "1", role: 'admin'}, function (err, admins) {
            btns = [];
            for (ai = 0; ai < admins.length; ai++) {
                btns.push([adminbot.inlineButton(admins[ai].name + "  " + admins[ai]['chatid'], {callback: 'adminlist-' + admins[ai]['chatid']})])
            }
            btns = adminbot.inlineKeyboard(btns);
            markup = btns;
            return adminbot.sendMessage(msg.from.id, adminvarsm.messages.adminlist, {markup}).then(re => {
                new adminutilm.saveLastMessage(admin,re);
            })
        })
    },
    deleted: function (msg, admin) {
        var params = msg.data.split('-')
        console.log(params);
        adminmodel.remove({chatid: params[1]}, function (err) {

            adminmodel.find({status: "1", role: 'admin'}, function (err, admins) {

                btns = [];

                for (ai = 0; ai < admins.length; ai++) {
                    btns.push([adminbot.inlineButton(admins[ai].name + "  " + admins[ai]['chatid'], {callback: 'adminlist-' + admins[ai]['chatid']})])
                }
                btns = adminbot.inlineKeyboard(btns);
                markup = btns;
                adminbot.answerCallbackQuery(msg.id, {text: adminvarsm.messages.done, showAlert: true});
                adminutilm.updatemessage(
                    msg.from.id,
                    admin.messages[admin.messages.length - 1].messageid,
                    adminvarsm.messages.adminlist,
                    markup
                )
            })
        })
    },
    messageforusers: function (msg, admin) {
        {
            markup = adminbot.keyboard([['انصراف']]);
            return adminbot.sendMessage(msg.from.id, adminvarsm.messages.messageforusers, {
                markup,
                ask: 'message'
            }).then(re => {
            })
        }
    },
    messagesent: function (msg) {
            if (msg.text != 'انصراف') {
                usermodel.find({step: "ok"},
                    function (err, users) {
                    this.jobs=[];
                        for (ui = 0; ui < users.length; ui++) {
                            if (users[ui].number)
                                markup = uservarsm.markups.justmenu
                            else
                                markup = uservarsm.markups.menu
                            this.obj={
                                chatid:users[ui].chatid,
                                text:msg.text,
                                markup:{markup},
                                index:ui
                            };
                            this.jobs.push(adminutilm.sendBulkMessage.bind(null,this.obj))
                        }
                        async.series(this.jobs, function (err, data) {
                            errcount=0;
                            for (di = 0; di < data.length; di++) {
                                if (!data[di].message_id) {
                                    errcount++;
                                    console.log(di, data[di].description, data[di].tag)
                                    users[di].step="block"
                                    users[di].save();
                                }
                            }

                            console.log("errcount",errcount)
                        })
                        markup=adminvarsm.markups.panel;
                        adminbot.sendMessage(msg.from.id, adminvarsm.messages.messagesent,{markup})
                    })
            }
    },
    categorieslist: function (msg, admin) {
        var params = msg.data.split('-');

        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[2])}}}, function (err, user) {
            // body...
            channel = user.channels.searchObject('_id', params[2])
            btns = []
            tmp = [];
            for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
                if (user.channels[user.channels.indexOf(channel)].categories.indexOf(uservarsm.constants.categories[mi]) == -1) {
                    tmp.push(
                        adminbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'l-' + params[2] + "-" + uservarsm.constants.categories[mi]})
                    );
                }
                else {
                    tmp.push(
                        adminbot.inlineButton(uservarsm.constants.categories[mi] + '✅', {callback: 'l-' + params[2] + "-" + uservarsm.constants.categories[mi]})
                    );
                }
                if (mi % 2 != 0) {
                    btns.push(tmp)
                    tmp = [];
                }
            }
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'channellist-' + params[2]})]);
            markup = adminbot.inlineKeyboard(btns)
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.channeloprations
                    .replace('~tag', channel.tag)
                    .replace('~cardno', channel.cardno)
                    .replace('~shebano', channel.shebano)
                    .replace('~setltype', channel.setltype || "")
                    .replace('~cardname', channel.cardname || "")
                    .replace('~categories', channel.categories.join("\r\n")),
                markup
            )
        })

    },
    categories: function (msg, admin) {
        var params = msg.data.split('-');

        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(params[1])}}}, function (err, user) {
            // body...
            channel = user.channels.searchObject('_id', params[1])
            if (channel.categories.indexOf(params[2]) == -1 &&
                channel.categories.length < 3) {
                user.channels[user.channels.indexOf(channel)].categories.push(params[2])
            }
            else if (
                channel.categories.indexOf(params[2]) != -1 &&
                channel.categories.length > 1) {
                user.channels[user.channels.indexOf(channel)].categories.splice(
                    user.channels[user.channels.indexOf(channel)].categories.indexOf(params[2]), 1)
            }
            user.save()
            btns = []
            tmp = [];
            for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
                if (user.channels[user.channels.indexOf(channel)].categories.indexOf(uservarsm.constants.categories[mi]) == -1) {
                    tmp.push(
                        adminbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'l-' + params[1] + "-" + uservarsm.constants.categories[mi]})
                    );
                }
                else {
                    tmp.push(
                        adminbot.inlineButton(uservarsm.constants.categories[mi] + '✅', {callback: 'l-' + params[1] + "-" + uservarsm.constants.categories[mi]})
                    );
                }
                if (mi % 2 != 0) {
                    btns.push(tmp)
                    tmp = [];
                }
            }
            btns.push([adminbot.inlineButton('بازگشت', {callback: 'channellist-' + params[1]})]);
            markup = adminbot.inlineKeyboard(btns)
            adminutilm.updatemessage(
                msg.from.id,
                admin.messages[admin.messages.length - 1].messageid,
                adminvarsm.messages.channeloprations
                    .replace('~tag', channel.tag)
                    .replace('~cardno', channel.cardno)
                    .replace('~shebano', channel.shebano)
                    .replace('~setltype', channel.setltype || "")
                    .replace('~cardname', channel.cardname || "")
                    .replace('~categories', channel.categories.join("\r\n")),
                markup
            )
        })

    },
    searchchannel: function (msg, admin) {
        return adminbot.sendMessage(msg.from.id, adminvarsm.messages.searchchannel, {ask: 'showsearchchannel'}).then(re => {
        })
    },
    showsearchchannel: function (msg, admin) {
        msg.text = "@" + msg.text.replace('@', '')
        usermodel.findOne({'channels': {$elemMatch: {tag: msg.text, step: 'verified'}}}, function (err, user) {
            // console.log(user.username)
            if (user) {
                targetchannel = user.channels.searchObjects('tag', msg.text).searchObject('step', 'verified');
                console.log(targetchannel)
                btns = []
                btns.push([adminbot.inlineButton(targetchannel.tag, {callback: 'channelverified-' + targetchannel['_id'] + "-1"})])
                btns = adminbot.inlineKeyboard(btns);
                markup = btns;
                return adminbot.sendMessage(msg.from.id, adminvarsm.messages.channellist, {markup}).then(re => {
                    new adminutilm.saveLastMessage(admin,re);
                })
            }
            else {
                //	      return adminbot.answerCallback(msg.id,adminvarsm.messages.channelnotexistopration, true);
                return adminbot.sendMessage(msg.from.id, adminvarsm.messages.channelnotexistopration).then(re => {
                })
            }
        })

    },
    sendmessageforcategories: function (msg, admin) {
        admin.category = "";
        admin.save();
        btns = []
        tmp = [];
        for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
            tmp.push(adminbot.inlineButton(uservarsm.constants.categories[mi], {callback: "sendmessageforcategories-" + uservarsm.constants.categories[mi]})
            );
            if (mi % 2 != 0) {
                btns.push(tmp)
                tmp = [];
            }
        }
        markup = adminbot.inlineKeyboard(btns)
        return adminbot.sendMessage(msg.from.id, adminvarsm.messages.sendmessageforcategories, {markup}).then(re => {
            new adminutilm.saveLastMessage(admin,re);
        })
    },
    sendmessageforcategory: function (msg, admin) {
        if (msg.text != 'انصراف' && admin.category) {
            //console.log( admin.category)
            usermodel.find({step: "ok", 'channels': {$elemMatch: {step: 'verified', categories: admin.category}}},
                function (err, users) {
                    for (ui = 0; ui < users.length; ui++) {
                        if (users[ui].number)
                            markup = uservarsm.markups.justmenu
                        else
                            markup = uservarsm.markups.menu
                        console.log(users[ui].username)
                        // if(users[ui].chatid==71536363)
                        userbot.sendMessage(users[ui].chatid, msg.text, {markup})
                    }
                    admin.category = "";
                    admin.save()
                    markup = adminvarsm.markups.panel
                    return adminbot.sendMessage(msg.from.id, adminvarsm.messages.messagesent, {markup}).then(re => {
                    })
                })
        }
        //   else{
        //       	markup=adminvarsm.markups.panel
        //  return adminbot.sendMessage(msg.from.id,adminvarsm.messages.panel,{markup}).then(re => {});
        //   }
    },


}