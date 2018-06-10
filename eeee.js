var AC=function(){
    reportExcelAC();  sdfgadfsfg
};
var Charging=function(){
    reportExcelCharging();
};
function checkModified() {
    var fs=require('fs')
    stat=fs.statSync(filepath)
       console.log(dateFormat(stat.mtime,', "yyyymmdd"'))

}
var records=[];
var xlsx = require('xlsx');
var filepath="SDP.xlsx";
var workbook = xlsx.readFile(filepath);

var dateFormat=require('dateformat');

function reportExcelAC() {

    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    yesterday=new Date();
    yesterday=yesterday.setDate(yesterday.getDate() - 1)
    var letters = [
        {letter: "A", value: dateFormat(yesterday, "yyyymmdd").toString()},
        {letter: "B", value: ""},
        {letter: "C", value: ""},
        {letter: "D", value: ""},
        {letter: "E", value: ""},
        {letter: "F", value: ""},
        {letter: "G", value: ""},
        {letter: "H", value: ""},
        {letter: "I", value: ""},
        {letter: "J", value: ""},
        {letter: "K", value: "0"}
    ];
    var rowcount = parseInt(worksheet['!ref'].split(':')[1].substring(1));
    var colcount = worksheet['!ref'].split(':')[0].substring(1);
    var fcol = worksheet['!ref'].split(':')[0].substring(0, 1);
    var lcol = worksheet['!ref'].split(':')[1].substring(0, 1);
    // console.log(rowcount, colcount, fcol, lcol)
    var titlerow = "1";
    var data = [];

    Array.prototype.findIndex = function (obj) {
        for (k = 0; k < this.length; k++) {
            if (obj == this[k]) {
                return k;
            }
        }
        return -1;
    };

    while (records.length > 0 && typeof records[0] !== 'undefined') {
        rowcount++;
        var targets = getAndRemoveTargets(0);
        //console.log(records.length + "")
        for (var letter in letters) {
            letter = letters[letter];
            //  console.log(letter)
            if (letter.value == "") {
                value = getValue(worksheet[letter.letter + titlerow].v, targets)
                worksheet[letter.letter + rowcount.toString()] = {t: 's', v: numberWithCommas(value)};
                data[letter.letter + rowcount.toString()] = {t: 's', v: value};
            }
            else {
                worksheet[letter.letter + rowcount.toString()] = {t: 's', v: letter.value};
                data[letter.letter + rowcount.toString()] = {t: 's', v: letter.value};
            }
        }
        worksheet["B" + rowcount.toString()] = {t: 's', v: targets[0].Correlator};
        worksheet["C" + rowcount.toString()] = {t: 's', v: targets[0].ServiceActivationNo};
    }
    worksheet['!ref'] = fcol + colcount + ":" + lcol + rowcount;
// console.log(worksheet['!ref'],data);
    xlsx.writeFile(workbook, filepath);
    // console.log("end--",new Date());

}
function getAndRemoveTargets(index) {
    temp=records.slice();
    result=[];
    for(j=0;j<records.length&&typeof records[j]!=='undefined';j++){
        if(records[j]['Correlator']==records[index]['Correlator']){
            finded=records[j];
            result.push(finded);
            temp.splice(temp.findIndex(finded),1);
        }
    }
    records=temp.slice();
    return result;
}
function getValue(index,targets) {
    for(j=0;j<targets.length&&typeof targets[j]!=='undefined';j++){
        if(targets[j]['col']==index){
            return targets[j]['cnt'];
        }
    }
    return 0;
}
function reportExcelCharging() {

    var worksheet = workbook.Sheets[workbook.SheetNames[1]];
    yesterday=new Date();
    yesterday=yesterday.setDate(yesterday.getDate() - 1)
    var letters = [
        {letter: "A", value: dateFormat(yesterday, "yyyymmdd").toString()},
        {letter: "B", value: ""},
        {letter: "C", value: ""},
        {letter: "D", value: ""},
        {letter: "E", value: ""},
        {letter: "F", value: ""},
        {letter: "G", value: ""},
        {letter: "H", value: ""},
        {letter: "I", value: ""},
        {letter: "J", value: ""},
        {letter: "K", value: ""}
    ];
    var rowcount = parseInt(worksheet['!ref'].split(':')[1].substring(1));
    var colcount = worksheet['!ref'].split(':')[0].substring(1);
    var fcol = worksheet['!ref'].split(':')[0].substring(0, 1);
    var lcol = worksheet['!ref'].split(':')[1].substring(0, 1);
    //console.log(rowcount, colcount, fcol, lcol)
    var titlerow = "1";
    var data = [];

    Array.prototype.findIndex = function (obj) {
        for (k = 0; k < this.length; k++) {
            if (obj == this[k]) {
                return k;
            }
        }
        return -1;
    };

    while (records.length > 0 && typeof records[0] !== 'undefined') {
        rowcount++;
        var targets = getAndRemoveTargets(0);
       // console.log(records.length + "")
        for (var letter in letters) {
            letter = letters[letter];
            //  console.log(letter)
            if (letter.value == "") {
                value = getValue(worksheet[letter.letter + titlerow].v, targets)
                worksheet[letter.letter + rowcount.toString()] = {t: 's', v:numberWithCommas(value)};
                data[letter.letter + rowcount.toString()] = {t: 's', v: value};
            }
            else {
                worksheet[letter.letter + rowcount.toString()] = {t: 's', v: letter.value};
                data[letter.letter + rowcount.toString()] = {t: 's', v: letter.value};
            }
        }
        worksheet["B" + rowcount.toString()] = {t: 's', v: targets[0].Correlator};
        worksheet["C" + rowcount.toString()] = {t: 's', v: targets[0].ServiceActivationNo};
    }
    worksheet['!ref'] = fcol + colcount + ":" + lcol + rowcount;
// console.log(worksheet['!ref'],data);
    xlsx.writeFile(workbook, filepath);
    //console.log(new Date());

}

