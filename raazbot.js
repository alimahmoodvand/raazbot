var cluster = require('cluster');
if (cluster.isMaster) {
    cluster.fork();

    cluster.on('exit', function (worker, code, signal) {
        shotdown++;
        cluster.fork();
    });
}
var shotdown = 0;

if (cluster.isWorker)
{
Array.prototype.searchObject=function (field,value) {
	// body...
	for(sbi=0;sbi<this.length;sbi++){
		if(this[sbi][field]==value){
			return this[sbi];
		}
	}
}
Array.prototype.searchObjects=function (field,value) {
	temp=[];
	for(sbi=0;sbi<this.length;sbi++){
		if(this[sbi][field]==value){
			temp.push(this[sbi]);
		}
	}
	return temp;
}
Array.prototype.searchNObjects=function (field,value) {
	temp=[];
	for(sbi=0;sbi<this.length;sbi++){
		if(this[sbi][field]!=value){
			temp.push(this[sbi]);
		}
	}
	return temp;
}
String.prototype.getAllIndexes=function(substring) {
  var a=[],i=-1;
  while((i=this.indexOf(substring,i+1)) >= 0) a.push(i);
  return a;

}

initm=require('./modules/init')

initm.init();

usermanagerm.start();
adminmanagerm.start();
var cron = require('node-cron');
if (global.gc) {
    global.gc();
    console.log('Run garbage collection ');
} else {
    console.log('Garbage collection unavailable.  Pass --expose-gc ');
}
cron.schedule('0 0 * * * *', function(){

    process.exit(0);

});
process.on('uncaughtException', function (exception) {
    console.log(exception,new Date())
    process.exit(0);
    
})
process.on('unhandledRejection', function(reason, p) {
    console.log(reason, p,new Date())
});
}