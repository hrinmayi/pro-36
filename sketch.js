var dog,happyDog,database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood,foodObj;
var readState,changeState;
var bedRoom,deadDog,dogVaccination,FoodStock,garden,injection,lazy,livingRoom,milk,run,runleft,vaccine,washroom;

function preload()
{
happyDog=loadImage("images/dogImg.png");
dogimg1=loadImage("images/dogImg1.png");
milk=loadImage("images/Milk.png");
bedRoom=loadImage("images/Bed Room.png");
deadDog=loadImage("images/deadDog.png");
dogVaccination=loadImage("images/dogVaccination.png");
foodStock=loadImage("images/Food Stock.png");
garden=loadImage("images/Garden.png");
injection=loadImage("images/injection.png");
lazy=loadImage("images/Lazy.png");
livingRoom=loadImage("images/Living Room.png");
run=loadImage("images/running.png");
runleft=loadImage("images/runningleft.png");
vaccine=loadImage("images/Vaccination.png");
washroom=loadImage("images/Wash Room.png");

}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(800,800);
dog=createSprite(600,400,5,5);
dog.addImage(dogimg1);
dog.scale=0.15;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
   lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  

}


function draw() {  
background(46,139,87);
}
// fill("white");
  //textSize(15);
//text("Note: Press 'UP_ARROW' to feed the Dog milk",30,790);

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(deadDog);
}

currentTime=hour();
if(currentTime===(lastFed+1)){
  update("Playing")
  foodObj.garden();
}else if (currentTime===(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  } else
  {
    x=x-1
  }

database.ref('/').update({
  Food:x
})
}

function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
  dog.addimage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function update(state){
database.ref('/').update({
  gameState:state
});
}
