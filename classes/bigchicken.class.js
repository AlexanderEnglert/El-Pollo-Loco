class BigChicken extends MoveableObject {
    height = 80;
    width = 100;
    x = 300 + Math.random() * 4350;
    y = 325;
    
    chickenBigImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    chickenDieBigImages = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    
    /**
     * Here, a function call is used to load an image and the remaining images in the array are loaded in the subsequent function.
     * In addition, each bigchicken is given a random speed and is animated using the animate function.
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImageAll(this.chickenBigImages);
        this.speed = 0.15 + Math.random() * 0.3
        this.animate();   
    }


    /**
     * The first interval checks whether the stop button has been pressed. 
     * Afterwards, a check is made to ensure that the chicken is not dead, and if it is, a function is executed. 
     * In the next interval, an animation is executed in the If query whether the chicken is dead, which plays the dying images.
     */
   animate() {
        setInterval(() => {
            if (isPaused) {
                return;
            }
            if (!this.chickenIsDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (isPaused) return;
            if (!this.chickenIsDead) { 
                this.playAnimation(this.chickenBigImages);
            }
        }, 100);
    }
}