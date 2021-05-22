const maxdim = 800;
const bg = 255;
const easer = (target, value, factor) => {return (target - value) * factor};
let easeFactor = 0.05;
let numBops = 8;
let bopDim = 50;
let bopArray = [];


function setup () {
  createCanvas(maxdim,maxdim);
  noStroke();
  for (let i = 0; i < numBops; i++) {
    bopArray[i] = new Bop(createVector(i*bopDim + 100, i*bopDim + 100), createVector(random(-3, 3), random(-3,3)), random(bopDim/2, bopDim*2), random(0,180));
  }
  for (let i = 0; i < bopArray.length; i++) {
    bopArray[i].others = bopArray.slice().filter(obj => obj != bopArray[i]);
  }
}


function draw () {
  background(bg);
  for (let i = 0; i < bopArray.length; i++) {
    bopArray[i].display();
    bopArray[i].collideElastic();
    bopArray[i].move();
  }
}

//Bop class -> position and velocity are P5.vectors

function Bop(posV_, velV_, dim_, c_, status_ = 'active', others_ = []) {
  this.posV = posV_,
  this.velV = velV_,
  this.dim = dim_,
  this.c = c_,
  this.status = status_,
  this.others = others_,
  this.tdim = dim_,
  this.r = dim_/2,
  //Bop methods
  this.display = function () {
    if (this.status == 'active') {
      fill(this.c);
      ellipse(this.posV.x, this.posV.y, this.dim, this.dim);
    } else if (this.status == 'inactive') {
      fill(bg);
      ellipse(this.posV.x, this.posV.y, this.dim, this.dim);
    } else if (this.status == 'transition') {
      fill(this.c);
      ellipse(this.posV.x, this.posV.y, this.dim, this.dim);
      this.dim += easer(this.tdim, this.dim, easeFactor);
      if (abs(this.tdim - this.dim) < 0.001) {
        this.dim = this.tdim;
        this.status = 'active';
      }
    }
  },
  this.move = function () {
    this.posV.add(this.velV);
    if (this.posV.x < this.tdim || this.posV.x > maxdim - this.tdim) {
      this.velV.x *= -1;
    }
    if (this.posV.y < this.tdim || this.posV.y > maxdim - this.tdim) {
      this.velV.y *= -1;
    }
  },
  this.collideElastic = function () {
    for (let i=0; i < this.others.length; i++) {
      let dist = this.posV.dist(this.others[i].posV);
      let dy = this.others[i].posV.y - this.posV.y;
      let dx = this.others[i].posV.x - this.posV.x;
      let phi = atan(dy/dx);
      if (dx == 0) {phi = HALF_PI};
      let thisVtheta = this.velV.heading();
      let otherVtheta = this.others[i].velV.heading();
      let thisVi = this.velV;
      let otherVi = this.others[i].velV;
      let vels = collide2DVel(this.dim, thisVi, this.others[i].dim, otherVi, thisVtheta, otherVtheta, phi);
      let thisVxf = vels[0];
      let thisVyf = vels[1];
      let otherVxf = vels[2];
      let otherVyf = vels[3];
      let thisnextX = this.posV.x + thisVxf;
      let othernextX = this.others[i].posV.x + otherVxf;
      let thisnextY = this.posV.y + thisVyf;
      let othernextY = this.others[i].posV.y + otherVyf;
      if (thisnextX < this.tdim) {
        thisnextX = this.tdim;
        thisVxf *= -1;
      }
      if (thisnextX > maxdim - this.tdim) {
        thisnextX = maxdim - this.tdim;
        thisVxf *= -1
      }
      if (othernextX < this.others[i].tdim) {
        othernextX = this.others[i].tdim;
        otherVxf *= -1;
      }
      if (othernextX > maxdim - this.tdim) {
        othernextX = maxdim - this.others[i].tdim;
        otherVxf *= -1;
      }
      if (thisnextY < this.tdim) {
        thisnextY = this.tdim;
        thisVyf *= -1;
      }
      if (thisnextY > maxdim - this.tdim) {
        thisnextY == maxdim - this.tdim;
        thisVyf *= -1;
      }
      if (othernextY < this.others[i].tdim) {
        othernextY = this.others[i].tdim;
        otherVyf *= -1;
      }
      if (othernextY > maxdim - this.tdim) {
        othernextY = maxdim - this.others[i].tdim;
        otherVyf *= -1;
      }

      if (abs(dist) < (this.r + this.others[i].r)) {
        this.posV.x = thisnextX;
        this.posV.y = thisnextY;
        this.others[i].posV.x = othernextX;
        this.others[i].posV.y = othernextY;
        this.velV.x = thisVxf;
        this.velV.y = thisVyf;
        this.others[i].velV.x = otherVxf;
        this.others[i].velV.y = otherVyf;
      }
    }
  }
}

function collide1DVel(mA, vA, mB, vB) {
  return ((mA-mB)/(mA+mB))*vA + ((2*mB)/(mA+mB))*vB;
}

function collide2DVel(mA, vA, mB, vB, thetaA, thetaB, phi) {
  let results = [];
  let vAmag = vA.mag();
  let vBmag = vB.mag();
  let vAxrot = vAmag*cos(thetaA - phi);
  let vAyrot = vAmag*sin(thetaA - phi);
  let vBxrot = vBmag*cos(thetaB - phi);
  let vByrot = vBmag*sin(thetaB - phi);
  let vAxrotf = collide1DVel(mA, vAxrot, mB, vBxrot);
  let vBxrotf = collide1DVel(mB, vBxrot, mA, vAxrot);
  let vAxf = vAxrotf*cos(phi) + vAyrot*cos(phi + HALF_PI);
  let vAyf = vAxrotf*sin(phi) + vAyrot*sin(phi + HALF_PI);
  let vBxf = vBxrotf*cos(phi) + vByrot*cos(phi + HALF_PI);
  let vByf = vBxrotf*sin(phi) + vByrot*sin(phi + HALF_PI);
  results = [vAxf, vAyf, vBxf, vByf];
  return results;
}
