// To understand why my life has been chaos, I've started a journey into chaos theory
// This is the Ikeda Map, a chaos attractor that can be created using a stretch-twist algorithm
// At these parameters, the attractor looks like an embryo
// Indeed, chaos is the root of life.
// KM, 6/11/21


const MAXDIM = 800;
const MAXGRID = 20;
let maxpts = 1000;
let ptlist = [];

//synapse => u=0.918

function setup() {
  createCanvas(MAXDIM, MAXDIM);
  for (let i = 0; i < maxpts; i++) {
    ptlist[i] = new Ikeda (random(0, MAXDIM), random(0,MAXDIM), 0.915, 255);
  }

}

function draw() {
  background (0);
  for (let i = 0; i < ptlist.length; i++) {
    ptlist[i].display();
    ptlist[i].advance();
  }

}

function Ikeda (x_, y_, u_, col_) {
  this.x = x_,
  this.y = y_,
  this.u = u_,
  this.col = col_,
  this.history = [],
  this.iter = 0,
  // Methods
  this.display = function () {
    for (let i = 0; i < this.history.length; i++) {
      let locV = this.history[i];
      stroke(255, 245, 189,20);
      point(locV.x, locV.y);
      if (this.history.length > 0 && i < this.history.length - 2) {
        let nextV = this.history[i+1];
        line(locV.x, locV.y, nextV.x, nextV.y);
      }

    }
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, 1, 1);
  },
  this.advance = function () {
    let x = toGrid_x (this.x, MAXGRID);
    let y = toGrid_y (this.y, MAXGRID);
    let t = calcT (this.x, this.y);
    let xinterm = x*cos(t) - y*sin(t);
    let yinterm = x*sin(t) + y*cos(t);
    let xng = 1 + this.u * xinterm;
    let yng = this.u * yinterm;
    let xnew = toPoint_x(xng, MAXGRID);
    let ynew = toPoint_y(yng, MAXGRID);
    this.iter += 1;
    if (this.iter > 300) {
      return;
    } else {
      this.x = xnew;
      this.y = ynew;

      let pos = createVector(this.x, this.y);
      this.history.push(pos);
    }
  }
}

function calcT (xi,yi) {
  let x = toGrid_x (xi, MAXGRID);
  let y = toGrid_y (yi, MAXGRID);
  let denom = 1 + x**2 + y**2;
  let rterm = 6 / denom;
  return 0.4 - rterm;
}

function toGrid_x (x, gdim) {
  let x_int = x - MAXDIM/2;
  let scale = gdim / (MAXDIM/2);
  return x_int*scale;
}

function toGrid_y (y, gdim) {
  let y_int = MAXDIM/2 - y;
  let scale = gdim / (MAXDIM/2);
  return y_int*scale;
}

function toPoint_x (x, gdim) {
  let scale = gdim / (MAXDIM/2);
  let xp = x / scale;
  return xp + (MAXDIM/2);
}

function toPoint_y (y, gdim) {
  let scale = gdim / (MAXDIM/2);
  let yp = y/ scale;
  return (MAXDIM/2) - yp;
}
