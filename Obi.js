const OBI_WIDTH = 100;
const OBI_FHEIGHT = 110;
const OBI_MAGICNUM = -47; // Somehow, the size of the sprite sheet is not what it says on my computer. 
const OBI_GROUND = -400;
const OBI_SCALE = 3.2;
var SCENE = 1;

function Obi(aGameEngine) {
    this.gameEngine = aGameEngine;
    this.obiwan_sprites_right = AM.getAsset("./img/obiwan_sprites_right.png");
    this.obiwan_sprites_left = AM.getAsset("./img/obiwan_sprites_left.png");
    this.x = 10;
    this.y = 600;
    this.delta_x = 2;
    this.delta_y = 3.3;
    this.flag = true;
    // this.ground = 500;
    // this.height = 0;

// Animation object: obiwan_sprites_right, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse
// W: 100 H: 110
    /** Right Animations */
    this.attack1RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*25 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 9, false, false); // Anim #25
    this.attack2RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*26 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 10, false, false); // Anim #26
    this.sprintRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*7 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, false, false); // Anim #7
    this.sprintBackwardsRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*7 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, false, true); // Anim #7
    this.idleRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*0 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.2, 5, true, false); // Anim #0
    this.jumpRightReverseAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*10 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 20, false, false); // Anim #10
    this.jumpRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*10 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 20, false, true); // Anim #10

    this.block1RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*11 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 7, false, false); // Anim #11
    this.stopBlock1RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*12 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 3, false, false); // Anim #12
    this.block2RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*13 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 4, false, false); // Anim #13
    this.stopBlock2RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*14 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, false); // Anim #12
    this.block3RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*15 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 3, false, false); // Anim #15
    this.stopBlock3RightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*16 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, false); // Anim #12

    this.startWalkRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*1 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, false); // Anim #1
    this.startWalkBackwardsRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*1 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, true); // Anim #1
    this.walkRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*2 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, false, false); // Anim #2
    this.walkBackwardsRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*2 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, false, true); // Anim #2
    this.stopWalkRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*3 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, false); // Anim #3
    this.stopWalkBackwardsRightAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*3 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 2, false, false); // Anim #3
    
    this.victoryAnim = new Animation(this.obiwan_sprites_right, 0, OBI_FHEIGHT*56 + OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.1, 19, true, false);

    /** Left Animations */
    this.attack1LeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*25, OBI_WIDTH, OBI_FHEIGHT, 0.05, 9, false, true); // Anim #25
    this.attack2LeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*26, OBI_WIDTH, OBI_FHEIGHT, 0.05, 10, false, true); // Anim #26
    this.sprintLeftAnim = new Animation(this.obiwan_sprites_left, OBI_WIDTH*8, OBI_FHEIGHT*7+OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, true, true); // Anim #7
    this.sprintBackwardsLeftAnim = new Animation(this.obiwan_sprites_left, OBI_WIDTH*8, OBI_FHEIGHT*7+OBI_MAGICNUM, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, true, false); // Anim #7
    this.idleLeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*0, OBI_WIDTH, OBI_FHEIGHT, 0.15, 5, true, true); // Anim #0
    this.jumpLeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*10, OBI_WIDTH, OBI_FHEIGHT, 0.05, 20, false, true); // Anim #10
    this.walkLeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*2, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, true, true); // Anim #10
    this.walkBackwardsLeftAnim = new Animation(this.obiwan_sprites_left, 0, OBI_FHEIGHT*2, OBI_WIDTH, OBI_FHEIGHT, 0.05, 12, true, false); // Anim #10

    this.attacking = false;
    this.switchAttack = true;
    this.blocking = false;
    this.switchBlock = true;
    this.jumping = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.walkRight = false;
    this.isVictorious = false;
    this.idle = false;
}

Obi.prototype = new Entity();
Obi.prototype.constructor = Obi;

