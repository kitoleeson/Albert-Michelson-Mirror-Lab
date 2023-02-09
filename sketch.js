let balls = [];
let walls = [];
let mirrorCoords = [];

let rotateSpeed = 0; //θ per second
let nStart = 8; //# of sides
let nCurrent;

let x = 0;
let y = 0;
let y2 = 0;
let x2 = 800;
let ω = 0;
let D = 0;
let Dx = 0;
let Dy = 0;

function preload(){
  mate = loadFont("Mate-Regular.ttf");
}

function setup(){
  createCanvas(900, 600);
  background(0);
  
  //make n slider
  nSlider = createSlider(3, 18, nStart, 1);
  nSlider.position(10, 500);
  nSlider.style('width', '190px');
  
  //make rotating mirror
  createMirror(nStart);
  
  //make frequency slider
  frequencySlider = createSlider(0, 2*ω, ω, ω/8);
  frequencySlider.position(10, 40);
  frequencySlider.style('width', '190px');
  
  //add other walls
  addWalls();
}

function draw(){
  background(0);

  //draw framing
  if(nCurrent != nSlider.value()){
    createMirror(nSlider.value());
    frequencySlider.remove();
    frequencySlider = createSlider(0, 2*ω, ω, ω/8);
    frequencySlider.position(10, 40);
    frequencySlider.style('width', '190px');
  }
  drawRotatingMirror();
  drawMath();

  //update walls
  for(let wall of walls) wall.update();
  
  //draw path
  stroke("pink");
  strokeWeight(1);
  drawingContext.setLineDash([5, 10]);
  line(x, y, x, height);
    line(x, y, x2, y);
    line(x2, y, x2, y2);
    line(x, y2, x2, y2);
  line(x, 0, x, y2);
  drawingContext.setLineDash([]);

  //draw button
  rectMode(CORNERS);
  textAlign(CENTER, CENTER);
  let inButton = (x, y) => x > 745 && x < width-10 && y > 470 && y < height-10;
  if(inButton(mouseX, mouseY)) fill("pink");
  rect(745, 470, width-10, height-10, 10);
  if(inButton(mouseX, mouseY)){
    fill(0);
    stroke(0);
  }
  text("FIRE!", 818, 530);
  
  //update balls
  let inCanvas = (a) => a.x > 0 && a.x < width && a.y > 0 && a.y < height;
  for(let ball of balls){ //update position
    ball.update();
    ball.bounce();
  }
  for(i=0;i<balls.length;i++) if(balls[i].rad <= 0 || !inCanvas(balls[i].pos)){ //kill ball
    balls.splice(i, 1);
    i--;
  }
  
  //reset mirror
  if(!balls.length) resetMirror(nSlider.value());
}

