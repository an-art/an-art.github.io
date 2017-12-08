let cnvs;
let field = [];

const SIZE = 25;
const DIMENSIONS = 20;

function setup() {
    let clientWidth = document.documentElement.clientWidth;

    cnvs = createCanvas(500, 500);

    cnvs.style('background: url("") rgb(51, 0, 0)');
    cnvs.position(clientWidth/2-250, 50);
    for (let i = 0; i < 400; i++) {
        field.push(new Tile(i % 20, Math.floor(i / 20), "BISCUIT"));
    }
}

function draw() {
    for (let i = 0; i < field.length; i++) {
        field[i].draw();
    }
}