const BISCUIT_SIZE = 8;
const PANDA_SIZE = 14;

const FIELD_lvl_1 = [
    "0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0",
    "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,3,0,1,0",
    "0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0",
    "0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0",
    "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,0,1,0",
    "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
    "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1,0",
    "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0",
    "0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0",
    "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
    "0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0",
    "0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0",
    "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];
let TYPES = ["BARRIER", "OPEN", "BISCUIT", "PANDA", "PUCMAN", "GHOST"];

function Tile(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

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

        case "PANDA":
            img = createImage(PANDA_SIZE, PANDA_SIZE);
            img.loadPixels();

            for (i = 0; i < img.width; i++) {
                for (j = 0; j < img.height; j++) {
                  img.set(i, j, color(0, 0, 0, 0));
                }
              }

              for (i = 1; i < img.width-1; i++) {
                for (j = 3; j < img.height-2; j++) {
                  img.set(i, j, color(255, 255, 255));
                }
              }

            img.set(0, 0, color(0, 0, 0));
            img.set(1, 0, color(0, 0, 0));
            img.set(2, 0, color(0, 0, 0));
            img.set(11, 0, color(0, 0, 0));
            img.set(12, 0, color(0, 0, 0));
            img.set(13, 0, color(0, 0, 0));
            img.set(0, 1, color(0, 0, 0));
            img.set(1, 1, color(0, 0, 0));
            img.set(2, 1, color(0, 0, 0));
            img.set(3, 1, color(0, 0, 0));
            img.set(10, 1, color(0, 0, 0));
            img.set(11, 1, color(0, 0, 0));
            img.set(12, 1, color(0, 0, 0));
            img.set(13, 1, color(0, 0, 0));
            img.set(0, 2, color(0, 0, 0));
            img.set(1, 2, color(0, 0, 0));
            img.set(2, 2, color(0, 0, 0));
            img.set(3, 2, color(0, 0, 0));
            img.set(4, 2, color(0, 0, 0));
            img.set(5, 2, color(0, 0, 0));
            img.set(6, 2, color(0, 0, 0));
            img.set(7, 2, color(0, 0, 0));
            img.set(8, 2, color(0, 0, 0));
            img.set(9, 2, color(0, 0, 0));
            img.set(10, 2, color(0, 0, 0));
            img.set(11, 2, color(0, 0, 0));
            img.set(12, 2, color(0, 0, 0));
            img.set(13, 2, color(0, 0, 0));
            img.set(0, 3, color(0, 0, 0));
            img.set(1, 3, color(0, 0, 0));
            img.set(2, 3, color(0, 0, 0));
            img.set(11, 3, color(0, 0, 0));
            img.set(12, 3, color(0, 0, 0));
            img.set(13, 3, color(0, 0, 0));
            img.set(0, 4, color(0, 0, 0));
            img.set(1, 4, color(0, 0, 0));
            img.set(12, 4, color(0, 0, 0));
            img.set(13, 4, color(0, 0, 0));
            img.set(0, 5, color(0, 0, 0));
            img.set(3, 5, color(0, 0, 0));
            img.set(4, 5, color(0, 0, 0));
            img.set(9, 5, color(0, 0, 0));
            img.set(10, 5, color(0, 0, 0));
            img.set(13, 5, color(0, 0, 0));
            img.set(0, 6, color(0, 0, 0));
            img.set(2, 6, color(0, 0, 0));
            img.set(3, 6, color(0, 0, 0));
            img.set(4, 6, color(0, 0, 0));
            img.set(9, 6, color(0, 0, 0));
            img.set(10, 6, color(0, 0, 0));
            img.set(11, 6, color(0, 0, 0));
            img.set(13, 6, color(0, 0, 0));
            img.set(0, 7, color(0, 0, 0));
            img.set(2, 7, color(0, 0, 0));
            img.set(3, 7, color(0, 0, 0));
            img.set(4, 7, color(0, 0, 0));
            img.set(9, 7, color(0, 0, 0));
            img.set(10, 7, color(0, 0, 0));
            img.set(11, 7, color(0, 0, 0));
            img.set(13, 7, color(0, 0, 0));
            img.set(0, 8, color(0, 0, 0));
            img.set(2, 8, color(0, 0, 0));
            img.set(3, 8, color(0, 0, 0));
            img.set(6, 8, color(0, 0, 0));
            img.set(7, 8, color(0, 0, 0));
            img.set(10, 8, color(0, 0, 0));
            img.set(11, 8, color(0, 0, 0));
            img.set(13, 8, color(0, 0, 0));
            img.set(6, 9, color(0, 0, 0));
            img.set(7, 9, color(0, 0, 0));
            img.set(5, 10, color(0, 0, 0));
            img.set(6, 10, color(0, 0, 0));
            img.set(7, 10, color(0, 0, 0));
            img.set(8, 10, color(0, 0, 0));
            img.set(0, 11, color(0, 0, 0));
            img.set(1, 11, color(0, 0, 0));
            img.set(12, 11, color(0, 0, 0));
            img.set(13, 11, color(0, 0, 0));
            img.set(1, 12, color(0, 0, 0));
            img.set(2, 12, color(0, 0, 0));
            img.set(3, 12, color(0, 0, 0));
            img.set(4, 12, color(0, 0, 0));
            img.set(5, 12, color(0, 0, 0));
            img.set(6, 12, color(0, 0, 0));
            img.set(7, 12, color(0, 0, 0));
            img.set(8, 12, color(0, 0, 0));
            img.set(9, 12, color(0, 0, 0));
            img.set(10, 12, color(0, 0, 0));
            img.set(11, 12, color(0, 0, 0));
            img.set(12, 12, color(0, 0, 0));

            img.updatePixels();
            image(img, this.x * SIZE + 5, this.y * SIZE + 5);
            break;
    }
}

function parseTileType(t) {
    switch (t) {
        case '0':
            return 'BARRIER';
        case '1':
            return 'BISCUIT';
        case '2':
            return 'OPEN';
        case '3':
            return 'PANDA';
    }
}