function GSDP() {

    var worksheet = workbook.Sheets[workbook.SheetNames[2]];
    yesterday=new Date();
    yesterday=yesterday.setDate(yesterday.getDate() - 1)
    var letters = [
        {letter: "A", value: dateFormat(yesterday, "yyyymmdd").toString()},
        {letter: "B", value: ""},
        {letter: "C", value: ""},
        {letter: "D", value: ""},
        {letter: "E", value: ""},
        {letter: "F", value: ""},
        {letter: "G", value: ""},
        {letter: "H", value: ""},
        {letter: "I", value: ""},
        {letter: "J", value: ""},
        {letter: "K", value: ""}
    ];
    var rowcount = parseInt(worksheet['!ref'].split(':')[1].substring(1));
    var colcount = worksheet['!ref'].split(':')[0].substring(1);
    var fcol = worksheet['!ref'].split(':')[0].substring(0, 1);
    var lcol = worksheet['!ref'].split(':')[1].substring(0, 1);
   // console.log(rowcount, colcount, fcol, lcol)
    var titlerow = "1";
    var data = [];

    Array.prototype.findIndex = function (obj) {
        for (k = 0; k < this.length; k++) {
            if (obj == this[k]) {
                return k;
            }
        }
        return -1;
    };

    for(l=0;l<records.length;l++){
        rowcount++;
            for(m=0;m<letters.length;m++){
                if(letters[m].value=="")
                {
                    worksheet[letters[m].letter + rowcount.toString()] = {t: 's', v:numberWithCommas(records[l][worksheet[letters[m].letter+'1'].v])};
                }
                else
                {
                    worksheet[letters[m].letter + rowcount.toString()] = {t: 's', v:letters[m].value};

                }

            }

    };
   // console.log('======================================')

   // console.log(worksheet,'======================================')
    // console.log(records,'======================================')
   worksheet['!ref'] = fcol + colcount + ":" + lcol + rowcount;
// console.log(worksheet['!ref']);
    xlsx.writeFile(workbook, filepath);
    // console.log("end--",new Date());

}


