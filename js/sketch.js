let cnvs;
let field = [];
let pucman;

const SIZE = 30;
const DIMENSIONS = 20;

function setup() {
    let clientWidth = document.documentElement.clientWidth;

    cnvs = createCanvas(600, 600);
    cnvs.style('background: url("") rgb(51, 0, 0)');
    cnvs.position(clientWidth/2-300, 50);

    field = generateField();
    
};

function draw() {
    for (let i = 0; i < field.length; i++) {    
        field[i].draw();
        field[i].update();
    }

    handlePucman();
};

function generateField() {
    let f = [];

    for (let i = 0; i < FIELD_lvl_1.length; i++) {        
        let row = FIELD_lvl_1[i].split(',');
        for (let j = 0; j < row.length; j++) {
            let type = TYPES[row[j]];
            let t = new Tile(j, i, type);
            if (type == 'PUCMAN') {
                pucman = t;
            }
            f.push(t);
        }
    }
    return f;
};

function handlePucman() {
    if (keyIsDown(UP_ARROW)) {
        pucman.move(0, -1);
    } else if (keyIsDown(DOWN_ARROW)) {
        pucman.move(0, 1);
    } else if (keyIsDown(LEFT_ARROW)) {
        pucman.move(-1, 0);
    } else if (keyIsDown(RIGHT_ARROW)) {
        pucman.move(1, 0);
    }
};