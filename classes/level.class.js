class Level {
    enemies
    clouds;
    coin;
    bottle;
    plato;
    backgroundObjects = [];
    level_end_x = 4600;


    /**
     * The transferred parameters are initialized here and a function is called.
     * 
     * @param {*} enemies 
     * @param {*} clouds 
     * @param {*} coin 
     * @param {*} bottle 
     * @param {*} plato 
     */
    constructor(enemies, clouds, coin, bottle, plato) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coin = coin;
        this.bottle = bottle;
        this.plato = plato;
        this.backgroundObjectFill();
    }


    /**
     * The background is created here and pushed into an array.
     */
    backgroundObjectFill() {
        for (let i = 0; i < 5; i++) {
            this.backgroundObjects.push(
                new Background('img/5_background/layers/air.png', 719 * 2 * i),
                new Background('img/5_background/layers/3_third_layer/1.png', 719 * 2 * i),
                new Background('img/5_background/layers/2_second_layer/1.png', 719 * 2 * i),
                new Background('img/5_background/layers/1_first_layer/1.png', 719 * 2 * i),
                new Background('img/5_background/layers/air.png', 719 * (2 * i + 1)),
                new Background('img/5_background/layers/3_third_layer/2.png', 719 * (2 * i + 1)),
                new Background('img/5_background/layers/2_second_layer/2.png', 719 * (2 * i + 1)),
                new Background('img/5_background/layers/1_first_layer/2.png', 719 * (2 * i + 1))
            );
        }
    }
}


