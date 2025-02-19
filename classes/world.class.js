class World{
    bottle = new ThrowableObject();
    character = new Character();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0
    statusBarHealth = new Statusbarhealth();
    statusBarBottle = new Statusbarbottle();
    statusBarCoins = new Statusbarcoins();
    statusBarEndboss = new Statusbarendboss();
    bigChickenHit = new BigChicken();
    throwableObject = []; 
    coinsCounter = 0;
    bottleCounter = 0;
    lastDamageTime = 0;
    lastEndbossDamageTime = 0; 
    canThrowBottle = true;
    damage = 20;
    newDamage = 100;
    bottleSound = new Audio('./audio/bottle_sound.mp3')
    coinsSound = new Audio('./audio/coins_sound.mp3')


    /**
     * This is where ctx, canvas and keyboard are initialized.
     * Several functions are then called up.
     * 
     * @param {*} canvas 
     */
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.assignWorldToLevelObjects();
        this.draw();
        this.walk(); 
        SoundManager.addSound(this.coinsSound);   
        SoundManager.addSound(this.bottleSound);
    }


    /**
     * Here, character, every opponent and every platform is able to connect to the world in order to use relevant properties and methods of the world.
     */
    assignWorldToLevelObjects() {
        this.level.enemies.forEach((enemy) => { 
            enemy.world = this; 
            if (enemy instanceof Endboss) {
                this.endboss = enemy; 
            }
        });
        this.level.plato.forEach((plato) => { 
            plato.world = this; 
        });
        this.character.world = this;
    }


    /**
     * The interval first checks whether the stop button has been pressed if this is not the case, several functions are executed.
     */
    walk(){
        setInterval(() => {
            if (isPaused) return;
            this.elementsCollisions();
            this.checkThrowObjects();
            this.collisionCoins();
            this.collisionBottle();
            this.bottleEnemyCollision();
        }, 80);
    }


    /**
     * This checks whether the bottle collides with an opponent; if this is the case, two functions are executed.
     * This is followed by an If condition that checks whether the opponent is dead and not the final boss.
     * When this happens, the array is updated and the dead opponent is removed.
     */
    bottleEnemyCollision() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.checkBottleCollision(enemy);
                    bottle.removeBottle();
                    if (enemy.chickenIsDead && enemy.constructor.name !== 'Endboss') {
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
                        }, 1200);}
                }
            });});
    }
    

    /**
     * This checks which opponent the bottle is colliding with and the appropriate function is then executed accordingly.
     * 
     * @param {*} enemy 
     */
    checkBottleCollision(enemy){
        if (enemy.constructor.name === 'BigChicken') { enemy.chickenHit(100, enemy.chickenDieBigImages);}
        else if (enemy.constructor.name === 'SmallChicken') { enemy.chickenHit(100, enemy.chickenDieSmallImages);}
        else if (enemy.constructor.name === 'Endboss') {
            enemy.endbossDead(this.damage, enemy.chickenHurtEndbossImages, enemy.chickenDieEndbossImages);
            this.newDamage -= this.damage
            this.statusBarEndboss.setPercentage(this.newDamage, true)
        }
    }
    
    
    /**
     * This function checks whether there is a collision with an opponent or a platform.
     * 
     */
    elementsCollisions() {
        const currentTime = new Date().getTime();
        let characterLandedOnEnemy = false;
        let enemiesToRemove = []; 
        this.level.enemies.forEach((enemy) => {
           this.characterEnemyCollision(enemy, enemiesToRemove, characterLandedOnEnemy)
        });
        this.level.plato.forEach((plato) => { this.collisionWithPlato(plato) });
        if (!this.character.isAboveGround()) { this.character.isJumpingOnEnemy = false; }
        this.characterDamageNotJump(characterLandedOnEnemy, currentTime)
    }


    /**
     * If the character collides with an opponent and the opponent is not dead, the system checks whether the character is above the opponent.
     * If this is the case, two further functions are executed.
     * Then it is checked whether the opponent is the final boss, if this is the case a function is executed.
     * 
     * @param {*} enemy 
     * @param {*} enemiesToRemove 
     * @param {*} characterLandedOnEnemy 
     */
    characterEnemyCollision(enemy, enemiesToRemove,characterLandedOnEnemy){
        if (this.character.isColliding(enemy)) {
            let enemyName = enemy.constructor.name;
            if (!enemy.chickenIsDead) {
                if (enemyName !== 'Endboss' && this.character.speedY < 0 && this.character.y + this.character.height - this.character.offset.bottom > enemy.y + enemy.offset.top && this.character.y < enemy.y + enemy.height ) {
                    this.smallBigChickenHit(enemy, enemyName, characterLandedOnEnemy)
                    if (enemy.chickenIsDead) {
                        enemiesToRemove.push(enemy); 
                        setTimeout(() => {
                            this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
                        }, 600);
                    }
                } 
            }
        }
    }


    /**
     * Here it is checked when the character is on the ground and collides with an opponent that he receives damage.
     * 
     * @param {*} characterLandedOnEnemy 
     * @param {*} currentTime 
     */
    characterDamageNotJump(characterLandedOnEnemy, currentTime){
        if (!characterLandedOnEnemy && !this.character.isJumpingOnEnemy) {
            this.level.enemies.forEach((enemy) => {
                if (!enemy.chickenIsDead && this.character.isColliding(enemy)) {
                    if (enemy.constructor.name !== 'Endboss' && currentTime - this.lastDamageTime > 150) { 
                        this.character.hit(5);
                        this.statusBarHealth.setPercentage(this.character.energyCharacter, true);
                        this.lastDamageTime = currentTime;
                    }else if (enemy.constructor.name === 'Endboss' && currentTime - this.lastEndbossDamageTime > 1000) {
                        this.endbossChangeEnergy();
                        this.lastEndbossDamageTime = currentTime;
                    }
                }
            });
        }
    }
    
    
    /**
     * Depending on which chicken the character has jumped on, the corresponding if condition is executed and a function is executed on it.
     * In addition, various flags, boolean are assigned.
     * 
     * @param {*} enemy 
     * @param {*} enemyName 
     * @param {*} characterLandedOnEnemy 
     */
    smallBigChickenHit(enemy,enemyName, characterLandedOnEnemy){
        this.character.y = enemy.y - this.character.height + this.character.offset.bottom; 
        if (enemyName === 'BigChicken') {
            this.character.speedY = 24;
            enemy.chickenHit(50, enemy.chickenDieBigImages);
        }
        if (enemyName === 'SmallChicken') { 
            enemy.chickenHit(100, enemy.chickenDieSmallImages); 
        }
        characterLandedOnEnemy = true;
        this.character.isJumpingOnEnemy = true;
    }


    /**
     * This function checks the side collision and thus prevents jumping through the platform.
     * In addition, jumping through from below is also blocked and if the character jumps diagonally to the edge of the platform, he receives a gentle push back.
     * 
     * @param {*} plato 
     */
    collisionWithPlato(plato){
        if (this.character.isColliding(plato) && this.character.y <= 180) {
            if (this.character.y + this.character.height > plato.y && this.character.y < plato.y + plato.height && Math.abs(this.character.y - plato.y) < this.character.height ) {
                if ((this.character.x + this.character.width > plato.x && this.character.x < plato.x) ||(this.character.x < plato.x + plato.width && this.character.x + this.character.width > plato.x + plato.width) ) {
                    this.character.x = this.character.x < plato.x ? plato.x - this.character.width : plato.x + plato.width;
                }
            }
            if (this.character.y + this.character.height > plato.y && this.character.y < plato.y && this.character.speedY > 0 && Math.abs(this.character.x - plato.x) < this.character.width ) {
                this.character.speedY = -5; 
                this.character.y = plato.y + plato.height; 
            }
        }
    }
 

    /**
     * When the final boss hits the character, the Character receives more damage and the status bar is updated.
     */
    endbossChangeEnergy() {
        this.character.hit(40);
        this.statusBarHealth.setPercentage(this.character.energyCharacter, true);
    }
    

    /**
     * This function checks whether the character collides with a bottle if this is the case, 
     * the statusbarbottle is updated and the bottle is removed from the bottle array. 
     */
    collisionBottle(){
        if (this.bottleCounter >= 100) { return; }
        this.level.bottle.forEach((bo) => {
            if (this.character.isColliding(bo)) {
                this.bottleSound.volume = 0.5;
                this.bottleSound.play();
                let index = this.level.bottle.indexOf(bo);
                if (this.bottleCounter < 100) { this.bottleCounter += 20;}
                this.statusBarBottle.setPercentage(this.bottleCounter,false);
                this.level.bottle.splice(index, 1); 
            }
        });
    }
    
    
     /**
     * This function checks whether the character collides with a coin if this is the case, 
     * the statusbarcoin is updated and the coin is removed from the coin array. 
     */
    collisionCoins(){
        if (this.coinsCounter >= 100) { return; }
        this.level.coin.forEach((co) => {
            if (this.character.isColliding(co)) {
                this.coinsSound.volume = 0.5;
                this.coinsSound.play();
                let index = this.level.coin.indexOf(co);
                if(this.coinsCounter < 100){ this.coinsCounter += 2.5; }
                this.statusBarCoins.setPercentage(this.coinsCounter, false)
                this.level.coin.splice(index, 1)
            }
        })
    }


    /**
     * This checks whether the D button has been pressed, the character is not under the platform, there are enough bottles and that the character is still alive.
     * Each time a bottle is created, a bottle is pushed into an array, the bottle is deducted from the counter and the status bar is updated. 
     * Everything is then updated after a timeout.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleCounter > 0 && this.canThrowBottle && !this.character.isUnderPlatform() && this.character.energyCharacter > 0) {
            this.canThrowBottle = false;
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 50, this);
            this.throwableObject.push(bottle); 
            this.bottleCounter -= 20; 
            this.statusBarBottle.setPercentage(this.bottleCounter, false);
            setTimeout(() => { this.canThrowBottle = true; }, 300);
        }
    }
    

    /**
     * It deletes the old image, moves the camera, draws the backgrounds, status bars and all other game objects such as the character, enemies, platforms and bottles.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)
        this.ctx.translate(-this.camera_x, 0)
        this.drawStatusbars()
        this.ctx.translate(this.camera_x, 0)
        this.drawObjects()
        let self = this;
        this.ctx.translate(-this.camera_x, 0)
        requestAnimationFrame(function(){ self.draw(); }); 
    }


    /**
     * This function is characterized by each status bar. 
     */
    drawStatusbars(){
        this.addObjectsToMap(this.level.clouds)
        this.addToMap(this.statusBarHealth)
        this.addToMap(this.statusBarCoins)
        this.addToMap(this.statusBarBottle)
        this.addToMap(this.statusBarEndboss)
    }


    /**
     * This function characterizes every object. 
     */
    drawObjects(){
        this.addObjectsToMap(this.level.coin)
        this.addObjectsToMap(this.level.bottle)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.plato)
        this.addObjectsToMap(this.throwableObject)
    }


    /**
     * This function draws each element of the array that was passed.
     * 
     * @param {*} obj 
     */
    addObjectsToMap(obj){
        obj.forEach(ob => {
            this.addToMap(ob)
        })
    }


    /**
     * The if query checks which direction the object is looking in order to execute the corresponding function.
     * A border is then drawn to visualize this. Then the next if query corrects the previous one.
     * The actual rectangle is then drawn around the object.
     * 
     * @param {*} move 
     */
    addToMap(move){
        if(move.otherDirection){
            this.changeImage(move)
        }
        move.drawBorderBox(this.ctx);
        if (move.otherDirection){
            this.changeImageBack(move)
        }
        move.drawRectangle(this.ctx);
    }


    /**
     * First, the current canvas state is saved, then the coordinate system is moved to the right by the width of the object.
     * The coordinate system is then mirrored on the y-axis (horizontal) and the x-coordinate of the object is changed in order to display it correctly.
     * 
     * @param {*} move 
     */
    changeImage(move){
        this.ctx.save();
        this.ctx.translate(move.width, 0);
        this.ctx.scale(-1, 1);
        move.x = move.x * -1
    }


    /**
     * Here the x-coordinate of the object is reset and the original canvas state is restored.
     * 
     * @param {*} move 
     */
    changeImageBack(move){
        move.x = move.x * -1
        this.ctx.restore();
    }
}
