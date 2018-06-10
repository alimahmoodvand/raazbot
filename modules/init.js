function init (crash) {

//bot
global.TeleBot = require('telebot');
global.async = require('async');
global.token='434024156:AAGsIGk0bTr0Hngbpn2AVUiNb-z90aUze5w'
global.userbot = new TeleBot({token:token, // Required. Telegram Bot API token.
  webhook: {
    key: '../../../../../etc/apache2/ssl/apache.key', // Optional. Private key for server.
    cert: '../../../../../etc/apache2/ssl/apache.crt', // Optional. Public key.
    url: 'https://141.105.69.168/userbot.php?port=1113',
    host: 'localhost',
    port: 1113,
      maxConnections: 100
  },usePlugins: ['askUser']
});
global.token='385864498:AAHuXydAO_C84MwBF_ewufd-7SBldcHn-Ic'
global.adminbot = new TeleBot({token:token, // Required. Telegram Bot API token.
    webhook: {
      key: '../../../../../etc/apache2/ssl/apache.key', // Optional. Private key for server.
      cert: '../../../../../etc/apache2/ssl/apache.crt', // Optional. Public key.
    url: 'https://141.105.69.168/userbot.php?port=1112',
    host: 'localhost',
    port: 1112,
        maxConnections: 100
    },usePlugins: ['askUser']
  });
// userbot.use(require('telebot/modules/flooder'));
// userbot.use(require('telebot/modules/ask'));
// adminbot.use(require('telebot/modules/ask'));
 global.httpCredRequest = {
            host: 'raaz.co',
            port: '80',
            path: '/api/syncchannels',
            method: 'POST',

            headers: {
                // 'Content-Type': 'application/json'
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
               }
        };
 // global.httpCredRequest = {
 //            host: '141.105.69.162',
 //            port: '80',
 //            path: '/new_war/api/syncchannels',
 //            method: 'POST',
 //
 //            headers: {
 //                // 'Content-Type': 'application/json'
 //               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
 //               }
 //        };


//db
global.userschema={
    chatid    : String,
    name     : String,
    username      : String,
    number      : String,
    create      : String,
    tmpchannel:{
    	step:String,
    	tag:String,
    	shebano:String,
    	cardno:String,
    	cardname:String,
    	setltype:String,
    	status:String,
    	categories:[],
    	create:String,
    	otherchannels:String,
    	transactions:[{
    		factorno:String,
    		cardnames:String,
    		cardnos:String,
    		shebanos:String,
    		price:String,
    		desc:String,
    		create:String,
            step:String
    	}],
performances:[{
date:String,
dayofweek:String,
hour:String,
admin:String,
price:String,
allview:String,
limit:String,
bannerdesc:String,
relpydesc:String,
channel:String,
desc:String,
view:String,
earn:String
    	}]
    },
    channels :[{
    	step:String,
    	tag:String,
    	shebano:String,
    	cardno:String,
    	cardname:String,
    	setltype:String,
    	status:String,
    	categories:[],
    	create:String,
    	otherchannels:String,
    	img:String,
    	desc:String,
    	transactions:[{
    		factorno:String,
    		cardnames:String,
    		cardnos:String,
    		shebanos:String,
    		price:String,
    		desc:String,
    		create:String,
            step:String
    	}],
performances:[{
date:String,
dayofweek:String,
hour:String,
admin:String,
price:String,
allview:String,
limit:String,
bannerdesc:String,
relpydesc:String,
channel:String,
desc:String,
view:String,
earn:String
    	}]
    }],
    messages:[{
    	messageid:String,
    	message:String,
    	send:String
    }],
    messageforadmin:[{
        message:String,
        status:String,
        send:String,
    }],
    step:String,
    status:String
};
global.adminschema={
    chatid    : String,
    name     : String,
    username      : String,
    role      : String,
    status      : String,
    category      : String,
    create      : String,
    messages:[{
        messageid:String,
        message:String,
        send:String
    }],
};
global.cols=[
"Please do not remove this first row  (Lotfan radife nokhost ra paak nafarmayid)",
"Destination Iban Number (Variz Be Sheba)",
"Owner Name (Name e Sahebe Seporde)",
"Transfer Amount (Mablagh)",
"Description (Sharh)",
"Factor Number (Shomare Factor)",
"channel",
"cardno",
"transactionid",
"date"
];
global.bulk=[
'تاریخ تبلیغ',
'روز هفته',
'ساعت تبلیغ',
'ادمین تبلیغ',
'قیمت تبلیغ',
'ویو کلی تبلیغ',
'محدودیت پست',
'توضیح بنر',
'توضیح ریپلای',
'کانال تبلیغ کننده',
'توضیحات',
'تعداد بازدید داده شده',
'درامد حاصل از تبلیغ',
'چت آیدی'
];
global.excelpath="excel.xlsx";
global.xlsx = require('xlsx');

global.mongoose = require('mongoose');
//mongoose.connect('mongodb://razbot:g0nzales@ds161008.mlab.com:61008/razbot');
mongoose.connect('mongodb://localhost:27017/raazbot',{
        server: {
            socketOptions: {
                socketTimeoutMS: 0,
                    connectionTimeout: 0
            }
        }
    });
global.Schema = mongoose.Schema;

users=new Schema(userschema)
global.usermodel = mongoose.model('users', users);
admins=new Schema(adminschema)
global.adminmodel = mongoose.model('admins', admins);

 // m = new adminmodel;
 //        m.chatid="71536363";
 // m.name="ali";
 // m.role="administrator";
 // m.status="1";
 // m.create=new Date().getTime();
 // m.save()
//node modules
global.fs=require('fs')
global.http=require('https')
global.httpRequest=require('http')
global.request=require('request')
global.querystring=require('querystring')


//user modules
global.userformsm=require('./user/userforms')
global.usermanagerm=require('./user/usermanager')
global.uservarsm=require('./user/uservars')
global.usercommandsm=require('./user/usercommands')
global.userdbm=require('./user/userdb')
global.userutilm=require('./user/userutil')
global.usercbqueriesm=require('./user/usercbqueries')
global.usertextm=require('./user/usertext')

//admin modules
global.adminmanagerm=require('./admin/adminmanager')
global.admincommandsm=require('./admin/admincommands')
global.adminvarsm=require('./admin/adminvars')
global.admintextm=require('./admin/admintext')
global.userhandlerm=require('./admin/userhandler')
global.messagehandlerm=require('./admin/messagehandler')
global.channelhandlerm=require('./admin/channelhandler')
global.admincbqueriesm=require('./admin/admincbqueries')
global.adminutilm=require('./admin/adminutil')
global.adminfilem=require('./admin/adminfile')
global.adminformsm=require('./admin/adminforms')

// new adminutilm.sendChannelData(
// 							    "user.channels[ci]['tag']",
// 							    "user.channels[ci]['categories']",
// 							    "user.chatid",
// 							    'verify'
// 							    );
//     usermodel.find({username:'Sia021'},function(err,users){

//             for(ui=0;ui<users.length;ui++){
//                       for(ci=0;ci<users[ui].channels.length;ci++){
//                           console.log(users[ui].channels[ci]['tag'])
//                           try{
// // users[ui].channels[ci]['step']=users[ui].channels[ci]['tag'].toLowerCase();
// users[ui].channels[ci]['step']='deleted';

//                           }
// catch(err){
//     console.log(users[ui].username,users[ui].channels[ci])
// }

// }
// users[ui].save();

//             }})



//     usermodel.findOne({'username':'Ali781011','channels':{$elemMatch: {tag:'perspolis_telegram',step:'verified'}}},function(err,user){

// // console.log(user)
//                       for(ci=0;ci<user.channels.length;ci++){
//                           if(user.channels[ci]['tag']=='perspolis_telegram')

//                           try{
// // users[ui].channels[ci]['step']=users[ui].channels[ci]['tag'].toLowerCase();
// //user.channels.splice(ci,1);
//  user.channels[ci]['step']='deleted';

//                               console.log(user.channels[ci])
//                           }
// catch(err){
//     // console.log(users[ui].username,users[ui].channels[ci])
// }

// }
// user.save();

//           })



//console.log("start fetch ",new Date());
    // adminmodel.find({},function(err,users){
    //
    //             var k=0;
    //             this.promises = [];
    //
    //             for(ui=0;ui<users.length;ui++){
    //          //          for(ci=users[ui].messages.length-1;ci>0;ci--){
    //          //              console.log(users[ui].username,users[ui].messages[ci]['messageid'],k)
    //          //              k++;
		// 	// }
    //                 if(users[ui].messages.length>1){
    //                     console.log(ui);
    //                     k++;
    //                     this.promises.push(saveUser(users[ui],ui))
    //
    //                 }
    //
    //             //break;
    //         }
    //             console.log("end fetch , start update ",new Date());
    //             Promise.all(this.promises).then(function (data) {
    //             console.log("end update ",new Date(),k);
    //
    //         })
    //             //users[ui].save();
    //         })
    //



// adminutilm.settlemented()

};
var saveUser=function (user,index) {
    return new Promise(function (resolve, reject) {
        user.messages.splice(0,user.messages.length-1)
        user.save(function (err,msg) {
            console.log(index)
            if(err)
            console.log(err.message,index);
            resolve(msg);
        })
    })
}
module.exports.init=init;
