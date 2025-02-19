class Statusbarcoins extends Statusbarall{

    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]


    /**
     * Here an array full of images is passed to a function.
     * The variable y is initialized and another function is called.
     */
    constructor(){
        super().loadImage
        this.loadImageAll(this.images)
        this.y = 45
        this.setPercentage(0, false) 
    }
}