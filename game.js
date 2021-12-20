
let secondspergame = 120;



var name = undefined;

var human = undefined;

var assignednumber = 0;
var ishit = false;

var cs1 = undefined;
var cs2 = undefined;

var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var gray = document.getElementById('gray');
var walls = document.getElementById('walls');


var pointsperhit = 5;
var points = {
  red:0,
  green:0,
  blue:0,
};

var p1 = {name:'',ishit:false,xoffset:0,yoffset:0,img:[gray,0,0,0,0],laser:{one:{x:0,y:0},two:{x:0,y:0}},};
var p2 = {name:'',ishit:false,xoffset:0,yoffset:0,img:[gray,0,0,0,0],laser:{one:{x:0,y:0},two:{x:0,y:0}},};
var p3 = {name:'',ishit:false,xoffset:0,yoffset:0,img:[gray,0,0,0,0],laser:{one:{x:0,y:0},two:{x:0,y:0}},};
var p4 = {name:'',ishit:false,xoffset:0,yoffset:0,img:[gray,0,0,0,0],laser:{one:{x:0,y:0},two:{x:0,y:0}},};

function start (){
  
  var changers = [];
  
  var SCALE = (area.width)/832;
  
  let canvas = new el('canvas');
  canvas.style.backgroundColor = 'rgb(0,0,0)';
  canvas.style.border = '3px '+color+' solid';
  let ctx = canvas.getContext('2d');
  let cw = canvas.width = area.width-6;
  let ch = canvas.height = area.height-6;
  
  var potato = {
    xoffset : 0,
    yoffset : 0,
  };
  var objects = {
    back:[],
    front:[],
  };
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  class player {
    constructor(x,y,w,h,color,u1,u2,u3,u4,u5,u6,u7,u8,d1,d2,d3,d4,d5,d6,d7,d8,l1,l2,l3,l4,l5,l6,l7,l8,r1,r2,r3,r4,r5,r6,r7,r8,iu,id,il,ir){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    if(this.color==='gray'){this.imgSrc = gray;}
    if(this.color==='green'){this.imgSrc = green;}
    if(this.color==='red'){this.imgSrc = red;}
    if(this.color==='blue'){this.imgSrc = blue;}
    this.img = {
    u1:u1,u2:u2,u3:u3,u4:u4,u5:u5,u6:u6,u7:u7,u8:u8,
    d1:d1,d2:d2,d3:d3,d4:d4,d5:d5,d6:d6,d7:d7,d8:d8,
    l1:l8,l2:l7,l3:l6,l4:l5,l5:l4,l6:l3,l7:l2,l8:l1,
    r1:r1,r2:r2,r3:r3,r4:r4,r5:r5,r6:r6,r7:r7,r8:r8,
    iu:iu,id:id,il:il,ir:ir,
    }
    this.anim = {clock:0,step:1,};
    this.walking = false;
    this.facing = 'd';
    this.Cimg = [];
    }
    
    collide(){
    for(var j = 0; j < objects.back.length; j += 1){
    var other = objects.back[j];
    if(other.solid === true){
    if (this.x < other.x + other.w &&this.x + this.w  > other.x &&this.y < other.y + other.h &&this.y + this.h  > other.y ){
    var nx = 0;for(nx = 0; nx < other.w; nx += 1){if ((this.x - nx) < other.x + other.w &&(this.x + this.w - nx)  > other.x &&this.y < other.y + other.h &&this.y + this.h  > other.y ){}else{break;}}
    var ny = 0;for(ny = 0; ny < other.h; ny += 1){if (this.x < other.x + other.w &&this.x + this.w  > other.x &&(this.y - ny) < other.y + other.h &&(this.y + this.h - ny)  > other.y ){}else{break;}}
    var px = 0;for(px = 0; px < other.w; px += 1){if ((this.x + px) < other.x + other.w &&(this.x + this.w + px)  > other.x &&this.y < other.y + other.h &&this.y + this.h  > other.y ){}else{break;}}
    var py = 0;for(py = 0; py < other.h; py += 1){if (this.x < other.x + other.w &&this.x + this.w  > other.x && (this.y + this.h - this.h/10 + py) < other.y + other.h && this.y + this.h + py > other.y ){}else{break;}}
    if(nx < ny   && nx < px  && nx < py){if(nx != 0){
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.x+=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.x+=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.x+=8;}
      potato.xoffset -= 8;
    }}
    if(ny < nx   && ny < py  && ny < px){if(ny != 0){
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.y+=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.y+=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.y+=8;}
      potato.yoffset -= 8;
    }}
    if(px < py   && px < nx  && px < ny){if(px != 0){
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.x-=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.x-=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.x-=8;}
      potato.xoffset += 8;
    }}
    if(py < px   && py < ny  && py < nx){if(py != 0){
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.y-=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.y-=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.y-=8;}
      potato.yoffset += 8;
    }}
    }}}
    }
    update(){
      
    if(this.color==='green'){this.imgSrc = green;}
    if(this.color==='red'){this.imgSrc = red;}
    if(this.color==='blue'){this.imgSrc = blue;}
    if(this.color==='gray'){this.imgSrc = gray;}
    if(ishit===true){this.imgSrc = gray;}
      
      
    this.anim.clock += 1;
    if(this.anim.clock % 6 === 0 && this.anim.clock > 0){
    if(this.anim.step === 1)     {this.anim.step=2;}
    else if(this.anim.step === 2){this.anim.step=3;}
    else if(this.anim.step === 3){this.anim.step=4;}
    else if(this.anim.step === 4){this.anim.step=5;}
    else if(this.anim.step === 5){this.anim.step=6;}
    else if(this.anim.step === 6){this.anim.step=7;}
    else if(this.anim.step === 7){this.anim.step=8;}
    else if(this.anim.step === 8){this.anim.step=1;}
    }
    if(this.walking === true){
    if(this.facing === 'u'){if(this.anim.step === 1){this.Cimg=this.img.u1;}if(this.anim.step === 2){this.Cimg=this.img.u2;}if(this.anim.step === 3){this.Cimg=this.img.u3;}if(this.anim.step === 4){this.Cimg=this.img.u4;}if(this.anim.step === 5){this.Cimg=this.img.u5;}if(this.anim.step === 6){this.Cimg=this.img.u6;}if(this.anim.step === 7){this.Cimg=this.img.u7;}if(this.anim.step === 8){this.Cimg=this.img.u8;}}
    if(this.facing === 'd'){if(this.anim.step === 1){this.Cimg=this.img.d1;}if(this.anim.step === 2){this.Cimg=this.img.d2;}if(this.anim.step === 3){this.Cimg=this.img.d3;}if(this.anim.step === 4){this.Cimg=this.img.d4;}if(this.anim.step === 5){this.Cimg=this.img.d5;}if(this.anim.step === 6){this.Cimg=this.img.d6;}if(this.anim.step === 7){this.Cimg=this.img.d7;}if(this.anim.step === 8){this.Cimg=this.img.d8;}}
    if(this.facing === 'l'){if(this.anim.step === 1){this.Cimg=this.img.l1;}if(this.anim.step === 2){this.Cimg=this.img.l2;}if(this.anim.step === 3){this.Cimg=this.img.l3;}if(this.anim.step === 4){this.Cimg=this.img.l4;}if(this.anim.step === 5){this.Cimg=this.img.l5;}if(this.anim.step === 6){this.Cimg=this.img.l6;}if(this.anim.step === 7){this.Cimg=this.img.l7;}if(this.anim.step === 8){this.Cimg=this.img.l8;}}
    if(this.facing === 'r'){if(this.anim.step === 1){this.Cimg=this.img.r1;}if(this.anim.step === 2){this.Cimg=this.img.r2;}if(this.anim.step === 3){this.Cimg=this.img.r3;}if(this.anim.step === 4){this.Cimg=this.img.r4;}if(this.anim.step === 5){this.Cimg=this.img.r5;}if(this.anim.step === 6){this.Cimg=this.img.r6;}if(this.anim.step === 7){this.Cimg=this.img.r7;}if(this.anim.step === 8){this.Cimg=this.img.r8;}}
    }
    if(this.walking === false){
    if(this.facing === 'u'){this.Cimg=this.img.iu;}if(this.facing === 'd'){this.Cimg=this.img.id;}if(this.facing === 'l'){this.Cimg=this.img.il;}if(this.facing === 'r'){this.Cimg=this.img.ir;}
    }
    if(keys.up===true||keys.down===true||keys.left===true||keys.right===true){this.walking=true;}else{this.walking=false;}
    if(keys.up===true)   {
      this.facing = 'u';
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.y+=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.y+=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.y+=8;}
      potato.yoffset -= 8;
    }
    if(keys.down===true) {
      this.facing = 'd';
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.y-=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.y-=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.y-=8;}
      potato.yoffset += 8;
    }
    if(keys.left===true) {
      this.facing = 'l';
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.x+=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.x+=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.x+=8;}
      potato.xoffset -= 8;
    }
    if(keys.right===true){
      this.facing = 'r';
      for(var i = 0; i < changers.length; i += 1){let chj = changers[i];chj.x-=8;}
      for(var i = 0; i < objects.front.length; i += 1){let obg = objects.front[i];obg.x-=8;}
      for(var i = 0; i < objects.back.length; i += 1){let obg = objects.back[i];obg.x-=8;}
      potato.xoffset += 8;
    }
    this.collide();
    }
    draw(){
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.imgSrc,this.Cimg[0],this.Cimg[1],this.Cimg[2],this.Cimg[3],this.x*SCALE,this.y*SCALE,this.w*SCALE,this.h*SCALE);
    }
  }
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  var keys = {left:false,right:false,up:false,down:false}
  document.body.onkeydown = function(event){
    var key = event.key;
    if(key === 'w' || key === 'ArrowUp')   {keys.up    = true;}
    if(key === 's' || key === 'ArrowDown') {keys.down  = true;}
    if(key === 'a' || key === 'ArrowLeft') {keys.left  = true;}
    if(key === 'd' || key === 'ArrowRight'){keys.right = true;}
  }
  document.body.onkeyup = function(event){
    var key = event.key;
    if(key === 'w' || key === 'ArrowUp')   {keys.up    = false;}
    if(key === 's' || key === 'ArrowDown') {keys.down  = false;}
    if(key === 'a' || key === 'ArrowLeft') {keys.left  = false;}
    if(key === 'd' || key === 'ArrowRight'){keys.right = false;}
  }
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  class chg {
    constructor(color,x,y,w,h){
      this.ob = {};
      this.ob.color = color;
      this.ob.x = x;
      this.ob.y = y;
      this.ob.w = w;
      this.ob.h = h;
      
      changers.push(this.ob);
    }
  }
  class obj {
    constructor(x,y,preset){
    this.half1     = {};
    this.half1.x   = x;
    this.half1.y   = y;
    this.half1.w   = preset.half1[3]*preset.scale;
    this.half1.h   = preset.half1[4]*preset.scale;
    this.half1.src = preset.half1;
    objects.front.push(this.half1);
    this.half2       = {};
    this.half2.x     = x;
    this.half2.y     = y + preset.half1[4]*preset.scale;
    this.half2.w     = preset.half2[3]*preset.scale;
    this.half2.h     = preset.half2[4]*preset.scale;
    this.half2.src   = preset.half2;
    this.half2.solid = preset.solid;
    objects.back.push(this.half2);
    }
  }
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  human = new player(384.5,184,13*5,20*5,'gray',[13*1,20*0,13,20],[13*2,20*0,13,20],[13*3,20*0,13,20],[13*4,20*0,13,20],[13*5,20*0,13,20],[13*6,20*0,13,20],[13*7,20*0,13,20],[13*8,20*0,13,20],[13*1,20*1,13,20],[13*2,20*1,13,20],[13*3,20*1,13,20],[13*4,20*1,13,20],[13*5,20*1,13,20],[13*6,20*1,13,20],[13*7,20*1,13,20],[13*8,20*1,13,20],[13*1,20*3,13,20],[13*2,20*3,13,20],[13*3,20*3,13,20],[13*4,20*3,13,20],[13*5,20*3,13,20],[13*6,20*3,13,20],[13*7,20*3,13,20],[13*8,20*3,13,20],[13*1,20*2,13,20],[13*2,20*2,13,20],[13*3,20*2,13,20],[13*4,20*2,13,20],[13*5,20*2,13,20],[13*6,20*2,13,20],[13*7,20*2,13,20],[13*8,20*2,13,20],[13*0,20*0,13,20],[13*0,20*1,13,20],[13*0,20*3,13,20],[13*0,20*2,13,20]);
  potato.xoffset += 384.5;
  potato.yoffset += 184;
  
  
  let preset1 = {half1:[walls,0,35 ,20,17],half2:[walls,0,52,20,18],solid:true,scale:5,};
  let preset2 = {half1:[walls,20,35 ,20,17],half2:[walls,20,52,20,18],solid:true,scale:5,};
  let preset3 = {half1:[walls,40,35 ,20,17],half2:[walls,40,52,20,18],solid:true,scale:5,};
  let preset4 = {half1:[walls,60,35 ,20,17],half2:[walls,60,52,20,18],solid:true,scale:5,};
  
  var map = [
    [1,2,2,2,2,2,2,2,2,2,3],
    [1,8,8,8,1,2,3,9,9,9,1],
    [1,8,8,8,1,2,3,9,9,9,1],
    [1,8,8,8, , , ,9,9,9,1],
    [1,8,8,8, , , ,9,9,9,1],
    [1, , , , , , , , , ,1],
    [1, , , , , , , , , ,1],
    [1, , , , , , , , , ,1],
    [1, , , , , , , , , ,1],
    [1, , , , , , , , , ,1],
    [1, , , , , , , , , ,1],
    [1,2,2,2, , , ,2,2,2,3],
    [ , , ,1, , , ,3, , , ],
    [ , , ,1, , , ,3, , , ],
    [ , , ,1, , , ,3, , , ],
    [1,2,2,2, , , ,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
    [1, , , , , , , , , , ,4, , , , , , , , , , ,4, , , , , , , , , , , ,4, , , , , , , , , , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , ,1,3, , , , , , , , , , ,1,2,2,3, , ,3],
    [1, , ,4, , , , , , , , , , ,1,2,2,2,3, , , , , , , , , ,1,3, , , , , , , , , , , , , , , , ,3],
    [1, , , , , , , , ,4, , , , ,1,2,2,2,3, , , , , , , , , , , , , , , ,4, , , , , , , , , , , ,3],
    [1, , , , , , , , , , , , , ,1,2,2,2,3, , , , , ,4, , , , , , , , , , , , , , , , ,4, , , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,4,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,3],
    [1,4, , , , , , , , , , , , , , , , , , , , , , , , , ,4, , , , , , , , , , , , , , , , , , ,3],
    [1, , , , ,4, , , , , ,1,3, , , , , , , , , , , , , , , , , , ,4, , , , , , ,1,2,2,2,2,3, , ,3],
    [1, , , , , , , , , , ,1,3, , , , , , ,4, , , , , , , , , , , , , , , , , , ,1,2,2,2,2,3, , ,3],
    [1, , , , , , , , , , ,1,3, , , , , , , , , , , , ,1,3, , , , , , , , , , , ,1,2,2,2,2,3, , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , ,1,3, , , , , , , , , , , ,1,2,2,2,2,3, , ,3],
    [1, , , ,1,3, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,3],
    [1, , , ,1,3, , , , , , , , , , , , ,1,3, , , , , , , , , , , , , , , , , , , , , , , , , , ,3],
    [1, , , , , , , , , , , ,4, , , , , ,1,3, , , , , , , , , , , , , , , , ,4, , , , , , , , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , ,4, , , , , , , , , , , , , , , , ,3, , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,1,2,3, , , , , , , , , ,3, , ,4,3],
    [1, , , ,4, , , , , , , , , , , , , , , , , , , , , , , , , ,1,2,3, , , , , , , , , ,3, , , ,3],
    [1, , , , , , , , , ,1,2,2,3, , , , , ,4, , , , , , , , , , ,1,2,3, , , , , , ,1,2,2,3, , , ,3],
    [1, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,3],
    [1, , , , , , ,4, , , , , , , , , , , , , , , , , ,4, , , , , , , , , , ,4, , , , , , , , , ,3],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
  ];
  
  
  var xoo = -35;
  var yoo = -50;
  
  for(var y = 0; y < map.length; y+=1){
    for(var x = 0; x < map[y].length; x+=1){
      if(map[y][x]===1){new obj(x*80+xoo,y*50+yoo,preset1);}
      if(map[y][x]===2){new obj(x*80+xoo,y*50+yoo,preset2);}
      if(map[y][x]===3){new obj(x*80+xoo,y*50+yoo,preset3);}
      if(map[y][x]===4){new obj(x*80+xoo,y*50+yoo,preset4);}
      
      if(map[y][x]===8){new chg('green',x*80+xoo,y*50+yoo,80,50);}
      if(map[y][x]===9){new chg('blue',x*80+xoo,y*50+yoo,80,50);}
    }
  }
  
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  function testpoint (x,y){
    let xx = x;
    let yy = y;
    var result = undefined;
    
    for(let j = 0; j < objects.back.length; j+=1){
      let other = objects.back[j];
      if(other.solid===true){
         if(xx >= other.x && xx <= other.x+other.w && yy >= other.y-10 && yy <= other.y+other.h/4){result = true;break;}//else{result = false;break;}
      }
    }
    ///////////////////////
    {
      if(cs2 != undefined){
      let other = p1;
      if(xx >= other.xoffset - potato.xoffset + (384.5) && xx <= other.xoffset - potato.xoffset + (384.5)+human.w && yy >= other.yoffset - potato.yoffset + (184) && yy <= other.yoffset - potato.yoffset + (184)+human.h){
        if(p1.color != human.color && p1.img[0] != 'gray'){
        if(cs2[0].connection.channel===undefined){}else{if(cs2[0].connection.channel.readyState==='open'){cs2[0].send(JSON.stringify(  {why:'hit',who:'p1',from:human.color,}  ));}}
        if(cs2[1].connection.channel===undefined){}else{if(cs2[1].connection.channel.readyState==='open'){cs2[1].send(JSON.stringify(  {why:'hit',who:'p1',from:human.color,}  ));}}
        if(cs2[2].connection.channel===undefined){}else{if(cs2[2].connection.channel.readyState==='open'){cs2[2].send(JSON.stringify(  {why:'hit',who:'p1',from:human.color,}  ));}}
        }
        result = true;
      }
      }
    }
    {
      let other = p2;
      if(xx >= other.xoffset - potato.xoffset + (384.5) && xx <= other.xoffset - potato.xoffset + (384.5)+human.w && yy >= other.yoffset - potato.yoffset + (184) && yy <= other.yoffset - potato.yoffset + (184)+human.h){
        if(p2.color != human.color && p2.img[0] != 'gray'){
        if(cs1 != undefined){if(cs1[0].channel.readyState==='open'){cs1[0].send(JSON.stringify(  {why:'yougothit'}  ));points[human.color]+=pointsperhit;}}
        if(cs2===undefined){}else{
        if(cs2[1].connection.channel===undefined){}else{if(cs2[1].connection.channel.readyState==='open'){cs2[1].send(JSON.stringify(  {why:'hit',who:'p2',from:human.color,}  ));}}
        if(cs2[2].connection.channel===undefined){}else{if(cs2[2].connection.channel.readyState==='open'){cs2[2].send(JSON.stringify(  {why:'hit',who:'p2',from:human.color,}  ));}}
        }
        }
        result = true;
      }
    }
    {
      let other = p3;
      if(xx >= other.xoffset - potato.xoffset + (384.5) && xx <= other.xoffset - potato.xoffset + (384.5)+human.w && yy >= other.yoffset - potato.yoffset + (184) && yy <= other.yoffset - potato.yoffset + (184)+human.h){
        if(p3.color != human.color && p3.img[0] != 'gray'){
        if(cs1 != undefined){if(cs1[1].channel.readyState==='open'){cs1[1].send(JSON.stringify(  {why:'yougothit'}  ));points[human.color]+=pointsperhit;}}
        if(cs2===undefined){}else{
        if(cs2[0].connection.channel===undefined){}else{if(cs2[0].connection.channel.readyState==='open'){cs2[0].send(JSON.stringify(  {why:'hit',who:'p3',from:human.color,}  ));}}
        if(cs2[2].connection.channel===undefined){}else{if(cs2[2].connection.channel.readyState==='open'){cs2[2].send(JSON.stringify(  {why:'hit',who:'p3',from:human.color,}  ));}}
        }
        }
        result = true;
      }
    }
    {
      let other = p4;
      if(xx >= other.xoffset - potato.xoffset + (384.5) && xx <= other.xoffset - potato.xoffset + (384.5)+human.w && yy >= other.yoffset - potato.yoffset + (184) && yy <= other.yoffset - potato.yoffset + (184)+human.h){
        if(p4.color != human.color && p4.img[0]!= 'gray'){
        if(cs1 != undefined){if(cs1[2].channel.readyState==='open'){cs1[2].send(JSON.stringify(  {why:'yougothit'}  ));points[human.color]+=pointsperhit;}}
        if(cs2===undefined){}else{
        if(cs2[0].connection.channel===undefined){}else{if(cs2[0].connection.channel.readyState==='open'){cs2[0].send(JSON.stringify(  {why:'hit',who:'p4',from:human.color,}  ));}}
        if(cs2[1].connection.channel===undefined){}else{if(cs2[1].connection.channel.readyState==='open'){cs2[1].send(JSON.stringify(  {why:'hit',who:'p4',from:human.color,}  ));}}
        }
        }
        result = true;
      }
    }
    ////////////////////////
    
    return result;
  }
  
  var laser = {p1:{x:0,y:0},p2:{x:0,y:0,},};
  var cooldown = false;
  
  canvas.onmousedown = function(event){
    if(cooldown===false&&ishit===false&&human.color != 'gray'){
      let x = event.offsetX;
      let y = event.offsetY;
      
      let hx = human.x+human.w/2;
      let hy = human.y+human.h/2;
      
      var p11 = {x:0,y:0};
      var p22 = {x:0,y:0};
      
      var ryx = (hy*SCALE-y)/(hx*SCALE-x);
      var spc = 1;
      
      var l = 1000;
    
      for(let d = 0; d < l; d+=1){
        if(x > hx){
          let test = testpoint(((hx)+(d*spc)),((hy)+(d*spc*ryx)));
          if(d === l-1){p22.x   = (hx)+(d*spc);  p22.y = (hy)+(d*spc*ryx);break;}
          if(test===true){p22.x = (hx)+(d*spc);  p22.y = (hy)+(d*spc*ryx);break;}
          else{if(d===0){p11.x  = (hx)+(d*spc);  p11.y = (hy);}}
        }
        if(x < hx){
          let test = testpoint(((hx)-(d*spc)),((hy)+(-d*spc*ryx)));
          if(d === l-1){p22.x   = ((hx)-(d*spc));  p22.y = (hy)+(-d*spc*ryx);break;}
          if(test===true){p22.x = ((hx)-(d*spc));  p22.y = ((hy)+(-d*spc*ryx));break;}
          else{if(d===0){p11.x  = ((hx));  p11.y = (hy);}}
        }
      
      }
    
      laser.p1.x = p11.x;laser.p1.y = p11.y;
      laser.p2.x = p22.x;laser.p2.y = p22.y;
    
      setTimeout(function(){laser.p1.x = 0;laser.p1.y = 0;
      laser.p2.x = 0;laser.p2.y = 0;},25);
    }
    cooldown = true;
  }
  canvas.onmouseup = function(){
    laser.p1.x = 0;laser.p1.y = 0;
    laser.p2.x = 0;laser.p2.y = 0;
    if(cooldown===true){
      setTimeout(function(){cooldown=false;},25);
    }
  }
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  function loop (){
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,cw,ch);
  
  color = human.color;
  
  human.update();
  
  for(let b = 0; b < changers.length; b += 1){
    let ch = changers[b];
    if(ch.color==='green'){ctx.fillStyle = 'rgb(51,255,51)';}
    else if(ch.color==='blue'){ctx.fillStyle = 'rgb(51,51,255)';}
    else if(ch.color==='red'){ctx.fillStyle = 'rgb(255,51,51)';}
    else {ctx.fillStyle = ch.color;}
    ctx.fillRect(ch.x*SCALE,ch.y*SCALE,ch.w*SCALE,ch.h*SCALE);
    if(human.x+human.w/2 > ch.x && human.y+human.h > ch.y && human.x+human.w/2 < ch.x+ch.w && human.y+human.h < ch.y+ch.h && human.color === 'gray'){human.color = ch.color;}
  }
  for(var i = 0; i < objects.back.length; i += 1){var ob = objects.back[i];var src = ob.src;ctx.drawImage(src[0],src[1],src[2],src[3],src[4],ob.x*SCALE,ob.y*SCALE,ob.w*SCALE,ob.h*SCALE);}
    {
      if(p1.img[0]==='green'){ctx.drawImage(green,p1.img[1],p1.img[2],p1.img[3],p1.img[4],(p1.xoffset - potato.xoffset + (384.5))*SCALE,(p1.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p1.img[0]==='red')  {ctx.drawImage(red  ,p1.img[1],p1.img[2],p1.img[3],p1.img[4],(p1.xoffset - potato.xoffset + (384.5))*SCALE,(p1.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p1.img[0]==='blue') {ctx.drawImage(blue ,p1.img[1],p1.img[2],p1.img[3],p1.img[4],(p1.xoffset - potato.xoffset + (384.5))*SCALE,(p1.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p1.ishit===true||p1.img[0]==='gray')    {ctx.drawImage(gray ,p1.img[1],p1.img[2],p1.img[3],p1.img[4],(p1.xoffset - potato.xoffset + (384.5))*SCALE,(p1.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      ctx.beginPath();
      if(p1.img[0]==='green'){ctx.strokeStyle = 'rgb(51,255,51)';}
      else if(p1.img[0]==='blue'){ctx.strokeStyle = 'rgb(51,51,255)';}
      else if(p1.img[0]==='red'){ctx.strokeStyle = 'rgb(255,51,51)';}
      ctx.lineWidth = 30*SCALE;
      ctx.moveTo((p1.laser.one.x+(p1.xoffset- potato.xoffset))*SCALE,(p1.laser.one.y+(p1.yoffset- potato.yoffset))*SCALE);
      ctx.lineTo((p1.laser.two.x+(p1.xoffset- potato.xoffset))*SCALE,(p1.laser.two.y+(p1.yoffset- potato.yoffset))*SCALE);
      ctx.stroke();
      
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.font = 'bold '+10*SCALE+'pt monospace';
      ctx.fillText(''+p1.name+'',(((p1.xoffset-potato.xoffset+384.5)+human.w/2)-(4*(p1.name.split('').length-1)))*SCALE,((p1.yoffset-potato.yoffset+184)-10)*SCALE);
      
    }
    {
      if(p2.img[0]==='green'){ctx.drawImage(green,p2.img[1],p2.img[2],p2.img[3],p2.img[4],(p2.xoffset - potato.xoffset + (384.5))*SCALE,(p2.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p2.img[0]==='red')  {ctx.drawImage(red  ,p2.img[1],p2.img[2],p2.img[3],p2.img[4],(p2.xoffset - potato.xoffset + (384.5))*SCALE,(p2.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p2.img[0]==='blue') {ctx.drawImage(blue ,p2.img[1],p2.img[2],p2.img[3],p2.img[4],(p2.xoffset - potato.xoffset + (384.5))*SCALE,(p2.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p2.ishit===true||p2.img[0]==='gray')    {ctx.drawImage(gray ,p2.img[1],p2.img[2],p2.img[3],p2.img[4],(p2.xoffset - potato.xoffset + (384.5))*SCALE,(p2.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      ctx.beginPath();
      if(p2.img[0]==='green'){ctx.strokeStyle = 'rgb(51,255,51)';}
      else if(p2.img[0]==='blue'){ctx.strokeStyle = 'rgb(51,51,255)';}
      else if(p2.img[0]==='red'){ctx.strokeStyle = 'rgb(255,51,51)';}
      ctx.lineWidth = 30*SCALE;
      ctx.moveTo((p2.laser.one.x+(p2.xoffset- potato.xoffset))*SCALE,(p2.laser.one.y+(p2.yoffset- potato.yoffset))*SCALE);
      ctx.lineTo((p2.laser.two.x+(p2.xoffset- potato.xoffset))*SCALE,(p2.laser.two.y+(p2.yoffset- potato.yoffset))*SCALE);
      ctx.stroke();
      
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.font = 'bold '+10*SCALE+'pt monospace';
      ctx.fillText(''+p2.name+'',(((p2.xoffset-potato.xoffset+384.5)+human.w/2)-(4*(p2.name.split('').length-1)))*SCALE,((p2.yoffset-potato.yoffset+184)-10)*SCALE);
      
    }
    {
      if(p3.img[0]==='green'){ctx.drawImage(green,p3.img[1],p3.img[2],p3.img[3],p3.img[4],(p3.xoffset - potato.xoffset + (384.5))*SCALE,(p3.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p3.img[0]==='red')  {ctx.drawImage(red  ,p3.img[1],p3.img[2],p3.img[3],p3.img[4],(p3.xoffset - potato.xoffset + (384.5))*SCALE,(p3.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p3.img[0]==='blue') {ctx.drawImage(blue ,p3.img[1],p3.img[2],p3.img[3],p3.img[4],(p3.xoffset - potato.xoffset + (384.5))*SCALE,(p3.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p3.ishit===true||p3.img[0]==='gray')    {ctx.drawImage(gray ,p3.img[1],p3.img[2],p3.img[3],p3.img[4],(p3.xoffset - potato.xoffset + (384.5))*SCALE,(p3.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      ctx.beginPath();
      if(p3.img[0]==='green'){ctx.strokeStyle = 'rgb(51,255,51)';}
      else if(p3.img[0]==='blue'){ctx.strokeStyle = 'rgb(51,51,255)';}
      else if(p3.img[0]==='red'){ctx.strokeStyle = 'rgb(255,51,51)';}
      ctx.lineWidth = 30*SCALE;
      ctx.moveTo((p3.laser.one.x+(p3.xoffset- potato.xoffset))*SCALE,(p3.laser.one.y+(p3.yoffset- potato.yoffset))*SCALE);
      ctx.lineTo((p3.laser.two.x+(p3.xoffset- potato.xoffset))*SCALE,(p3.laser.two.y+(p3.yoffset- potato.yoffset))*SCALE);
      ctx.stroke();
      
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.font = 'bold '+10*SCALE+'pt monospace';
      ctx.fillText(''+p3.name+'',(((p3.xoffset-potato.xoffset+384.5)+human.w/2)-(4*(p3.name.split('').length-1)))*SCALE,((p3.yoffset-potato.yoffset+184)-10)*SCALE);
      
    }
    {
      if(p4.img[0]==='green'){ctx.drawImage(green,p4.img[1],p4.img[2],p4.img[3],p4.img[4],(p4.xoffset - potato.xoffset + (384.5))*SCALE,(p4.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p4.img[0]==='red')  {ctx.drawImage(red  ,p4.img[1],p4.img[2],p4.img[3],p4.img[4],(p4.xoffset - potato.xoffset + (384.5))*SCALE,(p4.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p4.img[0]==='blue') {ctx.drawImage(blue ,p4.img[1],p4.img[2],p4.img[3],p4.img[4],(p4.xoffset - potato.xoffset + (384.5))*SCALE,(p4.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      if(p4.ishit===true||p4.img[0]==='gray')    {ctx.drawImage(gray ,p4.img[1],p4.img[2],p4.img[3],p4.img[4],(p4.xoffset - potato.xoffset + (384.5))*SCALE,(p4.yoffset - potato.yoffset + (184))*SCALE,13*5*SCALE,20*5*SCALE);}
      ctx.beginPath();
      if(p4.img[0]==='green'){ctx.strokeStyle = 'rgb(51,255,51)';}
      else if(p4.img[0]==='blue'){ctx.strokeStyle = 'rgb(51,51,255)';}
      else if(p4.img[0]==='red'){ctx.strokeStyle = 'rgb(255,51,51)';}
      ctx.lineWidth = 30*SCALE;
      ctx.moveTo((p4.laser.one.x+(p4.xoffset- potato.xoffset))*SCALE,(p4.laser.one.y+(p4.yoffset- potato.yoffset))*SCALE);
      ctx.lineTo((p4.laser.two.x+(p4.xoffset- potato.xoffset))*SCALE,(p4.laser.two.y+(p4.yoffset- potato.yoffset))*SCALE);
      ctx.stroke();
      
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.font = 'bold '+10*SCALE+'pt monospace';
      ctx.fillText(''+p4.name+'',(((p4.xoffset-potato.xoffset+384.5)+human.w/2)-(4*(p4.name.split('').length-1)))*SCALE,((p4.yoffset-potato.yoffset+184)-10)*SCALE);
      
    }
    
    
    ctx.beginPath();
    if(human.color==='green'){ctx.strokeStyle = 'rgb(51,255,51)';}
    else if(human.color==='blue'){ctx.strokeStyle = 'rgb(51,51,255)';}
    else if(human.color==='red'){ctx.strokeStyle = 'rgb(255,51,51)';}
    ctx.lineWidth = 30*SCALE;
    ctx.moveTo(laser.p1.x*SCALE,laser.p1.y*SCALE);
    ctx.lineTo(laser.p2.x*SCALE,laser.p2.y*SCALE);
    ctx.stroke();
    
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = 'bold '+10*SCALE+'pt monospace';
    ctx.fillText(''+name+'',((human.x+human.w/2)-(4*(name.split('').length-1)))*SCALE,(human.y-10)*SCALE);
    
    human.draw();
  for(var i = 0; i < objects.front.length; i += 1){var ob = objects.front[i];var src = ob.src;ctx.drawImage(src[0],src[1],src[2],src[3],src[4],ob.x*SCALE,ob.y*SCALE,ob.w*SCALE,ob.h*SCALE);}
    
    //////////////////////////////
    //////////////////////////////
    let fontsize = 50*SCALE;
    let padding = 5*SCALE;
    if(points.blue > points.green){
      ctx.fillStyle = 'rgb(51,255,51)';
      ctx.font = 'bold '+fontsize+'pt monospace';
      ctx.fillText('Green:'+points.green+'',0,fontsize*2+padding);
      
      ctx.fillStyle = 'rgb(51,51,255)';
      ctx.font = 'bold '+fontsize+'pt monospace';
      ctx.fillText('Blue:'+points.blue+'',0,fontsize);
    }
    else {
      ctx.fillStyle = 'rgb(51,255,51)';
      ctx.font = 'bold '+fontsize+'pt monospace';
      ctx.fillText('Green:'+points.green+'',0,fontsize);
      
      ctx.fillStyle = 'rgb(51,51,255)';
      ctx.font = 'bold '+fontsize+'pt monospace';
      ctx.fillText('Blue:'+points.blue+'',0,fontsize*2+padding);
    }
    //////////////////////////////
    //////////////////////////////
    
    if(cs1===undefined){}
    else{
      if(cs1[0].channel.readyState==='open'){cs1[0].send(JSON.stringify(  
        {why:'update',
         points:{red:points.red,green:points.green,blue:points.blue,},
         p1:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:laser.p1,two:laser.p2},},
         p3:{name:p3.name,ishit:p3.ishit,xoffset:p3.xoffset,yoffset:p3.yoffset,img:[p3.img[0],p3.img[1],p3.img[2],p3.img[3],p3.img[4]],laser:p3.laser},
         p4:{name:p4.name,ishit:p4.ishit,xoffset:p4.xoffset,yoffset:p4.yoffset,img:[p4.img[0],p4.img[1],p4.img[2],p4.img[3],p4.img[4]],laser:p4.laser},
        }  ));}
      
      
      if(cs1[1].channel.readyState==='open'){cs1[1].send(JSON.stringify(  
        {why:'update',
         points:{red:points.red,green:points.green,blue:points.blue,},
         p1:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:laser.p1,two:laser.p2},},
         p2:{name:p2.name,ishit:p2.ishit,xoffset:p2.xoffset,yoffset:p2.yoffset,img:[p2.img[0],p2.img[1],p2.img[2],p2.img[3],p2.img[4]],laser:p2.laser},
         p4:{name:p4.name,ishit:p4.ishit,xoffset:p4.xoffset,yoffset:p4.yoffset,img:[p4.img[0],p4.img[1],p4.img[2],p4.img[3],p4.img[4]],laser:p4.laser},
        }  ));}
      
      
      if(cs1[2].channel.readyState==='open'){cs1[2].send(JSON.stringify(  
        {why:'update',
         points:{red:points.red,green:points.green,blue:points.blue,},
         p1:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:laser.p1,two:laser.p2},},
         p2:{name:p2.name,ishit:p2.ishit,xoffset:p2.xoffset,yoffset:p2.yoffset,img:[p2.img[0],p2.img[1],p2.img[2],p2.img[3],p2.img[4]],laser:p2.laser},
         p3:{name:p3.name,ishit:p3.ishit,xoffset:p3.xoffset,yoffset:p3.yoffset,img:[p3.img[0],p3.img[1],p3.img[2],p3.img[3],p3.img[4]],laser:p3.laser},
        }  ));}
    }
    
    
    if(cs2===undefined){}
    else{
      if(cs2[0].connection.channel===undefined){}else{if(cs2[0].connection.channel.readyState==='open'){cs2[0].send(JSON.stringify(  {why:'update',p2:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:{x:laser.p1.x,y:laser.p1.y},two:{x:laser.p2.x,y:laser.p2.y}}},}  ));}}
      if(cs2[1].connection.channel===undefined){}else{if(cs2[1].connection.channel.readyState==='open'){cs2[1].send(JSON.stringify(  {why:'update',p3:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:{x:laser.p1.x,y:laser.p1.y},two:{x:laser.p2.x,y:laser.p2.y}}},}  ));}}
      if(cs2[2].connection.channel===undefined){}else{if(cs2[2].connection.channel.readyState==='open'){cs2[2].send(JSON.stringify(  {why:'update',p4:{name:name,ishit:ishit,xoffset:potato.xoffset,yoffset:potato.yoffset,img:[human.color,human.Cimg[0],human.Cimg[1],human.Cimg[2],human.Cimg[3]],laser:{one:{x:laser.p1.x,y:laser.p1.y},two:{x:laser.p2.x,y:laser.p2.y}}},}  ));}}
    }
    
    
    if(ishit===false){
      if(human.color==='green'){canvas.style.border = '3px rgb(51,255,51) solid';}
      else if(human.color==='blue'){canvas.style.border = '3px rgb(51,51,255) solid';}
      else if(human.color==='red'){canvas.style.border = '3px rgb(255,51,51) solid';}
      else {canvas.style.border = '3px '+human.color+' solid';}
    }
    if(ishit===true){document.body.children[8].style.border = '3px gray solid';}
    
  }
  let interval = setInterval(loop,20);
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  setTimeout(
    function(){
      clearInterval(interval);
      
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,cw,ch);
      
      let fontsize = 50*SCALE;
      let padding = 50*SCALE;
      let left = 200*SCALE;
      let top = 100*SCALE;
      if(points.blue > points.green){
        ctx.fillStyle = 'rgb(51,255,51)';
        ctx.font = 'bold '+fontsize+'pt monospace';
        ctx.fillText('Green:'+points.green+'',left,fontsize*2+padding+top);
        
        ctx.fillStyle = 'rgb(51,51,255)';
        ctx.font = 'bold '+fontsize+'pt monospace';
        ctx.fillText('Blue:'+points.blue+'',left,fontsize+top);
      }
      else {
        ctx.fillStyle = 'rgb(51,255,51)';
        ctx.font = 'bold '+fontsize+'pt monospace';
        ctx.fillText('Green:'+points.green+'',left,fontsize+top);
        
        ctx.fillStyle = 'rgb(51,51,255)';
        ctx.font = 'bold '+fontsize+'pt monospace';
        ctx.fillText('Blue:'+points.blue+'',left,fontsize*2+padding+top);
      }
      
      if(p1.name===''){
        let btn = new el('div',container);
        btn.style.position = 'absolute';
        btn.style.zIndex = 1;
        btn.style.backgroundColor = 'rgb(0,30,30)';
        btn.style.width = ''+200*SCALE+'px';
        btn.style.height = ''+100*SCALE+'px';
        btn.style.top = ''+300*SCALE+'px';
        btn.style.left = ''+600*SCALE+'px';
        if(human.color==='green'){btn.style.color = 'rgb(51,255,51)';btn.style.border='3px rgb(51,255,51) solid';}
        else if(human.color==='blue'){btn.style.color = 'rgb(51,51,255)';btn.style.border='3px rgb(51,51,255) solid';}
        else if(human.color==='red'){btn.style.color = 'rgb(255,51,51)';btn.style.border='3px rgb(255,51,51) solid';}
        else if(human.color==='gray'){btn.style.color = 'gray';btn.style.border='3px gray solid';}
        btn.style.fontWeight = 'bold';
        btn.style.fontSize = ''+50*SCALE+'px';
        btn.style.textAlign = 'center';
        btn.innerText = 'new game';
        
        btn.onclick = function(){
          canvas.remove();
          btn.remove();
          
          points = {
            red:0,
            green:0,
            blue:0,
          };
          
          if(cs1[0].channel.readyState==='open'){cs1[0].send('startgame');}
          if(cs1[1].channel.readyState==='open'){cs1[1].send('startgame');}
          if(cs1[2].channel.readyState==='open'){cs1[2].send('startgame');}
          
          start();
          
        }
        
      }
      
    },
    1000*secondspergame
  );
  
  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
}