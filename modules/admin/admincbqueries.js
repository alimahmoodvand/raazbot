module.exports={
cbqueries:function(msg) {
	console.log(msg.data);
	adminmodel.findOne({chatid:msg.from.id}, function (err, admin) {
	if(msg.message['message_id']==admin.messages[admin.messages.length-1].messageid){
//console.log(msg.data.indexOf("sendmessageforcategories-"))
	 if(msg.data.indexOf("sendmessageforcategories-")==0)
	{
	    admin.category=msg.data.split('-')[1];
	    admin.save();
	    markup=adminbot.keyboard([['انصراف']]);
        return adminbot.sendMessage(msg.from.id,adminvarsm.messages.messageforusers,{markup,ask:'sendmessageforcategory'}).then(re => { })
	}
	 if(msg.data=="usersfile")
	{
		adminutilm.usersfile(admin)
	}
	else if(msg.data=="backtouseropration")
	{
		userhandlerm.useropration(msg,admin)
	}
	else if(msg.data.indexOf("userlist-")==0)
	{
		userhandlerm.userlistopration(msg,admin)
	}
	else if(msg.data.indexOf("userlist")==0)
	{
		userhandlerm.userlist(msg,admin)
	}
	else if(msg.data.indexOf("userdoblock-")==0)
	{
		userhandlerm.userdoblock(msg,admin)
	}
	else if(msg.data.indexOf("userblock-")==0)
	{
		userhandlerm.userblockopration(msg,admin)
	}
	else if(msg.data.indexOf("userblock")==0)
	{
		userhandlerm.userblock(msg,admin)
	}
	else if(msg.data.indexOf("userdook-")==0)
	{
		userhandlerm.userdook(msg,admin)
	}
	else if(msg.data=="backtochannelopration")
	{
		channelhandlerm.channelopration(msg,admin)
	}
	else if(msg.data.indexOf("channellist-")==0)
	{
		channelhandlerm.channellistopration(msg,admin,"waitforverify","channellist")
	}
		else if(msg.data.indexOf("channellist")==0)
	{
		channelhandlerm.channellist(msg,admin,"waitforverify")
	}

	else if(msg.data.indexOf("channelrequestfordelete-")==0)
	{
		channelhandlerm.channellistopration(msg,admin,"requestfordelete","channelrequestfordelete")
	}
	else if(msg.data.indexOf("channelrequestfordelete")==0)
	{
		channelhandlerm.channellist(msg,admin,"requestfordelete")
	}
	

	else if(msg.data.indexOf("channelverified-")==0)
	{
		channelhandlerm.channellistopration(msg,admin,"verified","channelverified")
	}
		else if(msg.data.indexOf("channelverified")==0)
	{
		channelhandlerm.channellist(msg,admin,"verified")
	}
	
	

	else if(msg.data.indexOf("channelblocked-")==0)
	{
		channelhandlerm.channellistopration(msg,admin,"blocked","channelblocked")
	}
		else if(msg.data.indexOf("channelblocked")==0)
	{
		channelhandlerm.channellist(msg,admin,"blocked")
	}

    else if(msg.data.indexOf("channeldeleted-")==0)
	{
		channelhandlerm.channellistopration(msg,admin,"deleted","channeldeleted")
	}
		else if(msg.data.indexOf("channeldeleted")==0)
	{
		channelhandlerm.channellist(msg,admin,"deleted")
	}
	else if(msg.data.indexOf("channeldodelete-")==0)
	{
		channelhandlerm.channeldodelete(msg,admin)
	}
	else if(msg.data.indexOf("channeldoblock-")==0)
	{
		channelhandlerm.channeldoblock(msg,admin)
	}
	else if(msg.data.indexOf("channeldoverify-")==0)
	{
		channelhandlerm.channeldoverify(msg,admin)
	}
	else if(msg.data.indexOf("channeldodeleted-")==0)
	{
		channelhandlerm.channeldodeleted(msg,admin)
	}
     else if(msg.data.indexOf("channeldenydeleted-")==0)
     {
         channelhandlerm.channeldenydeleted(msg,admin)
     }
	else if(msg.data.indexOf("channeldoblocked-")==0)
	{
		channelhandlerm.channeldoblocked(msg,admin)
	}
    if(msg.data=="messagelist")
	{
		messagehandlerm.messagelist(msg,admin)
	}
	if(msg.data.indexOf("adminlist-")==0)
	{
		adminformsm.deleted(msg,admin)
	}
	else if(msg.data.indexOf("messagelistoprationsentmessage-")==0)
	{
		messagehandlerm.messagelistopration(msg,admin,"sentmessage")
	}
else if(msg.data.indexOf("messagelistsentmessage-")==0)
	{
		messagehandlerm.messagelist(msg,admin,"sentmessage")
	}
else if(msg.data.indexOf("messagelistoprationreadsentmessage-")==0)
	{
		messagehandlerm.messagereaded(msg,admin,"sentmessage")
	}
else if(msg.data.indexOf("messagelistoprationraededmessage-")==0)
	{
		messagehandlerm.messagelistopration(msg,admin,"raededmessage")
	}
else if(msg.data.indexOf("messagelistraededmessage-")==0)
	{
		messagehandlerm.messagelist(msg,admin,"raededmessage")
	}
else if(msg.data.indexOf("messagelistoprationreadraededmessage-")==0)
	{
		messagehandlerm.messagereaded(msg,admin,"raededmessage")
	}
	if(msg.data.indexOf("channelcategories-")==0)
	{
		adminformsm.categorieslist(msg,admin)
	}
	if(msg.data.indexOf("l-")==0)
	{
		adminformsm.categories(msg,admin)
	}
if(msg.data=="channelsfile")
	{
		adminutilm.channelsfile(admin)
	}
}
})
}
}