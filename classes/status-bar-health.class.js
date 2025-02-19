class Statusbarhealth extends Statusbarall{

    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]


    /**
     * Here an array full of images is passed to a function.
     * The variable y is initialized and another function is called.
     */
    constructor(){
        super();
        this.loadImageAll(this.images)
        this.y = 90;
        this.setPercentage(100)
    }
}