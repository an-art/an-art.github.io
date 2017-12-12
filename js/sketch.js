let cnvs;
let field = [];
let pucman;
let score;
let sumos = [];

const SIZE = 30;
const DIMENSIONS = 20;

function setup() {
    let clientWidth = document.documentElement.clientWidth;

    cnvs = createCanvas(600, 635);
    score = 0;
    field = generateField();
    
};

function draw() {
    background("#734222");

    for (let i = 0; i < field.length; i++) {    
        if (field[i].intact) {
            
            field[i].update();
            field[i].draw();
        }
    }

    pucman.update();
    pucman.draw();

    for (let j = 0; j < sumos.length; j++) {
        sumos[j].update();
        sumos[j].draw();
    }

    noStroke();
    fill(255);
    textSize(30);
    text(score, 5, height-5);

    handlePucman();
    handleSumo();
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
            } else if (type == 'SUMO') {
                sumos.push(t);
            } else {
                f.push(t);
            }
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

function handleSumo() {
    
}

function endGame(won) {
    textSize(60);
    textAlign(CENTER);
    fill('rgba(0, 0, 0, 0.5)');
    rect(50, 240, 500, 180);
    if(won) {
        fill(0, 255, 0);
        text('You win', width/2, height/2);

    } else {
        fill(255, 0, 0);
        text('You lose', width/2, height/2);
    }
    fill(0, 0, 255);
    textSize(50);
    text('Press F5 to restart', width/2, height/2+60);
    noLoop();
}