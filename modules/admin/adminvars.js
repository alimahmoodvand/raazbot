module.exports={
	messages:{
	welcome:`خوش آمدید پنل مدیریت`,
  accessdenied:` شما به این عملیات دسترسی ندارید `,
  userlist:` لیست کاربران `,
  channellist:` لیست کانال ها`,
  userinfo:`
  نام کاربری:@~username
  نام:~name
  `,

  blocked:` پروفایل شما توسط مدیر بلاک شد `,
    searchchannel:` تگ کانال را برای جستجو وارد کنید`,
        sendmessageforcategories:`لطفا یک دسته بندی را برای ارسال پیام گروهی انتخاب کنید`,

  done:` عملیات مورد نظر انجام شد`,
  verified:` پروفایل شما توسط مدیر تایید شد `,
        deletedeny:` درخواست حذف برای کانال زیر توسط مدیر رد شد `,
  messagereaded:` پیام شما توسط مدیر خوانده شد`,
  channeloprations:`
  تگ: ~tag
  شماره کارت: ~cardno
  شماره شبا: ~shebano
  نام صاحب حساب: ~cardname
  نوع پرداخت: ~setltype
  دسته بندی : ~categories
  `,

  useropration:` عملیات کاربری `,
  channelnotexistopration:` کانالی بر این مورد وجود ندارد `,
  channeldeleted:` کانال حذف شد `,
  channelblocked:` کانال بلاک شد `,
	channelverified:` کانال تایید شد `,
 chooseoption:` انتخاب عملیات `,
settlemented:`
#رسید_واریز
توجه داشته باشید این مبلغ به شماره شبای شما واریز شده است و ممکن است تا چند ساعت دیگر بحساب شما بیاید 
چنانچه مشکلی دارید به @Raaz_Variz_Admin  پیام دهید.

شبا : Destination Iban Number (Variz Be Sheba)
نام : Owner Name (Name e Sahebe Seporde)
تگ کانال : channel
مبلغ (ریال) : Transfer Amount (Mablagh)
شرح : Description (Sharh)
شماره فاکتور : Factor Number (Shomare Factor)
تاریخ : date
`,
  adminid:` شماره آیدی ادمین را وارد کنید `,
  adminname:` نام ادمین را وارد کنید `,
  adminadded:` ادمین اضافه شد `,
  admindeleted:` ادمین حذف شد `,
  adminlist:` لیست ادمین ها `,
 messageforusers:` لطفا پیام خود را وارد کنید
اگر منصرف شدید دکمه انصراف رو بزنید
 `,
  messagesent:` پیام ارسال شد `,



	sharenumber:`share with us your number`,
	name:`enter name`,
	sentmessage:`your message sent`,
	sendmessage:`  پیام ارسال شد `,
	categories:` انتخاب دسته بندی`,
	tag:`enter channel tag
	@raznet
	`,
	cardno:`enter channel cardno
	1111222233334444
	`,
	shebano:`enter channel shebano
	IR410170000000316128689002
	`,

	panel:`user panel`,
	takeonecategory:`take one category`,
	categorybeforeadded:`
	category before added`,
	transactionopen:`transaction open`,
	waitforverify:`wait for verify by admin`,
	channelpending:`your channel status is pending ,wait for verify by admin`,
	channelnotexist:`channel not exist for you`,
	channellist:` لیست کانال ها`,
	duplicatechannel:`your entered channel name exist , please enter other name`,

	actiondone:`action done`,
	},
	markups:{
      panel:adminbot.keyboard([
          ['مدیریت کانال','مدیریت کاربر'],
          ['پیام های جدید کاربران','پیام های قبلی کاربران'], 
                   ['جستجوی کانال','درخواست های باز'],
          ['ارسال پیام برای کابران','ارسال پیام گروهی'],

          ['افزودن ادمین','حذف ادمین']

          ]
          , { resize: true }),
useropration:
    userbot.inlineKeyboard([
    [
      userbot.inlineButton('لیست کاربران', { callback: 'userlist' })]
      ,
      [userbot.inlineButton('کاربران بلاک شده', { callback: 'userblock' })],
      [userbot.inlineButton('فایل کاربران', { callback: 'usersfile' })],

  ]),
channelopration:
    userbot.inlineKeyboard([
      [userbot.inlineButton('کانال های جدید', { callback: 'channellist' })],
      [userbot.inlineButton('کانال های تایید شده', { callback: 'channelverified' })],
      [userbot.inlineButton('کانال های حذف شده', { callback: 'channeldeleted' })],
      [userbot.inlineButton('کانال های بلاک شده', { callback: 'channelblocked' })],  
    [userbot.inlineButton('فایل کانال ها', { callback: 'channelsfile' })],
      [userbot.inlineButton('درخواست های حذف کانال', { callback: 'channelrequestfordelete' })]
  ]),

		sharenumber:
		userbot.keyboard([
    ['فعلا به اشتراک نمی گذارم',userbot.button('contact', ' اشتراک گذاری شماره')]    ]
    , {resize:true,once:true}),



	userpanel:
		userbot.inlineKeyboard([
    [
      userbot.inlineButton('ثبت کانال', { callback: 'newchannel' })]
      ,
      [userbot.inlineButton('مدیریت کانال', { callback: 'managechannel' })],
      [userbot.inlineButton('ویرایش نام', { callback: 'editname' })],
    [
      userbot.inlineButton('ارسال پیام', { callback: 'sendmessage' })
    ],

  ]),
		wait:
		userbot.inlineKeyboard([
    [
      userbot.inlineButton('تایید و ارسال ', { callback: 'wait-verify' })]
      ,
     [ userbot.inlineButton('ویرایش کانال', { callback: 'wait-edit' }),
    ],
    [
      userbot.inlineButton('بازگشت به منوی اصلی', { callback: 'wait-userpanel' })
    ],

  ]),
	categories:
	userbot.inlineKeyboard([
    [
      userbot.inlineButton('ادبی', { callback: 'categories-ادبی' }),
      userbot.inlineButton('هنری', { callback: 'categories-هنری' }),
    ],[
      userbot.inlineButton('موسیقی', { callback: 'categories-موسیقی' }),
      userbot.inlineButton('ویدیو کلیپ', { callback: 'categories-ویدیو کلیپ' }),
    ],
    [
      userbot.inlineButton('سرگرمی و جک', { callback: 'categories-سرگرمی و جک' }),
      userbot.inlineButton('ورزشی', { callback: 'categories-ورزشی' }),
    ],
    [
      userbot.inlineButton('بانوان', { callback: 'categories-بانوان' }),
      userbot.inlineButton('تاریخی', { callback: 'categories-تاریخی' }),
    ],
    [
      userbot.inlineButton('مشاوره روانشناسی', { callback: 'categories-مشاوره روانشناسی' }),
      userbot.inlineButton('خبری و سیاسی', { callback: 'categories-خبری و سیاسی' }),
    ],
    [
      userbot.inlineButton('علمی آموزشی', { callback: 'categories-علمی آموزشی' }),
      userbot.inlineButton('مذهبی', { callback: 'categories-مذهبی' }),
    ],
    [
      userbot.inlineButton('اپ موبایل', { callback: 'categories-اپ موبایل' }),
      userbot.inlineButton('فروشگاهی', { callback: 'categories-فروشگاهی' }),
    ],
    [
      userbot.inlineButton('استانی', { callback: 'categories-استانی' }),
      userbot.inlineButton('افراد مشهور', { callback: 'categories-افراد مشهور' }),
    ],
    [
      userbot.inlineButton('سازمانی', { callback: 'categories-سازمانی' }),
      userbot.inlineButton('گردشگری', { callback: 'categories-گردشگری' }),
    ],
    [
      userbot.inlineButton('رد کردن', { callback: 'categories-passed' })
    ],

  ]),
},
constants:
{
categories:['ادبی', 'هنری','فیلم', 'موسیقی', 'ویدیو کلیپ', 'سرگرمی و جک','رمان'
, 'ورزشی','سلامت','بانوان', 'تاریخی', 'مشاوره روانشناسی','اجتماعی', 'خبری و سیاسی', 'علمی آموزشی', 
'مذهبی', 'اپ موبایل', 'فروشگاهی', 'استانی', 'افراد مشهور', 'سازمانی',
'گردشگری', 'رد کردن'
    ],
    channeldeleteopration:
['اطلاعات ناقص','اطلاعات اشتباه','شما ادمین کانال نیستید','قطع همکاری','کانال ۲ بار ثبت شده','کانال زیر 20 کا می باشد','فروش کانال','تغییر ادمین مسوول کانال','کانال کوچک است','کانال اخلاقی نیست','تگ موجود نمیباشد'],
channelblockopration:['اخراج از گروه','تقلب'],

	}







};