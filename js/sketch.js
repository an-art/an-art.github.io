let cnvs;
let field = [];
let pucman;
let score;
let endScore;
let sumos = [];
let lives = [];

const SIZE = 30;
const DIMENSIONS = 20;

function setup() {
    cnvs = createCanvas(600, 635);
    score = 0;
	endScore = 0;
    field = generateField();
    
}

function draw() {

    background("#734222");

    for (let i = 0; i < field.length; i++) {    
        if (field[i].intact) {            
            if (field[i].type !== 'SUMO' && field[i].type !== 'PUCMAN') {
            	field[i].draw();
            }
        }
    }

    for (let j = 0; j < sumos.length; j++) {
        sumos[j].update();
        sumos[j].draw();
    }

    pucman.update();
    pucman.draw();

    noStroke();
    fill(255);
    textSize(30);
    text(score, 50, height-5);

    handlePucman();
}

function generateField() {
    let f = [];
    let sId = 0;

    for (let i = 0; i < FIELD.length; i++) {        
        let row = FIELD[i].split(',');
        for (let j = 0; j < row.length; j++) {
            let type = TYPES[row[j]];
            let t = new Tile(j, i, type);

            switch(type) {
            	case 'PUCMAN':
	            	pucman = t;
	            	f.push(new Tile(j, i, 'OPEN'));
                    break;

            	case 'SUMO':
	            	sumos.push(new Tile(j, i, type, sId % 2));
	            	f.push(new Tile(j, i, 'OPEN'));
	            	sId++;
	            	break;

	            case 'BARRIER':
	            	f.push(t);
	            	break;

            	case 'SUSHI':
            		endScore += 10;
            		f.push(t);
            		break;

            	case 'RICE':
            		endScore++;
            		f.push(t);
            		break;

            	case 'LIVES':
            		lives.push(t);
            		f.push(t);
            		break;
            }
        }
    }
    return f;
}

function handlePucman() {
    if (keyIsDown(UP_ARROW)) {
        pucman.move(0, -1, true);
    } else if (keyIsDown(DOWN_ARROW)) {
        pucman.move(0, 1, true);
    } else if (keyIsDown(LEFT_ARROW)) {
        pucman.move(-1, 0, true);
    } else if (keyIsDown(RIGHT_ARROW)) {
        pucman.move(1, 0, true);
    }
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
