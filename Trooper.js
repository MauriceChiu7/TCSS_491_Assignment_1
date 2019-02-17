const FWIDTH_TROOPER = 62;
const FHEIGHT_TROOPER = 74;
const MAGICNUM_TROOPER = -47; // Somehow, the size of the sprite sheet is not what it says on my computer. 
const GROUND_TROOPER = -285;
const SCALE_TROOPER = 2.8;

function Trooper() {
    this.trooper_right = AM.getAsset("./img/trooper_rignt.png");
    this.trooper_left = AM.getAsset("./img/trooper_left.png");
    this.x = 1035;
    this.y = 620;
    this.delta_x = 6;

    // Animation object: trooper_right, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
    /** Laser Blast */
    // this.blast = new Animation(this.trooper_left, 3*FWIDTH_TROOPER, 0*FHEIGHT_TROOPER, FWIDTH_TROOPER, FHEIGHT_TROOPER, 1, 1, false, false);

    /** Left Animations */
    this.attackLeftAnim = new Animation(this.trooper_left, 4*FWIDTH_TROOPER, 0, FWIDTH_TROOPER, FHEIGHT_TROOPER, 0.05, 7, false, true);
    this.walkLeftAnim = new Animation(this.trooper_left, 2*FWIDTH_TROOPER, 1*FHEIGHT_TROOPER, FWIDTH_TROOPER, FHEIGHT_TROOPER, 0.1, 9, false, true);
    this.dieLeftAnim = new Animation(this.trooper_left, 0*FWIDTH_TROOPER, 4*FHEIGHT_TROOPER, FWIDTH_TROOPER, FHEIGHT_TROOPER, 0.1, 11, false, false);
    this.idleLeftAnim = new Animation(this.trooper_left, 4*FWIDTH_TROOPER, 0, FWIDTH_TROOPER, FHEIGHT_TROOPER, 1, 1, true, true);
    this.hurtingAnim = new Animation(this.trooper_left, 9*FWIDTH_TROOPER, 2*FHEIGHT_TROOPER, FWIDTH_TROOPER, FHEIGHT_TROOPER, 0.25, 2, false, false);
    this.deadAnim = new Animation(this.trooper_left, 10*FWIDTH_TROOPER, 4*FHEIGHT_TROOPER, FWIDTH_TROOPER, FHEIGHT_TROOPER, 1, 1, true, false);

    this.attacking = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.idleLeft = false;
    this.dying = false;
    this.hurting = false;
    this.scrollable = false;
    this.dead = false;
}

Trooper.prototype = new Entity();
Trooper.prototype.constructor = Trooper;

Trooper.prototype.update = function() {
    // if (this.scrollable && gameEngine.entities[1].movingRight) {
    //     this.idleLeft = true;
    //     this.x -= this.delta_x;
    //     if (this.idleLeftAnim.isDone()) {
    //         this.idleLeftAnim.elapsedTime = 0;
    //         this.idleLeft = false;
    //         this.scrollable = false;
    //     }
    // }
} 

Trooper.prototype.draw = function() {
    if (this.attacking) {
        this.attackLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    } else if (this.movingLeft) {
        this.walkLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    } else if (this.dying) {
        this.dieLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    } else if (this.hurting) {
        this.hurtingAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    } else if (this.dead) {
        this.deadAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    } else if (this.idleLeft) {
        this.idleLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+GROUND_TROOPER, SCALE_TROOPER);
    }
}

function Blast (aGameEngine) {
    this.gameEngine = aGameEngine;
    this.spriteSheetRignt = AM.getAsset("./img/trooper_right.png");
    this.spriteSheetLeft = AM.getAsset("./img/trooper_left.png");
    this.x = 1035;
    this.y = 385;
    this.delta_x = 20.35;
    this.blastRightAnim = new Animation(this.spriteSheetRight, 7*62, 0, 62, 74, 0.72, 1, false, false);
    this.blastLeftAnim = new Animation(this.spriteSheetLeft, 3*62, 0, 62, 74, 0.72, 1, false, false);
    this.fly = false;
}

Blast.prototype = new Entity();
Blast.prototype.constructor = Blast;

Blast.prototype.update = function() {
    if (this.fly === true) {
        this.x -= this.delta_x;
        if (this.blastLeftAnim.isDone()){
            this.blastLeftAnim.elapsedTime = 0;
            this.fly = false;
        }
    }
}

Blast.prototype.draw = function() {
    if (this.fly) {
        this.blastLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y, 1.5);
    }
}