class Character extends MoveableObject {
    height = 220;
    width = 100;
    y = 100;
    speed = 8
    isJumpingOnEnemy = false;
    otherDirection = false;
    isStandingOnPlatform = false;
    lastMovementTime = new Date().getTime();
    idleTime = 0;
    almostSleepStarted = false; 
    sleepStarted = false; 

    offset = {
        top: 0,
        bottom: 10,
        left: 20,
        right: 20,
    };

    world;
    walkingSound = new Audio('./audio/walking_sound.mp3')
    snoreSound = new Audio('./audio/snore_Char.mp3')
    jumpSound = new Audio('./audio/jump_sound.mp3')
    hurtSound = new Audio('./audio/hit_sound.mp3')

    imagesMoving = [
        'img/2_character_pepe/2_walk/W-21.png', 
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    imagesJumping= [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    imagesHurt= [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    imagesDie= [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    imagesAlmostSleep = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    imagesSleep = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    
    /**
     * The initial image of the character is loaded and then the array of filled images is transferred to the respective function.
     * The Animate function and the applyGravity function are then executed. 
     */
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImageAll(this.imagesMoving);
        this.loadImageAll(this.imagesJumping);
        this.loadImageAll(this.imagesHurt);
        this.loadImageAll(this.imagesDie);
        this.loadImageAll(this.imagesAlmostSleep);
        this.loadImageAll(this.imagesSleep);
        this.animate();
        this.applyGravity()
        this.soundAdd()
    }


    /**
     * The initialized sounds are then added to the SoundManager array and the volume is set to 1.
     */
    soundAdd(){ 
        SoundManager.addSound(this.walkingSound);
        SoundManager.addSound(this.snoreSound);
        SoundManager.addSound(this.jumpSound);
        SoundManager.addSound(this.hurtSound);   
        this.walkingSound.volume = 0.6;
        this.snoreSound.volume = 0.3;
        this.jumpSound.volume = 0.5;
        this.hurtSound.volume = 0.2;
    }


    /**
     * At the first interval, the system first checks whether the stop button has been pressed; if this is the case, the function is canceled.
     * If this is not the case, the following functions are triggered and the camera is moved a little in x direction.
     * The second interval also checks whether the stop button has been pressed. The current time is then saved in a variable.
     * In addition, another variable is created and the last time of the movement is subtracted from the current time. A function is then executed.
     */
    animate() {
        setInterval(() => {
            if (isPaused) return;
            this.rightLeftMovement();
            this.upMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if (isPaused) return;
            let currentTime = new Date().getTime();
            this.idleTime = (currentTime - this.lastMovementTime) / 1000;
            this.characterCharacteristic(); 
        }, 100);
    }
    

    /**
     * This checks whether the respective functions are currently active and an animation is executed depending on this.
     */
    characterCharacteristic() {
        if (this.isDead()) {
            this.characterIsDead();
        } else if (this.isHurt()) {
            this.characterIsHurt();
        } else if (this.isAboveGround() && !this.isOnPlato()) {
            this.characterIsNotOnPlato();
        } else if (this.idleTime >= 10 && !this.sleepStarted) {
            this.startSleepAnimation();
            this.sleepStarted = true;
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.imagesMoving);
        } 
        else{
            this.characterdIdle();
        }
    }
    

    /**     
    * When the character is dead, the dead animation is played and the sounds in the sound manager are muted.     
    * A timeout function is then played in which the GameOver screen is presented.     
    * In addition, the walking sound is stopped and reset and the game over sound is played.     
    * Then a function is executed, html code is added to an id and another function is called after the timeout function.     
    */
    characterIsDead(){
        this.sleepStarted = true;
        this.playAnimation(this.imagesDie);  
        if(stopSoundOn == false){ stopSound(true);} 
        isPaused = true
        setTimeout(() => {
            document.getElementById('GameOverPicID').src = "img/9_intro_outro_screens/game_over/game over!.png";
            document.getElementById('GameOverScreenID').classList.remove('none');
            document.getElementById('GameOverScreenID').classList.add('GameOverScreen');
            const isMuted = getMutedFromLocalStorage();
            if(!isMuted){ this.playGameOverSound() }
            document.getElementById('PlaymenuButtonID1').innerHTML=`<i class="fa-solid fa-pause"></i>`;
        }, this.imagesDie* 400); 
    }


    /**
     * If the character does not move within a short time, the if condition is executed and the almost sleep animation is played.
     */
    characterdIdle() {
        if (this.idleTime < 10) {
            this.playAnimation(this.imagesAlmostSleep);
        }
    }
    

    /**
     * The Hurt animation is called up here, because the appropriate Hurt sound is played and another function is called up.
     */
    characterIsHurt(){
        this.resetIdleTimer()
        this.playAnimation(this.imagesHurt);
        this.hurtSound.play();
        setInterval(() => {
            this.sleepStarted = true;
        }, 100);
    }


    /**
     * The Jump animation is called up and an action is executed.
     */
    characterIsNotOnPlato(){
        this.playAnimation(this.imagesJumping);
        this.resetIdleFlags();
    }


    /**
     * This checks whether the user has pressed the right or left button. Depending on this, the moveRight or the moveleft function is called up 
     * and then the walking sound is played and a function is executed.
     */
    rightLeftMovement() {
        const endboss = this.world.endboss;
        if (!endboss) return; 
        const distanceToEndboss = Math.abs(endboss.x - this.x);
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && (distanceToEndboss > 60) && this.x < endboss.x) {
            this.otherDirection = false;
            this.moveRight();
            if (this.walkingSound.paused) {  this.walkingSound.play(); }
            this.resetIdleTimer();
        } else if (this.world.keyboard.LEFT && this.x > 105) {
            this.otherDirection = true;
            this.moveLeft();
            if (this.walkingSound.paused) { this.walkingSound.play(); }
            this.resetIdleTimer();
        } else {
            if (!this.walkingSound.paused) { this.walkingSound.pause(); }
        }
    }
    
    
    /**
     * It is checked whether the user has pressed the Up button, if this is the case the jump animation is executed, 
     * because the appropriate sound is played and a function is called.
     */
    upMovement(){
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isOnPlato() && !this.isUnderPlatform()) {
            this.moveJump();
            this.jumpSound.play();
            this.resetIdleTimer();
        }
    }


