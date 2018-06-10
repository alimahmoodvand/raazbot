var text=function(msg) {
    if (msg.text == "id") {
        return userbot.sendMessage(msg.from.id, msg.from.id);
    }
    else if (msg.text.indexOf('/') == -1) {
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            console.log(msg.from.username);
            if (msg.from.username) {
                //user.username=msg.from.username;
                //user.save();
            }
            if (user) {
                if (user.step == "name") {
                    new userformsm.name(msg)
                }
                else if (user.step == "username") {
                    user.step = "name"
                    // user.save();
                    // console.log(user);
                    return userbot.sendMessage(msg.from.id, uservarsm.messages.name, {
                        markup: 'hide',
                        ask: 'name'
                    }).then(re => {
                        new userutilm.saveLastMessage(user,re);
                    })
                }
                else if (user.step == "ok") {
                    lastchannel = undefined
                    for (ri = 0; ri < user.channels.length; ri++) {
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
                            if (msg.text != "منو") {
                                console.log(user.channels[ri].step,user.channels[ri].tag)
                                lastchannel = user.channels[ri];
                                if (lastchannel.step == 'tag') {
                                    new userformsm.tag(msg)
                                }
                                else if (lastchannel.step == 'cardno'&&user.channels[ri].tag) {
                                    new userformsm.cardno(msg)
                                }
                                else if (lastchannel.step == 'otherchannels'&&user.channels[ri].tag) {
                                    new userformsm.otherchannels(msg)
                                }
                                else if (lastchannel.step == 'shebano'&&user.channels[ri].tag) {
                                    new userformsm.shebano(msg)
                                }
                                else if (lastchannel.step == 'cardname'&&user.channels[ri].tag) {
                                    new userformsm.cardname(msg)
                                }
                                else if (lastchannel.step == 'editothers'&&user.channels[ri].tag) {
                                    new userformsm.editothers(msg)
                                }
                                else if(!user.channels[ri].step&&!user.channels[ri].tag){
                                    user.channels[ri].step = "deleted";
                                }
                            }
                            else {
                                if (user.channels[ri].step == 'editothers') {
                                    user.channels[ri].step="verified"
								}
                                else if (user.tmpchannel && user.tmpchannel.tag != user.channels[ri].tag) {
                                    // user.channels.splice(ri, 1);
                                    user.channels[ri].step = "deleted";
                                }
                                else if (user.tmpchannel && user.tmpchannel.tag == user.channels[ri].tag) {
                                    user.channels[ri] = JSON.parse(JSON.stringify(user.tmpchannel));
                                    user.tmpchannel = {};
                                }
                                else if (!user.tmpchannel) {
                                    // user.channels.splice(ri, 1);
                                    user.channels[ri].step = "deleted";
                                }
                            }
                        }
                    }
                    user.save();
                    ;
                    if (!lastchannel && msg.text == "منو") {
                        // console.log(user.channels.length)
                        markup = uservarsm.markups.userpanel
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.panel, {markup}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })
                    }

                }
            }
        });
    }
}
module.exports.text=text;