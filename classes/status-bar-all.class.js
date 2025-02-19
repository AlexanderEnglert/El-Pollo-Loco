class Statusbarall extends DrawableObject{
    width = 200
    height = 60
    x = 30;


    /**
     * Depending on which parameter you receive, the corresponding screen is called up.
     * 
     * @param {*} percentage 
     */
    setPercentage(percentage, boolean){
        this.percentage = percentage;
        let imagePath = this.images[this.imageIndexBack(boolean)]
        this.img = this.imageSave[imagePath];
    }

    
    /**
     * Depending on what is in the parameter, you jump to the respective query and receive the corresponding return value.
     * @returns 
     */
    imageIndexBack(boolean){        
        if(this.percentage == 100){
            return 5;
        } else if(this.percentage >= 80){
            return 4;
        } else if(this.percentage >= 60){
            return 3;
        } else if(this.percentage >= 40){
            return 2;
        } else if(this.percentage >= 20){
            return 1;
        } 
        else{
            return this.imageIndexCondition(boolean);
        }
    }


    /**
     * A parameter is passed and the value it contains is checked.
     * 
     * @param {*} boolean 
     * @returns 
     */
    imageIndexCondition(boolean){
        if(boolean == true){
            if(this.percentage <= 20 && this.percentage > 0) return 1;
            if(this.percentage == 0) return 0;
        } else{ 
            return 0
        }
    }
}

