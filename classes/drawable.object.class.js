class DrawableObject {
    x = 120;
    y = 280;
    imageSave = {};
    img;
    height = 150;
    width = 64;
    currentImage = 0

    
    /**
     * A new image is created using the path that was transferred.
     * 
     * @param {*} path 
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * An array is passed here and each path in this array is read out and the respective image is created.
     * 
     * @param {*} array 
     */
    loadImageAll(array){
        array.forEach(path => {
            this.img = new Image();
            this.img.src = path
            this.imageSave[path] = this.img;
        });
    }


    /**
     * Here I get the height, width, x, y and the image. The image is then drawn using the data.
     * 
     * @param {*} ctx 
     */
    drawBorderBox(ctx){
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        catch{}
    }

    
    /**
     * A rectangle is created around the object for the desired transfer.
     * 
     * @param {*} ctx 
     */
    drawRectangle(ctx) {
        if (this instanceof Character ||this instanceof BigChicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "transparent";
            if(this instanceof Character){
                ctx.rect(this.x + 10, this.y + 80, this.width - 30, this.height - 90);
            }
            else{
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }
}