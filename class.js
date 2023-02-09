class Ball{

constructor(x, y, vx, vy){
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.rad = 10;
}

update(){
    this.pos.add(this.vel);
    fill(255, 100);
    stroke(255);
    strokeWeight(2);
    circle(this.pos.x, this.pos.y, this.rad);
    if(this.vel.mag() > 0) drawArrow(this.pos, p5.Vector.mult(this.vel, 5), "blue");
    if(this.rad < 10) this.rad -= 0.2;
    let isNear = (a, b) => abs(a-b) <= 20;
    let isClose = (a, b) => abs(a-b) <= 5;
    let v = degrees(this.vel.heading());
    if(isNear(this.pos.x, x) && isClose(abs(v), 90) && this.pos.x != x){
        this.pos.x = x;
        this.vel.setHeading(3 * PI / 2);
    }
    if(isNear(this.pos.y, y) && (isClose(v, 0) || isClose(abs(v), 180)) && this.pos.y != y) this.pos.y = y;
    if(isNear(this.pos.y, height-y) && (isClose(v, 0) || isClose(abs(v), 180)) && this.pos.y != y) this.pos.y = height-y;
}

bounce(){
    //calculate closest bouncy wall midpoint to ball center
    let closeIndex = i;
    let smallest = createVector(width, height);
    for(i=0;i<walls.length;i++){
        let between = p5.Vector.sub(walls[i].midPoint, this.pos);
        if(between.mag() < smallest.mag() && walls[i].bounce){
            closeIndex = i;
            smallest.set(between.x, between.y);
        }
    }

    //if(isBallHitWall()) on that wall and the ball's position => bounce
    let wall = walls[closeIndex];
    if(isBallHitWall(this.pos, this.rad, wall.p1, wall.p2)){
        let theta = -radians( round(degrees( wall.wallVector.heading() )) );
        let vel = [this.vel.x, this.vel.y];
        let rotMtx = [ [cos(theta), sin(theta)],
                        [-sin(theta), cos(theta)] ];
        let vel_ = math.multiply(vel, rotMtx);
        vel_[1] = -vel_[1];
        rotMtx = [ [cos(TWO_PI - theta), sin(TWO_PI - theta)],
                    [-sin(TWO_PI - theta), cos(TWO_PI - theta)] ];
        vel = math.multiply(vel_, rotMtx);
        this.vel.x = vel[0];
        this.vel.y = vel[1];
        rotateSpeed = frequencySlider.value();
        wall.colIntensity = 255;
    }

    //check for hit non-bouncy walls
    for(let wall of walls) if(isBallHitWall(this.pos, this.rad, wall.p1, wall.p2) && !wall.bounce){
        this.vel.set(0, 0);
        this.rad--;
    }
}

}

class Wall {

    constructor(x1, y1, x2, y2, isBouncy=true, normalArrow=true, colour=255){
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
        this.bounce = isBouncy;
        this.col = colour;
        this.normalArrow = normalArrow;
        this.wallVector;
        this.colIntensity = 0;
        this.midPoint;
        this.id = walls.length;
        this.angle;
        this.perpVector;
    }

    update(){
        //draw wall
        strokeWeight(2);
        stroke(this.col);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        stroke(255, 0, 0, this.colIntensity);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

        //update angle values
        this.updateAngles();
        this.wallVector = p5.Vector.sub(this.p2, this.p1);

        //draw arrow
        if(this.normalArrow) this.drawNormalArrow();

        this.colIntensity -= 5;
    }

    set(x1, y1, x2, y2){
        this.p1.set(x1, y1);
        this.p2.set(x2, y2);
    }

    setArrow(a){
        this.normalArrow = a;
    }

    updateAngles(){
        this.angle = createVector(1, 0).angleBetween(p5.Vector.sub(this.p2, this.p1));
        this.perpVector = createVector(35, 0).setHeading(this.angle + HALF_PI);
        this.midPoint = p5.Vector.sub(this.p1, this.p2);
        this.midPoint.div(2);
        this.midPoint.add(this.p2);
    }

    drawNormalArrow(){
        drawArrow(this.midPoint, p5.Vector.mult(this.perpVector, createVector(-1, -1)), this.col);
        drawArrow(this.midPoint, p5.Vector.mult(this.perpVector, createVector(-1, -1)), color(255, 0, 0, this.colIntensity));
    }

}