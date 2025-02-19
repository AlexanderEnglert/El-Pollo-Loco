class Statusbarbottle extends Statusbarall{
    
    images = [
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
       'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]
    

    /**
     * Here an array full of images is passed to a function.
     * The variable y is initialized and another function is called.
     */
    constructor(){
        super();
        this.loadImageAll(this.images)
        this.y = 0
        this.setPercentage(0, false)
    }
}