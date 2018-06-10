module.exports = {
    name: function (msg) {
        if (msg.text.length > 1) {
            usermodel.findOne({chatid: msg.from.id}, function (err, user) {
                user.name = msg.text;
                user.step = "ok";
                if (user.number)
                    markup = uservarsm.markups.justmenu;
                else
                    markup = uservarsm.markups.menu;
                return userbot.sendMessage(msg.from.id, uservarsm.messages.welcome, {markup}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            })
        }
        else {

        }
    },
    otherchannels: function (msg) {
        if (msg.text == '/passed') {
            msg.text = "";
        }
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            targetchannel = user.channels.searchObject('step', 'otherchannels')

            user.channels[user.channels.indexOf(targetchannel)].otherchannels = msg.text;
            user.channels[user.channels.indexOf(targetchannel)].step = "categories";
            btns = []
            tmp = [];
            for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
                if (mi % 2 == 0) {
                    tmp.push(
                        userbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'categories-' + uservarsm.constants.categories[mi]})
                    );

                }
                else {
                    tmp.push(
                        userbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'categories-' + uservarsm.constants.categories[mi]})
                    );
                    btns.push(tmp)
                    tmp = [];
                }
            }
            btns.push([userbot.inlineButton('ادامه ثبت کانال', {callback: 'categories-passed'})]);
            // //console.log(btns);
            btns = userbot.inlineKeyboard(btns)
            var markup = btns;
            userbot.sendMessage(msg.from.id, uservarsm.messages.categories, {markup}).then(re => {
                new userutilm.saveLastMessage(user,re);
            })


        })

    },
    tag: function (msg) {
        msg.text = msg.text.replace(/'/g, '').replace(/;/g, '').replace(/ /g, '').trim()
       console.log(msg.from.id)
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            indexes = msg.text.getAllIndexes('@');
            //console.log(indexes)
            var match = /\r|\n/.exec(msg.text);
            if (msg.text.indexOf('@') == 0 && !match && indexes.length == 1 && msg.text.length > 4 && msg.text.indexOf(' ') == -1) {
                usermodel.find({
                    'channels': {
                        $elemMatch: {
                            'tag': msg.text,
                            'step': {$ne: 'deleted'}
                        }
                    }
                }, function (err, channel) {
                    tmp = JSON.parse(JSON.stringify(channel));
                    channel = {
                        channels: []
                    };
                    for (ci = 0; ci < tmp.length; ci++) {
                        if (tmp[ci].channels) {
                            //console.log(tmp.length, ci, tmp[ci].channels.searchObjects('step', 'verified'))
                            temp=[];
                            temp=tmp[ci].channels.searchObjects('tag', msg.text);
                            for (ti = 0; ti < temp.length; ti++) {
                                temp[ti].username=tmp[ci].username;
                                channel.channels.push(temp[ti])
                            }
                        }
                    }
                    //console.log(channel.channels)
                    //  return ;
                    targetchannel = undefined
                    if (channel && channel.channels&& channel.channels.length>0){
                        targetchannel = channel.channels.searchObject('step',"verified")
                        if(!targetchannel){
                            targetchannel = channel.channels.searchObject('step',"waitforverify")
                            if(!targetchannel){
                                targetchannel = channel.channels.searchObject('step',"requestfordelete")
                            }
                        }
                    }
                    // console.log(channel.channels,targetchannel)

                    if (!targetchannel) {
                        if (!(user.channels.searchObject('tag', msg.text) && (
                                    user.channels.searchObject('tag', msg.text).step == "blocked" ||
                                    user.channels.searchObject('tag', msg.text).step == "requestfordelete"
                                )
                            )) {
                            targetchannel = user.channels.searchObject('step', 'tag')
                            user.channels[user.channels.indexOf(targetchannel)].tag = msg.text.toLowerCase();
                            user.channels[user.channels.indexOf(targetchannel)].step = "otherchannels";
                            btns = []
                            btns.push([userbot.inlineButton('مشترک نمیزنم', {callback: 'passotherchannels'})])

                            btns = userbot.inlineKeyboard(btns)
                            markup = btns;
                            // //console.log(uservarsm.messages.otherchannels)
                            return userbot.sendMessage(msg.from.id, uservarsm.messages.otherchannels, {markup}).then(re => {
                                new userutilm.saveLastMessage(user,re);
                            })
                        }
                        else if ((channel.channels.searchObject('tag', msg.text) && user.channels.searchObject('tag', msg.text).step == "blocked")) {
                            return userbot.sendMessage(msg.from.id, uservarsm.messages.blockchannel, {ask: 'tag'}).then(re => {
                                new userutilm.saveLastMessage(user,re);
                            })
                        }
                        else if ((user.channels.searchObject('tag', msg.text) && user.channels.searchObject('tag', msg.text).step == "requestfordelete")) {
                            return userbot.sendMessage(msg.from.id, uservarsm.messages.blockchannel, {ask: 'tag'}).then(re => {
                                new userutilm.saveLastMessage(user,re);
                            })
                        }
                        else  {
                            targetChannel=channel.channels.searchObject('status', 'editing');
                            //console.log("targetChannel",targetChannel)
                            if(targetChannel){
                                return userbot.sendMessage(msg.from.id,
                                        uservarsm.messages.duplicatechannel.replace('~username', targetchannel.username?targetchannel.username:" ناشناخته ")
                                            .replace('~cardno', targetchannel.cardno)
                                        , {ask: 'tag'}).then(re => {
                                        new userutilm.saveLastMessage(user,re);
                            })
                            }
                            else{
                                targetchannel = user.channels.searchObject('step', 'tag')
                                user.channels[user.channels.indexOf(targetchannel)].tag = msg.text.toLowerCase();
                                user.channels[user.channels.indexOf(targetchannel)].step = "otherchannels";
                                btns = []
                                btns.push([userbot.inlineButton('مشترک نمیزنم', {callback: 'passotherchannels'})])

                                btns = userbot.inlineKeyboard(btns)
                                markup = btns;
                                // //console.log(uservarsm.messages.otherchannels)
                                return userbot.sendMessage(msg.from.id, uservarsm.messages.otherchannels, {markup}).then(re => {
                                        new userutilm.saveLastMessage(user,re);
                                })
                            }
                        }
                    }
                    else if (targetchannel) {
                        return userbot.sendMessage(msg.from.id,
                            uservarsm.messages.duplicatechannel.replace('~username', targetchannel.username?targetchannel.username:" ناشناخته ")
                                .replace('~cardno', targetchannel.cardno)
                            , {ask: 'tag'}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })
                    }
                })
            }
            else {
                return userbot.sendMessage(msg.from.id, uservarsm.messages.wrong + uservarsm.messages.tag, {ask: 'tag'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
        })

    },
    cardno: function (msg) {

        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            msg.text = msg.text.replace(/'/g, '').replace(/;/g, '')
            this.patt = new RegExp("^[0-9]{16}$");
            if (this.patt.test(msg.text)) {
                targetchannel = user.channels.searchObject('step', 'cardno')

                user.channels[user.channels.indexOf(targetchannel)].cardno = msg.text;
                user.channels[user.channels.indexOf(targetchannel)].step = "cardname";
                return userbot.sendMessage(msg.from.id, uservarsm.messages.cardname, {ask: 'cardname'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
            else {
                return userbot.sendMessage(msg.from.id, uservarsm.messages.wrong + uservarsm.messages.cardno, {ask: 'cardno'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
        })

    },
    cardname: function (msg) {

        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            // msg.text=msg.text.replace(/'/g,'').replace(/;/g,'')
            // this.patt = new RegExp("^[0-9]{16}$"); 
            if (true) {
                targetchannel = user.channels.searchObject('step', 'cardname')

                user.channels[user.channels.indexOf(targetchannel)].cardname = msg.text;
                user.channels[user.channels.indexOf(targetchannel)].step = "shebano";
                return userbot.sendMessage(msg.from.id, uservarsm.messages.shebano, {ask: 'shebano'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
            else {
                return userbot.sendMessage(msg.from.id, uservarsm.messages.wrong + uservarsm.messages.cardname, {ask: 'cardname'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
        })

    },
    shebano: function (msg) {

        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            msg.text = msg.text.replace(/'/g, '').replace(/;/g, '').toUpperCase();
            this.patt = new RegExp("^IR[0-9]{24}$");
            if (this.patt.test(msg.text)) {
                targetchannel = user.channels.searchObject('step', 'shebano')
                //console.log(targetchannel);
                user.channels[user.channels.indexOf(targetchannel)].shebano = msg.text;
                user.channels[user.channels.indexOf(targetchannel)].step = "wait";
                //console.log(user.channels[user.channels.indexOf(targetchannel)].status)
                // user.channels[user.channels.indexOf(targetchannel)].status=undefined;

                markup = uservarsm.markups.wait;
                return userbot.sendMessage(msg.from.id,
                    uservarsm.messages.channeloprations
                        .replace('~tag', targetchannel.tag)
                        .replace('~cardno', targetchannel.cardno)
                        .replace('~shebano', targetchannel.shebano)
                        .replace('~cardname', targetchannel.cardname)
                        .replace('~setltype', targetchannel.setltype)
                        .replace('~categories', targetchannel.categories.join("\r\n"))
                    + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                    ), {markup}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })

            }
            else {
                return userbot.sendMessage(msg.from.id, uservarsm.messages.wrong + uservarsm.messages.shebano, {ask: 'shebano'}).then(re => {
                    new userutilm.saveLastMessage(user,re);
                })
            }
        })

    },
    sendmessage: function (msg) {
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            user.messageforadmin.push({
                message: msg.text,
                status: "sentmessage",
                send: new Date().getTime()
            })
            user.save();
            //console.log(msg.text);

            markup = uservarsm.markups.userpanel
            return userbot.sendMessage(msg.from.id, uservarsm.messages.sentmessage, {markup}).then(re => {
                new userutilm.saveLastMessage(user,re);
            adminmodel.find({}, function (err, admins) {
                for (ai = 0; ai < admins.length; ai++) {
                    mesg = 'پیام جدید برای مدیریت ارسال شد'
                    adminbot.sendMessage(admins[ai].chatid, mesg);
                }
            })

        })
        })
    },
    categories: function (msg) {
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            markup = uservarsm.markups.categories
            return userbot.sendMessage(msg.from.id, uservarsm.messages.categories, {markup}).then(re => {
                new userutilm.saveLastMessage(user,re);
            })
        })
    },
    editothers:function (msg){
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            targetchannel = user.channels.searchObject('step', 'editothers')
            user.channels[user.channels.indexOf(targetchannel)].otherchannels = msg.text;
            user.channels[user.channels.indexOf(targetchannel)].step = "verified";
            user.save();
            markup = uservarsm.markups.userpanel
            return userbot.sendMessage(msg.from.id, uservarsm.messages.actiondone, {markup}).then(re => {
                new userutilm.saveLastMessage(user,re);
            })
        })
    },
}