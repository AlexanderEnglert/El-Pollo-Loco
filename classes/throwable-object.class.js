class ThrowableObject extends MoveableObject {
    
    imagesBottle = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    /**
     * 
     * The array full of images is transferred to a function.
     * Then x, y , height, width and world are initialized.
     * This is followed by a function call. 
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} world 
     */
    constructor(x, y, world) {
        super();
        this.loadImageAll(this.imagesBottle);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 60;
        this.world = world;
        if (this.world) {
            this.throw(); 
        }
    }


    /**
     * Speedy is initialized here and a function call follows.
     * An interval is started, the variable x is initialized and an animation is played.
     * When the bottle has reached the bottom, a function is executed and then another function is executed.
     * 
     */
    throw() {
        this.speedY = 21;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 21;
            this.playAnimation(this.imagesBottle);
            if (this.y >= 330 && this.y <= 380) {
                this.removeBottle();
            }
            this.checkCollisionWithPlatforms();
        }, 50);
        setTimeout(() => {
            this.removeBottle();
        }, 3000);
    }


    /**
     * Here it is checked whether a bottle collides with a platform, if this is the case, a function is then executed.
     * The next if condition checks whether the bottle hits the platform from below; if this is the case, a function is executed.
     */
    checkCollisionWithPlatforms() {
        this.world.level.plato.forEach((plato) => {
            if (this.isColliding(plato) && this.y + this.height >= 210 && this.y + this.height <= 260) {
                setTimeout(() => {
                    this.removeBottle();
                }, 30);
            }
            if (this.isColliding(plato) && this.y + this.height >= plato.y && this.y < plato.y) {
                setTimeout(() => {
                    this.removeBottle();
                }, 20);
            }
        });
    }
    

    /**
     * The interval is emptied and in the following if condition the bottle that was thrown is removed from the list of thrown objects.
     */
    removeBottle() {
        clearInterval(this.throwInterval);
        if (this.world && this.world.throwableObject) {
            const index = this.world.throwableObject.indexOf(this);
            if (index > -1) {
                    this.world.throwableObject.splice(index, 1);
            }
        }
    }
}