function KeyValue() {

    var worksheet = workbook.Sheets[workbook.SheetNames[3]];
    yesterday=new Date();
    yesterday=yesterday.setDate(yesterday.getDate() - 1)
    var letters = [
        {letter: "A", value: dateFormat(yesterday, "yyyymmdd").toString()},
        {letter: "B", value: ""},
        {letter: "C", value: ""},
        {letter: "D", value: ""}
    ];
    var rowcount = parseInt(worksheet['!ref'].split(':')[1].substring(1));
    var colcount = worksheet['!ref'].split(':')[0].substring(1);
    var fcol = worksheet['!ref'].split(':')[0].substring(0, 1);
    var lcol = worksheet['!ref'].split(':')[1].substring(0, 1);
    // console.log(rowcount, colcount, fcol, lcol)
    var titlerow = "1";
    var data = [];

    Array.prototype.findIndex = function (obj) {
        for (k = 0; k < this.length; k++) {
            if (obj == this[k]) {
                return k;
            }
        }
        return -1;
    };

    for(n=0;n<records.length;n++) {
        rowcount++;
        for (o = 0; o < letters.length; o++) {
            if (letters[o].value == "") {
                worksheet[letters[o].letter + rowcount.toString()] = {
                    t: 's',
                    v: numberWithCommas(records[n][worksheet[letters[o].letter + '1'].v])
                };
            }
            else {
                worksheet[letters[o].letter + rowcount.toString()] = {t: 's', v: letters[o].value};

            }

        }
    }
    // console.log('======================================')

    console.log(worksheet,'======================================')
    console.log(records,'======================================')
    worksheet['!ref'] = fcol + colcount + ":" + lcol + rowcount;
// console.log(worksheet['!ref']);
   xlsx.writeFile(workbook, filepath);
    // console.log("end--",new Date());

}


function  Handler(rec,index) {
    checkModified();
    records=rec;
    console.log("start--"+index+"---",new Date());

    if(index==0)   {
      AC();
    }
    else if(index==1){
        //console.log(records);
      Charging();
    }
    else if(index==2){
        GSDP();
    }
    else if(index==3){
       KeyValue();
    }
    console.log("end--"+index+"---",new Date());
}
function  FilterHandler(index,from,to) {
    console.log("start--"+index+"---",new Date());
    // if(index<3)
    FilterDate(index,from,to);
    console.log("end--"+index+"---",new Date());
}
var numberWithCommas=function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var FilterDate=function(index,from,to){

    // from="20161223";
    // to="20161223";
    var worksheet = workbook.Sheets[workbook.SheetNames[index]];
    // console.log(worksheet)
    // return;
    var rowcount = parseInt(worksheet['!ref'].split(':')[1].substring(1));
    var colcount = worksheet['!ref'].split(':')[0].substring(1);
    var fcol = worksheet['!ref'].split(':')[0].substring(0, 1);
    var lcol = worksheet['!ref'].split(':')[1].substring(0, 1);
    var titlerow = "1";
    var data=[];

    var letters = [
        {letter: "A", value: ""},
        {letter: "B", value: ""},
        {letter: "C", value: ""},
        {letter: "D", value: ""},
        {letter: "E", value: ""},
        {letter: "F", value: ""},
        {letter: "G", value: ""},
        {letter: "H", value: ""},
        {letter: "I", value: ""},
        {letter: "J", value: ""},
        {letter: "K", value: ""}
    ];
    if(index==3)
    {
        letters = [
            {letter: "A", value: ""},
            {letter: "B", value: ""},
            {letter: "C", value: ""},
            {letter: "D", value: ""}
            ];
    }
    var k=0;
    for(var i=1;typeof worksheet["A" + i]!=='undefined' && worksheet["A" + i];i++){
        // console.log(i,worksheet["A" + i].v)
        if((worksheet["A" + i].v>=from&&worksheet["A" + i].v<=to)||(i==titlerow)){
            k++;
            for(j=0;j<letters.length;j++){
               // console.log(worksheet[letters[j].letter+i.toString()].value);
                data[letters[j].letter+k.toString()]={t: 's', v:worksheet[letters[j].letter+i.toString()].v };
            }

        }
    }
    // console.log(data);
    data['!ref'] = "A1:K" + (k).toString();
//console.log(data,worksheet['!ref'])
    wb=xlsx.readFile("SDPFilter.xlsx");
    wb.Sheets[wb.SheetNames[index]]=data;
    // ws=data;
    xlsx.writeFile(wb, "SDPFilter.xlsx");
};
module.exports.Handler=Handler;
module.exports.FilterHandler=FilterHandler;
// module.exports.Charging=Charging;