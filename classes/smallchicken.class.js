class SmallChicken extends MoveableObject {
    height = 40;
    width = 60;
    x = 300 + Math.random() * 4350;
    y = 365;
    energySmallChicken = 100;
    
    chickenSmallImages = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    chickenDieSmallImages = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]


    /**
     * The initial image of the chicken is passed, then an array filled with images is passed to a function.
     * The variable speed is initialized here and then the animation function is called.
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImageAll(this.chickenSmallImages);
        this.speed = 0.15 + Math.random() * 0.3
        this.animate();
    }


    /**
     * The first interval checks whether the stop button has been pressed. 
     * Afterwards, a check is made to ensure that the chicken is not dead, and if it is, a function is executed. 
     * In the next interval, an animation is executed in the If query whether the chicken is dead, which plays the dying images.
     */
    animate (){
        setInterval(()=> {
            if (isPaused) return;
            if (!this.chickenIsDead) {  
                this.moveLeft();
            }
        },1000 / 60);
        setInterval(() => {
            if (isPaused) return;
            if (!this.chickenIsDead) {
                this.playAnimation(this.chickenSmallImages);
            }
        }, 100);
    }
}