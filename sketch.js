var bg;
var boy;
var boyStand;
var boyRunning;
var boyjumping;
var boyslashing;
var boyhit;
var invGround;
var back;
var v,vGroup;
var vA,vAGroup;
var vStand;
var vrun,vjump,vattackimg;
var vhit;
var vattack;

function preload(){
  bg=loadImage("industrial-background.jpg");
  boyStand=loadAnimation("heropic/stand1.png");
  boyRunning=loadAnimation("heropic/run1.png","heropic/run2.png", "heropic/run3.png", "heropic/run4.png", "heropic/run5.png", "heropic/run6.png","heropic/run7.png", "heropic/run8.png");
  boyjumping=loadAnimation("heropic/jump1.png","heropic/jump2.png","heropic/jump3.png","heropic/jump4.png","heropic/jump5.png","heropic/jump6.png");
  boyslashing=loadAnimation("heropic/moveS21.png","heropic/moveS22.png","heropic/moveS23.png","heropic/moveS24.png");
  boyhit=loadAnimation("heropic/hitS11.png","heropic/hitS12.png"); 
  
  vStand=loadAnimation("villanpic/stand.png");
  vrun=loadAnimation("villanpic/run1.png","villanpic/run2.png","villanpic/run3.png","villanpic/run4.png","villanpic/run5.png","villanpic/run6.png","villanpic/run7.png","villanpic/run8.png");
  //vjump=loadAnimation(); 
  vattackimg=loadAnimation("villanpic/attackS11.png","villanpic/attackS12.png","villanpic/attackS13.png","villanpic/attackS14.png");
}


function setup() {
  createCanvas(600, 400);
  
  back=createSprite(300,200);
  back.addImage(bg);
  back.scale=1;
  
 boy=createSprite(50,400);
   
 boy.addAnimation("stand",boyStand);
  boy.addAnimation("running",boyRunning);
  boy.addAnimation("jumping",boyjumping);
  boy.addAnimation("slashing",boyslashing);
  boy.addAnimation("hit",boyhit);
  invGround=createSprite(300,400,600,5);
  boy.scale=1.5;

  vGroup=createGroup();
  vAGroup=createGroup();
  
}

function draw() {
  background("white");
 // boy.debug=true;
  if(keyDown("W")){
    boy.changeAnimation("running",boyRunning);
    
   
    back.velocityX=-3;
    if(back.x<0)
      {
        back.x=back.width/2;
      }
  
  }
  
  if(keyWentUp("w")){
   boy.changeAnimation("stand",boyStand);
    
    back.velocityX=0;
    /*back.destroy();
     back=createSprite(300,200);
    back.addImage(bg);
    back.depth=boy.depth-1;*/
  }
  if(keyWentDown("space")&&(boy.y>=357)){
    boy.velocityY=-12;
    boy.changeAnimation("jumping",boyjumping);
  }
  if(keyWentUp("space")){
     boy.changeAnimation("jumping",boyjumping);
  }
  if(keyWentDown("s")){
    boy.changeAnimation("slashing",boyslashing);
    if(boy.isTouching(vGroup)){
      vGroup.destroyEach();
    }
    if(vAGroup.isTouching(boy)){
      console.log("hit");
     boy.changeAnimation("hit",boyhit);

    }
  }
  if(keyWentUp("s")){
    boy.changeAnimation("stand",boyStand);
  }
  console.log(boy.y);
  boy.velocityY=boy.velocityY+0.8;
  boy.collide(invGround);
  spwnVillan();
  villanAttack();
  drawSprites();
  
}

function spwnVillan(){

  if(frameCount%100===0){
    v=createSprite(600,350);
    vGroup.add(v);
    v.addAnimation("rnn",vrun);
    v.velocityX=-5;

  }

}

function villanAttack(){
  if(frameCount%250===0){
   vA=createSprite(600,350);
   vAGroup.add(vA);
   vA.addAnimation("attack",vattackimg);
   vA.velocityX=-5;

   vA.depth=boy.depth;
  }

}