// This is the first of the Arcturus sketches that was translated from a Java experiment
// Java was the second language I learned after Python (or maybe the fourth, if you count non-programming langs)...
//... but I took a massive hiatus from it after choosing to focus more on Python and p5.js
// I've actually returned to the Java realm after 12 years of self-imposed exile ...
//... and also back to Arcturus after a couple months of externally-imposed exile ...
//... and this time I plan on staying a bit longer in order to explore some interesting things.
// There may be a future "Java sketches" directory in Arcturus where I might upload some hard-to-translate Java sketches that are particularly interesting.
// As always, this sketch is protected by the "Ultimate Plagiarism Defense: Quality So Crap, It Isn't Even Worth Copying". 
// But if you happen to find something useful here, more power to you! 
// Bonus points if you credit duck-triad.github.io/arcturus
// KM, 3/5/22

let dim = 800;
let inc = 0.02;
let frac = 1;
let theta1 = 0;
let theta2 = 0;
let theta3 = 0;
let theta4 = 0;
let radius1 =  100;
let radius2 = radius1 * frac;
let radius3 = radius2 * frac;
let radius4 = radius2 * frac;
let tracks;

function setup() {
  createCanvas(800 ,800);
  tracks = createGraphics(800,800);
}

function draw() {
  background(0);
  push();
  tracks.push();
  translate(dim/2, 300);
  tracks.translate(dim/2, 300);
  rotate(theta1);
  tracks.rotate(theta1);
  push();
  tracks.push();
  translate(0,radius1);
  tracks.translate(0,radius1);
  rotate(theta2);
  tracks.rotate(theta2);
  push();
  tracks.push();
  translate(0,radius2);
  tracks.translate(0,radius2);
  rotate(theta3);
  tracks.rotate(theta3);
  push();
  tracks.push();
  translate(0,radius3);
  tracks.translate(0,radius3);
  rotate(theta4);
  tracks.rotate(theta4);
  orbiter(color(255,255,0), radius4);
  tracks.stroke(255,255,0);
  tracks.point(0,radius4);
  tracks.pop();
  pop();
  orbiter(color(0,255,0), radius3);
  tracks.stroke(0,255,0);
  tracks.point(0,radius3);
  tracks.pop();
  pop();
  orbiter(color(255,0,0), radius2);
  tracks.stroke(255,0,0);
  tracks.point(0,radius2);
  tracks.pop();
  pop();
  orbiter(255, radius1);
  tracks.stroke(255);
  tracks.point(0,radius1);
  tracks.pop();
  pop();
  theta1 += inc;
  theta2 += inc;
  theta3 += inc;
  theta4 += inc;
  image(tracks,0,0);
}

function orbiter(c, armDist) {
  fill(c);
  stroke(c);
  ellipse(0,armDist,20,20);
  line(0, armDist, 0,0);
}
