(function(){
var _1=[];
var _2=function(){
};
function _3(_4,_5){
parent.postMessage(_4+";"+_5||"","*");
};
function _6(id,_7){
var _8=id+";success;"+_7;
_3("sendMessageResponse",_8);
};
function _9(id,_a,_b){
var _c=id+";fault;"+_a+";"+_b;
_3("sendMessageResponse",_c);
};
function _d(_e){
var _f,_10,id,_11,_12,_13,i,_14,_15;
var xhr,_16,_17;
if(_e.source===parent){
var _18=_e.data.indexOf(";");
var _19=_e.data.substring(0,_18);
if(!_19){
throw new Error("Unable to parse message, no action specified: "+_e.data);
}
switch(_19){
case "sendMessage":
_f=_e.data.indexOf(";",_18+1);
_10=_e.data.indexOf(";",_f+1);
_14=_e.data.indexOf(";",_10+1);
id=_e.data.substring(_18+1,_f);
_11=_e.data.substring(_f+1,_10);
_15=JSON.parse(_e.data.substring(_10+1,_14));
_12=_e.data.substring(_14+1,_e.data.length);
if(id&&_11&&_12){
try{
xhr=new XMLHttpRequest();
_16=false;
xhr.onreadystatechange=function(){
var _1a;
if(xhr.readyState===0){
_16=true;
_9(id,"XHR readyState 0");
}else{
if(xhr.readyState===4&&!_16){
_16=true;
_1a=xhr.status||0;
if((_1a>=200&&_1a<300)||_1a===304){
_6(id,xhr.responseText);
}else{
_9(id,xhr.responseText,_1a);
}
}
}
if(_16&&xhr){
xhr.onreadystatechange=_2;
xhr=null;
}
};
xhr.open("POST",_11,true);
xhr.setRequestHeader("Content-Type",_15.contentType?_15.contentType:"application/json");
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
if(_15.headers){
for(_17 in _15.headers){
if(_15.headers.hasOwnProperty(_17)){
xhr.setRequestHeader(_17,_15.headers[_17]);
}
}
}
xhr.send(_12);
}
catch(e){
_9(id,"Unable to send data: "+e.toString());
}
}else{
throw new Error("Invalid message to send: "+_e.data);
}
break;
case "createUploadIframe":
id=_e.data.substring(_18+1,_e.data.length);
if(!document.getElementById(id)){
_13=document.createElement("iframe");
_13.id=id;
_13.name=id;
_13.src="about:blank";
_13.width=0;
_13.height=0;
_13.style="visibility: hidden; display: none;";
_1.push(_13);
document.body.appendChild(_13);
}
break;
case "cancelUpload":
id=_e.data.substring(_18+1,_e.data.length);
var _1b=document.getElementById(id);
if(_1b){
if(navigator.appVersion.indexOf("MSIE")!==-1){
_1b.contentWindow.document.execCommand("Stop");
}else{
_1b.contentWindow.stop();
}
}
break;
default:
throw new Error("Unknown action: "+_19);
}
}else{
for(i=0;i<_1.length;i+=1){
if(_e.source===_1[i].contentWindow){
_3("uploadIframeMessage",_1[i].id+";"+_e.data);
}
}
}
};
addEventListener("message",_d);
_3("ready","");
if(window.console){
console.log("iframe "+location+" ready at "+new Date());
}
}());

