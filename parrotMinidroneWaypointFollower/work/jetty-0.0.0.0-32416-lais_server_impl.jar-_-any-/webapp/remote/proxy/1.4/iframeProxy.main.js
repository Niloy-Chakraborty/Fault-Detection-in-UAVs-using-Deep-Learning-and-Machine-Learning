(function(){
var _1=[];
var _2={};
var _3=function(){
};
var _4;
function _5(_6,_7){
parent.postMessage(_6+";"+_7||"","*");
};
function _8(id,_9){
var _a=id+";success;"+_9;
_5("sendMessageResponse",_a);
};
function _b(id,_c,_d){
var _e=id+";fault;"+_c+";"+_d;
_5("sendMessageResponse",_e);
};
function _f(_10){
var _11,_12,id,_13,_14,_15,i,_16,_17;
var xhr,_18,_19;
if(_10.source===parent){
var _1a=_10.data.indexOf(";");
var _1b=_10.data.substring(0,_1a);
if(!_1b){
throw new Error("Unable to parse message, no action specified: "+_10.data);
}
switch(_1b){
case "sendMessage":
_11=_10.data.indexOf(";",_1a+1);
_12=_10.data.indexOf(";",_11+1);
_16=_10.data.indexOf(";",_12+1);
id=_10.data.substring(_1a+1,_11);
_13=_10.data.substring(_11+1,_12);
_17=JSON.parse(_10.data.substring(_12+1,_16));
_14=_10.data.substring(_16+1,_10.data.length);
if(id&&_13&&_14){
try{
xhr=new XMLHttpRequest();
_2[id]={xhr:xhr};
_18=false;
xhr.onreadystatechange=function(){
var _1c;
if(xhr.readyState===0){
_18=true;
_b(id,"XHR readyState 0");
}else{
if(xhr.readyState===4&&!_18){
_18=true;
_1c=xhr.status||0;
if((_1c>=200&&_1c<300)||_1c===304){
_8(id,xhr.responseText);
}else{
_b(id,xhr.responseText,_1c);
}
}
}
if(_18&&xhr){
xhr.onreadystatechange=_3;
xhr=null;
delete _2[id].xhr;
delete _2[id];
}
};
xhr.open("POST",_13,true);
xhr.setRequestHeader("Content-Type",_17.contentType?_17.contentType:"application/json");
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
if(_17.headers){
for(_19 in _17.headers){
if(_17.headers.hasOwnProperty(_19)){
xhr.setRequestHeader(_19,_17.headers[_19]);
}
}
}
xhr.send(_14);
}
catch(e){
_b(id,"Unable to send data: "+e.toString());
}
}else{
throw new Error("Invalid message to send: "+_10.data);
}
break;
case "createUploadIframe":
id=_10.data.substring(_1a+1,_10.data.length);
if(!document.getElementById(id)){
_15=document.createElement("iframe");
_15.id=id;
_15.name=id;
_15.src="about:blank";
_15.width=0;
_15.height=0;
_15.style="visibility: hidden; display: none;";
_1.push(_15);
document.body.appendChild(_15);
}
break;
case "cancelUpload":
id=_10.data.substring(_1a+1,_10.data.length);
var _1d=document.getElementById(id);
if(_1d){
if(navigator.appVersion.indexOf("MSIE")!==-1){
_1d.contentWindow.document.execCommand("Stop");
}else{
_1d.contentWindow.stop();
}
}
break;
case "abort":
id=_10.data.substring(_1a+1,_10.data.length);
if(_2[id]){
_2[id].xhr.abort();
}
break;
case "connectWebsocket":
var url=_10.data.substring(_1a+1,_10.data.length);
_4=new WebSocket(url);
_4.onopen=function(){
parent.postMessage("websocketOpened;","*");
};
_4.onmessage=function(msg){
var _1e={data:msg.data};
var _1f=JSON.stringify(_1e);
parent.postMessage("websocketMsg;"+_1f,"*");
};
_4.onclose=function(_20){
var _21={code:_20.code,reason:_20.reason,wasClean:_20.wasClean};
var _22=JSON.stringify(_21);
parent.postMessage("websocketClosed;"+_22,"*");
};
_4.onerror=function(){
parent.postMessage("websocketError;","*");
};
break;
case "websocketSend":
var _23=_10.data.substring(_1a+1,_10.data.length);
_4.send(_23);
break;
case "closeWebsocket":
_4.close();
break;
default:
throw new Error("Unknown action: "+_1b);
}
}else{
for(i=0;i<_1.length;i+=1){
if(_10.source===_1[i].contentWindow){
_5("uploadIframeMessage",_1[i].id+";"+_10.data);
}
}
}
};
addEventListener("message",_f);
_5("ready","");
if(window.console){
console.log("iframe "+location+" ready at "+new Date());
}
}());

