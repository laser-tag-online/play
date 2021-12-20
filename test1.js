//local connection class

var config = {
  iceServers: [
  {urls: ['stun:stun.l.google.com:19302']},
  {urls: 'turn:numb.viagenie.ca',credential: 'muazkh',username: 'webrtc@live.com'}
  ]
}

class local {
  constructor(){
    this.connection = new RTCPeerConnection(config);
    this.channel = this.connection.createDataChannel("channel");
    this.candidate = '';
    
    this.offer = undefined;
    
    this.channel.onopen = function(){console.log('channel is open');};
    this.channel.onclose = function(){console.log('channel is closed');};
    this.channel.onmessage = function(event){
      let msg = event.data;
      let msj = JSON.parse(msg);
      
      if(msj.why==='update'){
        if(msj.p1===undefined){}else{
          p1 = msj.p1;
          p1.xoffset = msj.p1.xoffset;
          p1.yoffset = msj.p1.yoffset;
          p1.img = msj.p1.img;
          p1.ishit = msj.p1.ishit;
          p1.laser.one.x = msj.p1.laser.one.x;p1.laser.one.y = msj.p1.laser.one.y;
          p1.laser.two.x = msj.p1.laser.two.x;p1.laser.two.y = msj.p1.laser.two.y;
          p1.name = msj.p1.name;
        }
        if(msj.p2===undefined){}else{
          p2 = msj.p2;
          p2.xoffset = msj.p2.xoffset;
          p2.yoffset = msj.p2.yoffset;
          p2.img = msj.p2.img;
          p2.laser = msj.p2.laser;
          p2.ishit = msj.p2.ishit;
          p2.laser.one.x = msj.p2.laser.one.x;p2.laser.one.y = msj.p2.laser.one.y;
          p2.laser.two.x = msj.p2.laser.two.x;p2.laser.two.y = msj.p2.laser.two.y;
          p2.name = msj.p2.name;
        }
        if(msj.p3===undefined){}else{
          p3 = msj.p3;
          p3.xoffset = msj.p3.xoffset;
          p3.yoffset = msj.p3.yoffset;
          p3.img = msj.p3.img;
          p3.ishit = msj.p3.ishit;
          p3.laser.one.x = msj.p3.laser.one.x;p3.laser.one.y = msj.p3.laser.one.y;
          p3.laser.two.x = msj.p3.laser.two.x;p3.laser.two.y = msj.p3.laser.two.y;
          p3.name = msj.p3.name;
        }
        if(msj.p4===undefined){}else{
          p4 = msj.p4;
          p4.xoffset = msj.p4.xoffset;
          p4.yoffset = msj.p4.yoffset;
          p4.img = msj.p4.img;
          p4.ishit = msj.p4.ishit;
          p4.laser.one.x = msj.p4.laser.one.x;p4.laser.one.y = msj.p4.laser.one.y;
          p4.laser.two.x = msj.p4.laser.two.x;p4.laser.two.y = msj.p4.laser.two.y;
          p4.name = msj.p4.name;
        }
        
      }
      
      
      if(msj.why==='hit'){
        if(msj.who==='p1'){
          if(ishit===false){ishit = true;setTimeout(function(){ishit=false;},2000);}
        }
        if(msj.who==='p2'){
          if(cs1[0].channel.readyState==='open'){cs1[0].send(JSON.stringify(  {why:'yougothit',}  ));}
        }
        if(msj.who==='p3'){
          if(cs1[1].channel.readyState==='open'){cs1[1].send(JSON.stringify(  {why:'yougothit',}  ));}
        }
        if(msj.who==='p4'){
          if(cs1[2].channel.readyState==='open'){cs1[2].send(JSON.stringify(  {why:'yougothit',}  ));}
        }
        
        if(msj.from==='red'){
           points.red += pointsperhit;
        }
        if(msj.from==='green'){
           points.green += pointsperhit;
        }
        if(msj.from==='blue'){
           points.blue += pointsperhit;
        }
        
      }
      
    };
    
    
    
    
    this.connection.onicecandidate = (e) => !e.candidate
        || this.addcandidate(JSON.stringify(e.candidate))
  }
  