function drawMath(){
  //text
  textFont(mate);
  textSize(15);
  noStroke();
  
  //titles
  fill(255);
  textAlign(LEFT, TOP);
  let a = frequencySlider.value().toFixed(2);
  text("Mirror Angular Velocity: (rad/s)", 10, 15);
  let b = nSlider.value();
  text("Mirror Side Count:", 10, 475);
  let c = D.toExponential(2);
  text("Total Distance: (m)", 260, 475);

  
  //maths
  textSize(13);
  textAlign(CENTER, CENTER);
  text(a + " rad", 45, 85);
  text("s", 55, 100);
  text("2π rot", 110, 85);
  text("1 rad", 110, 100);
  fill("teal");
  text("= " + (a*TWO_PI).toFixed(2) + " Hz", 165, 93);
  fill("orange");
  textAlign(LEFT, CENTER);
  text("D = Dx + Dy", 300, 515);
  text("D = " + Dx.toExponential(2) + " + " + Dy.toExponential(2), 300, 530);
  text("D = " + c + " m", 300, 545);
  // text("D = " + , 300, 515); this is where you are. find D to make c = 3.00 E8
  fill("purple");
  textSize(20);
  text("n = " + b, 75, 545);

  //full maths
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("v =", 280, 35);
  text("d", 300, 25);
  text("t", 300, 45);

  text("c =", 365, 35);
  text("d", 385, 25);
  text("t", 385, 45);

  text("c =", 450, 35);
  fill("orange");
  text("D", 475, 25);
  text("D", 510, 35);
  text("(" + c + ")", 740, 35);
  textSize(10);
  fill("purple");
  text(1, 470, 42);
  text("n", 470, 51);
  textSize(14);
  text("n", 521, 35);
  text("(" + b + ")", 775, 35);
  fill("teal");
  text("T", 480, 46);
  text("f", 528, 35);
  text("(" + a + ")", 800, 35);
  fill(255);
  text("=", 495, 35);
  text("=", 705, 35);
  textAlign(LEFT, CENTER);
  text("= 299 792 458 m/s", 702, 65);
  text("= " + (300000000).toExponential(2), 702, 95);

  textAlign(LEFT, CENTER);
  fill("orange");
  text("tunnel distance: D = " + c + " m", 270, 85);
  fill("purple");
  text("number of sides: n = " + b, 270, 100);
  fill("teal");
  text("frequency: f = " + (a*TWO_PI).toFixed(2) + " Hz", 270, 115);

  //lines
  // textFont('sans-serif');
  stroke(255);
  strokeWeight(1);
  line(20, 95, 70, 95);
  line(90, 95, 130, 95);
  circle(80, 95, 2);
  line(300-5, 38, 300+5, 38);
  line(385-5, 38, 385+5, 38);
  line(475-10, 38, 475+10, 38);
  stroke("purple");
  line(470-3, 49, 470+3, 49);

  //labels
  stroke("orange");
  fill("orange");
  line(x, 380, width-100, 380);
  line(x, 370, x, 390);
  line(width-100, 370, width-100, 390);
  text("Dx", 490, 365);
  line(x2+50, y, x2+50, y2);
  line(x2+40, y, x2+60, y);
  line(x2+40, y2, x2+60, y2);
  text("Dy", x2+60, 300);
  stroke("teal");
  strokeWeight(3);
  noFill();
  arc(200, 300, 175, 175, PI, 3 * HALF_PI);
  drawArrow(createVector(113, 300), createVector(0, 1), "teal");
}

function addWalls(){
  let s = 12.1;

  //end mirrors
  walls.push(new Wall(x2-25, y+25, x2+25, y-25, true, false));
  walls.push(new Wall(x2-25, y2-25, x2+25, y2+25, true, false));

  //bottom line
  walls.push(new Wall(0, 460, x-s, 460, false, false));
  walls.push(new Wall(x+s, 460, width, 460, false, false));

  //bottom tunnel
  walls.push(new Wall(x-s, 460, x-s, height, false, false));
  walls.push(new Wall(x+s, 460, x+s, height, false, false));

  //top line
  walls.push(new Wall(0, 140, x-s, 140, false, false));
  walls.push(new Wall(x+s, 140, width, 140, false, false));

  //top tunnel
  walls.push(new Wall(x-s, 0, x-s, 140, false, false));
  walls.push(new Wall(x+s, 0, x+s, 140, false, false));
}

function drawRotatingMirror(){
  //update mirror coordinates
  for(let coord of mirrorCoords) rotateCoordinate(coord, rotateSpeed);
  for(i=0;i<mirrorCoords.length-1;i++) walls[i].set(mirrorCoords[i].x, mirrorCoords[i].y, mirrorCoords[i+1].x, mirrorCoords[i+1].y);
  walls[mirrorCoords.length-1].set(mirrorCoords[mirrorCoords.length-1].x, mirrorCoords[mirrorCoords.length-1].y, mirrorCoords[0].x, mirrorCoords[0].y);
  
  //fill in shape
  noStroke();
  fill(124, 0, 124, 100);
  beginShape();
  for(let coord of mirrorCoords) vertex(coord.x, coord.y);
  endShape(CLOSE);
}

function createMirror(n){
  walls = [];
  nCurrent = n;
  for(i=0;i<n;i++) walls.push(new Wall(0, 0, width, 0, true, false, "purple"));
  resetMirror(n);

  //find next wall
  let min = 359;
  let index = 0;
  for(i=0;i<walls.length;i++){
    let d = round(degrees(walls[i].perpVector.heading()));
    if(d - 135 < min && d - 135 != 0 && d - 135 > 0){
      min = d - 135;
      index = i;
    }
  }
  
  //find speed
  d = dist(x, y, x2, y) + dist(x2, y, x2, y2) + dist(x, y2, x2, y2);
  let t = d/15;
  let θ = degrees(p5.Vector.mult(walls[index].perpVector, createVector(-1, -1)).heading()) + 45;
  ω = θ/t;

  //find distances
  let k = (x2-x)/(y-(height-y));
  Dy = 299792458 / ((nSlider.value()) * (ω) * ((2*k) + 1));
  Dx = k*Dy;
  D = 2 * Dx + Dy;

  addWalls();
}

