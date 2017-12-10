const BISCUIT_SIZE = 10;
const PANDA_SIZE = 28;
const CHERRY_SIZE = 8;

const FIELD_lvl_1 = [
    '0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0',
    '0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0',
    '0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,3,0,1,0',
    '0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0',
    '0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
    '0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0',
    '0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0',
    '0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
    '0,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,0,1,0',
    '0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0',
    '0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0',
    '0,1,0,1,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1,0',
    '0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0',
    '0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0',
    '0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0',
    '0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0',
    '0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0',
    '0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0',
    '0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0',
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'
];
let TYPES = ["BARRIER", "BISCUIT", "OPEN", "CHERRY", "GHOST", "PUCMAN"];

function Tile(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;

    this.dX = -1;
    this.dY = -1;
    this.moving = false;
    this.speed = 0.9;
};

Tile.prototype.update = function() {
    if (this.moving) {
        this.x = lerp(this.x, this.dX, this.speed);
        this.y = lerp(this.y, this.dY, this.speed);
        if (Math.abs(this.x - this.dX) < 1 && Math.abs(this.y - this.dY) < 1) {
            this.x = this.dX;
            this.y = this.dY;
            this.moving = false;
        }
    }
};

Tile.prototype.move = function(x, y) {
    let dY = this.y + y;
    let dX = this.x + x;
    
    if (this.moving) {
        return;
    }

    let destinationTile = field[dY * DIMENSIONS + dX];
    let type = destinationTile.type;

    if (type == 'BARRIER' && this.type != 'BARRIER') {
        return;
    }
    this.moving = true;
    this.dX = dX;
    this.dY = dY;
};