  ///////////////////////////////////////connection stuff
  addcandidate(candidate){
    if(this.candidate === undefined){this.candidate = ''+(candidate)+'?';}
    else{this.candidate = ''+this.candidate+''+(candidate)+'?';}
  }
  
  
  
  createoffer(){
    return new Promise((resolve,reject)=>{
      this.connection.createOffer()
      .then(offer => this.connection.setLocalDescription(offer))
      .then(() => this.offer = this.connection.localDescription.sdp)
      .then(() => resolve('E'));
    });t
  }
  setanswer(answer){
    this.connection.setRemoteDescription(new RTCSessionDescription({type:"answer",sdp:answer/*+`
`*/}));
  }
  setcandidate(candidate){
    this.connection.addIceCandidate(JSON.parse(candidate));
  }
  ///////////////////////////////////////connection stuff
  
  send(message){
    this.channel.send(message);
  }
}

//remote connection class
class remote {
  constructor(){
    this.connection = new RTCPeerConnection(config);
    this.connection.ondatachannel = function(event){
      this.channel = event.channel;
      this.channel.onopen = function(event){console.log('channel is open');}
      this.channel.onclose = function(event){console.log('channel is closed');}
      this.answer = undefined;
      this.candiates = '';
      ////////////////////////////////////////
      ////////////////////////////////////////
      this.channel.onmessage = function(event){
        let msg = event.data;
        ///////////////////////
        
        if(msg==='startgame'){start();}
        else {
          let msj = JSON.parse(msg);
          
          if(msj.why==='givenumber'){
             assignednumber = msj.number;
          }
          
          if(msj.why==='yougothit'){
            if(ishit===false){
              ishit = true;
              setTimeout(function(){ishit=false;},2000);
            }
          }
          
          if(msj.why==='update'){
            
            points.red = msj.points.red;
            points.green = msj.points.green;
            points.blue = msj.points.blue;
            
            if(msj.p1===undefined){}else{
              p1 = msj.p1;
              p1.xoffset = msj.p1.xoffset;
              p1.yoffset = msj.p1.yoffset;
              p1.img = msj.p1.img;
              p1.laser.one.x = msj.p1.laser.one.x;p1.laser.one.y = msj.p1.laser.one.y;
              p1.laser.two.x = msj.p1.laser.two.x;p1.laser.two.y = msj.p1.laser.two.y;
              p1.ishit = msj.p1.ishit;
              p1.name = msj.p1.name;
            }
            if(msj.p2===undefined){}else{
              p2 = msj.p2;
              p2.xoffset = msj.p2.xoffset;
              p2.yoffset = msj.p2.yoffset;
              p2.img = msj.p2.img;
              p2.laser.one.x = msj.p2.laser.one.x;p2.laser.one.y = msj.p2.laser.one.y;
              p2.laser.two.x = msj.p2.laser.two.x;p2.laser.two.y = msj.p2.laser.two.y;
              p2.ishit = msj.p2.ishit;
              p2.name = msj.p2.name;
            }
            if(msj.p3===undefined){}else{
              p3 = msj.p3;
              p3.xoffset = msj.p3.xoffset;
              p3.yoffset = msj.p3.yoffset;
              p3.img = msj.p3.img;
              p3.laser.one.x = msj.p3.laser.one.x;p3.laser.one.y = msj.p3.laser.one.y;
              p3.laser.two.x = msj.p3.laser.two.x;p3.laser.two.y = msj.p3.laser.two.y;
              p3.ishit = msj.p3.ishit;
              p3.name = msj.p3.name;
            }
            if(msj.p4===undefined){}else{
              p4 = msj.p4;
              p4.xoffset = msj.p4.xoffset;
              p4.yoffset = msj.p4.yoffset;
              p4.img = msj.p4.img;
              p4.laser.one.x = msj.p4.laser.one.x;p4.laser.one.y = msj.p4.laser.one.y;
              p4.laser.two.x = msj.p4.laser.two.x;p4.laser.two.y = msj.p4.laser.two.y;
              p4.ishit = msj.p4.ishit;
              p4.name = msj.p4.name;
            }
          
          }
        }
      };
      ////////////////////////////////////////
      ////////////////////////////////////////
    }
    
    this.connection.onicecandidate = (e) => !e.candidate
        || this.addcandidate(JSON.stringify(e.candidate))
  }
  addcandidate(candidate){
    if(this.candidate === undefined){this.candidate = ''+(candidate)+'?';}
    else{this.candidate = ''+this.candidate+''+(candidate)+'?';}
  }
  
