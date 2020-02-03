"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    L16_ScrollerCollide.ƒ = FudgeCore;
    L16_ScrollerCollide.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerCollide.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let viewport = new L16_ScrollerCollide.ƒ.Viewport();
    L16_ScrollerCollide.cameraRot = new L16_ScrollerCollide.Camera();
    let hare;
    let ParentCamNode = new L16_ScrollerCollide.ƒ.Node("ParentCamNode");
    let CamNode = new L16_ScrollerCollide.ƒ.Node("CamNode");
    let RotNode = new L16_ScrollerCollide.ƒ.Node("RotNode");
    let CamZoom = new L16_ScrollerCollide.ƒ.Node("CamZoom");
    let cam = new L16_ScrollerCollide.ƒ.ComponentCamera;
    let control = new L16_ScrollerCollide.Control();
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new L16_ScrollerCollide.ƒ.TextureImage();
        txtHare.image = img;
        L16_ScrollerCollide.Hare.generateSprites(txtHare);
        control.cmpTransform.local.translateY(5);
        RotNode.appendChild(control);
        L16_ScrollerCollide.ƒ.RenderManager.initialize(true, false);
        L16_ScrollerCollide.game = new L16_ScrollerCollide.ƒ.Node("Game");
        hare = new L16_ScrollerCollide.Hare("Hare");
        L16_ScrollerCollide.level = createLevel();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.level);
        L16_ScrollerCollide.game.appendChild(hare);
        CamZoom.addComponent(cam);
        CamZoom.addComponent(new L16_ScrollerCollide.ƒ.ComponentTransform);
        L16_ScrollerCollide.cameraRot.appendChild(CamZoom);
        control.cmpTransform.local.translateY(5);
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.cameraRot);
        let cmpCamera = new L16_ScrollerCollide.ƒ.ComponentCamera();
        cam.pivot.translateZ(20);
        CamNode.addComponent(cmpCamera);
        CamNode.addComponent(new L16_ScrollerCollide.ƒ.ComponentTransform());
        cmpCamera.pivot.lookAt(L16_ScrollerCollide.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L16_ScrollerCollide.ƒ.Color.CSS("aliceblue");
        cmpCamera.pivot.rotateY(0);
        CamNode.addComponent(cmpCamera);
        ParentCamNode.addComponent(new L16_ScrollerCollide.ƒ.ComponentTransform());
        CamNode.cmpTransform.local.rotateX(90);
        ParentCamNode.appendChild(CamNode);
        viewport.initialize("Viewport", L16_ScrollerCollide.game, cam, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerCollide.ƒ.Loop.start(L16_ScrollerCollide.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L16_ScrollerCollide.ƒ.KEYBOARD_CODE.W && _event.type == "keydown")
            hare.act(L16_ScrollerCollide.ACTION.JUMP);
        let mtxHare;
        let camtransformation = L16_ScrollerCollide.Camera.camtransformations[_event.code];
        if (camtransformation) {
            cammove(camtransformation);
            let mtxContainer = hare.cmpTransform.local;
            L16_ScrollerCollide.ƒ.Debug.log(mtxContainer);
        }
        viewport.draw();
    }
    function processInput() {
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.A]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.D]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.RIGHT);
            return;
        }
        hare.act(L16_ScrollerCollide.ACTION.IDLE);
    }
    function cammove(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        // let fullTranslation: number = 1;
        let move = {
            rotation: _transformation.rotation ? L16_ScrollerCollide.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L16_ScrollerCollide.ƒ.Vector3()
            //translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
        };
        control.cmpTransform.local.rotateX(move.rotation.x);
        control.cmpTransform.local.rotateY(move.rotation.y);
        control.cmpTransform.local.rotateZ(move.rotation.z);
        //control.cmpTransform.local.translation = move.translation;
        move.rotation.scale(1 / animationSteps);
        L16_ScrollerCollide.ƒ.Time.game.setTimer(10, animationSteps, function () {
            L16_ScrollerCollide.cameraRot.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function createLevel() {
        let level = new L16_ScrollerCollide.ƒ.Node("Level");
        let floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.translateY(1.5);
        floor.cmpTransform.local.translateZ(6);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(7);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(1.5);
        floor.cmpTransform.local.translateZ(6);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(20);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(6);
        floor.cmpTransform.local.translateZ(1.2);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(1);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateZ(6);
        level.appendChild(floor);
        hare.cmpTransform.local.translateZ(6);
        hare.cmpTransform.local.translateX(6);
        hare.cmpTransform.local.rotateY(90);
        let tower = new L16_ScrollerCollide.ƒ.Node("Tower");
        tower.addComponent(new L16_ScrollerCollide.ƒ.ComponentTransform());
        tower.addComponent(new L16_ScrollerCollide.ƒ.ComponentMaterial(new L16_ScrollerCollide.ƒ.Material("Tower", L16_ScrollerCollide.ƒ.ShaderUniColor, new L16_ScrollerCollide.ƒ.CoatColored(L16_ScrollerCollide.ƒ.Color.CSS("red", 0.5)))));
        tower.addComponent(new L16_ScrollerCollide.ƒ.ComponentMesh(new L16_ScrollerCollide.ƒ.MeshCube()));
        tower.cmpTransform.local.scale(new L16_ScrollerCollide.ƒ.Vector3(10, 10, 10));
        level.appendChild(tower);
        return level;
    }
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Main.js.map