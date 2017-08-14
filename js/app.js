// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Myrandom()*101;
    this.x = -101;
    this.y = Myrandom()*83-20;
};

var Myrandom = function() {
    var num = Math.random();
    num = Math.ceil(num*3);
    return num;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x<505) {
        this.x = this.x + dt*this.speed;
    }
    else {
        this.speed = Myrandom()*101;
        this.x = -101;
        this.y = (Myrandom()*83)-20;
    };        
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Enemy.call(this);
    Player.prototype = Object.create(Enemy.prototype);
    this.x = 2*101;
    this.y = 5*83-20;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    for (var enemy of allEnemies) {
        if (enemy.y===this.y) {
            console.log('y=', this.y);
            if (Math.abs(enemy.x-this.x)<50){
                console.log('x=');
                this.x = 2*101;
                this.y = 5*83-20;
            }          
        }
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    if (dir==='left' && this.x>=101)
        this.x = this.x - 101;
    if (dir==='down' && this.y<=4*83)
        this.y = this.y+83;
    if (dir==='right' && this.x<=3*101)
        this.x = this.x+101;
    if (dir==='up')
        if (this.y>=83)
            this.y = this.y-83;
        else if (this.y<83) {
            alert("you win!")
            this.y = 5*83-20;
            this.x = 2*101;
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player;
var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