function resetMirror(n){
  //reset mirror coords
  mirrorCoords = [];
  for (i = 0; i < n; i++) mirrorCoords.push(createVector(cos((TWO_PI / n) * i) * 50, sin((TWO_PI / n) * i) * 50));
  for(let coord of mirrorCoords) coord.add(200, 300);

  //rotate mirror for HALF_PI angle
  let theta = (PI * (n - 2)) / n;
  theta = (PI - theta) / 2;
  theta = QUARTER_PI - theta;
  for(let coord of mirrorCoords) rotateCoordinate(coord, degrees(-theta));

  //make mirror walls
  for(i=0;i<mirrorCoords.length-1;i++) walls[i].set(mirrorCoords[i].x, mirrorCoords[i].y, mirrorCoords[i+1].x, mirrorCoords[i+1].y);
  walls[i].set(mirrorCoords[mirrorCoords.length-1].x, mirrorCoords[mirrorCoords.length-1].y, mirrorCoords[0].x, mirrorCoords[0].y);
  for(let wall of walls) wall.update();
  x = walls[0].midPoint.x;
  y = walls[0].midPoint.y;
  y2 = height - y;

  //reset rotateSpeed
  rotateSpeed = 0;
}

let rotateCoordinate = (c, a) => {
  let radians = (Math.PI / 180) * a,
  cos = Math.cos(radians),
  sin = Math.sin(radians),
  nx = (cos * (c.x - 200)) + (sin * (c.y - 300)) + 200,
  ny = (cos * (c.y - 300)) - (sin * (c.x - 200)) + 300;
  c.set(nx, ny);
}

let isBallHitWall = (ballPos, ballRad, wallP1, wallP2) => { //based off of: https://www.jeffreythompson.org/collision-detection/line-circle.php
  let pointCircle = (p, c, r) => Math.sqrt( Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2) ) <= r;
  
  let linePoint = (wp1, wp2, p) => {
    let d1 = Math.sqrt( Math.pow(wp1.x - p.x, 2) + Math.pow(wp1.y - p.y, 2) );
    let d2 = Math.sqrt( Math.pow(wp2.x - p.x, 2) + Math.pow(wp2.y - p.y, 2) );
    let len = Math.sqrt( Math.pow(wp1.x - wp2.x, 2) + Math.pow(wp1.y - wp2.y, 2) );
    let buff = 0.1;
    if( (d1 + d2 >= len - buff) && (d1 + d2 <= len + buff) ) return true;
    return false;
  }

  let inside1 = pointCircle(wallP1, ballPos, ballRad);
  let inside2 = pointCircle(wallP2, ballPos, ballRad);
  if(inside1 || inside2) return true;
  
  let distX = wallP1.x - wallP2.x;
  let distY = wallP1.y - wallP2.y;
  let len = Math.sqrt( Math.pow(distX, 2) + Math.pow(distY, 2) );
  
  let dot = ( ((ballPos.x - wallP1.x) * (wallP2.x - wallP1.x)) + ((ballPos.y - wallP1.y) * (wallP2.y - wallP1.y)) ) / Math.pow(len, 2);
  
  let closestX = wallP1.x + (dot * (wallP2.x - wallP1.x));
  let closestY = wallP1.y + (dot * (wallP2.y - wallP1.y));
  let closest = createVector(closestX, closestY);
  
  let onSegment = linePoint(wallP1, wallP2, closest);
  if(!onSegment) return false;
  
  distX = closestX - ballPos.x;
  distY = closestY - ballPos.y;
  let distance = sqrt( sq(distX) + sq(distY) );

  if(distance <= ballRad) return true;
  return false;
}

let drawArrow = (base, vec, myColor) => {
  push();
  stroke(myColor);
  strokeWeight(2);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function keyPressed(){
  if(key === " ") balls.push(new Ball(x, 550, 0, -15));
  if(key === "c") balls = [];
}

function mousePressed(){
  print(mouseX + "," + mouseY);
  let inButton = (x, y) => x > 745 && x < width-10 && y > 470 && y < height-10;
  if(inButton(mouseX, mouseY)) balls.push(new Ball(x, 550, 0, -15));
}