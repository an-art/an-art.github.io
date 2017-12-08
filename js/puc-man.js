const BISCUIT_SIZE = 8;
const CHERRY_SIZE = 12;

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

        case "CHERRY":
            ellipseMode(CORNER);
            strokeWeight(255);
            fill(255);
            ellipse(this.x * SIZE + CHERRY_SIZE / 2, this.y * SIZE + CHERRY_SIZE / 2, CHERRY_SIZE);
            break;
    }
}