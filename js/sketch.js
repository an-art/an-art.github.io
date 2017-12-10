let cnvs;
let field = [];

const SIZE = 30;
const DIMENSIONS = 20;

function setup() {
    let clientWidth = document.documentElement.clientWidth;

    cnvs = createCanvas(600, 600);
    cnvs.style('background: url("") rgb(51, 0, 0)');
    cnvs.position(clientWidth/2-300, 50);

    field = generateField();
}

function draw() {
    for (let i = 0; i < field.length; i++) {
        field[i].draw();
    }
}

function generateField() {
    let f = [];

    for (let i = 0; i < FIELD_lvl_1.length; i++) {
        let row = FIELD_lvl_1[i].split(',');

        for (let j = 0; j < row.length; j++) {
            let type = parseTileType(row[j]);
            let t = new Tile(i, j, type);
            f.push(t);
        }
    }
    return f;
}