class Coin extends MoveableObject {
    height = 120;
    width = 120;

    imagesCoins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]


    /**
     * The initial image is loaded and the x value and y value are assigned.
     * The Animate function is then executed.
     * 
     * @param {*} x 
     * @param {*} y 
     */
    constructor (x, y){
        super().loadImage(this.imagesCoins[0]);
        this.loadImageAll(this.imagesCoins);
        this.y = y;
        this.x = x;
        this.coinsAnimate();
    }


    /**
     * The interval checks whether the stop button has been pressed; if this is not the case, another function is called up.
     */
    coinsAnimate(){
        setInterval(() => {
            if (isPaused) return;
            this.playAnimation(this.imagesCoins)
        }, 220);
    }
}