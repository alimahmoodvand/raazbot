var text=function(msg){
	if(msg.text=="id")
	{
	    return adminbot.sendMessage(msg.from.id,msg.from.id);
	}
	adminmodel.findOne({chatid:msg.from.id,status:"1"}, function (err, admin) {
			// console.log(admin);
			if(admin){
	if(msg.text=='مدیریت کاربر'){
		userhandlerm.start(msg,admin);
	}
	if(msg.text=='مدیریت کانال'){
		channelhandlerm.start(msg,admin);
	}
	if(msg.text=='پیام های قبلی کاربران'){
		messagehandlerm.start(msg,admin,"raededmessage");
	}
	if(msg.text=='پیام های جدید کاربران'){
		messagehandlerm.start(msg,admin,"sentmessage");
	}
	else if(msg.text=='درخواست های باز'){
	     adminutilm.settlemented(admin);
	}
	if(msg.text=='افزودن ادمین'){
	     adminformsm.admin(msg);
	}
	if(msg.text=='حذف ادمین'){
	     adminformsm.adminlist(msg,admin);
	}
	if(msg.text=='ارسال پیام برای کابران'){
	     adminformsm.messageforusers(msg,admin);
	}
	if(msg.text=='جستجوی کانال'){
	     adminformsm.searchchannel(msg,admin);
	}
	if(msg.text=='انصراف'){
	     new admincommandsm.start(msg)
	}
	if(msg.text=='ارسال پیام گروهی'){
	     adminformsm.sendmessageforcategories(msg,admin);
	}
	// else if(msg.text=='پیام های کاربران'){
		
	// }
	// else if(msg.text=='درخواست های حذف کاربران'){
		
	// }
	// else if(msg.text=='کاربران مسدود شده'){
		
	// }
	// else if(msg.text=='درخواست های باز'){
		
	// }
	// else if(msg.text=='بستن درخواست های باز'){
		
	// }
	// else if(msg.text=='افزودن ادمین'){
		
	// }
	// else if(msg.text=='حذف ادمین'){
		
	// }
	// else if(msg.text=='   '){
		
	// }
	}
	else{
		return adminbot.sendMessage(msg.from.id,adminvarsm.messages.accessdenied).then(re => {})
	}
	});

}
module.exports.text=text;