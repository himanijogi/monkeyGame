
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,life
var invisibleground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 forestImage = loadImage("ff.jpg");
}



function setup() {
  createCanvas(500,400)
background=createSprite(200,200,1000,1000)
  background.addAnimation("ff",forestImage)
  background.scale=1.5
  background.velocityX=-8
  monkey=createSprite(50,320,30,30)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  invisibleground=createSprite(200,340,700,10)
  invisibleground.visible=false
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  life=3
  score=0
  
}


function draw() {
//background("blue")
   background.velocityX=-2
  if(background.x<40){
    background.x=200
  }
 monkey.gravity=8
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleground) 
  if(keyDown("space")&&monkey.y >= 270){
    monkey.velocityY=-20      
    
  }
  
 if (obstacleGroup.isTouching(monkey)){
   monkey.scale=monkey.scale-0.02; 
   obstacleGroup.destroyEach();
   life=life-1
  } 
  
  if (FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
    monkey.scale=monkey.scale+0.02;
  } 
  background.depth = score.depth;
    score.depth = score.depth + 5;
  
   textSize(30);
  stroke("green");
  fill("white");
 
  if(life===0){
   obstacleGroup.destroyEach(0,0)
 FoodGroup.destroyEach(0,0) 
  background.velocityX=0
  //monkey.destroyeach(0,0)
  text("gameOver",200,200)
    
  }
  
  food()
  obstacles();
 drawSprites();
  text("SCORE : "+score,50,50); 
  text("life : "+life,50,100);
  if(life===0){
   obstacleGroup.destroyEach(0,0)
 FoodGroup.destroyEach(0,0) 
  background.velocityX=0
  monkey.setVelocity(0,0)
  text("gameOver",200,200)
    
  }
  
}

function food(){
  if(frameCount%100===0){    

 var banana=createSprite(500,165,10,40); 
   banana.y= Math.round(random(120,200));
  banana.velocityX = -3;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifetime=200;
 FoodGroup.add(banana);   
  }
  
}

function obstacles(){
   if (frameCount % 300=== 0){
   var obstacle = createSprite(500,330,10,40);
    obstacle.velocityX = -3;
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.1;
     obstacle.lifetime=200;
     
     obstacleGroup.add(obstacle);
   }
}


function reset(){
  
  obstacleGroup.destroyEach(0,0)
 FoodGroup.destroyEach(0,0) 
 // background.destroyEach(0,0)
  monkey.destroy
  text("gameOver",200,200)
  
}

