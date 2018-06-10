module.exports = {
    download: function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    },
    saveLastMessage:function (user,res) {
        if(user.messages&&user.messages.length>0){
            user.messages[user.messages.length-1]={
                messageid: res['message_id'],
                message: res['text'],
                send: res['date']
            };
        }
        else{
            user.messages.push({
                messageid: res['message_id'],
                message: res['text'],
                send: res['date']
            })
        }

        user.save();
        // { message_id: 342259,
        //     from:
        //     { id: 434024156,
        //         is_bot: true,
        //         first_name: 'ربات واریزی های RaaZ',
        //         username: 'Raaz_variz_bot' },
        //     chat:
        //     { id: 427879755,
        //         first_name: 'Nahid',
        //         last_name: 'D',
        //         username: 'Nahiddrsh',
        //         type: 'private' },
        //     date: 1527061870,
        //         text: 'پنل کاربری' }

    },
    getchannels: function (step, skip, limit, cb) {
        // console.log(skip*limit)
        usermodel.aggregate({
                $match: {
                    "channels.step": step,
                    // "step":"ok"
                }

            },
            {$sort: {"channels.create": -1}},
            {$skip: parseInt(skip * limit)},
            {$limit: limit},
            {
                $unwind: "$channels"

            }, {
                $match: {
                    "channels.step": step,
                    //   "step":"ok"
                }
            }, {
                $group: {
                    _id: 0,
                    channels: {
                        $push: "$channels"
                    }
                }
            }, cb
        );
    },
    getchannel: function (id, step, cb) {
//  usermodel.aggregate({
//     $match : {
//         "channels.step" : step,
//         // "step":"ok"
//     }
// }, {
//     $unwind :"$channels"

// }, {
//     $match : {
//         "channels.step" : step,
//         // "step":"ok"
//     }
// }, {
//     $group : {
//         _id:0,
//         channels : {
//             $push : "$channels"
//         }
//     }
// },
// function(err,channels){
//         console.log(err,channels)

//     if(channels&&channels.length>0||true){
        usermodel.findOne({channels: {$elemMatch: {_id: new mongoose.Types.ObjectId(id)}}}, function (err, user) {
            console.log(err, user)

            // channels=channels[0].channels;
            for (ci = 0; ci < user.channels.length; ci++) {

                if (user.channels[ci]['_id'] == id) {
                    cb(err, user.channels[ci], user)
                }
            }
        })
        // }
        // else{
        //     cb(err,null,null)
        // }
// }
// );
    },
    updatemessage: function (chatId, messageId, text, markup, ask) {
        // console.log(chatId, messageId,text,markup,ask);
        // if(markup&&ask){
        // userbot.editText(
        //  { chatId, messageId }, text,
        //  {markup:markup,ask:ask}
        // ).catch(error => console.log('Error:', error));
        // }
        // else if(markup){
        adminbot.editText(
            {chatId, messageId}, text,
            {markup}
        ).catch(error => console.log('Error:', error)
        )
        ;
        // }
        // else if(ask){
        // userbot.editText(
        //  { chatId, messageId }, text,
        //  {ask:ask}
        // ).catch(error => console.log('Error:', error));
        // }
    },
    getsettlements: function (cb) {
        usermodel.aggregate({
            $match: {
                "channels.transactions.step": "requestforsettlement"
            }
        }, {
            $unwind: "$channels"
        }, {
            $match: {
                "channels.transactions.step": "requestforsettlement"
            }
        }, {
            $group: {
                _id: "$_id",
                channels: {
                    $push: "$channels"
                }
            }
        }, cb);
    },
    settlemented: function (admin) {
        usermodel.find({channels: {$elemMatch: {transactions: {$elemMatch: {step: 'requestforsettlement'}}}}},
            function (err, users) {
                var xlsx = require('xlsx');

                var filepath = "excel.xlsx";
                var workbook = xlsx.readFile(filepath);
                var dateFormat = require('dateformat');

                var dateFormat = require('dateformat');
                var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                var row = 2;
                // console.log(worksheet['!ref']);
                for (ui = 0; ui < users.length; ui++) {
                    for (ci = 0; ci < users[ui].channels.length; ci++) {
                        if (users[ui].channels[ci].transactions.searchObject('step', 'requestforsettlement')) {
                            console.log(users[ui].channels[ci].transactions.searchObject('step', 'requestforsettlement')['create']);
                            date = parseInt((users[ui].channels[ci].transactions.searchObject('step', 'requestforsettlement')['create']).toString())
                            worksheet["A" + (row).toString()] = {t: 's', v: users[ui].channels[ci].shebano};
                            worksheet["B" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardname};
                            worksheet["C" + (row).toString()] = {t: 's', v: ""};
                            worksheet["D" + (row).toString()] = {t: 's', v: ""};
                            worksheet["E" + (row).toString()] = {t: 's', v: ""};
                            worksheet["F" + (row).toString()] = {t: 's', v: ""};
                            worksheet["G" + (row).toString()] = {t: 's', v: users[ui].channels[ci].tag};
                            worksheet["H" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardno};
                            worksheet["I" + (row).toString()] = {
                                t: 's',
                                v: users[ui].channels[ci].transactions.searchObject('step', 'requestforsettlement')['_id']
                            };
                            worksheet["J" + (row).toString()] = {
                                t: 's',
                                v: dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString()
                            };
                            row++;
                        }

                    }

                }
                worksheet['!ref'] = "A1:J" + (row - 1).toString();
// console.log(worksheet['!ref']);
                filename = dateFormat(new Date().getTime(), "yyyy-mm-dd-hh-MM-ss").toString() + ".xlsx";
                xlsx.writeFile(workbook, filename);
                console.log(adminbot.sendDocument(admin.chatid, "./" + filename))
            })

    },
    usersfile: function (admin) {
        usermodel.find({},
            function (err, users) {
                var xlsx = require('xlsx');

                var filepath = "users.xlsx";
                var workbook = xlsx.readFile(filepath);
                var dateFormat = require('dateformat');

                var dateFormat = require('dateformat');
                var worksheet1 = workbook.Sheets[workbook.SheetNames[0]];
                var row = 2;
                // console.log(worksheet['!ref']);
                for (ui = 0; ui < users.length; ui++) {
                    if (users[ui].step == "ok") {
                        //  console.log(users[ui].channels[ci].transactions.searchObject('step','requestforsettlement')['create']);
                        date = parseInt((users[ui]['create']).toString())
                        worksheet1["A" + (row).toString()] = {t: 's', v: users[ui].chatid};
                        worksheet1["B" + (row).toString()] = {t: 's', v: users[ui].name};
                        worksheet1["C" + (row).toString()] = {t: 's', v: users[ui].number || ""};
                        worksheet1["D" + (row).toString()] = {t: 's', v: users[ui].username};
                        worksheet1["E" + (row).toString()] = {
                            t: 's',
                            v: dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString()
                        };
                        row++;
                    }
                }
                worksheet1['!ref'] = "A1:E" + (row - 1).toString();
                var worksheet2 = workbook.Sheets[workbook.SheetNames[1]];
                row = 2;
                // console.log(worksheet['!ref']);
                for (ui = 0; ui < users.length; ui++) {
                    if (users[ui].step == "block") {
                        //  console.log(users[ui].channels[ci].transactions.searchObject('step','requestforsettlement')['create']);
                        date = parseInt((users[ui]['create']).toString())
                        worksheet2["A" + (row).toString()] = {t: 's', v: users[ui].chatid};
                        worksheet2["B" + (row).toString()] = {t: 's', v: users[ui].name};
                        worksheet2["C" + (row).toString()] = {t: 's', v: users[ui].number || ""};
                        worksheet2["D" + (row).toString()] = {t: 's', v: users[ui].username};
                        worksheet2["E" + (row).toString()] = {
                            t: 's',
                            v: dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString()
                        };

                        row++;
                    }
                }
                worksheet2['!ref'] = "A1:E" + (row - 1).toString();
// console.log(worksheet['!ref']);
                filename = dateFormat(new Date().getTime(), "yyyy-mm-dd-hh-MM-ss").toString() + ".xlsx";
                xlsx.writeFile(workbook, filename);
                console.log(adminbot.sendDocument(admin.chatid, "./" + filename))
            })

    },
    channelsfile: function (admin) {
        usermodel.find({}, function (err, users) {
            var xlsx = require('xlsx');

            var filepath = "channels.xlsx";
            var workbook = xlsx.readFile(filepath);
            var dateFormat = require('dateformat');

            var dateFormat = require('dateformat');
            var worksheet1 = workbook.Sheets[workbook.SheetNames[0]];
            var row = 2;
            // console.log(worksheet['!ref']);
            for (ui = 0; ui < users.length; ui++) {
                //  console.log(users[ui].channels[ci].transactions.searchObject('step','requestforsettlement')['create']);
                for (ci = 0; ci < users[ui].channels.length; ci++) {
                    if (users[ui].channels[ci]['step'] == "verified") {

                        date = null;
                        if (users[ui].channels[ci]['create'])
                            date = parseInt((users[ui].channels[ci]['create'].toString()))
                        worksheet1["A" + (row).toString()] = {t: 's', v: users[ui].channels[ci].tag};
                        worksheet1["B" + (row).toString()] = {t: 's', v: "@" + users[ui].username};
                        worksheet1["C" + (row).toString()] = {t: 's', v: users[ui].number || ""};
                        worksheet1["D" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardno};
                        worksheet1["E" + (row).toString()] = {t: 's', v: users[ui].channels[ci].shebano};
                        worksheet1["F" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardname || ""};
                        worksheet1["G" + (row).toString()] = {t: 's', v: users[ui].channels[ci].setltype || ""};
                        worksheet1["H" + (row).toString()] = {t: 's', v: users[ui].channels[ci].categories.join(',')};
                        worksheet1["I" + (row).toString()] = {
                            t: 's',
                            v: date ? dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString() : ""
                        };
                        worksheet1["J" + (row).toString()] = {t: 's', v: users[ui].channels[ci].otherchannels || ""};
                        worksheet1["K" + (row).toString()] = {t: 's', v: users[ui].chatid};
                        worksheet1["L" + (row).toString()] = {t: 's', v: users[ui].username};

                        row++;
                    }
                }
            }
            console.log(row)
            worksheet1['!ref'] = "A1:L" + (row - 1).toString();
            var worksheet2 = workbook.Sheets[workbook.SheetNames[1]];
            row = 2;
            for (ui = 0; ui < users.length; ui++) {
                //  console.log(users[ui].channels[ci].transactions.searchObject('step','requestforsettlement')['create']);
                for (ci = 0; ci < users[ui].channels.length; ci++) {
                    if (users[ui].channels[ci]['step'] == "blocked") {
                        date = null;
                        if (users[ui].channels[ci]['create'])
                            date = parseInt((users[ui].channels[ci]['create'].toString()))
                        worksheet2["A" + (row).toString()] = {t: 's', v: users[ui].channels[ci].tag};
                        worksheet2["B" + (row).toString()] = {t: 's', v: users[ui].username};
                        worksheet2["C" + (row).toString()] = {t: 's', v: users[ui].number || ""};
                        worksheet2["D" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardno};
                        worksheet2["E" + (row).toString()] = {t: 's', v: users[ui].channels[ci].shebano};
                        worksheet2["F" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardname || ""};
                        worksheet2["G" + (row).toString()] = {t: 's', v: users[ui].channels[ci].setltype || ""};
                        worksheet2["H" + (row).toString()] = {t: 's', v: users[ui].channels[ci].categories.join(',')};
                        worksheet2["I" + (row).toString()] = {
                            t: 's',
                            v: date ? dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString() : ""
                        };
                        worksheet2["J" + (row).toString()] = {t: 's', v: users[ui].channels[ci].otherchannels || ""};
                        worksheet2["K" + (row).toString()] = {t: 's', v: users[ui].chatid};
                        worksheet2["L" + (row).toString()] = {t: 's', v: users[ui].username};

                        row++;
                    }
                }
            }
            worksheet2['!ref'] = "A1:L" + (row - 1).toString();
            var worksheet3 = workbook.Sheets[workbook.SheetNames[2]];
            row = 2;
            for (ui = 0; ui < users.length; ui++) {
                //  console.log(users[ui].channels[ci].transactions.searchObject('step','requestforsettlement')['create']);
                for (ci = 0; ci < users[ui].channels.length; ci++) {
                    if (users[ui].channels[ci]['step'] == "deleted") {
                        date = null;
                        if (users[ui].channels[ci]['create'])
                            date = parseInt((users[ui].channels[ci]['create'].toString()))
                        worksheet3["A" + (row).toString()] = {t: 's', v: users[ui].channels[ci].tag};
                        worksheet3["B" + (row).toString()] = {t: 's', v: users[ui].username};
                        worksheet3["C" + (row).toString()] = {t: 's', v: users[ui].number || ""};
                        worksheet3["D" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardno};
                        worksheet3["E" + (row).toString()] = {t: 's', v: users[ui].channels[ci].shebano};
                        worksheet3["F" + (row).toString()] = {t: 's', v: users[ui].channels[ci].cardname || ""};
                        worksheet3["G" + (row).toString()] = {t: 's', v: users[ui].channels[ci].setltype || ""};
                        worksheet3["H" + (row).toString()] = {t: 's', v: users[ui].channels[ci].categories.join(',')};
                        worksheet3["I" + (row).toString()] = {
                            t: 's',
                            v: date ? dateFormat(date, "yyyy-mm-dd hh:MM:ss").toString() : ""
                        };
                        worksheet3["J" + (row).toString()] = {t: 's', v: users[ui].channels[ci].otherchannels || ""};
                        worksheet3["K" + (row).toString()] = {t: 's', v: users[ui].chatid};
                        worksheet3["L" + (row).toString()] = {t: 's', v: users[ui].username};


                        row++;
                    }
                }
            }
            worksheet3['!ref'] = "A1:L" + (row - 1).toString();
            // console.log(worksheet['!ref']);

            filename = dateFormat(new Date().getTime(), "yyyy-mm-dd-hh-MM-ss").toString() + ".xlsx";
            xlsx.writeFile(workbook, filename);
            console.log(adminbot.sendDocument(admin.chatid, "./" + filename))
        })
    },
    sendChannelData: function (otherchannels, tag, categories, chatid, username, action) {
        this.post_data = {
            otherchannels: otherchannels?otherchannels:"",
            tag: tag,
            username: username,
            chatid: chatid,
            action: action,
            categories: categories[0]
        }
        console.log(this.post_data);
        this.post_data = querystring.stringify(this.post_data);
        /*console.log(this.post_data)*/
        this.post_req = httpRequest.request(httpCredRequest, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log(res.statusCode)

            });

        });
        this.post_req.on('error', function (err) {
            console.log(err)
        })
        this.post_req.write(this.post_data);
        this.post_req.end();
    },
    sendBulkMessage:function (msg,callback) {
        if (!msg.markup) {
            msg.markup = {};
        }
        // console.log(msg.index, new Date())
        delay = 50;
        setTimeout(() => {
            return userbot.sendMessage(msg.chatid, msg.text, msg.markup).then(function (res) {
                res.tag = msg.tag
                callback(null, res)
            }).catch(function (err) {
                if (err.error_code == 429) {
                    timeout = (parseInt(err.description.replace('Too Many Requests: retry after', '').trim()) * 1000) + 1000;
                } else {
                    timeout = 50;
                }
                err.tag = msg.tag
                setTimeout(() =>
                        callback(null, err)
                    , timeout)
            })
        }, delay)
    }
}


// db.users.aggregate({
//     $match : {
//         "channels.transactions.step" : "requestforsettlement",
//         "channels.step" : "verified",
//         "step":"ok"
//     }
// }, {
//     $unwind :"$channels"
    
// },
//  {
//     $match : {
//         "channels.transactions.step" : "requestforsettlement",
//         "channels.step" : "verified",
//         "step":"ok"
//     }
// }, {
//     $group : {
//         _id:0,
//         channels : {
//             $push : "$channels"
//         }
//     }
// });