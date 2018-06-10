module.exports={
	start:function(msg) {
		adminmodel.findOne({chatid:msg.from.id}, function (err, admin) {
			console.log(admin);
			if(admin){
				markup=adminvarsm.markups.panel;
				// console.log(markup,adminvarsm.messages.welcome);
		    	return adminbot.sendMessage(msg.from.id,adminvarsm.messages.welcome,{markup}).then(re => {
                    new adminutilm.saveLastMessage(admin,re);
                })
		    }
		    else{
		    	return adminbot.sendMessage(msg.from.id,adminvarsm.messages.accessdenied).then(re => {})
		    }
		});
	},
	restart:function(msg) {
		if(msg.from.adminname){
			//console.log(msg);
		adminmodel.findOne({chatid:msg.from.id}, function (err, admin) {
		
		    if( admin &&  admin.step && admin.step=="ok"){
		    	markup=adminvarsm.markups.panel
		        return adminbot.sendMessage(msg.from.id,adminvarsm.messages.panel,{markup}).then(re => {
                    new adminutilm.saveLastMessage(admin,re);
                })
		    }
		    else{

		    	// return adminbot.sendMessage(msg.from.id,adminvars.messages.welcome,{ask:'number'}).then(re => {})
		    }
		});
	}
	else{
		  return adminbot.sendMessage(msg.from.id,adminvarsm.setadminname).then(re => {})
        }
	}
};