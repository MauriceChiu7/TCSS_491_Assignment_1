var AM = new AssetManager();
var canvas = document.getElementById("gameWorld");
var ctx = canvas.getContext("2d");
var gameEngine = new GameEngine();

AM.queueDownload("./img/deck.png");
AM.queueDownload("./img/obiwan_sprites_right.png");
AM.queueDownload("./img/obiwan_sprites_left.png");
AM.queueDownload("./img/trooper_right.png");
AM.queueDownload("./img/trooper_left.png");
AM.downloadAll(function () {
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Background(gameEngine)); // entities[0]
    gameEngine.addEntity(new Obi(gameEngine)); // entities[1]
    gameEngine.addEntity(new Trooper(gameEngine)); // entities[2]
    gameEngine.addEntity(new Trooper(gameEngine)); // entities[3]
    gameEngine.addEntity(new Blast(gameEngine)); // entities[4]
    gameEngine.addEntity(new Blast(gameEngine)); // entities[5]
    gameEngine.addEntity(new Blast(gameEngine)); // entities[6]
});

function Background(aGameEngine, aImage) {
    this.gameEngine = aGameEngine;
    this.ctx = gameEngine.ctx;
    this.x = 0;
    this.y = 0;
    this.background = AM.getAsset("./img/deck.png");
    
    this.shouldScroll = false;
    this.scrollRunBg = false;
    this.scrollBackupBg = false;
    this.stillBg = false;

    // Animation object: obiwan_sprites_right, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    this.scrollRunBgAnim = new Animation(this.background, 0, 0, 689, 400, 0.1, 12, true, false);
    this.scrollBackupBgAnim = new Animation(this.background, 0, 0, 689, 400, 0.1, 12, true, true);
    this.stillBgAnim = new Animation(this.background, 0, 0, 689, 400, 1, 1, true, false);
}

Background.prototype.update = function() {
    if (this.gameEngine.entities[1].movingRight === true && this.shouldScroll === true) {
        this.scrollRunBg = true;
        this.scrollBackupBg = false;
        this.stillBg = false;
    } else if (this.gameEngine.entities[1].movingLeft === true && this.shouldScroll === true) {
        this.scrollRunBg = false;
        this.scrollBackupBg = true;
        this.stillBg = false;
    } else {
        this.scrollRunBg = false;
        this.scrollBackupBg = false;
        this.stillBg = true;
    }
}

Background.prototype.draw = function () {
    if (this.scrollRunBg) {
        this.scrollRunBgAnim.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1.5);
    } else if (this.scrollBackupBg) {
        this.scrollBackupBgAnim.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1.5);
    } else {
        this.stillBgAnim.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, 1.5);
    }
}