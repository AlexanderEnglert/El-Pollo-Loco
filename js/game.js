let canvas;
let ctx;
let world;
let keyboard = new Keyboard()
let isPaused = false;
let stopSoundOn = false
let backgroundSound = new Audio('audio/background_sound.mp3');
let gameOverSound = new Audio('./audio/you_lose_sound.mp3');
let youWinSound = new Audio('./audio/you_win_sound.mp3')
backgroundSound.loop = true
backgroundSound.volume = 0.1;
gameOverSound.volume = 0.5;
youWinSound.volume = 0.5;

let startScreenButtons = ['StartButton1', 'StartButton2','StartButton3', 'StartButton4', 'StartButton5']
let backToStart = ['OverCanvas', 'ControlShow', 'RuleShow']
let PlayButtons = ['PlaymenuButtonID1', 'PlaymenuButtonID2', 'PlaymenuButtonID3', 'PlaymenuButtonID4']


/**
 * In this function, classes are added and html code is changed. In addition, all sounds are stopped and a function call is made.
 */
function restartAndStartGame() {
    document.getElementById('StartScreenButton').classList.add('hidden');
    document.getElementById('PlaymenuButtonID1').innerHTML=`<i class="fa-solid fa-pause"></i>`;
    document.getElementById('PlaymenuButtonID4').innerHTML = `<i class="fa-solid fa-volume-high"></i>`; 
    isPaused = false
    SoundManager.stopAllSounds(); 
    resetGame();
}


/**
 * The content of the canvas is deleted, followed by a function call. 
 * This is followed by an If condition and several variables are reset and further function calls take place.
 * 
 */
function resetGame() {
    if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    stopBackgroundMusic();
    if (world) { 
        resetArraysBars() 
    }
    isPaused = false;
    stopSoundOn = false;
    keyboard = new Keyboard();
    stopSound(true)
    stopSoundOn = false;
    startGame();
}


/**
 * Several arrays are emptied and the status bar is reset.
 */
function resetArraysBars(){
    world.level.enemies = [];
    world.level.coin = [];
    world.level.bottle = [];
    world.throwableObject = [];
    world.character.resetCharacter();
    world.statusBarHealth.setPercentage(100);
    world.statusBarCoins.setPercentage(0);
    world.statusBarBottle.setPercentage(0);
}


/**
 * It is checked whether the sound is already playing, if not it is restarted.
 */
function playBackgroundMusic() {
    if (backgroundSound.paused) {
        backgroundSound.play();
    }
}


/**
 * This stops the sound and resets it to the beginning.
 */
function stopBackgroundMusic() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
}


/**
 * When the dome has been loaded, the flag in the local storage is checked, if it is positive the menu is displayed and if not it is hidden.
 */
function hideMenuOnReload() {
    document.addEventListener('DOMContentLoaded', () => {
        const menu = document.getElementById('StartScreenButton');
        if (!menu) {
            return; 
        }
        if (localStorage.getItem('startGameOnReload') === 'true') {
            menu.classList.add('hidden');
        } else {
            menu.classList.remove('hidden');
        }
    });
}


hideMenuOnReload();


/** If the flag in the local storage is positive, the flag is removed and the game is started. */
window.addEventListener('load', () => {
    if (localStorage.getItem('startGameOnReload') === 'true') {
        localStorage.removeItem('startGameOnReload');
        startGame();
    }
});


/**
 * The level is initialized and the game is started with the init function.
 */
function startGame() {
    isPaused = false   
    levelFirst(); 
    init(); 
}


/**
 * Classes are added and removed, three functions are executed and two parameters are passed to the world class.
 */
function init(){
    document.getElementById('GameOverPicID').src='';
    document.getElementById('GameOverScreenID').classList.remove('GameOverScreen');
    document.getElementById('GameOverScreenID').classList.add('none');
    document.getElementById('FullscreenButtonID').classList.remove('none')
    document.getElementById('FullscreenButtonID').classList.add('FullscreenButton')
    addRemoveButtonNone()
    loadTouchMenu()
    playBackgroundMusic();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Classes are removed and added.
 */
function addRemoveButtonNone(){
    for(let i = 0; i < startScreenButtons.length; i++){
        document.getElementById(`${startScreenButtons[i]}`).classList.add('none')
    }
    for(let i = 0; i < PlayButtons.length; i++){
        document.getElementById(`${PlayButtons[i]}`).classList.remove('none')
        document.getElementById(`${PlayButtons[i]}`).classList.add('PlayMenuButton')
    }
}


/**
 * When Stop is pressed, the sounds are paused and reset and the stop symbol is displayed.
 * If the stop button is continued, the symbol is replaced.
 */
function togglePause() { 
    isPaused = !isPaused;
    if (isPaused) {
        if (!stopSoundOn) {
            stopSound(true);
    }
        document.getElementById('PlaymenuButtonID1').innerHTML=`<i class="fa-solid fa-play"></i>`
    } else {
        document.getElementById('PlaymenuButtonID1').innerHTML=`<i class="fa-solid fa-pause"></i>`;
        if (stopSoundOn) {
            stopSound(false);
        }
    }
}


/**
 * Each sound stored in the SoundManager array is muted or the sound is switched on again and the appropriate icon is displayed.
 */
function stopSound(boolean){
    stopSoundOn = boolean    
    const isMuted = SoundManager.toggleMute();
    const muteButton = document.getElementById('PlaymenuButtonID4');
    const checkisMuted = world.character.energyCharacter
    if(!checkisMuted == 0){  saveMutedToLocalStorage(isMuted); }
    if (isMuted) {
        muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`; 
        backgroundSound.pause();
        if (stopSoundOn == null) {stopSoundOn = true;}
    } else {
        muteButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`; 
        backgroundSound.play();
        if (stopSoundOn == null) {stopSoundOn = false}
    }    
    return stopSoundOn;
}


/**
 * Saves the received parameter in the local storage.
 * 
 * @param {*} isMuted 
 */
function saveMutedToLocalStorage(isMuted) {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
}


/**
 * This function returns the stored variable.
 * 
 * @returns 
 */
function getMutedFromLocalStorage() {
    const value = localStorage.getItem('isMuted');
    return value ? JSON.parse(value) : false;  
}


/**
 * Each sound is added to the array using that everything is static it becomes a central controller.
 */
class SoundManager {
    static sounds = [];
    static addSound(sound) { SoundManager.sounds.push(sound); }
    static toggleMute() {
        SoundManager.muted = !SoundManager.muted;
        SoundManager.sounds.forEach(sound => { sound.muted = SoundManager.muted; });
        return SoundManager.muted; 
    }
    static stopAllSounds() {
        SoundManager.sounds.forEach(sound => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0; 
            }});
        SoundManager.sounds = []; 
    }
}


