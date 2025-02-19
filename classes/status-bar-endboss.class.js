class Statusbarendboss extends Statusbarall{

    images = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
       
    ]

    /**
     * Here an array full of images is passed to a function.
     * The variable y and x is initialized and another function is called.
     */
    constructor(){
        super().loadImage
        this.loadImageAll(this.images)
        this.y = 10
        this.x = 480
        this.setPercentage(100)
    }
}