Tile.prototype.draw = function() {
    switch (this.type) {
        case "BARRIER":
            strokeWeight(3);
            stroke(0);
            fill("#0000FF");
            rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
            break;

        case "OPEN": 
            break;

        case "BISCUIT":
            ellipseMode(CORNER);
            noStroke();
            fill(255);
            ellipse(this.x * SIZE + BISCUIT_SIZE, this.y * SIZE + BISCUIT_SIZE, BISCUIT_SIZE);
            break;

        case 'CHERRY':
            ellipseMode(CORNER);
            stroke(255);
            strokeWeight(2);
            fill('#FF2222');
            ellipse(this.x * SIZE + CHERRY_SIZE, this.y * SIZE + CHERRY_SIZE, PANDA_SIZE)
            break;

        case 'GHOST':
            break;

        case "PUCMAN":
            img = createImage(PANDA_SIZE, PANDA_SIZE);
            img.loadPixels();

            for (i = 0; i < img.width; i++) {
                for (j = 0; j < img.height; j++) {
                  img.set(i, j, color(0, 0, 0, 0));
                }
              }

              for (i = 2; i < img.width-2; i++) {
                for (j = 6; j < img.height-4; j++) {
                  img.set(i, j, color(255, 255, 255));
                }
              }

            img.set(0, 0, color(0, 0, 0));
            img.set(1, 0, color(0, 0, 0));
            img.set(2, 0, color(0, 0, 0));
            img.set(3, 0, color(0, 0, 0));
            img.set(4, 0, color(0, 0, 0));
            img.set(5, 0, color(0, 0, 0));
            img.set(22, 0, color(0, 0, 0));
            img.set(23, 0, color(0, 0, 0));
            img.set(24, 0, color(0, 0, 0));
            img.set(25, 0, color(0, 0, 0));
            img.set(26, 0, color(0, 0, 0));
            img.set(27, 0, color(0, 0, 0));
            img.set(0, 1, color(0, 0, 0));
            img.set(1, 1, color(0, 0, 0));
            img.set(2, 1, color(0, 0, 0));
            img.set(3, 1, color(0, 0, 0));
            img.set(4, 1, color(0, 0, 0));
            img.set(5, 1, color(0, 0, 0));
            img.set(22, 1, color(0, 0, 0));
            img.set(23, 1, color(0, 0, 0));
            img.set(24, 1, color(0, 0, 0));
            img.set(25, 1, color(0, 0, 0));
            img.set(26, 1, color(0, 0, 0));
            img.set(27, 1, color(0, 0, 0));
            img.set(0, 2, color(0, 0, 0));
            img.set(1, 2, color(0, 0, 0));
            img.set(2, 2, color(0, 0, 0));
            img.set(3, 2, color(0, 0, 0));
            img.set(4, 2, color(0, 0, 0));
            img.set(5, 2, color(0, 0, 0));
            img.set(6, 2, color(0, 0, 0));
            img.set(7, 2, color(0, 0, 0));
            img.set(20, 2, color(0, 0, 0));
            img.set(21, 2, color(0, 0, 0));
            img.set(22, 2, color(0, 0, 0));
            img.set(23, 2, color(0, 0, 0));
            img.set(24, 2, color(0, 0, 0));
            img.set(25, 2, color(0, 0, 0));
            img.set(26, 2, color(0, 0, 0));
            img.set(27, 2, color(0, 0, 0));
            img.set(0, 3, color(0, 0, 0));
            img.set(1, 3, color(0, 0, 0));
            img.set(2, 3, color(0, 0, 0));
            img.set(3, 3, color(0, 0, 0));
            img.set(4, 3, color(0, 0, 0));
            img.set(5, 3, color(0, 0, 0));
            img.set(6, 3, color(0, 0, 0));
            img.set(7, 3, color(0, 0, 0));
            img.set(20, 3, color(0, 0, 0));
            img.set(21, 3, color(0, 0, 0));
            img.set(22, 3, color(0, 0, 0));
            img.set(23, 3, color(0, 0, 0));
            img.set(24, 3, color(0, 0, 0));
            img.set(25, 3, color(0, 0, 0));
            img.set(26, 3, color(0, 0, 0));
            img.set(27, 3, color(0, 0, 0));
            img.set(0, 4, color(0, 0, 0));
            img.set(1, 4, color(0, 0, 0));
            img.set(2, 4, color(0, 0, 0));
            img.set(3, 4, color(0, 0, 0));
            img.set(4, 4, color(0, 0, 0));
            img.set(5, 4, color(0, 0, 0));
            img.set(6, 4, color(0, 0, 0));
            img.set(7, 4, color(0, 0, 0));
            img.set(8, 4, color(0, 0, 0));
            img.set(9, 4, color(0, 0, 0));
            img.set(10, 4, color(0, 0, 0));
            img.set(11, 4, color(0, 0, 0));
            img.set(12, 4, color(0, 0, 0));
            img.set(13, 4, color(0, 0, 0));
            img.set(14, 4, color(0, 0, 0));
            img.set(15, 4, color(0, 0, 0));
            img.set(16, 4, color(0, 0, 0));
            img.set(17, 4, color(0, 0, 0));
            img.set(18, 4, color(0, 0, 0));
            img.set(19, 4, color(0, 0, 0));
            img.set(20, 4, color(0, 0, 0));
            img.set(21, 4, color(0, 0, 0));
            img.set(22, 4, color(0, 0, 0));
            img.set(23, 4, color(0, 0, 0));
            img.set(24, 4, color(0, 0, 0));
            img.set(25, 4, color(0, 0, 0));
            img.set(26, 4, color(0, 0, 0));
            img.set(27, 4, color(0, 0, 0));
            img.set(0, 5, color(0, 0, 0));
            img.set(1, 5, color(0, 0, 0));
            img.set(2, 5, color(0, 0, 0));
            img.set(3, 5, color(0, 0, 0));
            img.set(4, 5, color(0, 0, 0));
            img.set(5, 5, color(0, 0, 0));
            img.set(6, 5, color(0, 0, 0));
            img.set(7, 5, color(0, 0, 0));
            img.set(8, 5, color(0, 0, 0));
            img.set(9, 5, color(0, 0, 0));
            img.set(10, 5, color(0, 0, 0));
            img.set(11, 5, color(0, 0, 0));
            img.set(12, 5, color(0, 0, 0));
            img.set(13, 5, color(0, 0, 0));
            img.set(14, 5, color(0, 0, 0));
            img.set(15, 5, color(0, 0, 0));
            img.set(16, 5, color(0, 0, 0));
            img.set(17, 5, color(0, 0, 0));
            img.set(18, 5, color(0, 0, 0));
            img.set(19, 5, color(0, 0, 0));
            img.set(20, 5, color(0, 0, 0));
            img.set(21, 5, color(0, 0, 0));
            img.set(22, 5, color(0, 0, 0));
            img.set(23, 5, color(0, 0, 0));
            img.set(24, 5, color(0, 0, 0));
            img.set(25, 5, color(0, 0, 0));
            img.set(26, 5, color(0, 0, 0));
            img.set(27, 5, color(0, 0, 0));
            img.set(0, 6, color(0, 0, 0));
            img.set(1, 6, color(0, 0, 0));
            img.set(2, 6, color(0, 0, 0));
            img.set(3, 6, color(0, 0, 0));
            img.set(4, 6, color(0, 0, 0));
            img.set(5, 6, color(0, 0, 0));
            img.set(22, 6, color(0, 0, 0));
            img.set(23, 6, color(0, 0, 0));
            img.set(24, 6, color(0, 0, 0));
            img.set(25, 6, color(0, 0, 0));
            img.set(26, 6, color(0, 0, 0));
            img.set(27, 6, color(0, 0, 0));
            img.set(0, 7, color(0, 0, 0));
            img.set(1, 7, color(0, 0, 0));
            img.set(2, 7, color(0, 0, 0));
            img.set(3, 7, color(0, 0, 0));
            img.set(4, 7, color(0, 0, 0));
            img.set(5, 7, color(0, 0, 0));
            img.set(22, 7, color(0, 0, 0));
            img.set(23, 7, color(0, 0, 0));
            img.set(24, 7, color(0, 0, 0));
            img.set(25, 7, color(0, 0, 0));
            img.set(26, 7, color(0, 0, 0));
            img.set(27, 7, color(0, 0, 0));
            img.set(0, 8, color(0, 0, 0));
            img.set(1, 8, color(0, 0, 0));
            img.set(2, 8, color(0, 0, 0));
            img.set(3, 8, color(0, 0, 0));
            img.set(24, 8, color(0, 0, 0));
            img.set(25, 8, color(0, 0, 0));
            img.set(26, 8, color(0, 0, 0));
            img.set(27, 8, color(0, 0, 0));
            img.set(0, 9, color(0, 0, 0));
            img.set(1, 9, color(0, 0, 0));
            img.set(2, 9, color(0, 0, 0));
            img.set(3, 9, color(0, 0, 0));
            img.set(24, 9, color(0, 0, 0));
            img.set(25, 9, color(0, 0, 0));
            img.set(26, 9, color(0, 0, 0));
            img.set(27, 9, color(0, 0, 0));
            img.set(0, 10, color(0, 0, 0));
            img.set(1, 10, color(0, 0, 0));
            img.set(6, 10, color(0, 0, 0));
            img.set(7, 10, color(0, 0, 0));
            img.set(8, 10, color(0, 0, 0));
            img.set(9, 10, color(0, 0, 0));
            img.set(18, 10, color(0, 0, 0));
            img.set(19, 10, color(0, 0, 0));
            img.set(20, 10, color(0, 0, 0));
            img.set(21, 10, color(0, 0, 0));
            img.set(26, 10, color(0, 0, 0));
            img.set(27, 10, color(0, 0, 0));
            img.set(0, 11, color(0, 0, 0));
            img.set(1, 11, color(0, 0, 0));
            img.set(6, 11, color(0, 0, 0));
            img.set(7, 11, color(0, 0, 0));
            img.set(8, 11, color(0, 0, 0));
            img.set(9, 11, color(0, 0, 0));
            img.set(18, 11, color(0, 0, 0));
            img.set(19, 11, color(0, 0, 0));
            img.set(20, 11, color(0, 0, 0));
            img.set(21, 11, color(0, 0, 0));
            img.set(26, 11, color(0, 0, 0));
            img.set(27, 11, color(0, 0, 0));
            img.set(0, 12, color(0, 0, 0));
            img.set(1, 12, color(0, 0, 0));
            img.set(4, 12, color(0, 0, 0));
            img.set(5, 12, color(0, 0, 0));
            img.set(6, 12, color(0, 0, 0));
            img.set(7, 12, color(0, 0, 0));
            img.set(8, 12, color(0, 0, 0));
            img.set(9, 12, color(0, 0, 0));
            img.set(18, 12, color(0, 0, 0));
            img.set(19, 12, color(0, 0, 0));
            img.set(20, 12, color(0, 0, 0));
            img.set(21, 12, color(0, 0, 0));
            img.set(22, 12, color(0, 0, 0));
            img.set(23, 12, color(0, 0, 0));
            img.set(26, 12, color(0, 0, 0));
            img.set(27, 12, color(0, 0, 0));
            img.set(0, 13, color(0, 0, 0));
            img.set(1, 13, color(0, 0, 0));
            img.set(4, 13, color(0, 0, 0));
            img.set(5, 13, color(0, 0, 0));
            img.set(6, 13, color(0, 0, 0));
            img.set(7, 13, color(0, 0, 0));
            img.set(8, 13, color(0, 0, 0));
            img.set(9, 13, color(0, 0, 0));
            img.set(18, 13, color(0, 0, 0));
            img.set(19, 13, color(0, 0, 0));
            img.set(20, 13, color(0, 0, 0));
            img.set(21, 13, color(0, 0, 0));
            img.set(22, 13, color(0, 0, 0));
            img.set(23, 13, color(0, 0, 0));
            img.set(26, 13, color(0, 0, 0));
            img.set(27, 13, color(0, 0, 0));
            img.set(0, 14, color(0, 0, 0));
            img.set(1, 14, color(0, 0, 0));
            img.set(4, 14, color(0, 0, 0));
            img.set(5, 14, color(0, 0, 0));
            img.set(6, 14, color(0, 0, 0));
            img.set(7, 14, color(0, 0, 0));
            img.set(8, 14, color(0, 0, 0));
            img.set(9, 14, color(0, 0, 0));
            img.set(18, 14, color(0, 0, 0));
            img.set(19, 14, color(0, 0, 0));
            img.set(20, 14, color(0, 0, 0));
            img.set(21, 14, color(0, 0, 0));
            img.set(22, 14, color(0, 0, 0));
            img.set(23, 14, color(0, 0, 0));
            img.set(26, 14, color(0, 0, 0));
            img.set(27, 14, color(0, 0, 0));
            img.set(0, 15, color(0, 0, 0));
            img.set(1, 15, color(0, 0, 0));
            img.set(4, 15, color(0, 0, 0));
            img.set(5, 15, color(0, 0, 0));
            img.set(6, 15, color(0, 0, 0));
            img.set(7, 15, color(0, 0, 0));
            img.set(8, 15, color(0, 0, 0));
            img.set(9, 15, color(0, 0, 0));
            img.set(18, 15, color(0, 0, 0));
            img.set(19, 15, color(0, 0, 0));
            img.set(20, 15, color(0, 0, 0));
            img.set(21, 15, color(0, 0, 0));
            img.set(22, 15, color(0, 0, 0));
            img.set(23, 15, color(0, 0, 0));
            img.set(26, 15, color(0, 0, 0));
            img.set(27, 15, color(0, 0, 0));
            img.set(0, 16, color(0, 0, 0));
            img.set(1, 16, color(0, 0, 0));
            img.set(4, 16, color(0, 0, 0));
            img.set(5, 16, color(0, 0, 0));
            img.set(6, 16, color(0, 0, 0));
            img.set(7, 16, color(0, 0, 0));
            img.set(12, 16, color(0, 0, 0));
            img.set(13, 16, color(0, 0, 0));
            img.set(14, 16, color(0, 0, 0));
            img.set(15, 16, color(0, 0, 0));
            img.set(20, 16, color(0, 0, 0));
            img.set(21, 16, color(0, 0, 0));
            img.set(22, 16, color(0, 0, 0));
            img.set(23, 16, color(0, 0, 0));
            img.set(26, 16, color(0, 0, 0));
            img.set(27, 16, color(0, 0, 0));
            img.set(0, 17, color(0, 0, 0));
            img.set(1, 17, color(0, 0, 0));
            img.set(4, 17, color(0, 0, 0));
            img.set(5, 17, color(0, 0, 0));
            img.set(6, 17, color(0, 0, 0));
            img.set(7, 17, color(0, 0, 0));
            img.set(12, 17, color(0, 0, 0));
            img.set(13, 17, color(0, 0, 0));
            img.set(14, 17, color(0, 0, 0));
            img.set(15, 17, color(0, 0, 0));
            img.set(20, 17, color(0, 0, 0));
            img.set(21, 17, color(0, 0, 0));
            img.set(22, 17, color(0, 0, 0));
            img.set(23, 17, color(0, 0, 0));
            img.set(26, 17, color(0, 0, 0));
            img.set(27, 17, color(0, 0, 0));
            img.set(0, 18, color(0, 0, 0));
            img.set(1, 18, color(0, 0, 0));
            img.set(12, 18, color(0, 0, 0));
            img.set(13, 18, color(0, 0, 0));
            img.set(14, 18, color(0, 0, 0));
            img.set(15, 18, color(0, 0, 0));
            img.set(26, 18, color(0, 0, 0));
            img.set(27, 18, color(0, 0, 0));
            img.set(0, 19, color(0, 0, 0));
            img.set(1, 19, color(0, 0, 0));
            img.set(12, 19, color(0, 0, 0));
            img.set(13, 19, color(0, 0, 0));
            img.set(14, 19, color(0, 0, 0));
            img.set(15, 19, color(0, 0, 0));
            img.set(26, 19, color(0, 0, 0));
            img.set(27, 19, color(0, 0, 0));
            img.set(0, 20, color(0, 0, 0));
            img.set(1, 20, color(0, 0, 0));
            img.set(10, 20, color(0, 0, 0));
            img.set(11, 20, color(0, 0, 0));
            img.set(12, 20, color(0, 0, 0));
            img.set(13, 20, color(0, 0, 0));
            img.set(14, 20, color(0, 0, 0));
            img.set(15, 20, color(0, 0, 0));
            img.set(16, 20, color(0, 0, 0));
            img.set(17, 20, color(0, 0, 0));
            img.set(26, 20, color(0, 0, 0));
            img.set(27, 20, color(0, 0, 0));
            img.set(0, 21, color(0, 0, 0));
            img.set(1, 21, color(0, 0, 0));
            img.set(10, 21, color(0, 0, 0));
            img.set(11, 21, color(0, 0, 0));
            img.set(12, 21, color(0, 0, 0));
            img.set(13, 21, color(0, 0, 0));
            img.set(14, 21, color(0, 0, 0));
            img.set(15, 21, color(0, 0, 0));
            img.set(16, 21, color(0, 0, 0));
            img.set(17, 21, color(0, 0, 0));
            img.set(26, 21, color(0, 0, 0));
            img.set(27, 21, color(0, 0, 0));
            img.set(0, 22, color(0, 0, 0));
            img.set(1, 22, color(0, 0, 0));
            img.set(2, 22, color(0, 0, 0));
            img.set(3, 22, color(0, 0, 0));
            img.set(24, 22, color(0, 0, 0));
            img.set(25, 22, color(0, 0, 0));
            img.set(26, 22, color(0, 0, 0));
            img.set(27, 22, color(0, 0, 0));
            img.set(0, 23, color(0, 0, 0));
            img.set(1, 23, color(0, 0, 0));
            img.set(2, 23, color(0, 0, 0));
            img.set(3, 23, color(0, 0, 0));
            img.set(24, 23, color(0, 0, 0));
            img.set(25, 23, color(0, 0, 0));
            img.set(26, 23, color(0, 0, 0));
            img.set(27, 23, color(0, 0, 0));



            img.set(2, 24, color(0, 0, 0));
            img.set(3, 24, color(0, 0, 0));
            img.set(4, 24, color(0, 0, 0));
            img.set(5, 24, color(0, 0, 0));
            img.set(6, 24, color(0, 0, 0));
            img.set(7, 24, color(0, 0, 0));
            img.set(8, 24, color(0, 0, 0));
            img.set(9, 24, color(0, 0, 0));
            img.set(10, 24, color(0, 0, 0));
            img.set(11, 24, color(0, 0, 0));
            img.set(12, 24, color(0, 0, 0));
            img.set(13, 24, color(0, 0, 0));
            img.set(14, 24, color(0, 0, 0));
            img.set(15, 24, color(0, 0, 0));
            img.set(16, 24, color(0, 0, 0));
            img.set(17, 24, color(0, 0, 0));
            img.set(18, 24, color(0, 0, 0));
            img.set(19, 24, color(0, 0, 0));
            img.set(20, 24, color(0, 0, 0));
            img.set(21, 24, color(0, 0, 0));
            img.set(22, 24, color(0, 0, 0));
            img.set(23, 24, color(0, 0, 0));
            img.set(24, 24, color(0, 0, 0));
            img.set(25, 24, color(0, 0, 0));
            img.set(2, 25, color(0, 0, 0));
            img.set(3, 25, color(0, 0, 0));
            img.set(4, 25, color(0, 0, 0));
            img.set(5, 25, color(0, 0, 0));
            img.set(6, 25, color(0, 0, 0));
            img.set(7, 25, color(0, 0, 0));
            img.set(8, 25, color(0, 0, 0));
            img.set(9, 25, color(0, 0, 0));
            img.set(10, 25, color(0, 0, 0));
            img.set(11, 25, color(0, 0, 0));
            img.set(12, 25, color(0, 0, 0));
            img.set(13, 25, color(0, 0, 0));
            img.set(14, 25, color(0, 0, 0));
            img.set(15, 25, color(0, 0, 0));
            img.set(16, 25, color(0, 0, 0));
            img.set(17, 25, color(0, 0, 0));
            img.set(18, 25, color(0, 0, 0));
            img.set(19, 25, color(0, 0, 0));
            img.set(20, 25, color(0, 0, 0));
            img.set(21, 25, color(0, 0, 0));
            img.set(22, 25, color(0, 0, 0));
            img.set(23, 25, color(0, 0, 0));
            img.set(24, 25, color(0, 0, 0));
            img.set(25, 25, color(0, 0, 0));
            img.updatePixels();
            image(img, this.x * SIZE + 1, this.y * SIZE + 3);
            break;
    }
};

