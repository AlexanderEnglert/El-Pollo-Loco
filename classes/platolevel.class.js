class Plato extends MoveableObject {
    

    /**
     * The image is loaded here and the height, width, x and y values are initialized.
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} hei 
     * @param {*} wid 
     */
    constructor(x, y, hei, wid){
        super().loadImage('img/JumpPlato/Plato.png')
        this.height = hei;
        this.width = wid;
        this.y = y;
        this.x = x;
    }
}