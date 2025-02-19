class Background extends MoveableObject{
    width = 720;
    height = 460;


    /**
     * 
     * The path of the image is passed in order to load the image afterwards. Then the y value and the x value are added.
     * 
     * @param {*} imagePath 
     * @param {*} x 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 460 - this.height;
        this.x = x;
    }
}