/**
 * In this function, several classes are added depending on the condition.
 * 
 * @param {*} id 
 */
function controlStartScreen(id){
    screenOut();
    if(id === 'ControlShow'){
        document.getElementById('RuleShow').classList.add('none')
        document.getElementById('ImprintShow').classList.add('none')
        document.getElementById('DataPrivacy').classList.add('none')
    }
    else if (id === 'ImprintShow') {
        document.getElementById('RuleShow').classList.add('none')
        document.getElementById('ControlShow').classList.add('none')
        document.getElementById('DataPrivacy').classList.add('none')
    }
    DataImprentStartScreen(id)
}


/**
 * In this function, several classes are added depending on the condition.
 * 
 * @param {*} id 
 */
function DataImprentStartScreen(id){
    if(id === 'DataPrivacy'){
        document.getElementById('RuleShow').classList.add('none')
        document.getElementById('ControlShow').classList.add('none')
        document.getElementById('ImprintShow').classList.add('none')
        document.getElementById('DataPrivacy').classList.add('DataPrivacy')
    }
    else{
        document.getElementById('ControlShow').classList.add('none')
        document.getElementById('ImprintShow').classList.add('none')
        document.getElementById('DataPrivacy').classList.add('none')
    }
    disabledStartButton(id)
}


/** 
 * Here the button is disabled and class is removed.
*/
function disabledStartButton(id){
    let startButton = document.getElementById('StartButton1');
    startButton.disabled = true
    startButton.classList.remove('StartgameButton1')
    document.getElementById(id).classList.remove('none')
}


/**
 *  Classes are removed and added.
 */
function backtoStart(){
    let startButton = document.getElementById('StartButton1');
    startButton.disabled = false
    startButton.classList.add('StartgameButton1')
    document.getElementById('StartScreenButton').classList.remove('none')
    document.getElementById('OverCanvas').classList.remove('OverCanvasClass')
    for(let i = 0; i < backToStart.length; i++){
        document.getElementById(`${backToStart[i]}`).classList.add('none')
    }
}


/**
 *  Classes are removed and added.
 */
function screenOut(){
    document.getElementById('StartScreenButton').classList.add('none')
    document.getElementById('OverCanvas').classList.add('OverCanvasClass')
    document.getElementById('OverCanvas').classList.remove('none')
}


/**
 * Depending on whether the if query works or not, a function is executed and the corresponding icon is added.
 */
function fullScreen() {
    const screenElement = document.getElementById('backpictureID');
    const fullscreenButton = document.getElementById('FullscreenID');
    if (!document.fullscreenElement) {
        enterFullScreen(screenElement);
        fullscreenButton.innerHTML = `<i class="fa-solid fa-compress"></i>`;
    } else {
        exitFullScreen();
        fullscreenButton.innerHTML = `<i class="fa-solid fa-expand"></i>`;
    }
}


/**
 * This function is responsible for the full screen for different browsers.
 * 
 * @param {*} element 
 */
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { 
        element.msRequestFullscreen();
    }
}


/**
 * This function ends the full screen.
 */
function exitFullScreen() { 
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * The IDs of the touch buttons and the current size of the screen are transferred to a function.
 */
function loadTouchMenu(){
        function checkViewportAndAdjustButtons() {
            const buttons = ['LeftTouch', 'RightTouch', 'UpTouch', 'BottleTouch'];
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const isSmallViewport = window.innerWidth > 680 && window.innerWidth < 1400 || window.innerHeight < 600;
            const shouldShowTouchButtons = isCoarsePointer && isSmallViewport;
            buttons.forEach((buttonId) => {
                const button = document.getElementById(buttonId);
                showTouchButtons(button, shouldShowTouchButtons);
            });
        }
        setInterval(checkViewportAndAdjustButtons, 500);
        checkViewportAndAdjustButtons();
}


/**
 * Classes are removed and added.
 * 
 * @param {*} button 
 * @param {*} isSmallViewport 
 */
function showTouchButtons(button, isSmallViewport){
    if (button) {
        if (isSmallViewport) {
            button.classList.remove('none');
            button.classList.add('TouchMenuButton');
        } else {
            button.classList.add('none');
            button.classList.remove('TouchMenuButton');
        }
    }
}







