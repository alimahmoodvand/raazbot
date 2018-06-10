module.exports= {
    cbqueries: function (msg) {
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            if (msg.message['message_id'] == user.messages[user.messages.length - 1].messageid) {
                if (msg.data == "newchannel") {
                    //  return userbot.answerCallback(msg.id,"فعلا نمیتوانید کانالی ثبت کنید این قسمت فردا دوباره راهندازی میشود", true);

                    usermodel.findOne({
                        chatid: msg.from.id,
                        'channels': {$elemMatch: {step: 'waitforverify'}}
                    }, function (err, channel) {
                        if (true) {
                            if (user.step == "ok") {

                                user.channels.push({
                                    step: "tag",
                                    create: new Date().getTime().toString()
                                })
                                // user.save();
                                return userbot.sendMessage(msg.from.id, uservarsm.messages.tag, {ask: 'tag'}).then(re => {
                                    new userutilm.saveLastMessage(user,re);
                                })
                            }
                        }
                        else {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.channelpending, showAlert: true});
                        }
                    })
                }
                if (msg.data == "passotherchannels") {
                    msg.text = "/passed"
                    new userformsm.otherchannels(msg)

                }
                if (msg.data.indexOf("performance-") == 0) {
                    params = msg.data.split('-');
                    //////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {
                        var xlsx = require('xlsx');

                        var filepath = "ads.xlsx";
                        var workbook = xlsx.readFile(filepath);
                        var dateFormat = require('dateformat');

                        var dateFormat = require('dateformat');
                        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        var row = 2;
                        // ////console.log(worksheet['!ref']);
                        hastransaction = false;
                        for (ti = 0; ti < targetchannel.performances.length; ti++) {
                            {
                                hastransaction = true;

                                worksheet["A" + (row).toString()] = {t: 's', v: targetchannel.performances[ti]['date']};
                                worksheet["B" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['dayofweek']
                                };
                                worksheet["C" + (row).toString()] = {t: 's', v: targetchannel.performances[ti]['hour']};
                                worksheet["D" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['admin']
                                };
                                worksheet["E" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['price']
                                };
                                worksheet["F" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['allview']
                                };
                                worksheet["G" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['limit']
                                };
                                worksheet["H" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['bannerdesc']
                                };
                                worksheet["I" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['replydesc']
                                };
                                worksheet["J" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.performances[ti]['channel']
                                };
                                worksheet["K" + (row).toString()] = {t: 's', v: targetchannel.performances[ti]['desc']};
                                worksheet["L" + (row).toString()] = {t: 's', v: targetchannel.performances[ti]['view']};
                                worksheet["M" + (row).toString()] = {t: 's', v: targetchannel.performances[ti]['earn']};
                                row++;
                            }

                        }
                        if (hastransaction) {
                            worksheet['!ref'] = "A1:M" + (row - 1).toString();
// //console.log(worksheet['!ref']);
                            filename = dateFormat(new Date().getTime(), "yyyy-mm-dd-hh-MM-ss").toString() + ".xlsx";
                            xlsx.writeFile(workbook, filename);
                            return userbot.sendDocument(msg.from.id, "./" + filename).then(re => {
                                return userbot.sendMessage(msg.from.id, uservarsm.messages.excelhelp)
                            })
                        }
                        else {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.transactionnotexist, showAlert: true});
                        }
                    }

                }
                if (msg.data.indexOf("settlementlist-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {
                        var xlsx = require('xlsx');

                        var filepath = "userfile.xlsx";
                        var workbook = xlsx.readFile(filepath);
                        var dateFormat = require('dateformat');

                        var dateFormat = require('dateformat');
                        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                        var row = 2;
                        // //console.log(worksheet['!ref']);
                        hastransaction = false;
                        for (ti = 0; ti < targetchannel.transactions.length; ti++) {
                            if (targetchannel.transactions[ti]['step'] == 'settlemented') {
                                hastransaction = true;
                                date = parseInt((targetchannel.transactions[ti]['create']).toString())
                                worksheet["A" + (row).toString()] = {t: 's', v: targetchannel.tag};
                                worksheet["B" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['price']
                                };
                                worksheet["C" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['factorno']
                                };
                                worksheet["D" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['shebanos']
                                };
                                worksheet["E" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['cardnos']
                                };
                                worksheet["F" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['cardnames']
                                };
                                worksheet["G" + (row).toString()] = {t: 's', v: targetchannel.transactions[ti]['desc']};
                                worksheet["H" + (row).toString()] = {
                                    t: 's',
                                    v: targetchannel.transactions[ti]['create'].toString()
                                };
                                row++;
                            }

                        }
                        if (hastransaction) {
                            worksheet['!ref'] = "A1:I" + (row - 1).toString();
// //console.log(worksheet['!ref']);
                            filename = dateFormat(new Date().getTime(), "yyyy-mm-dd-hh-MM-ss").toString() + ".xlsx";
                            xlsx.writeFile(workbook, filename);
                            return userbot.sendDocument(msg.from.id, "./" + filename).then(re => {
                                return userbot.sendMessage(msg.from.id, uservarsm.messages.excelhelp)
                            })
                        }
                        else {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.transactionnotexist, showAlert: true});
                        }
                    }

                }
                if (msg.data == "sendmessage") {
                    if (user.step == "ok") {
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.sendmessage, {ask: 'sendmessage'}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })
                    }
                }
                if (msg.data == "editname") {
                    if (user.step == "ok") {
                        user.step = "name"
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.name, {ask: 'name'}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })
                    }
                }
                if (msg.data == "managechannel") {
                    if (user.step == "ok") {
                        usermodel.findOne({
                            chatid: msg.from.id,
                            'channels': {$elemMatch: {step: 'verified'}}
                        }, function (err, channel) {

                            if (channel && channel.channels.length > 0) {
                                channel.channels = channel.channels.searchObjects('step', 'verified')
                                btns = [];
                                for (ci = 0; ci < channel.channels.length; ci++) {
                                    btns.push([userbot.inlineButton(channel.channels[ci].tag, {callback: 'channel-' + channel.channels[ci]['_id']})])
                                }
                                btns.push([userbot.inlineButton('بازگشت', {callback: 'backtopanel'})])
                                btns = userbot.inlineKeyboard(btns);
                                markup = btns;

                                userutilm.updatemessage(
                                    user.chatid,
                                    user.messages[user.messages.length - 1].messageid,
                                    uservarsm.messages.channellist,
                                    markup
                                )
                            }
                            else {
                                return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.channelnotexist, showAlert: true});
                            }
                        })
                    }
                }
                if (msg.data == "backtopanel") {
                    if (user.step == "ok") {
                        markup = uservarsm.markups.userpanel
                        userutilm.updatemessage(
                            user.chatid,
                            user.messages[user.messages.length - 1].messageid,
                            uservarsm.messages.panel,
                            markup
                        )
                    }
                }
                if (msg.data.indexOf("channel-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {

                        btns = userbot.inlineKeyboard([
                            [
                                userbot.inlineButton('حذف کانال', {callback: 'delete-' + params[1]}),
                                userbot.inlineButton('درخواست تسویه', {callback: 'settlement-' + params[1]}),
                            ],
                            [
                                userbot.inlineButton('ویرایش اطلاعات', {callback: 'edit-' + params[1]}),
                                userbot.inlineButton('واریزهای کانال', {callback: 'settlementlist-' + params[1]}),
                            ],
                            [
                            	userbot.inlineButton('گزارش عملکرد ', {callback: 'performance-' + params[1]}),
                                userbot.inlineButton(' ویرایش کانال مشترک ', {callback: 'editothers-' + params[1]}),
                            ],
                            [userbot.inlineButton('بازگشت', {callback: 'managechannel'})]
                        ])
                        markup = btns;

                        userutilm.updatemessage(
                            user.chatid,
                            user.messages[user.messages.length - 1].messageid,
                            uservarsm.messages.channeloprations
                                .replace('~tag', targetchannel.tag)
                                .replace('~cardno', targetchannel.cardno)
                                .replace('~shebano', targetchannel.shebano)
                                .replace('~cardname', targetchannel.cardname)
                                .replace('~setltype', targetchannel.setltype)
                                .replace('~categories', targetchannel.categories.join("\r\n"))
                            + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.otherchannels : ""
                            ),
                            markup
                        )
                    }

                }
                if (msg.data.indexOf("delete-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {
                        user.channels[user.channels.indexOf(targetchannel)].step = 'requestfordelete'
                        user.save()
                        usermodel.findOne({
                            chatid: msg.from.id,
                            'channels': {$elemMatch: {step: 'verified'}}
                        }, function (err, channel) {
                            ////console.log(msg.from.id);
                            if (channel && channel.channels.length > 0) {
                                btns = [];
                                for (ci = 0; ci < channel.channels.length; ci++) {
                                    btns.push([userbot.inlineButton(channel.channels[ci].tag, {callback: 'channel-' + channel.channels[ci]['_id']})])
                                }
                                btns.push([userbot.inlineButton('بازگشت', {callback: 'backtopanel'})])
                                btns = userbot.inlineKeyboard(btns);
                                markup = btns;
                                adminmodel.find({}, function (err, admins) {
                                    for (ai = 0; ai < admins.length; ai++) {
                                        mesg = " درخواست حذف برای کانال   \r\n" + user.channels[user.channels.indexOf(targetchannel)].tag;
                                        adminbot.sendMessage(admins[ai].chatid, mesg);
                                    }
//console.log("::::")
                                })
                                return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.actiondone, showAlert: true});
                                userutilm.updatemessage(
                                    user.chatid,
                                    user.messages[user.messages.length - 1].messageid,
                                    uservarsm.messages.channellist,
                                    markup
                                )

                            }
                            else {
                                return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.channelnotexist, showAlert: true});
                            }
                        })
                    }

                }
                if (msg.data.indexOf("settlement-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {
                        targettransaction = user.channels[user.channels.indexOf(targetchannel)].transactions.searchObject('step', "requestforsettlement")
                        if (!targettransaction) {
                            user.channels[user.channels.indexOf(targetchannel)].transactions.push(
                                {
                                    create: new Date().getTime(),
                                    step: "requestforsettlement"
                                })
                            user.save()
                            usermodel.findOne({
                                chatid: msg.from.id,
                                'channels': {$elemMatch: {step: 'verified'}}
                            }, function (err, channel) {
                                ////console.log(msg.from.id);
                                if (channel && channel.channels.length > 0) {
                                    btns = [];
                                    for (ci = 0; ci < channel.channels.length; ci++) {
                                        btns.push([userbot.inlineButton(channel.channels[ci].tag, {callback: 'channel-' + channel.channels[ci]['_id']})])
                                    }
                                    btns.push([userbot.inlineButton('بازگشت', {callback: 'backtopanel'})])
                                    btns = userbot.inlineKeyboard(btns);
                                    markup = btns;
                                    mesg = `درخواست واریز شما برای مدیریت ارسال شد، واریز این دوره شما شامل تمام تبلیغاتی میشود که گزارش عملکرد ان برای شما ارسال شده است،`
                                    return userbot.answerCallbackQuery(msg.id, {text: mesg, showAlert: true});

                                    userutilm.updatemessage(
                                        user.chatid,
                                        user.messages[user.messages.length - 1].messageid,
                                        uservarsm.messages.channellist,
                                        markup
                                    )
                                }

                            })
                        }
                        else {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.transactionopen, showAlert: true});
                        }
                    }

                }
                if (msg.data.indexOf("edit-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('_id', params[1])
                    if (user.step == "ok" && targetchannel) {
                        user.tmpchannel = JSON.parse(JSON.stringify(targetchannel));
                        //	user.channels[user.channels.indexOf(targetchannel)].step='cardno'
                        user.channels[user.channels.indexOf(targetchannel)].status = 'editing'
                        //user.channels[user.channels.indexOf(targetchannel)].categories=[];

                        // 	return userbot.sendMessage(msg.from.id,uservarsm.messages.newcardno,{ ask:'cardno'}).then(re => {
                        //  	user.messages.push({
                        //  		messageid:re.result['message_id'],
                        // 				message:re.result['text'],
                        // 				send:re.result['date']
                        //  	})
                        //  	user.save();
                        //  })
                        user.channels[user.channels.indexOf(targetchannel)].step = "setltype";
                        btns = [];
                        btns.push([userbot.inlineButton("زودترین زمان ممکن", {callback: 'setltype-زودترین زمان ممکن'})])
                        btns.push([userbot.inlineButton("هفتگی", {callback: 'setltype-هفتگی'})])
                        btns.push([userbot.inlineButton("ماهیانه", {callback: 'setltype-ماهیانه'})])
                        markup = userbot.inlineKeyboard(btns)
                        user.save();
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.newsetltype, {
                            markup,
                            ask: 'setltype'
                        }).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })


                    }
                }
                if (msg.data.indexOf("setltype-") == 0) {
                    params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('step', 'setltype')
                    if (user.step == "ok" && targetchannel) {
                        user.channels[user.channels.indexOf(targetchannel)].setltype = params[1];
                        user.channels[user.channels.indexOf(targetchannel)].step = 'cardno'
                        //console.log(user.channels[user.channels.indexOf(targetchannel)].otherchannels)
                        if (user.number)
                            markup = uservarsm.markups.justmenu;
                        else
                            markup = uservarsm.markups.menu;
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.cardno, {
                            markup,
                            ask: 'cardno'
                        }).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })


                    }
                }
                if (msg.data.indexOf("categories-") == 0) {

                    var params = msg.data.split('-');
                    ////console.log(msg.from.id);
                    targetchannel = user.channels.searchObject('step', 'categories')
                    //console.log(user.channels[user.channels.indexOf(targetchannel)].status)

                    if (user.step == "ok" && targetchannel) {
                        if (params[1] == "passed" && targetchannel.categories && targetchannel.categories.length == 1) {
                            // user.channels[user.channels.indexOf(targetchannel)].step="cardno";
                            user.channels[user.channels.indexOf(targetchannel)].step = "setltype";
                            btns = [];
                            btns.push([userbot.inlineButton("زودترین زمان ممکن", {callback: 'setltype-زودترین زمان ممکن'})])
                            btns.push([userbot.inlineButton("هفتگی", {callback: 'setltype-هفتگی'})])
                            btns.push([userbot.inlineButton("ماهیانه", {callback: 'setltype-ماهیانه'})])
                            markup = userbot.inlineKeyboard(btns)

                            return userbot.sendMessage(msg.from.id, uservarsm.messages.setltype, {
                                markup,
                                ask: 'setltype'
                            }).then(re => {
                                new userutilm.saveLastMessage(user,re);
                            })
                        }
                        else if (params[1] == "passed" && !(targetchannel.categories && targetchannel.categories.length > 0 )) {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.takeonecategory, showAlert: true});
                        }
                        else if (!targetchannel.categories || targetchannel.categories.length != 1 || user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1]) != -1) {
                            if (user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1]) == -1 &&
                                user.channels[user.channels.indexOf(targetchannel)].categories.length < 1
                            ) {
                                user.channels[user.channels.indexOf(targetchannel)].categories.push(params[1])
                                user.save();
                                btns = []
                                tmp = [];

                                for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
                                    if (user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(uservarsm.constants.categories[mi]) == -1) {
                                        tmp.push(
                                            userbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'categories-' + uservarsm.constants.categories[mi]})
                                        );
                                    }
                                    else {
                                        tmp.push(
                                            userbot.inlineButton(uservarsm.constants.categories[mi] + '✅', {callback: 'categories-' + uservarsm.constants.categories[mi]})
                                        );
                                    }
                                    if (mi % 2 != 0) {
                                        btns.push(tmp)
                                        tmp = [];
                                    }
                                }
                                btns.push([userbot.inlineButton('ادامه ثبت کانال', {callback: 'categories-passed'})]);
                                markup = userbot.inlineKeyboard(btns)
                                userutilm.updatemessage(
                                    user.chatid,
                                    user.messages[user.messages.length - 1].messageid,
                                    uservarsm.messages.categories + "\r\n" +
                                    user.channels[user.channels.indexOf(targetchannel)].categories.join("\r\n"),
                                    markup
                                )
                                // return userbot.answerCallback(msg.id,params[1], true);
                            }
                            else if (user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1]) != -1) {
                                // //console.log(user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1]));
                                // //console.log(user.channels[user.channels.indexOf(targetchannel)].categories)
                                // //console.log(user.channels[user.channels.indexOf(targetchannel)].categories[user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1])]);

                                // return;
                                user.channels[user.channels.indexOf(targetchannel)].categories.splice(
                                    user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(params[1]), 1)
                                user.save();
                                btns = []
                                tmp = [];

                                for (mi = 0; mi < uservarsm.constants.categories.length; mi++) {
                                    if (user.channels[user.channels.indexOf(targetchannel)].categories.indexOf(uservarsm.constants.categories[mi]) == -1) {
                                        tmp.push(
                                            userbot.inlineButton(uservarsm.constants.categories[mi], {callback: 'categories-' + uservarsm.constants.categories[mi]})
                                        );
                                    }
                                    else {
                                        tmp.push(
                                            userbot.inlineButton(uservarsm.constants.categories[mi] + '✅', {callback: 'categories-' + uservarsm.constants.categories[mi]})
                                        );
                                    }
                                    if (mi % 2 != 0) {
                                        btns.push(tmp)
                                        tmp = [];
                                    }
                                }
                                btns.push([userbot.inlineButton('ادامه ثبت کانال', {callback: 'categories-passed'})]);
                                markup = userbot.inlineKeyboard(btns)
                                userutilm.updatemessage(
                                    user.chatid,
                                    user.messages[user.messages.length - 1].messageid,
                                    uservarsm.messages.categories + "\r\n" +
                                    user.channels[user.channels.indexOf(targetchannel)].categories.join("\r\n")
                                    + (targetchannel.otherchannels ? "کانال  های مشارکت کننده:" + targetchannel.othechannels : ""), markup
                                )
                            }
                        }
                        else {
                            return userbot.answerCallbackQuery(msg.id, {text: uservarsm.messages.takeonecategory, showAlert: true});
                        }


                    }
                }
                if (msg.data.indexOf("wait-") == 0) {
                    var params = msg.data.split('-');
                    var targetchannel = user.channels.searchObject('step', params[0])
                    if (params[1] == "userpanel") {
                        user.channels[user.channels.indexOf(targetchannel)].remove();
                        markup = uservarsm.markups.userpanel
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.panel, {markup}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })
                    }
                    else if (params[1] == "verify") {
                        user.channels[user.channels.indexOf(targetchannel)].step = "waitforverify";
                        //  user.channels[user.channels.indexOf(targetchannel)].status=undefined;
                        if (user.channels[user.channels.indexOf(targetchannel)].status == 'editing') {
//             usermodel.findOne({chatid:msg.from.id,'channels':{$elemMatch: {step:'verified'}}}, function (err, channel) {
//           ////console.log(msg.from.id);
//           btns=[];
//           for(ci=0;ci<channel.channels.length;ci++){
//           btns.push([userbot.inlineButton(channel.channels[ci].tag , { callback: 'channel-'+channel.channels[ci]['_id']})])
//           }
//                     btns.push([userbot.inlineButton('بازگشت' , { callback: 'backtopanel'})])
//                     btns=userbot.inlineKeyboard(btns);
//     markup=btns;
//   })
                            admimesg = "\r\n اطلاعات کانال زیر ویرایش شد"
                        }
                        else if (user.channels[user.channels.indexOf(targetchannel)].status != 'editing') {
                            admimesg = "\r\nکانال جدید ثبت شد"

                            //
                        }
                        user.channels[user.channels.indexOf(targetchannel)].status = undefined;

                        markup = uservarsm.markups.userpanel
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.waitforverify, {markup}).then(re => {
                            new userutilm.saveLastMessage(user,re);
                            adminmodel.find({}, function (err, admins) {
                                for (ai = 0; ai < admins.length; ai++) {
                                    mesg = admimesg + "\r\n" + user.channels[user.channels.indexOf(targetchannel)].tag;
                                    adminbot.sendMessage(admins[ai].chatid, mesg);
                                }
                            })
                        })

                    }
                    else if (params[1] == "edit") {

                        //	user.channels[user.channels.indexOf(targetchannel)].step='tag'
                        user.channels[user.channels.indexOf(targetchannel)].status = 'editing'
                        // 	user.channels[user.channels.indexOf(targetchannel)].categories=[];
                        // 	return userbot.sendMessage(msg.from.id,uservarsm.messages.tag,{ ask:'tag'}).then(re => {
                        //  	user.messages.push({
                        //  		messageid:re.result['message_id'],
                        // 				message:re.result['text'],
                        // 				send:re.result['date']
                        //  	})
                        //  	user.save();
                        //  })
                        user.channels[user.channels.indexOf(targetchannel)].step = "setltype";
                        btns = [];
                        btns.push([userbot.inlineButton("زودترین زمان ممکن", {callback: 'setltype-زودترین زمان ممکن'})])
                        btns.push([userbot.inlineButton("هفتگی", {callback: 'setltype-هفتگی'})])
                        btns.push([userbot.inlineButton("ماهیانه", {callback: 'setltype-ماهیانه'})])
                        markup = userbot.inlineKeyboard(btns)
                        user.save();
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.newsetltype, {
                            markup,
                            ask: 'setltype'
                        }).then(re => {
                            new userutilm.saveLastMessage(user,re);
                        })

                    }

                }
                if (msg.data.indexOf("editothers-") == 0) {
                    params = msg.data.split('-');
                    targetchannel = user.channels.searchObject('_id', params[1])
                    user.channels[user.channels.indexOf(targetchannel)].step = "editothers";
                    user.save();
                    // console.log( user.channels[user.channels.indexOf(targetchannel)])
                    // return;
                    return userbot.sendMessage(msg.from.id,
						uservarsm.messages.eidtotherchannels+"\n"+
						(targetchannel.otherchannels?targetchannel.otherchannels:""), {
                    }).then(re => {
                        new userutilm.saveLastMessage(user,re);
                    })
                }
            }
        })

    }
}