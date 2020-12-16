var monkey, monkeyrunning,collided;
var bg, ground, bgImage;
var bananaimg, stoneimg, bananaGroup, stoneGroup;
var count;
var stop, state, play;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  collided = loadImage("Monkey_02.png");
  bgImage = loadImage("jungle.jpg")
  bananaimg=loadImage("banana.png");
  stoneimg=loadImage("stone.png");
  
  collided = loadImage("Monkey_10.png");
}

function setup() {
  createCanvas(700, 400);
  
  state = play
  
  count=0;
  
  monkey = createSprite(50,350);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("collided",collided);
  monkey.scale=0.1;

  bg = createSprite(200,180,400,20);
  bg.addImage("ground",bgImage);
  bg.x = bg.width/2;
  bg.velocityX = -3;
  
  ground = createSprite(350,405,700,10);
  ground.visible = false;
    
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  stroke("red");
  textSize(20);
  fill("red");
  textStyle("bold");
}

function draw() {
  background(220);
  
  monkey.depth = monkey.depth + 1;
  monkey.collide(ground);
  monkey.velocityY += 0.75;
  
  if(state===play){
    
    if(keyDown("space") & monkey.y > 368) {
      monkey.velocityY = -15;
    }
  
    if (bg.x < 200){
      bg.x = bg.width/2;
    }
    
    spawnStones();
    spawnBananas();
  

  for(var i = 0; i < bananaGroup.length; i++){
    if(bananaGroup.get(i).isTouching(monkey)){
      bananaGroup.get(i).destroy();
      count += 2;
      monkey.scale += 0.025;
    }
  }
 
  for(var i = 0; i < stoneGroup.length; i++){
    if(stoneGroup.get(i).isTouching(monkey) & count >= 1){
      count -= 1;
      monkey.scale = 0.1;
    }
  }
  
  for(var i = 0; i < stoneGroup.length; i++){
    if(stoneGroup.get(i).isTouching(monkey) & count === 0){
      state = stop;
    }
  }
    
}
  
  if(state === stop){
    monkey.changeImage("collided",collided);
    
    bg.velocityX = 0;
    
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  text("bananas: "+ count,550,50);
}

function spawnStones() {
  if(frameCount % 100 === 0) {
    var stone = createSprite(700,375);
    stone.addImage("obstacle",stoneimg);
    stone.velocityX = -4.5;          
    stone.lifetime = 180;
    stone.scale=0.15;
    stone.setCollider("circle",-20,20,220);
    stoneGroup.add(stone);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var banana = createSprite(700);
    banana.y = Math.round(random(150,250));
    banana.addImage("food",bananaimg);
    banana.velocityX = -5;
    banana.lifetime = 150;
    banana.scale=0.09;
    banana.setCollider("rectangle",0,0,1000,500);
    bananaGroup.add(banana);
  }
}