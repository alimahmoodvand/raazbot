function start(msg,data) {
    global.fileresponse = "فایل آپلود شد\r\n";
    async.retry({times: 10, interval: 2000}, function (callback) {
        adminbot.getFile(msg.document['file_id']).then(function (info) {
            console.log(" file info ", info);
            var filepath = new Date().getTime().toString() + ".xlsx";
            adminutilm.download(info.fileLink, filepath, function (err) {
            // var body = ''
            // http.get({
            //     hostname: 'api.telegram.org',
            //     port: 443,
            //     path: '/file/bot385864498:AAHuXydAO_C84MwBF_ewufd-7SBldcHn-Ic/' + info['file_path']
            //     //encoding: null
            // }, function(res) {
            //     res.on('data', function (chunk) {
            //     //chunk.toString('utf8')
            //     fs.writeFile(filepath, chunk, function (err) {
                    //xlsxj = require("xlsx-to-json");
                    if (err) {
                        console.log("writeFileerr",err)
                        callback(err, null);

                    }
                    else
                    {
                        xlsxj = require("xls-to-json");
                        console.log({
                            input: filepath,
                            output: "output.json",
                            sheet: "achTransfer"
                        });
                            
                        xlsxj({
                            input: filepath,
                            output: "output.json",
                            sheet: "achTransfer"
                        }, function (err, result) {
                            if (err) {
                                console.log("xls-to-json",err);
                                callback(err, null);
                            } else {
                                // console.log(result[0]);
                                // return;

                                try {
                                    shebas = [];
                                    bulks = [];
                                    if (typeof result !== 'undefined' && result.length > 0 && typeof result[0] !== 'undefined'
                                        && typeof result[0][cols[0]] !== 'undefined') {
                                        this.jobs = [];
                                        for (xi = 0; xi < result.length; xi++) {
                                            text = adminvarsm.messages.settlemented;
                                            chatid = null;
                                            for (ti = 0; ti < cols.length; ti++) {
                                                // try{
                                                result[xi][cols[ti]] = result[xi][cols[ti]].replace(/'/g, '')
                                                // }
                                                // catch (err){
                                                //     console.log(  result[xi],cols[ti],ti);
                                                //     process.exit(10)
                                                // }
                                                if (cols[ti] == "Please do not remove this first row  (Lotfan radife nokhost ra paak nafarmayid)") {
                                                    if (!chatid) {
                                                        chatid = result[xi][cols[ti]];
                                                    }
                                                } else {
                                                    text = text.replace(cols[ti], result[xi][cols[ti]])
                                                }
                                            }
                                            this.obj = {
                                                chatid: chatid,
                                                tag: result[xi][cols[6]],
                                                text: text,
                                                index: xi
                                            };
                                            this.jobs.push(adminutilm.sendBulkMessage.bind(null, this.obj))
                                            shebas.push({
                                                details: result[xi],
                                                text: /*result[xi]['Description (Sharh)']+"\r\n"+*/text
                                            })
                                        }
                                        if (shebas.length > 0) {
                                            async.series(this.jobs, function (err, data) {
                                                rejectlist = "Error list \r\n";
                                                for (di = 0; di < data.length; di++) {
                                                    if (!data[di].message_id) {
                                                        rejectlist += data[di].tag + " --- " + di + "\r\n";
                                                        // if (di != 0 && di % 2 == 0) {
                                                        //     rejectlist += "\r\n"
                                                        // }
                                                        console.log(di, data[di].description, data[di].tag)
                                                    }
                                                }
                                                adminbot.sendMessage(msg.from.id, rejectlist);
                                                callback(null, "ok");
                                            })
                                            new sendAndSave(shebas, msg);
                                        }
                                    }
                                    else if (typeof result !== 'undefined' && result.length > 0 && typeof result[0] !== 'undefined'
                                        && typeof result[0][bulk[0]] !== 'undefined') {
                                        console.log(result.length);
                                        this.jobs = [];
                                        for (xi = 0; xi < result.length; xi++) {
                                            text = `
#گزارش_عملکرد
در این تبلیغ شما شرکت کرده اید، این گزارش صرفا جهت اطلاع رسانی است و واریزی برای آن صورت نگرفته است. چنانچه مشکلی دارید به @Raaz_Variz_Admin پیام دهید. \r\n`;
                                            chatid = null;
                                            for (ti = 0; ti < bulk.length; ti++) {

                                                result[xi][bulk[ti]] = result[xi][bulk[ti]].replace(/'/g, '')
                                                if (bulk[ti] == "چت آیدی") {
                                                    if (!chatid) {
                                                        chatid = result[xi][bulk[ti]];
                                                    }
                                                } else {
                                                    text += bulk[ti] + "  :  " + result[xi][bulk[ti]] + "\r\n";
                                                }
                                            }
                                            this.obj = {
                                                tag: result[xi][bulk[9]],
                                                chatid: chatid,
                                                text: text,
                                                index: xi
                                            };
                                            this.jobs.push(adminutilm.sendBulkMessage.bind(null, this.obj))
                                            bulks.push({
                                                tag: result[xi][bulk[9]],
                                                date: result[xi][bulk[0]] + " " + result[xi][bulk[2]],
                                                text: text,
                                                details: result[xi]
                                            })
                                        }
                                        if (bulks.length > 0) {
                                            async.series(this.jobs, function (err, data) {
                                                console.log(data.length);
                                                rejectlist = "Error list \r\n";
                                                for (di = 0; di < data.length; di++) {
                                                    if (!data[di].message_id) {
                                                        rejectlist += data[di].tag + " --- " + di + "\r\n";
                                                        // if (di != 0 && di % 2 == 0) {
                                                        //     rejectlist += "\r\n"
                                                        // }
                                                        console.log(di, data[di].description, data[di].tag)
                                                    }
                                                }
                                                adminbot.sendMessage(msg.from.id, rejectlist);
                                                callback(null, "ok");
                                            })
                                            new bulker(bulks, msg);
                                        }
                                    }
                                } catch (err) {
                                    console.log(err)
                                    callback(err, null);
                                }
                            }
                        });
                    }
            })
        }).catch(function (err) {
                    console.log(err);
                    callback(err, null);
        })
    }, function (err, data) {
    })
};
var sendAndSave=function(shebas,msg) {
    if (shebas.length > 0) {
        try {
            var target = shebas.splice(0, 1)[0];
            target.details['channel'] = target.details['channel'].toLowerCase()
            target.details['transactionid'] = target.details['transactionid'].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
            if (target.details['transactionid'] && target.details['transactionid'].trim() != "") {
                usermodel.findOne({channels: {$elemMatch: {transactions: {$elemMatch: {_id: new mongoose.Types.ObjectId(target.details['transactionid'])}}}}}, function (err, user) {
                    if (user) {
                        channelindex = user.channels.indexOf(user.channels.searchObject('tag', target.details['channel']))
                        transactionindex = user.channels[channelindex].transactions.indexOf(user.channels[channelindex].transactions.searchObject('_id', target.details['transactionid']))
                        user.channels[channelindex].transactions[transactionindex].step = "settlemented"
                        user.channels[channelindex].transactions[transactionindex].desc = target.details['Description (Sharh)'].toString()
                        user.channels[channelindex].transactions[transactionindex].price = target.details['Transfer Amount (Mablagh)'].toString()
                        user.channels[channelindex].transactions[transactionindex].factorno = target.details['Factor Number (Shomare Factor)'].toString()
                        user.channels[channelindex].transactions[transactionindex].cardnames = target.details['Owner Name (Name e Sahebe Seporde)'].toString()
                        user.channels[channelindex].transactions[transactionindex].shebanos = target.details['Destination Iban Number (Variz Be Sheba)'].toString()
                        user.channels[channelindex].transactions[transactionindex].cardnos = target.details['cardno'].toString()
                        user.channels[channelindex].transactions[transactionindex].create = target.details['date'].toString()
                        user.save()
                        if (user.number)
                            markup = uservarsm.markups.justmenu
                        else
                            markup = uservarsm.markups.menu
                        console.log(target.details['channel'])
                        // userbot.sendMessage(user.chatid, target.text, {markup}).then(re => {
                        // })
                        sendAndSave(shebas, msg)
                    }
                    else {
                        fileresponse += target.details['channel'] + " - - " + target.details['date'] + "\r\n"
                        sendAndSave(shebas, msg)
                    }
                })
            }
            else {
                usermodel.findOne({
                    channels: {
                        $elemMatch: {
                            tag: target.details['channel'],
                            'step': 'verified'
                        }
                    }
                }, function (err, user) {
                    if (user) {
                        channelindex = user.channels.indexOf(user.channels.searchObject('tag', target.details['channel']))
                        user.channels[channelindex].transactions.push(
                            {
                                create: new Date().getTime(),
                                step: "settlemented",
                                desc: target.details['Description (Sharh)'].toString(),
                                price: target.details['Transfer Amount (Mablagh)'].toString(),
                                factorno: target.details['Factor Number (Shomare Factor)'].toString(),
                                cardnames: target.details['Owner Name (Name e Sahebe Seporde)'].toString(),
                                shebanos: target.details['Destination Iban Number (Variz Be Sheba)'].toString(),
                                cardnos: target.details['cardno'].toString(),
                                create: target.details['date'].toString()
                            })
                        user.save()
                        if (user.number)
                            markup = uservarsm.markups.justmenu
                        else
                            markup = uservarsm.markups.menu
                        console.log(target.details['channel'])

                        // userbot.sendMessage(user.chatid, target.text, {markup}).then(re => {
                        // })
                        sendAndSave(shebas, msg)

                    }
                    else {
                        fileresponse += target.details['channel'] + " - - " + target.details['date'] + "\r\n"
                        sendAndSave(shebas, msg)
                    }
                })
            }
        }
        catch (err) {
            fileresponse += target.details['channel'] + " - - " + target.details['date'] + "\r\n"
            sendAndSave(shebas, msg)
        }
    }
    else {
        // return adminbot.sendMessage(msg.from.id, fileresponse);
    }
}
var bulker=function(bulks,msg) {
    if (bulks.length > 0) {
        try {
            var target = bulks.splice(0, 1)[0];
            //	console.log(target.tag)

            //target.details['channel']=target.details['channel'].toLowerCase()
            target.tag = target.tag.toLowerCase()
            // usermodel.findOne({'channels':{$elemMatch: {'tag':target.tag}}}, function (err, channel){
            // console.log(err, channel.channels.searchObject('tag',target.tag));
            // })
            usermodel.findOne({
                'channels': {
                    $elemMatch: {
                        'tag': target.tag,
                        'step': 'verified'
                    }
                }
            }, function (err, user) {
                if (user) {
                    channelindex = user.channels.indexOf(user.channels.searchObject('tag', target.tag))
//return userbot.sendMessage(user.chatid,JSON.stringify(user.channels[channelindex].performances));
//retrun;
                    user.channels[channelindex].performances.push(
                        {
                            date: target.details[bulk[0]],
                            dayofweek: target.details[bulk[1]],
                            hour: target.details[bulk[2]],
                            admin: target.details[bulk[3]],
                            price: target.details[bulk[4]],
                            allview: target.details[bulk[5]],
                            limit: target.details[bulk[6]],
                            bannerdesc: target.details[bulk[7]],
                            relpydesc: target.details[bulk[8]],
                            channel: target.details[bulk[9]],
                            desc: target.details[bulk[10]],
                            view: target.details[bulk[11]],
                            earn: target.details[bulk[12]]
                        }
                    )
                    user.save();
                    if (user.number)
                        markup = uservarsm.markups.justmenu
                    else
                        markup = uservarsm.markups.menu
                     console.log(target.tag)

                    // userbot.sendMessage(user.chatid, target.text, {markup}).then(re => {
                    // })
                    bulker(bulks, msg);
                }
                else {
                    console.log(err)
                    fileresponse += target['tag'] + " - - " + target['date'] + "\r\n"
                    bulker(bulks, msg);

                }
            })
        }
        catch (err) {
            console.log("rrrrrrrrrrrrrrrrrrrr", err)
            fileresponse += target['tag'] + " - - " + target['date'] + "\r\n"
            bulker(bulks, msg)
        }
    }
    else {
        // return adminbot.sendMessage(msg.from.id, fileresponse);
    }
}


module.exports.start=start;