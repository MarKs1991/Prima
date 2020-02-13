"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    let keysPressed = {};
    let gameOverSoundPlayed = false;
    let gameStarted = false;
    let itemDropCounter = 0;
    L16_ScrollerCollide.soundMuteCounter = 0;
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    async function start() {
        await waitForKeyPress(L16_ScrollerCollide.f.KEYBOARD_CODE.ENTER);
        if (!L16_ScrollerCollide.Sound.muted)
            L16_ScrollerCollide.Sound.playAtmo(0);
        gameStarted = true;
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        let domMenu = document.querySelector("div#Menu");
        domMenu.style.visibility = "hidden";
    }
    L16_ScrollerCollide.start = start;
    function end() {
        let domOver = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.Sound.pauseMusic();
        if (!gameOverSoundPlayed)
            L16_ScrollerCollide.Sound.play("game_over");
        gameOverSoundPlayed = true;
    }
    L16_ScrollerCollide.end = end;
    async function waitForKeyPress(_code) {
        return new Promise(_resolve => {
            window.addEventListener("keydown", hndKeyDown);
            function hndKeyDown(_event) {
                if (_event.code == _code) {
                    window.removeEventListener("keydown", hndKeyDown);
                    _resolve();
                }
            }
        });
    }
    function handleSound(_event) {
        if (_event.type == "keydown" && _event.keyCode == 77 && L16_ScrollerCollide.soundMuteCounter == 0) {
            if (L16_ScrollerCollide.Sound.muted) {
                L16_ScrollerCollide.Sound.muted = false;
                if (L16_ScrollerCollide.Sound.musicStarted)
                    L16_ScrollerCollide.Sound.continueMusic();
                else if (gameStarted)
                    L16_ScrollerCollide.Sound.playMusic();
            }
            else {
                L16_ScrollerCollide.Sound.muted = true;
                L16_ScrollerCollide.Sound.pauseMusic();
            }
            L16_ScrollerCollide.soundMuteCounter = 1;
        }
    }
    L16_ScrollerCollide.handleSound = handleSound;
    function processInput() {
        //mute sound
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.M] && L16_ScrollerCollide.soundMuteCounter == 0) {
            if (L16_ScrollerCollide.Sound.muted) {
                L16_ScrollerCollide.Sound.muted = false;
                L16_ScrollerCollide.Sound.continueMusic();
            }
            else {
                L16_ScrollerCollide.Sound.muted = true;
                L16_ScrollerCollide.Sound.pauseMusic();
            }
            L16_ScrollerCollide.soundMuteCounter = 1;
            return;
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.PAGE_UP]) {
            L16_ScrollerCollide.Sound.volumeUp();
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.PAGE_UP]) {
            L16_ScrollerCollide.Sound.volumeDown();
        }
        //movement
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.A]) {
            L16_ScrollerCollide.hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.D]) {
            L16_ScrollerCollide.hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.RIGHT);
            return;
        }
        L16_ScrollerCollide.hare.act(L16_ScrollerCollide.ACTION.IDLE);
    }
    L16_ScrollerCollide.processInput = processInput;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Controls.js.map