    /**
     * In this interval, the system first checks whether the stop button has been pressed; if this is not the case, a check is made at the first if query,
     * whether the character is already asleep and proceed accordingly. In the second if query, if the sound is paused, it is played again. Afterwards 
     * the sleep animation is played.
     */
    startSleepAnimation() {
        let sleepAnimationInterval = setInterval(() => {
            if (isPaused) return;
            if (!this.sleepStarted) {
                clearInterval(sleepAnimationInterval);
                return;
            }
            if (this.snoreSound.paused) {
                this.snoreSound.play();
            }
            this.playAnimation(this.imagesSleep);
        }, 150);
    }
    

    /**
     * In this function, snoring is stopped and the playback status is reset. In addition, lastMovementTime is assigned the current time and 
     * of the variable idleTime is set to 0. Then another function is executed.
     */
    resetIdleTimer() {
        this.snoreSound.pause()
        this.snoreSound.currentTime = 0;
        this.lastMovementTime = new Date().getTime();
        this.idleTime = 0;
        this.resetIdleFlags();
    }


    /**
     * Here, the variables almostSleepStarted and sleepStarted are assigned the Boolean false.
     */
    resetIdleFlags() {
        this.almostSleepStarted = false; 
        this.sleepStarted = false;
    }

    
    /**
     * This checks whether the character is on the platform and, depending on this, the corresponding Boolean is returned in the returned variable.
     * 
     * @returns  
     * 
     */
    isOnPlato() {
        let footXLeft = this.x + 60; 
        let footXRight = this.x + this.width - 60; 
        this.isStandingOnPlatform = false;
        this.world.level.plato.forEach((plato) => {
            if (footXLeft >= plato.x &&footXRight <= plato.x + plato.width &&Math.abs((this.y + this.height - this.offset.bottom) - plato.y) <= 5 && this.speedY <= 0) {
                this.isStandingOnPlatform = true;
                this.y = plato.y - (this.height - this.offset.bottom); 
            }
        });
        return this.isStandingOnPlatform;
    }

    
    /**
     * Function to completely stop and reset the background sound.
     */
    stopBackgroundSound() {
        if (this.backgroundSound) {
            this.backgroundSound.pause();
            this.backgroundSound.currentTime = 0;
        }
    }


    /**
     * Several values are reset here.
     */
    resetCharacter() {
        this.energyCharacter = 100;
        this.stopBackgroundSound();
        this.x = 0; 
        this.y = 100;
    }


     /**
     * Plays the game over sound without creating a new instance.
     */
     playGameOverSound() {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
}