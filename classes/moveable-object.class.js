class MoveableObject extends DrawableObject{
    speed = 0.15
    speedY = 0;
    acceleration = 2.5;
    energyCharacter = 100;
    energyChicken = 100;
    endbossChickenEnergy = 100;
    lastHit = 0;
    chickenIsDead = false;
    endbossChickenIsDead = false
    world = null;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    
    /**
     * This checks whether the world js file and the level js file exist.
     * A function is then assigned to a variable that outputs whether the character is on the platform.
     * If the character has a speedY of 0, it enters an if query where it is checked on which platform the character is located.
     */
    applyGravity() {
        setInterval(() => {
            if (!this.world || !this.world.level) {return; }
            let characterOnPlatform = this.isOnPlato();
            this.checkSpeedY(characterOnPlatform)
            let epsilon = 5;
            if(this.speedY === 0){
                this.world.level.plato.forEach((plato) => {
                    if (this.x + this.width > plato.x && this.x < plato.x + plato.width) {
                        this.characterOnPlato(epsilon, plato)
                    }
                });
            }
        }, 1000 / 25);
    }
    

    /**
     * If the character is not on the platform and is in the air, the gravity is executed.
     * If the character is not in the air, speedy 0 is set and then it is checked whether the character is in the air. 
     * Is not on the platform if this is the case, it is on the ground and receives the corresponding y value.
     * 
     * @param {*} characterOnPlatform 
     */
    checkSpeedY(characterOnPlatform){
        if (!characterOnPlatform && (this.isAboveGround() || this.speedY > 0)) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;
            if (!characterOnPlatform) {
                this.y = 190;
            }
        }
    }


    /**
     * The first If query checks whether the character has jumped to the platform. 
     * If this is the case, the y value of the character is adjusted and its speedy is set to 0.
     * The second If query checks whether the character collides with the side of the platform.
     * If this is the case, it is pushed slightly off the platform to prevent it from jumping through. 
     * He lands on the ground again with a negative speedy.
     * 
     * @param {*} epsilon 
     * @param {*} plato 
     */
    characterOnPlato(epsilon, plato){
        if(this.y != 5){
            if (Math.abs((this.y + this.height - this.offset.bottom) - plato.y) <= epsilon && this.speedY <= 0 ) {
                this.y = plato.y - (this.height - this.offset.bottom); 
                this.speedY = 0;
            }
           } 
            if ((this.y + this.height) > plato.y && this.y < plato.y + plato.height &&this.speedY > 0) {
                if (this.x < plato.x) {
                    this.x = plato.x - this.width;
                } else if (this.x + this.width > plato.x + plato.width) {
                    this.x = plato.x + plato.width; 
                }
                this.speedY = -10; 
            }
    }
 
    
    /**
     * If the character is on the platform, it only returns a false.
     * @returns 
     */
    isOnPlato() {
        return false;
    }
    

    /**
     * This function checks whether the character or the thrown object is above the ground, in the air or on a platform.
     * Depending on this, the corresponding behavior is returned using return.
     * 
     * @returns 
     */
    isAboveGround() {
        if (this.isOnPlato()) {
            return false; 
        }
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 180;
    }
    
    
    /**
     * This function checks whether the character is under the platform.
     * 
     * @returns 
     */
    isUnderPlatform() {
        let isUnder = false;
        if (this.world && this.world.level && this.world.level.plato) {
            this.world.level.plato.forEach((plato) => {
                if (this.x + this.width > plato.x && this.x < plato.x + plato.width && this.y < plato.y && this.y + this.height > plato.y && this.y > 180) {
                    isUnder = true;
                }
            });
        }
        return isUnder;
    }
    

    /**
     * Moves the corresponding object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the corresponding object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * The character may only jump if it is not under a platform or in the air.
     */
    moveJump() {
        if (!this.isUnderPlatform() && !this.isAboveGround()) {
            this.speedY = 30;
        }
    }
    

    /**
     * This function is used to play the animations.
     * 
     * @param {*} images 
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageSave[path];
        this.currentImage++;
    }


    /**
     * The collision with all objects that come into contact with the character is checked here.
     * 
     * @param {*} move 
     * @returns 
     */
    isColliding(move) {
        return (
            this.x + 10 + this.width - 30 > move.x + move.offset.left &&
            this.y + 80 + this.height - 90 > move.y + move.offset.top &&
            this.x + 10 < move.x + move.width - move.offset.right &&
            this.y + 80 < move.y + move.height - move.offset.bottom
        );
    }


    /**
     * The energy of the character decreases with each call.
     *  The current time is saved in a variable.
     */
    hit(damage){
        this.energyCharacter -= damage;
        if (this.energyCharacter < 0){
            this.energyCharacter = 0
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    
    /**
     * Energy is deducted from the respective chicken each time it is called up. 
     * If it is dead, the dead variable is set to true and the corresponding images are loaded.
     * 
     * @param {*} x 
     * @param {*} y 
     */
    chickenHit(x, y) {
        this.energyChicken -= x;
        if (this.energyChicken <= 0) {
            this.energyChicken = 0;
            this.chickenIsDead = true;
            this.loadImage(y);
        }
    }


    /**
     * First, the energy of the end boss is reduced and then an if condition is called if it is dead.
     * The dead variable is set to true and the death animation is played with the following game over screen.
     * The sounds in the sound manager are also muted.
     * If he is not dead, the injury variable is set to true and the injury animation is played.
     * The attacking animation is played directly after this.
     * 
     * @param {*} damage 
     * @param {*} hurtImages 
     * @param {*} dieImages 
     */
    endbossDead(damage, hurtImages, dieImages) {
        this.endbossChickenEnergy -= damage;
        if (this.endbossChickenEnergy <= 0) {
            this.endbossChickenEnergy = 0;
            this.endbossChickenIsDead = true;
            this.playDeathAnimation(dieImages);
            const isMuted = getMutedFromLocalStorage();
            if(stopSoundOn == false){ stopSound(true)} 
            isPaused = true
            this.winScreenShow(dieImages, isMuted)
        } else {
            this.speed = 4.5;
            this.isHurt = true;
            this.playAnimation(hurtImages);
            this.endbossAttackAnimation() }
    }


    /**
     * The Win Screen is displayed and the appropriate win sound is played.  
     * 
     * @param {*} dieImages 
     */
    winScreenShow(dieImages, isMuted){
        setTimeout(() => {
            document.getElementById('GameOverPicID').src = "img/9_intro_outro_screens/win/win_2.png";
            document.getElementById('GameOverScreenID').classList.add('GameOverScreen');
            document.getElementById('GameOverScreenID').classList.remove('none');
            if(!isMuted){ this.playWinSound() }
            document.getElementById('PlaymenuButtonID1').innerHTML=`<i class="fa-solid fa-pause"></i>`;
        }, dieImages.length * 400);
    }
    

    /**
     * If the end boss is not dead, the attack animation is played and then the run animation is played.
     */
    endbossAttackAnimation(){
        setTimeout(() => {
            if (!this.endbossChickenIsDead) {
                this.isHurt = false;
                this.isAttacking = true;
                this.playAnimation(this.chickenAttackEndbossImages);
                setTimeout(() => {
                    if (!this.endbossChickenIsDead) {
                        this.isAttacking = false; 
                        this.playAnimation(this.chickenRunEndbossImages);
                    }
                }, 100);
            }
        }, 600);
    }


    /**
     * In the If query, each frame of the death animation is played while the death image is displayed for a short time.
     * when the animation is finished, the last frame of the death animation is permanently displayed and then another function is executed.
     * 
     * @param {*} dieImages 
     */
    playDeathAnimation(dieImages) {
        let currentIndex = 0;
        const playNextImage = () => {
            if (currentIndex < dieImages.length) {
                this.loadImage(dieImages[currentIndex]);
                currentIndex++;
                setTimeout(playNextImage, 400);
            } else {
                this.loadImage(dieImages[dieImages.length - 1]);
                this.endbossChickenIsDead = true; 
                this.stopAnimations(); 
            }
        };
        playNextImage();
    }
    
    
    /**
     * The energy of the Character is 0 and this is returned.
     * @returns 
     */
    isDead(){
        return this.energyCharacter == 0;
    }


    /**
     * Here the elapsed time is calculated from the current time and the last hit and the result is returned.
     * @returns 
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    
    /**
     * Plays the game over sound without creating a new instance.
     */
    playWinSound() {
        youWinSound.currentTime = 0; 
        youWinSound.play();
    }
}