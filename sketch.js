var towerImg,tower;
var ghostImg,ghost;
var doorImg,door;
var climberImg,climber,invClimber;
var doorGp;
var climberGp,inClGp;
var spooky;
var gameState = "PLAY";

function preload(){
  towerImg = loadImage("tower.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  spooky = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.35;
  // ghost.velocityY = 0.5;
  
  doorGp = new Group();
  climberGp = new Group();
  inClGp = new Group();
}
function draw(){
  background("white");
  spooky.loop();
  
  if(gameState === "PLAY"){
    if(tower.y > 600){
      tower.y = 300;
    }
    spawnDoors();

    if(climberGp.isTouching(ghost)){
      ghost.velocity = 0;
    }
    if(inClGp.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "END";
    }

    if(keyDown("SPACE")){
      ghost.y -= 5;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x += 5;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 5;
    }
      drawSprites();
  }
  if(gameState === "END"){
    background("black")
    textSize(20)
    text("GAME OVER",300,300)
  }

}

function spawnDoors(){
  if(frameCount % 150 === 0){
    door = createSprite(Math.round(random(120,400),30));
    door.addImage("door", doorImg);
    door.velocityY = 3;
    door.lifetime = 700;
    doorGp.add(door);
    climber = createSprite(200,50);
    climber.addImage("climber", climberImg);
    climber.velocityY = 3;
    climber.x = door.x;
    climber.lifetime = 700;
    climberGp.add(climber);
    invClimber = createSprite(climber.x, climber.y+10,80,10);
    invClimber.visible = false;
    invClimber.velocityY = 3
    inClGp.add(invClimber);
  }
}