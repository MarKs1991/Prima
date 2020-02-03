"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L15_ScrollerControl;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L15_ScrollerControl) {
    L15_ScrollerControl.ƒ = FudgeCore;
    L15_ScrollerControl.Sprite = L14_ScrollerFoundation.Sprite;
    L15_ScrollerControl.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let game;
    let hare;
    let collider;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let rec = new L15_ScrollerControl.ƒ.Rectangle;
        let rec1 = new L15_ScrollerControl.ƒ.Rectangle;
        rec.position.x = 20;
        rec.position.y = 20;
        collider.addComponent(rec);
        rec1.position.x = 0;
        rec1.position.y = 0;
        L15_ScrollerControl.ƒ.Debug.log(rec.collides(rec1));
        L15_ScrollerControl.ƒ.RenderManager.initialize(true, false);
        game = new L15_ScrollerControl.ƒ.Node("Game");
        hare = new L15_ScrollerControl.Hare("Hare");
        collider = new L15_ScrollerControl.ƒ.Node("collider");
        game.appendChild(hare);
        let cmpCamera = new L15_ScrollerControl.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L15_ScrollerControl.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L15_ScrollerControl.ƒ.Color.CSS("aliceblue");
        let viewport = new L15_ScrollerControl.ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L15_ScrollerControl.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L15_ScrollerControl.ƒ.Loop.start(L15_ScrollerControl.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[L15_ScrollerControl.ƒ.KEYBOARD_CODE.A]) {
            hare.act(L15_ScrollerControl.ACTION.WALK, L15_ScrollerControl.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L15_ScrollerControl.ƒ.KEYBOARD_CODE.D]) {
            hare.act(L15_ScrollerControl.ACTION.WALK, L15_ScrollerControl.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[L15_ScrollerControl.ƒ.KEYBOARD_CODE.SPACE]) {
            hare.act(L15_ScrollerControl.ACTION.WALK, L15_ScrollerControl.DIRECTION.UP);
            return;
        }
        hare.act(L15_ScrollerControl.ACTION.IDLE);
    }
})(L15_ScrollerControl || (L15_ScrollerControl = {}));
//# sourceMappingURL=Main.js.map