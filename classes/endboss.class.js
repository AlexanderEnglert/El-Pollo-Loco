class Endboss extends MoveableObject {
    height = 480;
    width = 280;
    y = -50;
    x = 4500;
    isAttacking = false;
    isHurt = false;
    
    chickenImages = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    chickenHurtEndbossImages = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    chickenDieEndbossImages = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    chickenRunEndbossImages = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    chickenAttackEndbossImages = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    /**
     * First the initial image is loaded and then the arrays with the images are passed to a function. 
     * Speed is initialized and the animation function is called.
     */
    constructor() {
        super().loadImage(this.chickenImages[0]);
        this.loadImageAll(this.chickenImages);
        this.loadImageAll(this.chickenHurtEndbossImages);
        this.loadImageAll(this.chickenDieEndbossImages);
        this.loadImageAll(this.chickenRunEndbossImages);
        this.loadImageAll(this.chickenAttackEndbossImages);
        this.speed =  2.5;
        setTimeout(() => {
            if (this.world) {
                this.animate();
            }
        }, 150);
    }


    /**
     * When the stop button is pressed or the endboss is dead, the chicken sound stops.
     * Then the chicken sound is played and if the final boss is neither dead nor hit, an animation is played.
     * In the next interval, if the stop button is not pressed or the end boss is not dead and the chicken is hit, an animation is played.
     */
    animate() {
        setInterval(() => {
            if (isPaused || this.endbossChickenIsDead) { return;}
            const distanceToCharacter = Math.abs(this.world.character.x - this.x);
            if (!this.endbossChickenIsDead && distanceToCharacter <= 500 && this.world.character.x < this.x) {
                this.endbossAnimations();
            }
        }, 200);
        setInterval(() => {
            if (isPaused || this.endbossChickenIsDead) return;
            const distanceToCharacter = Math.abs(this.world.character.x - this.x);
            if (!this.endbossChickenIsDead && !this.isHurt && distanceToCharacter <= 500 && this.x > 2900 && this.world.character.x < this.x) {
                this.moveLeft(); 
            }
        }, 1000 / 60);
    }
    
    
    /**
     * Depending on which state the end boss has or is in, the corresponding animation is played.
     */
    endbossAnimations(){
        if (this.isHurt) {
            this.playAnimation(this.chickenHurtEndbossImages);
        } else if (this.isAttacking) {
            this.playAnimation(this.chickenAttackEndbossImages);
        } else if (this.x > 2900) {
            this.playAnimation(this.chickenRunEndbossImages);
        }
        else if (this.x == this.x) {
            setTimeout(() => {
                this.playAnimation(this.chickenImages)
            }, 100);
        }
    }


    /**
     * This stops the animation, resets the flags and sets the speed to 0.
     */
    stopAnimations() {
        this.isAttacking = false;
        this.isHurt = false;
        this.speed = 0;
    }


    /**
     * The damage, the hurt animation images and the animation images are transferred here.
     * 
     * @param {*} damage 
     */
    handleHit(damage) {
        this.endbossDead(damage, this.chickenHurtEndbossImages, this.chickenDieEndbossImages);
    }
}





