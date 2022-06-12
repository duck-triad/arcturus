// KM 6/12/22
// From 1D, to 2D, to "3D"
// A project on projection.


let r = 4;
let numpts = 20;
let m = 2.5;
let factor = 0.9;
let yi = 600;
let DIM = 800;
let incr = 0.2;
let t = 0;
let ti = 0.005;
let grid;

function setup() {
  createCanvas(800, 800);
  noStroke();
  grid = gridcalc(20, 2, 798, yi, factor, m, numpts, r);
  setTheta(grid);
  setOffset(grid, incr);
}

function draw() {
  background(0);
  fill(255);
  //sinosc(grid, 0.1, 20);
  noisefield(grid);
  anchors(grid);
  gridplot(grid);
}

function xarr(numpts, r, start, end, ylevel) {
  let arr = [];
  let xstep = (end - start)/(numpts-1);
  for (let i = 0; i < numpts; i++) {
    let x = start + i*xstep;
    arr[i] = {x: x, y: ylevel, r:r, theta:map(i, 0, numpts-1, 0, PI), yi: ylevel, xoff: 0, yoff: 0, zoff: 0};
  }
  return arr;
}

function dimcalc(step,xibase, xfbase, ybase, factor, m) {
  let y = ybase;
  let dy;
  let dx;
  y = ybase * Math.pow(factor, step);
  dy = ybase - y;
  dx = dy/m;
  return {xi: xibase + dx, xf: xfbase - dx, y:y };
}

function gridcalc(levels, xi, xf, yi, factor, m, numpts, r) {
  let grid = [];
  let dims;
  for (let i = 0; i < levels; i++) {
    dims = dimcalc(i, xi, xf, yi, factor, m);
    let level = xarr(numpts, r, dims.xi, dims.xf, dims.y);
    grid.push(level);
  }
  return grid;
}

function anchors(grid) {
  for(let j = 0; j < grid.length; j++) {
    for(let i = 0; i < grid[j].length; i++) {
      let x = grid[j][i].x;
      let y = grid[j][i].y;
      let r = grid[j][i].r;
      ellipse(x,y,r,r);
    }
  }
}

function gridplot(grid) {
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i < grid[0].length; i++) {
    if (i != grid[0].length - 1) {
      line(grid[0][i].x, grid[0][i].y, grid[0][i+1].x, grid[0][i+1].y);
    }
    //Y-fringe:

    //if (i > 0 && i < grid[0].length - 1) {
      //let tm = (grid[0][i].y - grid[1][i].y)/(grid[0][i].x - grid[1][i].x);
      //let dx = (DIM-grid[0][i].y)/tm;
      //let x = grid[0][i].x + dx;
      //let y = 400;
      //line(grid[0][i].x, grid[0][i].y, x, y);
    //}
  }
  for (let j = 1; j < grid.length; j++) {
    for (let i = 0; i < grid[j].length; i++) {
      if (i == 0) {
        // Left x-fringe:

        //line(grid[j][i].x, grid[j][i].y, 0, grid[j][i].y);
      }
      if (i != grid[0].length - 1) {
        line(grid[j][i].x, grid[j][i].y, grid[j][i+1].x, grid[j][i+1].y);
        line(grid[j][i].x, grid[j][i].y, grid[j-1][i].x, grid[j-1][i].y);
        line(grid[j][i].x, grid[j][i].y, grid[j-1][i+1].x, grid[j-1][i+1].y);
      } else {
        line(grid[j][i].x, grid[j][i].y, grid[j-1][i].x, grid[j-1][i].y);
        // Right x-fringe:

        //line(grid[j][i].x, grid[j][i].y, DIM, grid[j][i].y);
      }
    }
  }
}

function setTheta(grid) {
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[j].length; i++) {
      // Modify theta parameter here:
      grid[j][i].theta = i-j;
      // ---------------------------
    }
  }
}

function sinosc(grid, omega, amp) {
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[j].length; i++) {
      grid[j][i].y = (amp*Math.pow(factor, j))*sin(grid[j][i].theta) + grid[j][i].yi;
      grid[j][i].theta += omega;
    }
  }
}

function setOffset(grid, incr) {
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      grid[j][i].xoff = incr*i;
      grid[j][i].yoff = incr*j;
    }
  }
}

function noisefield(grid) {
  for (let j = 0; j < grid.length; j++) {
    for (let i = 0; i < grid[0].length; i++) {
      grid[j][i].zoff = t;
      grid[j][i].y = grid[j][i].yi*2 * noise(grid[j][i].xoff, grid[j][i].yoff, grid[j][i].zoff);
    }
  }
  t += ti;
}
