(function(){
var _1=[];
var _2={};
var _3=function(){
};
function _4(_5,_6){
parent.postMessage(_5+";"+_6||"","*");
};
function _7(id,_8){
var _9=id+";success;"+_8;
_4("sendMessageResponse",_9);
};
function _a(id,_b,_c){
var _d=id+";fault;"+_b+";"+_c;
_4("sendMessageResponse",_d);
};
function _e(_f){
var _10,_11,id,_12,_13,_14,i,_15,_16;
var xhr,_17,_18;
if(_f.source===parent){
var _19=_f.data.indexOf(";");
var _1a=_f.data.substring(0,_19);
if(!_1a){
throw new Error("Unable to parse message, no action specified: "+_f.data);
}
switch(_1a){
case "sendMessage":
_10=_f.data.indexOf(";",_19+1);
_11=_f.data.indexOf(";",_10+1);
_15=_f.data.indexOf(";",_11+1);
id=_f.data.substring(_19+1,_10);
_12=_f.data.substring(_10+1,_11);
_16=JSON.parse(_f.data.substring(_11+1,_15));
_13=_f.data.substring(_15+1,_f.data.length);
if(id&&_12&&_13){
try{
xhr=new XMLHttpRequest();
_2[id]={xhr:xhr};
_17=false;
xhr.onreadystatechange=function(){
var _1b;
if(xhr.readyState===0){
_17=true;
_a(id,"XHR readyState 0");
}else{
if(xhr.readyState===4&&!_17){
_17=true;
_1b=xhr.status||0;
if((_1b>=200&&_1b<300)||_1b===304){
_7(id,xhr.responseText);
}else{
_a(id,xhr.responseText,_1b);
}
}
}
if(_17&&xhr){
xhr.onreadystatechange=_3;
xhr=null;
delete _2[id].xhr;
delete _2[id];
}
};
xhr.open("POST",_12,true);
xhr.setRequestHeader("Content-Type",_16.contentType?_16.contentType:"application/json");
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
if(_16.headers){
for(_18 in _16.headers){
if(_16.headers.hasOwnProperty(_18)){
xhr.setRequestHeader(_18,_16.headers[_18]);
}
}
}
xhr.send(_13);
}
catch(e){
_a(id,"Unable to send data: "+e.toString());
}
}else{
throw new Error("Invalid message to send: "+_f.data);
}
break;
case "createUploadIframe":
id=_f.data.substring(_19+1,_f.data.length);
if(!document.getElementById(id)){
_14=document.createElement("iframe");
_14.id=id;
_14.name=id;
_14.src="about:blank";
_14.width=0;
_14.height=0;
_14.style="visibility: hidden; display: none;";
_1.push(_14);
document.body.appendChild(_14);
}
break;
case "cancelUpload":
id=_f.data.substring(_19+1,_f.data.length);
var _1c=document.getElementById(id);
if(_1c){
if(navigator.appVersion.indexOf("MSIE")!==-1){
_1c.contentWindow.document.execCommand("Stop");
}else{
_1c.contentWindow.stop();
}
}
break;
case "abort":
id=_f.data.substring(_19+1,_f.data.length);
if(_2[id]){
_2[id].xhr.abort();
}
break;
default:
throw new Error("Unknown action: "+_1a);
}
}else{
for(i=0;i<_1.length;i+=1){
if(_f.source===_1[i].contentWindow){
_4("uploadIframeMessage",_1[i].id+";"+_f.data);
}
}
}
};
addEventListener("message",_e);
_4("ready","");
if(window.console){
console.log("iframe "+location+" ready at "+new Date());
}
}());