  setcandidate(candidate){
    this.connection.addIceCandidate(JSON.parse(candidate));
  }
  
  setanswer(answer){
    this.answer = answer;
  }
  connect(offer){
    return new Promise((resolve,reject)=>{
    this.connection.setRemoteDescription(new RTCSessionDescription({type:"offer",sdp:offer/*+`
`*/}))
    .then(this.connection.createAnswer())
    .then(answer => this.connection.setLocalDescription(answer))
    .then(() => {this.setanswer(this.connection.localDescription.sdp)})
    .then(resolve('E'));
    });
  }
  send(message){
    this.connection.channel.send(message);
  }
}


//////////////////////////////
//////////////////////////////
//////////////////////////////


class el {
  constructor(type,parent,src){
    let element = document.createElement(type);
    if(parent===undefined){document.body.appendChild(element);}
    else{parent.appendChild(element);}
    if(src!==undefined){element.src = src;}
    return element;
  }
}

function random (min,max) {
  max += 1;
  return Math.trunc(Math.random()*(max-min))+min;
}


//////////////////////////////
//////////////////////////////
//////////////////////////////

{
  if(Math.trunc(window.innerWidth/16) > Math.trunc(window.innerHeight/9)){var area = {width:Math.trunc(window.innerHeight/9)*16,height:Math.trunc(window.innerHeight/9)*9};}
  else{var area = {width:Math.trunc(window.innerWidth/16)*16,height:Math.trunc(window.innerWidth/16)*9};}
  /////////////////////////////
  /////////////////////////////(grenn = 51 255 51)(blu = 51 51 255)(rid = 255 51 51)
  var color = 'rgb(51,255,51)';
  /////////////////////////////
  /////////////////////////////
  document.body.style.color = color;
  var container = new el('div');
  container.style.backgroundColor = 'rgb(0,30,30)';
  container.style.width = ''+area.width+'px';
  container.style.height = ''+area.height+'px';
  var title = new el('div',container);
  title.innerText = 'Laser-Tag Online';
  title.style.fontWeight = 'bold';
  title.style.fontSize = ''+area.width/15*Math.SQRT2*1+'px';
  var username = new el('input',container);
  username.style.backgroundColor = 'rgb(0,0,0)';
  username.style.border = '3px '+color+' solid';
  username.style.overflow = 'hidden';
  username.style.width = ''+area.width/3.7+'px';
  username.style.height = ''+area.height/4.68+'px';
  username.style.color = color;
  username.style.fontSize = ''+(area.width/3.7)/5.1+'px';
  username.maxLength = 10;
  username.placeholder = ' username ';
  username.style.position = 'absolute';
  username.style.top = ''+area.height/3+'px';
  username.style.left = ''+area.width/24+'px';
  
  { 
    let button1 = new el('div',container);
    button1.innerText = 'create room';
    button1.style.fontWeight = 'bold';
    button1.style.fontSize = ''+area.width/9+'px';
    button1.style.textAlign = 'center';
    button1.style.border = '3px '+color+' solid';
    button1.style.width = ''+area.width/2+'px';
    button1.style.height = ''+area.height/2.25+'px';
    button1.style.top = ''+area.height/2.25+'px';
    button1.style.left = ''+area.width/2.75+'px';
    let button2 = new el('div',container);
    button2.innerText = 'join room';
    button2.style.fontWeight = 'bold';
    button2.style.textAlign = 'center';
    button2.style.border = '3px '+color+' solid';
    button2.style.overflow = 'hidden';
    button2.style.width = ''+area.width/3.7+'px';
    button2.style.height = ''+area.height/4.68+'px';
    button2.style.color = color;
    button2.style.fontSize = ''+(area.width/3.7)/5+'px';
    button2.style.position = 'absolute';
    button2.style.top = ''+area.height/1.5+'px';
    button2.style.left = ''+area.width/24+'px';
    
    
    
    button1.onclick = function(){
      
      button1.style.backgroundColor = 'rgb(0,0,0)';
      setTimeout(()=>{button1.style.backgroundColor = 'inherit';},150);
      
      let testusername = ''+username.value+'';
      if(testusername===''||testusername===' '||testusername==='  '||testusername==='   '||testusername==='    '||testusername==='     '||testusername==='      '||testusername==='       '||testusername==='        '||testusername==='         '||testusername==='          '){
        username.value = '';
        username.placeholder = '   !invalid!   '
      }else{
        name = testusername;
        title.remove();
        username.remove();
        button2.remove();
        button1.remove();
        {
          cs1 = [
            new local(),
            new local(),
            new local(),
          ];
          cs1[0].createoffer()
          .then(()=>{cs1[1].createoffer().then(()=>{cs1[2].createoffer().then(()=>{
            
            
            var offerarea = undefined;
            var copybutton = undefined;
            
            setTimeout(function(){
              offerarea = new el('textarea',container);
              offerarea.value = ``+cs1[0].offer+`?`+cs1[1].offer+`?`+cs1[2].offer+`?`+cs1[0].candidate+``+cs1[1].candidate+``+cs1[2].candidate+``;
            
            offerarea.readonly = true;
            offerarea.style.resize = 'none';
            offerarea.style.display = 'none';
            offerarea.style.fontSize = '0px';
            offerarea.style.width = '0px';
            offerarea.style.height = '0px';
              
            copybutton = new el('div',container);
            copybutton.innerText = 'click to copy connection offer';
            copybutton.style.fontWeight = 'bold';
            copybutton.style.fontSize = ''+area.width/30+'px';
            copybutton.style.textAlign = 'center';
            copybutton.style.border = '3px '+color+' solid';
            copybutton.style.width = ''+area.width/2.75+'px';
            copybutton.style.height = ''+area.height/8+'px';
            copybutton.style.top = ''+area.height/20+'px';
            copybutton.style.left = ''+area.width/35+'px';
            copybutton.onclick = function(){
              copybutton.style.backgroundColor = 'rgb(0,0,0)';
              setTimeout(()=>{copybutton.style.backgroundColor = 'inherit';},150);
              offerarea.select();
              navigator.clipboard.writeText(offerarea.value);
            }},500);
            let thing7163e7 = new el('div',container);
            thing7163e7.innerText = 'paste connection answers in the different text boxes';
            thing7163e7.style.fontWeight = 'bold';
            thing7163e7.style.backgroundColor = 'rgb(0,0,0)';
            thing7163e7.style.fontSize = ''+area.width/40+'px';
            thing7163e7.style.textAlign = 'center';
            thing7163e7.style.border = '3px '+color+' solid';
            thing7163e7.style.width = ''+area.width/1.5+'px';
            thing7163e7.style.height = ''+area.height/10+'px';
            thing7163e7.style.top = ''+area.height/4+'px';
            thing7163e7.style.left = ''+area.width/35+'px';
            let aswerarea1 = new el('textarea',container);
            aswerarea1.style.resize = 'none';
            aswerarea1.style.backgroundColor = 'rgb(0,0,0)';
            aswerarea1.style.fontSize = ''+area.width/30+'px';
            aswerarea1.style.width = ''+area.width/3+'px';
            aswerarea1.style.height = ''+area.height/20+'px';
            aswerarea1.style.position = 'absolute';
            aswerarea1.style.top = ''+area.height/2.25+'px';
            aswerarea1.style.left = ''+area.width/35+'px';
            aswerarea1.style.color = color;
            let t1 = new el('div',container);
            t1.innerText = 'enter player1';
            t1.style.fontWeight = 'bold';
            t1.style.fontSize = ''+area.width/30+'px';
            t1.style.border = '3px '+color+' solid';
            t1.style.width = ''+area.width/3.25+'px';
            t1.style.height = ''+area.height/16+'px';
            t1.style.position = 'absolute';
            t1.style.top = ''+area.height/2.25+'px';
            t1.style.left = ''+area.width/2.6+'px';
            t1.style.color = color;
            t1.style.textAlign = 'center';
            t1.onclick = function(){
              t1.style.backgroundColor = 'rgb(0,0,0)';
              setTimeout(()=>{t1.style.backgroundColor = 'inherit';},150);
              let dkfe = aswerarea1.value.split('?');
              cs1[0].setanswer(dkfe[0]);
              cs1[0].setcandidate(dkfe[1]);
              cs1[0].setcandidate(dkfe[2]);
              cs1[0].setcandidate(dkfe[3]);
            }
            let aswerarea2 = new el('textarea',container);
            aswerarea2.style.resize = 'none';
            aswerarea2.style.backgroundColor = 'rgb(0,0,0)';
            aswerarea2.style.fontSize = ''+area.width/30+'px';
            aswerarea2.style.width = ''+area.width/3+'px';
            aswerarea2.style.height = ''+area.height/20+'px';
            aswerarea2.style.position = 'absolute';
            aswerarea2.style.top = ''+area.height/1.625+'px';
            aswerarea2.style.left = ''+area.width/35+'px';
            aswerarea2.style.color = color;
            let t2 = new el('div',container);
            t2.innerText = 'enter player2';
            t2.style.fontWeight = 'bold';
            t2.style.fontSize = ''+area.width/30+'px';
            t2.style.border = '3px '+color+' solid';
            t2.style.width = ''+area.width/3.25+'px';
            t2.style.height = ''+area.height/16+'px';
            t2.style.position = 'absolute';
            t2.style.top = ''+area.height/1.625+'px';
            t2.style.left = ''+area.width/2.6+'px';
            t2.style.color = color;
            t2.style.textAlign = 'center';
            t2.onclick = function(){
              t2.style.backgroundColor = 'rgb(0,0,0)';
              setTimeout(()=>{t2.style.backgroundColor = 'inherit';},150);
              let dkfe = aswerarea2.value.split('?');
              cs1[1].setanswer(dkfe[4]);
              cs1[1].setcandidate(dkfe[5]);
              cs1[1].setcandidate(dkfe[6]);
              cs1[1].setcandidate(dkfe[7]);
            }
            let aswerarea3 = new el('textarea',container);
            aswerarea3.style.resize = 'none';
            aswerarea3.style.backgroundColor = 'rgb(0,0,0)';
            aswerarea3.style.fontSize = ''+area.width/30+'px';
            aswerarea3.style.width = ''+area.width/3+'px';
            aswerarea3.style.height = ''+area.height/20+'px';
            aswerarea3.style.position = 'absolute';
            aswerarea3.style.top = ''+area.height/1.25+'px';
            aswerarea3.style.left = ''+area.width/35+'px';
            aswerarea3.style.color = color;
            let t3 = new el('div',container);
            t3.innerText = 'enter player3';
            t3.style.fontWeight = 'bold';
            t3.style.fontSize = ''+area.width/30+'px';
            t3.style.border = '3px '+color+' solid';
            t3.style.width = ''+area.width/3.25+'px';
            t3.style.height = ''+area.height/16+'px';
            t3.style.position = 'absolute';
            t3.style.top = ''+area.height/1.25+'px';
            t3.style.left = ''+area.width/2.6+'px';
            t3.style.color = color;
            t3.style.textAlign = 'center';
            t3.onclick = function(){
              t3.style.backgroundColor = 'rgb(0,0,0)';
              setTimeout(()=>{t3.style.backgroundColor = 'inherit';},150);
              let dkfe = aswerarea3.value.split('?');
              cs1[2].setanswer(dkfe[8]);
              cs1[2].setcandidate(dkfe[9]);
              cs1[2].setcandidate(dkfe[10]);
              cs1[2].setcandidate(dkfe[11]);
            }
            
            let startbutton = new el('div',container);
            startbutton.innerText = `P
L
A
Y`;
            startbutton.style.fontWeight = 'bold';
            startbutton.style.fontSize = ''+area.width/10+'px';
            startbutton.style.border = '3px '+color+' solid';
            startbutton.style.width = ''+area.width/10+'px';
            startbutton.style.height = ''+area.height/1.25+'px';
            startbutton.style.position = 'absolute';
            startbutton.style.top = ''+area.height/8+'px';
            startbutton.style.left = ''+area.width/1.25+'px';
            startbutton.style.color = color;
            startbutton.style.textAlign = 'center';
            startbutton.onclick = function(){
              startbutton.style.backgroundColor = 'rgb(0,0,0)';
              setTimeout(()=>{startbutton.style.backgroundColor = 'inherit';},150);
              aswerarea1.remove();
              t1.remove();
              aswerarea2.remove();
              t2.remove();
              aswerarea3.remove();
              t3.remove();
              startbutton.remove();
              copybutton.remove();
              offerarea.remove();
              thing7163e7.remove();
              
              {
                if(cs1[0].channel.readyState==='open'){cs1[0].send('startgame');}
                if(cs1[1].channel.readyState==='open'){cs1[1].send('startgame');}
                if(cs1[2].channel.readyState==='open'){cs1[2].send('startgame');}
                
                start();
              }
            }
          });});});
          }
        }
       }
    
    
    button2.onclick = function(){
      
      button2.style.backgroundColor = 'rgb(0,0,0)';
      setTimeout(()=>{button2.style.backgroundColor = 'inherit';},150);
      
      let testusername = ''+username.value+'';
      if(testusername===''||testusername===' '||testusername==='  '||testusername==='   '||testusername==='    '||testusername==='     '||testusername==='      '||testusername==='       '||testusername==='        '||testusername==='         '||testusername==='          '){
        username.value = '';
        username.placeholder = '   !invalid!   '
      }else{
        name = testusername;
        title.remove();
        username.remove();
        button1.remove();
        button2.remove();
        {
          let thing7163e7 = new el('div',container);
          thing7163e7.innerText = 'paste connection offer in the text box';
          thing7163e7.style.fontWeight = 'bold';
          thing7163e7.style.backgroundColor = 'rgb(0,0,0)';
          thing7163e7.style.fontSize = ''+area.width/30+'px';
          thing7163e7.style.textAlign = 'center';
          thing7163e7.style.border = '3px '+color+' solid';
          thing7163e7.style.width = ''+area.width/1.25+'px';
          thing7163e7.style.height = ''+area.height/19+'px';
          thing7163e7.style.top = ''+area.height/15+'px';
          thing7163e7.style.left = ''+area.width/35+'px';
          let offerarea = new el('textarea',container);
          offerarea.style.placeholder = '1';
          offerarea.style.resize = 'none';
          offerarea.style.backgroundColor = 'rgb(0,0,0)';
          offerarea.style.fontSize = ''+area.width/30+'px';
          offerarea.style.width = ''+area.width/2+'px';
          offerarea.style.height = ''+area.height/20+'px';
          offerarea.style.position = 'absolute';
          offerarea.style.top = ''+area.height/5+'px';
          offerarea.style.left = ''+area.width/35+'px';
          offerarea.style.color = color;
          let t9 = new el('div',container);
          t9.innerText = 'connect';
          t9.style.fontWeight = 'bold';
          t9.style.fontSize = ''+area.width/20+'px';
          t9.style.border = '3px '+color+' solid';
          t9.style.width = ''+area.width/3.25+'px';
          t9.style.height = ''+area.height/11+'px';
          t9.style.position = 'absolute';
          t9.style.top = ''+area.height/5+'px';
          t9.style.left = ''+area.width/1.8+'px';
          t9.style.color = color;
          t9.style.textAlign = 'center';
          
          t9.onclick = function(){
             cs2 = [
              new remote(),
              new remote(),
              new remote()
            ];
            
            var z = offerarea.value;
            z = z.split('?');
            
            cs2[0].connect(z[0]).then(()=>{cs2[1].connect(z[1]).then(()=>{cs2[2].connect(z[2])});});
            
            let jszbfvi = new el('div',container);
            jszbfvi.style.fontWeight = 'bold';
            
            setTimeout(function ejfj (){
              
              
              if(cs2[0].candidate === undefined){setTimeout(ejfj,500);}
              else{
              if(cs2[0].candidate.split('?').length > 3){
                if(cs2[1].candidate === undefined){setTimeout(ejfj,500);}
                else{
                if(cs2[1].candidate.split('?').length === 4 && cs2[1].answer != undefined){
                   if(cs2[2].candidate === undefined){setTimeout(ejfj,500);}
                   else{
                   if(cs2[2].candidate.split('?').length === 4 && cs2[2].answer != undefined){
                     
                     jszbfvi.remove();
                     thing7163e7.remove();
                     offerarea.remove();
                     t9.remove();
                     
                     let answerarey62387ry = new el('textarea',container);
                     answerarey62387ry.value = ``+cs2[0].answer+`?`+cs2[0].candidate+``+cs2[1].answer+`?`+cs2[1].candidate+``+cs2[2].answer+`?`+cs2[2].candidate+``;
                     
                     answerarey62387ry.readonly = true;
                     answerarey62387ry.style.resize = 'none';
                     answerarey62387ry.style.display = 'none';
                     answerarey62387ry.style.fontSize = '0px';
                     answerarey62387ry.style.width = '0px';
                     answerarey62387ry.style.height = '0px';
                     
                     let copybuttonytguyg = new el('div',container);
                     copybuttonytguyg.innerText = 'click to copy connection answer';
                     copybuttonytguyg.style.fontWeight = 'bold';
                     copybuttonytguyg.style.fontSize = ''+area.width/30+'px';
                     copybuttonytguyg.style.textAlign = 'center';
                     copybuttonytguyg.style.border = '3px '+color+' solid';
                     copybuttonytguyg.style.width = ''+area.width/2.75+'px';
                     copybuttonytguyg.style.height = ''+area.height/8+'px';
                     copybuttonytguyg.style.top = ''+area.height/20+'px';
                     copybuttonytguyg.style.left = ''+area.width/35+'px';
                     
                     cs2[0].setcandidate(z[3]);
                     cs2[0].setcandidate(z[4]);
                     cs2[0].setcandidate(z[5]);
            
                     cs2[1].setcandidate(z[6]);
                     cs2[1].setcandidate(z[7]);
                     cs2[1].setcandidate(z[8]);
            
                     cs2[2].setcandidate(z[9]);
                     cs2[2].setcandidate(z[10]);
                     cs2[2].setcandidate(z[11]);
                     
                     copybuttonytguyg.onclick = function(){
                       copybuttonytguyg.style.backgroundColor = 'rgb(0,0,0)';
                       setTimeout(()=>{copybuttonytguyg.style.backgroundColor = 'inherit';},150);
                       answerarey62387ry.select();
                       navigator.clipboard.writeText(answerarey62387ry.value);
                     }
                     
                     
                   }
                   }
                 }
                 }
               }
               }
                
            }
            ,500);
          }
        }
        
       }
    }
   }
 }