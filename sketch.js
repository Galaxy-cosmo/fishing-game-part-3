var boy,boyImg;
var fish1,fish1Img,fish1Grp;
var fish2,fish2Img,fish2Grp;
var fish3,fish3Img,fish3Grp;
var enemy,enemyGrp;
var edges;
var score=0;
var shark1Img,shark2Img;
var gameState='play';
var edges;
var sound;

function preload(){
  boyImg = loadAnimation("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png");
  boyImg2=loadAnimation("images/boy1.png")
  fish1Img=loadAnimation("images/fish1.png","images/fish2.png","images/fish3.png");
  fish2Img=loadAnimation("images/blue1.png","images/blue2.png","images/blue3.png","images/blue4.png","images/blue5.png")
  fish3Img=loadAnimation("images/silver1.png","images/silver2.png","images/silver3.png","images/silver4.png","images/silver5.png")
  shark1Img=loadAnimation('images/shark1.png','images/shark2.png','images/shark3.png','images/shark4.png');
  shark2Img=loadAnimation('images/shark5.png','images/shark6.png','images/shark7.png','images/shark8.png');
  sound = loadSound('bubbles.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  boy=createSprite(400, 200, 50, 50);
  boy.addAnimation("boy2",boyImg2)
  boy.addAnimation("boy",boyImg)
  boy.scale=0.4;
  boy.setCollider("rectangle",0,0,230,350)

  fish1Grp=new Group();
  fish2Grp=new Group();
  fish3Grp=new Group();
  enemyGrp=new Group();
  
  edges = createEdgeSprites();
  sound.loop();
}

function draw() {
  background(37,255,255);  

  textSize(30);
  fill("black");
  text("Score: "+score,50,50)
  text('Beware of Sharks to earn more points!',windowWidth/2-280,50);
  boy.collide(edges[0]);
  boy.collide(edges[1]);
  boy.collide(edges[2]);
  boy.collide(edges[3]);
  

  if(gameState==='play'){

    if(keyDown("right")){
      boy.x=boy.x+5;
      boy.changeAnimation("boy",boyImg)
    }
    
    if(keyDown("left")){
      boy.x=boy.x-5;
      boy.changeAnimation("boy",boyImg)
    }

    if(keyDown("up")){
      boy.y=boy.y-5;
      boy.changeAnimation("boy",boyImg)
    }
    
    if(keyDown("down")){
      boy.y=boy.y+5;
      boy.changeAnimation("boy",boyImg)
    }
    
    if(keyWentUp("left")||keyWentUp("right")||keyWentUp("up")||keyWentUp("down")){
      boy.changeAnimation("boy2",boyImg2)
    }

    spawnFish1();
    spawnFish2();
    spawnFish3();
    spawnEnemy();

    for(var i=0;i<fish1Grp.length;i++){
      if(fish1Grp.get(i).isTouching(boy)){
        fish1Grp.get(i).destroy();  
        score=score+3
      }
    }
    for(var i=0;i<fish2Grp.length;i++){
      if(fish2Grp.get(i).isTouching(boy)){
        fish2Grp.get(i).destroy();
        score=score+5  
      }
    }
    for(var i=0;i<fish3Grp.length;i++){
      if(fish3Grp.get(i).isTouching(boy)){
        fish3Grp.get(i).destroy(); 
        score=score+1 
      }
    }

    if(enemyGrp.isTouching(boy)){
      gameState='end'
    }
  }
  if(gameState==='end'){
    fill('black')
    strokeWeight(4)
    stroke('yellow')
    textSize(50);
    text('Game Over!',windowWidth/2-150,windowHeight/2-100);
    text("Press 'R' to Restart the Game!",windowWidth/2-350,windowHeight/2);
    boy.changeAnimation("boy2",boyImg2);
    fish1Grp.destroyEach();
    fish2Grp.destroyEach();
    fish3Grp.destroyEach();
    enemyGrp.destroyEach();
    sound.stop();

    if(keyDown('r')){
      reset();
    }
  }

  drawSprites();
}

function reset(){
  gameState='play';
  score=0;
}

function spawnFish1(){
   if(World.frameCount%150===0){
     var fish1 = createSprite(windowWidth+10,300);
     fish1.addAnimation("fish1",fish1Img);
     fish1.velocityX = -5;
     fish1.scale=0.2
     fish1.y=random(100,600);
     fish1.setCollider("rectangle",0,0,200,50)
     fish1Grp.add(fish1)
   }
}

function spawnFish2(){
  if(World.frameCount%173===0){
    var fish2 = createSprite(0,300);
    fish2.addAnimation("fish2",fish2Img);
    fish2.velocityX = +5;
    fish2.scale=0.15
    fish2.y=random(100,600)
    fish2.setCollider("rectangle",0,0,200,50)
    fish2Grp.add(fish2)
    
  }
}

function spawnFish3(){
  if(World.frameCount%200===0){
    var fish3 = createSprite(windowWidth+10,300);
    fish3.addAnimation("fish3",fish3Img);
    fish3.velocityX = -5;
    fish3.scale=0.2
    fish3.y=random(100,600);
    fish3.setCollider("rectangle",0,0,200,50)
    fish3Grp.add(fish3)
  
  }
}

function spawnEnemy(){
  if(World.frameCount%250===0){
    var enemy = createSprite(windowWidth+10,300,10,10);
    
    var position=Math.round(random(1,2))
    if(position===1){
      enemy.x = windowWidth+10
      enemy.velocityX = -8;
      enemy.addAnimation("enemy1",shark1Img);
    }
    else{
      enemy.x = 0
      enemy.velocityX = 8;
      enemy.addAnimation("enemy2",shark2Img);
    }
    
    enemy.scale=0.4
    enemy.y=random(100,600);
    //enemy.setCollider("rectangle",0,0,200,50)
    enemyGrp.add(enemy)
    
  
  }
}