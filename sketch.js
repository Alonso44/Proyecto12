var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var bomb,soda,coin,power,pow,add_coins;
var bombImg,coinImg,sodaImg,powerImg,powImg,add_coinsImg;
var coins = 0;

function preload(){
  //loadImage de path (camino)
  pathImg = loadImage("path.png");

  //loadAnimation de boy (niño)
  boyImg = loadAnimation("Jake1.png","Jake1.png","Jake2.png","Jake2.png","Jake3.png","Jake3.png","Jake4.png","Jake4.png","Jake5.png","Jake5.png");

  //Cargar objetos variados "potenciadores"
  sodaImg = loadImage("energyDrink.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
  powerImg = loadImage("power.png");
  powImg = loadImage("POW.png");
  add_coinsImg = loadImage("+1.png");
}

function setup(){
  
  createCanvas(480,700);

  //crear sprite de path (camino) 
  //agregar imagen de path
  path = createSprite(200,100,10,10);
  path.addImage("path",pathImg);
  path.scale = 1.2;
  path.y = path.width/2;

  barra = createSprite(200,650,600,5);
  barra.visible = false

  barra2 = createSprite(200,340,600,5);
  barra2.visible = false

  //crear sprite de boy (niño)
  //agregar animación para boy
  boy = createSprite(200,600,50,50);
  boy.addAnimation("boy_running",boyImg);
  boy.scale = 0.6;
    
  // crear  left Boundary (límite izquierdo)
  ////establecer visibilidad como false (falso) para límite izquierdo
  leftBoundary = createSprite(0,0,80,1800);
  leftBoundary.visible = false

  //crear right Boundary (límite derecho)
  //establecer visibilidad como false (falso) para límite izquierdo
  rightBoundary = createSprite(430,0,120,1800);
  rightBoundary.visible = false

  //Crear diversos sprites
  soda = createSprite(90,0,10,100);
  soda.addImage("soda",sodaImg);
  soda.scale = 0.08

  power = createSprite(90,580,10,10);
  power.addImage("power",powerImg);
  power.scale = 0.2
  power.visible = false

  coin = createSprite(200,0,10,100);
  coin.addImage("coin",coinImg);
  coin.scale = 0.2

  add_coins = createSprite(200,580,10,10);
  add_coins.addImage("coins",add_coinsImg);
  add_coins.scale = 0.2
  add_coins.visible = false

  bomb = createSprite(320,0,10,100);
  bomb.addImage("bomb",bombImg);
  bomb.scale = 0.1

  pow = createSprite(320,540,10,10);
  pow.addImage("POW",powImg);
  pow.scale = 0.2
  pow.visible = false

}

function draw() {
  background(0);

  textSize(20);
  stroke("white");
  text("Coins: "+coins,390,680)

  //Hacer que la pista sea un fondo en movimiento al darle velocidad Y.
  path.velocityY = 4;

  //Velocidad de diversos objetos
  soda.velocityY = 4.5;
  coin.velocityY = 6;
  bomb.velocityY = 3;

  // boy moviéndose en el eje X con el mouse
  boy.x = mouseX;

  edges= createEdgeSprites();
  boy.collide(edges[3]);

  // colisión de boy con los límites derecho e izquierdo invisibles 
  boy.collide(rightBoundary);
  boy.collide(leftBoundary);
  boy.collide(barra);

  //código para reiniciar el fondo
  if(path.y > 500 ){
    path.y = height/2;
  }
  
  //Codigos para "potenciadores"
  if(soda.collide(boy)){
    soda.destroy();
    boy.velocityY = -2
    power.visible = true
    power.velocityY = 2
   
  }

  if(power.collide(barra)){
    power.destroy();
  }

  if(boy.collide(barra2)){
    boy.velocityY = boy.velocityY + 0.8
  }

  if(coin.collide(boy)){
    coin.destroy();
    coins = coins + 1;
    add_coins.visible = true
    add_coins.velocityY = 2
  }

  if(add_coins.collide(barra)){
    add_coins.destroy();
  }

  if(bomb.collide(boy)){
    bomb.destroy();
    coins = coins - 1;
    pow.visible = true
    pow.velocityY = 4
  }

  if(pow.collide(barra)){
    pow.destroy();
  }


  drawSprites();
}
