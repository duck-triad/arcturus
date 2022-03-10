//le poisonous donut
//KM, 3/9/22
let xcoord = 0;
let ycoord = 0;
let zcoord = 0;
let cam;

function setup () {
    createCanvas(800,800, WEBGL);
    noStroke();
    pixelDensity(1);
    setAttributes('antialias', true);
    cam = createEasyCam();
    document.oncontextmenu = () => false;
}

function draw() {
    let dX = (mouseX/width -0.5) *2;
    let dY = (mouseY/height - 0.5) *2;
    background(0);
    specularMaterial(0, 194, 136);
    shininess(50);
    directionalLight(255,255,255,dX,dY, -1);
    directionalLight(0,0,255,dX,dY, 1);
    torus(100,30);

}
