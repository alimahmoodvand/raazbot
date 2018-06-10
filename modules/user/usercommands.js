module.exports= {
    start: function (msg) {
        if (msg.from.username) {
            usermodel.findOne({chatid: msg.from.id}, function (err, user) {
                if (!user) {
                    m = new usermodel;
                    m.chatid = msg.from.id;
                    m.username = msg.from.username;
                    m.step = "username";
                    m.create = new Date().getTime();
                    m.save()

                    user = m;
                }
                // //console.log(user.messages[4].send);
                if (user.step == "username") {
                    markup = uservarsm.markups.sharenumber
                    // return userbot.sendMessage(msg.from.id,uservarsm.messages.rules).then(re => {
                    userbot.sendMessage(msg.from.id, uservarsm.messages.sharenumber, {markup}).then(re => {
                        new userutilm.saveLastMessage(user,re);
                    })
//})
                }
                else if (user.step == "ok") {
                    markup = uservarsm.markups.userpanel
                    return userbot.sendMessage(msg.from.id, uservarsm.messages.panel, {markup}).then(re => {
                              new userutilm.saveLastMessage(user,re);
                          })
                    // return userbot.sendMessage(msg.from.id,uservars.messages.welcome,{ask:'number'}).then(re => {})
                }
                else if (user.step == "name") {
                    return userbot.sendMessage(msg.from.id, uservarsm.messages.name, {
                        markup: 'hide',
                        ask: 'name'
                    }).then(re => {
                        new userutilm.saveLastMessage(user,re);
                    })
                }
            });
        }
        else {
            return userbot.sendMessage(msg.from.id, uservarsm.messages.setusername)
        }
    },
    restart: function (msg) {
        if (msg.from.username) {
            ////console.log(msg);
            usermodel.findOne({chatid: msg.from.id}, function (err, user) {

                if (user && user.step && user.step == "ok") {
                    lastchannel = undefined
                    for (ri = 0; ri < user.channels.length; ri++) {
                        //console.log(user.channels[ri].step,user.channels[ri].tag)
                        if (
                            user.channels[ri].step == "tag" ||
                            user.channels[ri].step == "cardno" ||
                            user.channels[ri].step == "categories" ||
                            user.channels[ri].step == "cardname" ||
                            user.channels[ri].step == "setltype" ||
                            user.channels[ri].step == "otherchannels" ||
                            user.channels[ri].step == "wait" ||
                            user.channels[ri].step == "editothers" ||
                            user.channels[ri].step == "shebano"||
                            (!user.channels[ri].step&&!user.channels[ri].tag)
                        ) {
                            if (user.channels[ri].step == 'editothers') {
                                user.channels[ri].step="verified"
                            }
                            else if (user.tmpchannel && user.tmpchannel.tag != user.channels[ri].tag) {
                                // user.channels.splice(ri, 1);
                                user.channels[ri].step = "deleted";
                            }
                            else if (user.tmpchannel && user.tmpchannel.tag == user.channels[ri].tag) {
                                user.channels[ri] = JSON.parse(JSON.stringify(user.tmpchannel));
                                user.tmpchannel = undefined;
                            }
                            else if (!user.tmpchannel) {
                                // user.channels.splice(ri, 1);
                                user.channels[ri].step = "deleted";
                            }
                        }

                    }
                    user.save();
                    markup = uservarsm.markups.userpanel
                    return userbot.sendMessage(msg.from.id, uservarsm.messages.panel, {markup}).then(re => {
                        new userutilm.saveLastMessage(user,re);
                    })
                }
                else {

                    // return userbot.sendMessage(msg.from.id,uservars.messages.welcome,{ask:'number'}).then(re => {})
                }
            });
        }
        else {
            // console.log(msg.from.id, uservarsm.messages.setusername)
            return userbot.sendMessage(msg.from.id, uservarsm.messages.setusername).then(re => {
            })
        }
    }
};