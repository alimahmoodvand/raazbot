function start() {

adminbot.on('/start',msg=>{
	new admincommandsm.start(msg);
})
adminbot.on('/menu',msg=>{
	new admincommandsm.start(msg);
})
adminbot.on('callbackQuery',msg=>{
	new admincbqueriesm.cbqueries(msg)
})
adminbot.on('text',msg=>{
	new admintextm.text(msg);
})
adminbot.on('document',function(msg,data){
  // ObjectId("58c2ea043cafeb0f7488b349")
  new adminfilem.start(msg,data);
})
adminbot.on('ask.name',msg=>{
	new adminformsm.name(msg)
	});
adminbot.on('ask.id',msg=>{
	new adminformsm.id(msg)
	});
adminbot.on('ask.showsearchchannel',msg=>{
    	adminmodel.findOne({chatid:msg.from.id,status:"1"}, function (err, admin) {
		// console.log(admin);
		if(admin){
new adminformsm.showsearchchannel(msg,admin)
		}
    	})
});
adminbot.on('ask.sendmessageforcategory',msg=>{
    	adminmodel.findOne({chatid:msg.from.id,status:"1"}, function (err, admin) {
		// console.log(admin);
		if(admin){
new adminformsm.sendmessageforcategory(msg,admin)
		}
    	})
});
adminbot.on('ask.message',msg=>{
console.log(msg.text)
	new adminformsm.messagesent(msg)
	});

adminbot.connect();
    adminbot.on('error',function (err) {
        console.log(err,"adminbot");

        // try{
        //     bot.sendMessage( err.data.from.id, /*e.message.toString()+*/"مشکلی در سیستم بوجود آمده است");
        // }
        // catch(err){
        //     console.log(err)
        // }   
       // process.exit(0);
    })
};
module.exports.start=start;