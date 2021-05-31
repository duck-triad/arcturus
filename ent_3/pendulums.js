// To the physics teachers who said to me that
// "solving this ODE was impossible by hand",
// I raise you this!
// A pendulum animation that isn't an embarrassment to math!
// okok maybe that was too much . . .
// The code below is definitely not great.
// It operates under the "Ultimate Plagiarism Defense"
// "Quality so crap, it isn't even worth copying"
// But if you happen to find something useful here, more power to you!
// Bonus points if you credit duck-triad.github.io/arcturus
// KM, 5/31/2021


const maxdim = 800;
let tracks;

function setup () {
  createCanvas(maxdim, 900);
  tracks = createGraphics(800, 900);
  p1 = new Pendulum(50, 205, 0.2, 255);
  p2 = new Pendulum(50, 270, 0.9, 255);
  p3 = new Pendulum(50, 335, 1.8, 255);
  p4 = new Pendulum(50, 400, PI, 255);
  p4.vel = 0.001;
}

function draw () {
  background('#00051f');
  p1.display();
  p2.display();
  p3.display();
  p4.display();
  p1.updateDeriv();
  p2.updateDeriv();
  p3.updateDeriv();
  p4.updateDeriv();
  p1.advance();
  p2.advance();
  p3.advance();
  p4.advance();
}

function Pendulum (dim_, len_, angle_, col_) {
  this.dim = dim_,
  this.len = len_,
  this.angle = angle_,
  this.oriV = createVector(this.len * sin(this.angle) + maxdim/2, this.len * cos(this.angle) + maxdim/2),
  this.col = col_,
  this.vel = 0,
  // Methods
  this.display = function () {
    this.col = linerpcol(this.oriV.y, this.len);
    fill(this.col);
    noStroke();
    ellipse(this.oriV.x, this.oriV.y, this.dim, this.dim);
    stroke(this.col);
    strokeWeight(2);
    line(this.oriV.x, this.oriV.y, maxdim/2, maxdim/2);
  },
  this.advance = function () {
    this.angle += this.vel;
    this.oriV = createVector(this.len * sin(this.angle) + maxdim/2, this.len * cos(this.angle) + maxdim/2);
  },
  this.updateDeriv = function () {
    let k = 0.8/this.len;
    let d2ang = -(k)*sin(this.angle);
    this.vel += d2ang;
  }

}

function linerpcol(param, len) {
  let intmax =  len + 400;
  let fraction = param/intmax;
  let from = color(27,189,208);
  let to = color(209,45,27);
  let newcol = lerpColor(from, to, fraction);
  return newcol;
}
