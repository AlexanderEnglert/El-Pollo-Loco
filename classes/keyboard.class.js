class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    D = false;
}


/**
 * Here, each key and button ID is read from the object button and passed to a function.
 */
document.addEventListener('DOMContentLoaded', function () {
    const buttons = {
        LeftTouch: { key: 'LEFT', action: 'Move left' },
        RightTouch: { key: 'RIGHT', action: 'Move right' },
        UpTouch: { key: 'UP', action: 'Jump' },
        BottleTouch: { key: 'D', action: 'Throw bottle' },
    };
    Object.keys(buttons).forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        const { key } = buttons[buttonId];
        buttonCheck(button, key)
    });
});


/**
 * If a button is touched, the touch function is executed and if the button is released, the touch end function is executed.
 * 
 * @param {*} button 
 * @param {*} key 
 */
function buttonCheck(button, key){
    if (button) {
        button.addEventListener('touchstart', (event) => {
            touchStart(event,key)
        }, { passive: false });
        button.addEventListener('touchend', (event) => {
            touchEnd(event,key)
        }, { passive: false });
    } 
}


/**
 * This checks whether the event can be canceled and the key is set to true.
 * 
 * @param {*} event 
 * @param {*} key 
 */
function touchStart(event,key){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard[key] = true;
}


/**
 * This checks whether the event can be canceled and the key is set to false.
 * 
 * @param {*} event 
 * @param {*} key 
 */
function touchEnd(event,key){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard[key] = false;
}


/** 
 * This checks which button was pressed and whether it matches the number in the conditions and the respective variable is set to true.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    else if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    keyDown(e);
});


/** 
 * This checks which button was pressed and whether it matches the number in the conditions and the respective variable is set to true.
 */
function keyDown(e){
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    else if (e.keyCode == 68) {
        keyboard.D = true;
    }
}


/**
 * This checks which button was released and whether it matches the number in the conditions and the respective variable is set to false.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    else if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    keyUp(e);
});


/**
 * This checks which button was released and whether it matches the number in the conditions and the respective variable is set to false.
 * 
 * @param {*} e 
 */
function keyUp(e){
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    else if (e.keyCode == 68) {
        keyboard.D = false;
    }
}