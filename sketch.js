var monkey , monkey_running, ground, groundgrass, ground2;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
score=0;
var time;
time=0;
var sun, sunpic;
var cloud, cloud1, cloud2, cloud3;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var over, overpic;

function preload(){
  
  
 monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundgrass = loadImage("grass.png");
  sunpic = loadImage("sun.png");
  //over = loadImage("gameover.png");
  //cloud1 = loadImage("cloud1.png");
  //cloud2 = loadImage("cloud2.png");
  //cloud3 = loadImage("cloud3.png");
}



function setup() {
  createCanvas(500,400);
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.15;
  
  ground = createSprite(250,360,400,20);
  ground.addImage("grass",groundgrass);
  ground.scale=1;
  
  ground2 = createSprite(200,400,400,10);
  ground2.visible=false;
  
  sun = createSprite(450,50,20,20);
  sun.addImage(sunpic);
  sun.scale=0.6;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background("white");
  
  monkey.depth=ground.depth;
  monkey.depth=monkey.depth+1;
  
  monkey.collide(ground2);
  
  // adding gravity
  monkey.velocityY=monkey.velocityY+0.8;
  
  textSize(18);
  fill("black");
  textFont("Times New Roman");
  text("Score: "+score,200,50);
  fill("red");
  text("Survival Time: "+time,170,30);
  
  if (gamestate===PLAY) {
    ground.velocityX=-(3+time/100);
    
    // increasing survival time
    time=time+Math.round(getFrameRate()/60);
    
    // ground should come back to centre so that it seems endless
   if (ground.x<150) {
     ground.x=ground.width/2;
   }

    // making monkey jump
    if (keyDown("space")&&monkey.y>348) {
      monkey.velocityY=-20;
    }

    //console.log(monkey.y);

      //increasing score
    if (bananaGroup.isTouching(monkey)) {
      score=score+2;
      bananaGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      score=score-5;
      obstacleGroup.destroyEach();
    }
    
    obstacles();
    bananas();
    if (score<0) {
      gamestate=END;        
      ground.velocityX=0;
    }
  }

  if (gamestate===END) {
      monkey.velocityY=0;
    
      textFont("Lucida Console");
      textSize(40);
      fill("blue");
      text("GAME",180,120);
      text("OVER",180,170);
      fill("green");
      textSize(15);
      text("Click on the Sun to restart.",120,200);
    
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-100);
    
    if (mousePressedOver(sun)) {
      gamestate=PLAY;
      time=0;
      score=0;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
  }
  
  //clouds();
  drawSprites(); 
}

function obstacles() {
  if (frameCount%150===0) {
  obstacle = createSprite(500,355,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-(5+time/100);
  obstacle.lifetime=100;
  obstacleGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount%80===0) {
    banana = createSprite(500,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-(5+time/100);
    banana.scale=0.13; 
    bananaGroup.add(banana);
  }  
}
//function clouds() {
  //if (framecount%60===0) {
    //cloud = createSprite(500,50,20,20);
    //cloud.velocityX=-3;
    
    //var c = Math.round(random(1,3));
    //switch(c) {
      //case 1: cloud.addImage(cloud1);
        //break;
      //case 2: cloud.addImage(cloud2);
        //break;
      //case 3: cloud.addImage(cloud3);
        //break;
      //default: break;
    //}
  //}
//}




