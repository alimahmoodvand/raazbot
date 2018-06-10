module.exports = {
    getstep:function(step){
    	return {step:null,message:null};
    },
	saveLastMessage:function (user,res) {         
        // console.log({
        //     messageid: res['message_id'],
        //     message: res['text'],
        //     send: res['date']
        // });

        if(user.messages&&user.messages.length>0){
            user.messages[user.messages.length-1]={
                messageid: res['message_id'],
                message: res['text'],
                send: res['date']
            }
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
    updatemessage:function(chatId, messageId,text,markup,ask) {
    	// console.log(chatId, messageId,text,markup,ask);
		// if(markup&&ask){
		// userbot.editText(
		//  { chatId, messageId }, text,
		//  {markup:markup,ask:ask}
		// ).catch(error => console.log('Error:', error));
		// }
		// else if(markup){
		userbot.editText(
		 { chatId, messageId }, text,
		 {markup}
		).catch(error => console.log('Error:', error));
		// }
		// else if(ask){
		// userbot.editText(
		//  { chatId, messageId }, text,
		//  {ask:ask}
		// ).catch(error => console.log('Error:', error));
		// }
}
}