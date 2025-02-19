class Bottle extends MoveableObject {
    x;
    y;
    height = 100;
    width = 60;

    imagesBottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    
    /**
     * The initial image is loaded and then each image in the array is transferred to a function. 
     * The x and y coordinates are assigned and the animation function is then executed.
     * 
     * @param {*} x 
     * @param {*} y 
     */
    constructor (x, y){
        super().loadImage(this.imagesBottle[0]);
        this.loadImageAll(this.imagesBottle);
        this.y = y;
        this.x = x;
        this.bottleAnimate();
    }


    /**
     * The interval first checks whether the stop button has been pressed. 
     * The play animation is then executed.
     */
    bottleAnimate(){
        setInterval(() => {
            if (isPaused) return;
            this.playAnimation(this.imagesBottle)
        }, 220);
    }
}