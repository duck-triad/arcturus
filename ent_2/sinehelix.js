const maxdim = 1000;
const vel = 0.005;
const dim = 25;
let npoints = 40;
let azureArray = [];
let clementineArray = [];
let cscArray0 = [];

function setup() {
  createCanvas(maxdim, maxdim);
  for (let i = 0; i < npoints; i++) {
    azureArray[i] = new Sinemet(dim/2 + (dim*i), maxdim/2, dim, color('#0084EA'), (i*PI)/npoints, 2);
    clementineArray[i] = new Sinemet(dim/2 + (dim*i), maxdim/2, dim, color('#EA6500'), (i*PI)/npoints, -2);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < npoints; i++) {
    azureArray[i].display();
    clementineArray[i].display();
    stroke(255, 100 + 100 * sin(azureArray[i].theta * 5));
    strokeWeight(3);
    line(azureArray[i].x, azureArray[i].y, clementineArray[i].x, clementineArray[i].y);
    noStroke();
    azureArray[i].advance();
    clementineArray[i].advance();
  }
}

function Sinemet (x_, y_, r_, col_, theta_, freq_) {
  this.x = x_,
  this.y = y_,
  this.r = r_,
  this.col = col_,
  this.theta = theta_,
  this.amplitude = 200,
  this.freq = freq_,
  // Class Methods
  this.display = function () {
    this.y = (maxdim/2) + this.amplitude * sin(this.theta * this.freq);
    fill(this.col);
    ellipse(this.x, this.y, this.r, this.r);
  },

  this.advance = function () {
    this.theta += vel;
  }
}