Obi.prototype.update = function() {
    if (SCENE === 1) {
        this.movingRight = true;
        this.gameEngine.entities[0].shouldScroll = true;
        this.gameEngine.entities[4].fly = true;
        // var that = this;
        // setTimeout(()=>{
        //     that.gameEngine.entities[5].fly = true;
        // }, 233);
        if (this.sprintRightAnim.isDone()){
            this.sprintRightAnim.elapsedTime = 0;
            this.movingRight = false;
            this.gameEngine.entities[0].shouldScroll = false;
        	SCENE++;
        }
    } else if (SCENE === 2) {
        this.blocking = true;
        // this.gameEngine.entities[5].fly = true;
        if (this.block1RightAnim.isDone()){
            this.block1RightAnim.elapsedTime = 0;
            this.blocking = false;
            this.switchBlock = !this.switchBlock;
            SCENE+=3;
        }
    } else if (SCENE === 3) {
        this.blocking = true;
        if (this.block2RightAnim.isDone()){
            this.block2RightAnim.elapsedTime = 0;
            this.blocking = false;
            this.switchBlock = !this.switchBlock;
            SCENE++;
        }
    } else if (SCENE === 4) {
        this.movingLeft = true;
        this.gameEngine.entities[0].shouldScroll = true;
        this.gameEngine.entities[2].scrollable = true;
        if (this.walkBackwardsRightAnim.isDone()){
            this.walkBackwardsRightAnim.elapsedTime = 0;
            this.movingLeft = false
            this.gameEngine.entities[0].shouldScroll = false;
            this.gameEngine.entities[2].scrollable = false;
            SCENE++;
        }
    } else if (SCENE === 5) {
        this.jumping = true;
        // this.gameEngine.entities[2].movingLeft = true;
        this.x += this.delta_x;
        this.gameEngine.entities[5].delta_x = 25;
        this.gameEngine.entities[5].fly = true;
        this.gameEngine.entities[2].movingLeft = true;
        this.gameEngine.entities[2].x -= 6.5;
        console.log("Trooper x: " + this.gameEngine.entities[2].x + "Trooper y: " + this.gameEngine.entities[2].y);
        if ((this.jumpRightAnim.totalTime/2 - this.jumpRightAnim.elapsedTime) < 0) {
            this.y += this.delta_y * this.delta_y;
        } else {
            this.y -= this.delta_y * this.delta_y;
        }
        if (this.jumpRightAnim.isDone()){
            this.jumpRightAnim.elapsedTime = 0;
            this.jumping = false;
            this.gameEngine.entities[2].movingLeft = false;
            console.log("Trooper x: " + this.gameEngine.entities[2].x + "Trooper y: " + this.gameEngine.entities[2].y);
            SCENE++;
        }
    } else if (SCENE === 6) {
        this.walkRight = true;
        this.gameEngine.entities[2].idleLeft = true;
        this.x += 7.5;
        if (this.walkRightAnim.isDone()) {
            this.walkRightAnim.elapsedTime = 0;
            this.walkRight = false;
            this.gameEngine.entities[2].idleLeft = false;
            SCENE++;
        }
    } else if (SCENE === 7) {
        this.attacking = true;
        this.gameEngine.entities[2].hurting = true;
        if (this.attack1RightAnim.isDone() || this.attack2RightAnim.isDone()) {
            this.switchAttack = !this.switchAttack;
            this.attack1RightAnim.elapsedTime = 0;
            this.attack2RightAnim.elapsedTime = 0;
            this.attacking = false;
            this.gameEngine.entities[2].hurting = false;
            this.gameEngine.entities[2].hurtingAnim.elapsedTime = 0;
            SCENE++;
        }
    } else if (SCENE === 8) {
        if (this.flag){
            this.attacking = true;
        }
        this.gameEngine.entities[2].dying = true;
        if (this.attack1RightAnim.isDone() || this.attack2RightAnim.isDone() || this.gameEngine.entities[2].dieLeftAnim.isDone()) {
            this.attack1RightAnim.elapsedTime = 0;
            this.attack2RightAnim.elapsedTime = 0;
            this.attacking = false;
            this.flag = false;
            this.idle = true;
            if (this.gameEngine.entities[2].dieLeftAnim.isDone()){
                this.gameEngine.entities[2].dying = false;
                this.flag = true;
                SCENE++;
            }
        }
        
        // if (this.gameEngine.entities[2].dieLeftAnim.isDone()) {
        //     this.gameEngine.entities[2].dying = false; 
        // }
    } else if (SCENE === 9) {
        this.idle = false;
        this.isVictorious = true;
        this.gameEngine.entities[2].dead = true;
        if (this.gameEngine.entities[2].deadAnim.isDone()) {
            this.gameEngine.entities[2].deadAnim.elapsedTime = 0;
        }
    }
}

Obi.prototype.draw = function() {
    if (this.attacking && !this.jumping) {
        if (this.switchAttack) {
            this.attack1RightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
        } else {
            this.attack2RightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
        }
    } else if (this.blocking && !this.jumping) {
        if (this.switchBlock) {
            this.block1RightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
        } else {
            this.block2RightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
        }
    } else if (this.jumping) {
        this.jumpRightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    } else if (this.movingRight) {
        this.sprintRightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    } else if (this.movingLeft) {
        // this.sprintLeftAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
        this.walkBackwardsRightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    } else if (this.walkRight) {
        this.walkRightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    } else if (this.isVictorious) {
        this.victoryAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    } else if (this.idle) {
        this.idleRightAnim.drawFrame(gameEngine.clockTick, ctx, this.x, this.y+OBI_GROUND, OBI_SCALE);
    }
}