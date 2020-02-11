"use strict";
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    L16_ScrollerCollide.f = FudgeCore;
    L16_ScrollerCollide.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerCollide.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let viewport = new L16_ScrollerCollide.f.Viewport();
    L16_ScrollerCollide.camera = new L16_ScrollerCollide.Camera();
    L16_ScrollerCollide.hitbox = new L16_ScrollerCollide.Hitbox();
    let coin;
    let floor;
    let hare;
    let FloorArray = [];
    let CoinArray = [];
    let Vector2Array = [];
    let CamZoom = new L16_ScrollerCollide.f.Node("CamZoom");
    let compCam = new L16_ScrollerCollide.f.ComponentCamera;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new L16_ScrollerCollide.f.TextureImage();
        L16_ScrollerCollide.Sound.init();
        txtHare.image = img;
        L16_ScrollerCollide.Hare.generateSprites(txtHare);
        L16_ScrollerCollide.Floor.generateSprites(txtHare);
        L16_ScrollerCollide.Coin.generateSprites(txtHare);
        L16_ScrollerCollide.Skybox.generateSprites(txtHare);
        L16_ScrollerCollide.game = new L16_ScrollerCollide.f.Node("Game");
        hare = new L16_ScrollerCollide.Hare("Hare");
        L16_ScrollerCollide.collectorAble = createCollectables();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.collectorAble);
        L16_ScrollerCollide.level = createLevel();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.level);
        L16_ScrollerCollide.game.appendChild(hare);
        hare.appendChild(L16_ScrollerCollide.hitbox);
        CamZoom.addComponent(compCam);
        CamZoom.addComponent(new L16_ScrollerCollide.f.ComponentTransform);
        L16_ScrollerCollide.camera.appendChild(CamZoom);
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.camera);
        compCam.pivot.translateZ(30);
        L16_ScrollerCollide.f.RenderManager.initialize(true, false);
        viewport.initialize("Viewport", L16_ScrollerCollide.game, compCam, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerCollide.f.Loop.start(L16_ScrollerCollide.f.LOOP_MODE.TIME_GAME, 10);
        //Sound.playAtmo(2);
        function update(_event) {
            processInput();
            //compCam.pivot.translateY(hare.speed.y / 10);
            L16_ScrollerCollide.camera.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(hare.cmpTransform.local.translation.x, hare.cmpTransform.local.translation.y, hare.cmpTransform.local.translation.z);
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L16_ScrollerCollide.f.KEYBOARD_CODE.W && _event.type == "keydown") {
            hare.act(L16_ScrollerCollide.ACTION.JUMP);
            L16_ScrollerCollide.Sound.play("jump");
        }
        let camtransformation = L16_ScrollerCollide.Camera.camtransformations[_event.code];
        if (camtransformation) {
            cammove(camtransformation);
            let mtxContainer = hare.cmpTransform.local;
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_RIGHT]) {
                L16_ScrollerCollide.Sound.play("rotation");
                normalizeTransforms(90);
            }
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_LEFT]) {
                L16_ScrollerCollide.Sound.play("rotation");
                normalizeTransforms(-90);
            }
        }
        viewport.draw();
    }
    function processInput() {
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.A]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.D]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.RIGHT);
            // f.Debug.log("x" + hare.mtxWorld.translation.x);
            // f.Debug.log("y" + hare.mtxWorld.translation.y);
            // f.Debug.log("z" + hare.mtxWorld.translation.z);
            //camera.cmpTransform.local.translation = new f.Vector3(hare.cmpTransform.local.translation.x, camera.cmpTransform.local.translation.y, hare.cmpTransform.local.translation.z);
            return;
        }
        hare.act(L16_ScrollerCollide.ACTION.IDLE);
    }
    function cammove(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let move = {
            rotation: _transformation.rotation ? L16_ScrollerCollide.f.Vector3.SCALE(_transformation.rotation, fullRotation) : new L16_ScrollerCollide.f.Vector3()
            //translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
        };
        //control.cmpTransform.local.rotateX(move.rotation.x);
        //control.cmpTransform.local.rotateY(move.rotation.y);
        //control.cmpTransform.local.rotateZ(move.rotation.z);
        //control.cmpTransform.local.translation = move.translation;
        move.rotation.scale(1 / animationSteps);
        L16_ScrollerCollide.f.Time.game.setTimer(10, animationSteps, function () {
            L16_ScrollerCollide.camera.move(move);
            L16_ScrollerCollide.f.RenderManager.update();
            viewport.draw();
        });
    }
    function normalizeTransforms(rotDirection) {
        hare.cmpTransform.local.rotateY(rotDirection);
        let NodeArray = [floor, coin];
        let ParentArray = [FloorArray, CoinArray];
        for (let j = 0; j <= NodeArray.length - 1; j++) {
            let i = 0;
            for (NodeArray[j] of ParentArray[j]) 
            //for (let m = 0; m <= Vector2Array.length - 1; m++)
            {
                NodeArray[j].cmpTransform.local.rotateY(rotDirection);
                let rotation = NodeArray[j].cmpTransform.local.rotation.y;
                if (rotation == 90 || rotation == -90) {
                    NodeArray[j].cmpTransform.local.translateX(-Vector2Array[i].x);
                    // lastPos = hare.cmpTransform.local.translation.x;
                    hare.cmpTransform.local.translateX(-hare.cmpTransform.local.translation.x);
                    // hare.cmpTransform.local.translation.x = 0;
                    NodeArray[j].cmpTransform.local.translateZ(Vector2Array[i].y);
                    if (i == 0 && j == 0)
                        hare.cmpTransform.local.translateZ(Vector2Array[hare.lastHitIndex].y);
                    // f.Debug.log("TRANSFORM" + Vector2Array[hare.lastHitIndex].y);
                }
                if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180) { // hare.cmpTransform.local.translation.x = hare.lastHit.x;
                    NodeArray[j].cmpTransform.local.translateZ(-Vector2Array[i].y);
                    hare.cmpTransform.local.translateZ(-hare.cmpTransform.local.translation.z);
                    // hare.cmpTransform.local.translation.z = 0;
                    // hare.cmpTransform.local.translateX(lastPos );
                    NodeArray[j].cmpTransform.local.translateX(Vector2Array[i].x);
                    if (i == 0 && j == 0) {
                        hare.cmpTransform.local.translateX(Vector2Array[hare.lastHitIndex].x);
                    }
                }
                // f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
                i++;
                // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
            }
        }
    }
    function createLevel() {
        let level = new L16_ScrollerCollide.f.Node("Level");
        level.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        // FloorArray = [];
        let floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.5);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(0);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(0);
        FloorArray.push(floor);
        level.appendChild(floor);
        //For Fixed Starting Platform
        Vector2Array[0] = new L16_ScrollerCollide.f.Vector2(FloorArray[0].cmpTransform.local.translation.x, FloorArray[0].cmpTransform.local.translation.z);
        floor.cmpTransform.local.translateZ(-Vector2Array[0].y);
        createCoin((FloorArray[0].cmpTransform.local.translation));
        let PlatformNumber = 21;
        let lastPlatform = new L16_ScrollerCollide.f.Vector3();
        lastPlatform = new L16_ScrollerCollide.f.Vector3(floor.cmpTransform.local.translation.x, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.z);
        for (let i = 1; i <= PlatformNumber - 1; i++) {
            floor = new L16_ScrollerCollide.Floor();
            floor.cmpTransform.local.scaleY(0.5);
            floor.cmpTransform.local.scaleX(1);
            floor.cmpTransform.local.translateY(i);
            let randomAxis = (Math.random() * 2);
            if (randomAxis >= 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    floor.cmpTransform.local.translateZ(Math.random() * 10);
                    floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);
                }
                if (PosNeg < 1) {
                    floor.cmpTransform.local.translateZ(Math.random() * -10);
                    floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);
                }
            }
            if (randomAxis < 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    floor.cmpTransform.local.translateX(Math.random() * 10);
                    floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
                }
                if (PosNeg < 1) {
                    floor.cmpTransform.local.translateX(Math.random() * -10);
                    floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
                }
            }
            FloorArray.push(floor);
            level.appendChild(floor);
            lastPlatform = new L16_ScrollerCollide.f.Vector3(floor.cmpTransform.local.translation.x, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.z);
            Vector2Array[i] = new L16_ScrollerCollide.f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
            floor.cmpTransform.local.translateZ(-Vector2Array[i].y);
            createCoin((FloorArray[i].cmpTransform.local.translation));
        }
        // Vector2Array = [];
        /*
                for(let i = 0; i <= FloorArray.length - 1; i++) {
                    Vector2Array[i] = new f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
                }
        
                let i = 0;
        
                for(let floor of level.getChildren()) {
                    floor.cmpTransform.local.translateZ(- Vector2Array[i].y);
                    i++;
                }
        */
        //for(let m = 0; m <= PlatformNumber - 1; m++) {
        //}
        let skybox = new L16_ScrollerCollide.Skybox();
        //skybox.addComponent(new f.ComponentTransform());
        //skybox.addComponent(new f.ComponentMaterial(new f.Material("skybox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        //skybox.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(0, 0, -30);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        //skybox.addComponent(new f.ComponentTransform());
        //skybox.addComponent(new f.ComponentMaterial(new f.Material("skybox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        //skybox.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        skybox.cmpTransform.local.rotateY(90);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(30, 0, 0);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        //skybox.addComponent(new f.ComponentTransform());
        //skybox.addComponent(new f.ComponentMaterial(new f.Material("skybox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        //skybox.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        skybox.cmpTransform.local.rotateY(-90);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(-30, 0, 0);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        //skybox.addComponent(new f.ComponentTransform());
        //skybox.addComponent(new f.ComponentMaterial(new f.Material("skybox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        //skybox.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        skybox.cmpTransform.local.rotateY(180);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(0, 0, 30);
        L16_ScrollerCollide.game.appendChild(skybox);
        return level;
    }
    function createCollectables() {
        let collectorAble = new L16_ScrollerCollide.f.Node("collectorAble");
        return collectorAble;
    }
    function createCoin(Position) {
        let coin = new L16_ScrollerCollide.Coin();
        coin.cmpTransform.local.scaleY(1);
        coin.cmpTransform.local.scaleX(1);
        coin.cmpTransform.local.translate(Position);
        coin.cmpTransform.local.translateY(1);
        L16_ScrollerCollide.collectorAble.appendChild(coin);
        CoinArray.push(coin);
    }
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Main.js.map