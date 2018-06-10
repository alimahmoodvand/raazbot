function start() {

    userbot.on('/start', msg => {
        console.log(msg.from)
        new usercommandsm.start(msg);
    })
    userbot.on('/menu', msg => {
        new usercommandsm.restart(msg);
    })
    userbot.on('/passed', msg => {
        new userformsm.otherchannels(msg);
    })
    userbot.on('callbackQuery', msg => {
        new usercbqueriesm.cbqueries(msg)
    })


// userbot.on('stop',msg=>{
// //console.log(msg)
// })

// userbot.on('block',msg=>{
// //console.log(msg)
// })

// userbot.on('/stop',msg=>{
// //console.log(msg)
// })

// userbot.on('/block',msg=>{
// //console.log(msg)
// })


    userbot.on('contact', msg => {
        usermodel.findOne({chatid: msg.from.id}, function (err, user) {
            if (msg.from.id == msg.contact['user_id']) {
                if (user.step == "username" || user.step == "ok") {
                    user.number = msg.contact['phone_number'];
                    user.save();
                    if (user.step != "ok") {
                        user.step = "name"
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.name, {
                            markup: 'hide',
                            ask: 'name'
                        }).then(re => {
                            new userutilm.saveLastMessage(user, re);
                        })
                    }

                    if (user.step == "ok") {
                        markup = uservarsm.markups.justmenu;
                        return userbot.sendMessage(msg.from.id, uservarsm.messages.sharednumber, {markup}).then(re => {
                            new userutilm.saveLastMessage(user, re);
                        })
                    }
                }
            }
        })
    });
// userbot.on('ask.name',msg=>{
// 	new userformsm.name(msg)
// 	});
// userbot.on('ask.tag',msg=>{
// 	new userformsm.tag(msg)
// 	});
// userbot.on('ask.cardno',msg=>{
// 	new userformsm.cardno(msg)
// 	});
// userbot.on('ask.shebano',msg=>{
// 	new userformsm.shebano(msg)
// 	});
    userbot.on('ask.sendmessage', msg => {
        new userformsm.sendmessage(msg)
    });
    userbot.on('text', msg => {
//console.log(msg.text)
        new usertextm.text(msg);
    })
    userbot.connect();
    userbot.on('error', function (err) {
        console.log(err,"adminbot");

        //console.log(err,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        // try{
        //     bot.sendMessage( err.data.from.id, /*e.message.toString()+*/"مشکلی در سیستم بوجود آمده است");
        // }
        // catch(err){
        //     //console.log(err)
        // }   
        // process.exit(0);
    })

};
module.exports.start=start;