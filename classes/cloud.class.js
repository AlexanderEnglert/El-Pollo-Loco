class Cloud extends MoveableObject {
    height = 250
    width = 400


    /**
     * 
     * The initial image is loaded and the x value, speed and y value are assigned. 
     * The Animate function is then executed.
     * 
     * @param {*} x 
     */
    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x =  x;
        this.speed = 0.15
        this.y = 50;
        this.animate();
    }


    /**
     * The interval checks whether the stop button has been pressed; if this is not the case, another function is called up.
     */
    animate(){
        setInterval(() => {
            if (isPaused) {
                return;
            }
            this.moveLeft();
        }, 1000 / 60);
    }
}