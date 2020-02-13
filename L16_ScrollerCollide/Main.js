"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    L16_ScrollerCollide.f = FudgeCore;
    L16_ScrollerCollide.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerCollide.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", init);
    let keysPressed = {};
    L16_ScrollerCollide.viewport = new L16_ScrollerCollide.f.Viewport();
    L16_ScrollerCollide.camera = new L16_ScrollerCollide.Camera();
    //let planes: Planes;
    let FloorArray = [];
    let CoinArray = [];
    L16_ScrollerCollide.Vector3Array = [];
    let CamZoom = new L16_ScrollerCollide.f.Node("CamZoom");
    let compCam = new L16_ScrollerCollide.f.ComponentCamera;
    function init() {
        getJsonLevelData();
    }
    function build() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new L16_ScrollerCollide.f.TextureImage();
        L16_ScrollerCollide.Sound.init();
        //planes = new Planes();
        L16_ScrollerCollide.planes = new L16_ScrollerCollide.Planes();
        //planes = new Planes("Planes");
        txtHare.image = img;
        L16_ScrollerCollide.Floor.generateSprites(txtHare);
        L16_ScrollerCollide.Coin.generateSprites(txtHare);
        L16_ScrollerCollide.Skybox.generateSprites(txtHare);
        //Planes.generateSprites(txtHare);
        L16_ScrollerCollide.Hare.generateSprites(txtHare);
        L16_ScrollerCollide.game = new L16_ScrollerCollide.f.Node("Game");
        L16_ScrollerCollide.hare = new L16_ScrollerCollide.Hare("Hare");
        //planes.cmpTransform.local.translation = new f.Vector3(0 -1, 0);
        L16_ScrollerCollide.hare.mtxWorld.translation = new L16_ScrollerCollide.f.Vector3(0, 2, 0);
        L16_ScrollerCollide.collectorAble = createCollectables();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.collectorAble);
        L16_ScrollerCollide.level = createLevel();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.level);
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.hare);
        //game.appendChild(planes);
        CamZoom.addComponent(compCam);
        CamZoom.addComponent(new L16_ScrollerCollide.f.ComponentTransform);
        L16_ScrollerCollide.camera.appendChild(CamZoom);
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.camera);
        compCam.pivot.translateZ(30);
        L16_ScrollerCollide.f.RenderManager.initialize(true, false);
        L16_ScrollerCollide.viewport.initialize("Viewport", L16_ScrollerCollide.game, compCam, canvas);
        L16_ScrollerCollide.viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerCollide.f.Loop.start(L16_ScrollerCollide.f.LOOP_MODE.TIME_GAME, 10);
        L16_ScrollerCollide.start();
        function update(_event) {
            L16_ScrollerCollide.hare.loseLive();
            L16_ScrollerCollide.processInput();
            //compCam.pivot.translateY(hare.speed.y / 10);
            L16_ScrollerCollide.camera.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(L16_ScrollerCollide.hare.cmpTransform.local.translation.x, L16_ScrollerCollide.hare.cmpTransform.local.translation.y, L16_ScrollerCollide.hare.cmpTransform.local.translation.z);
            L16_ScrollerCollide.viewport.draw();
            //muteSounds();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
            if (L16_ScrollerCollide.Sound.muted)
                document.getElementById("Sound").innerHTML = "Music: OFF";
            else
                document.getElementById("Sound").innerHTML = "Music: ON";
            if (L16_ScrollerCollide.soundMuteCounter > 0)
                L16_ScrollerCollide.soundMuteCounter++;
            if (L16_ScrollerCollide.soundMuteCounter > 2)
                L16_ScrollerCollide.soundMuteCounter = 0;
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L16_ScrollerCollide.f.KEYBOARD_CODE.SPACE && _event.type == "keydown") {
            L16_ScrollerCollide.hare.act(L16_ScrollerCollide.ACTION.JUMP);
        }
        let camtransformation = L16_ScrollerCollide.Camera.camtransformations[_event.code];
        if (camtransformation) {
            cammove(camtransformation);
            let mtxContainer = L16_ScrollerCollide.hare.cmpTransform.local;
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_RIGHT]) {
                L16_ScrollerCollide.Sound.play("rotation");
                normalizeTransforms(90);
            }
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_LEFT]) {
                L16_ScrollerCollide.Sound.play("rotation");
                normalizeTransforms(-90);
            }
        }
        L16_ScrollerCollide.viewport.draw();
    }
    /*
         function processInput(): void {
    
            if (keysPressed[f.KEYBOARD_CODE.A]) {
              hare.act(ACTION.WALK, DIRECTION.LEFT);
                return;
            }
            if (keysPressed[f.KEYBOARD_CODE.D]) {
                hare.act(ACTION.WALK, DIRECTION.RIGHT);
                // f.Debug.log("x" + hare.mtxWorld.translation.x);
                // f.Debug.log("y" + hare.mtxWorld.translation.y);
                // f.Debug.log("z" + hare.mtxWorld.translation.z);
                //camera.cmpTransform.local.translation = new f.Vector3(hare.cmpTransform.local.translation.x, camera.cmpTransform.local.translation.y, hare.cmpTransform.local.translation.z);
                return;
            }
            hare.act(ACTION.IDLE);
        }
    */
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
            L16_ScrollerCollide.viewport.draw();
        });
    }
    function normalizeTransforms(rotDirection) {
        L16_ScrollerCollide.hare.cmpTransform.local.rotateY(rotDirection);
        let NodeArray = [L16_ScrollerCollide.floor, L16_ScrollerCollide.coin];
        let ParentArray = [FloorArray, CoinArray];
        for (let j = 0; j <= NodeArray.length - 1; j++) {
            let i = 0;
            for (NodeArray[j] of ParentArray[j]) 
            //for (let m = 0; m <= Vector3Array.length - 1; m++)
            {
                NodeArray[j].cmpTransform.local.rotateY(rotDirection);
                let rotation = NodeArray[j].cmpTransform.local.rotation.y;
                if (rotation == 90 || rotation == -90) {
                    NodeArray[j].cmpTransform.local.translateX(-L16_ScrollerCollide.Vector3Array[i].x);
                    // lastPos = hare.cmpTransform.local.translation.x;
                    L16_ScrollerCollide.hare.cmpTransform.local.translateX(-L16_ScrollerCollide.hare.cmpTransform.local.translation.x);
                    // hare.cmpTransform.local.translation.x = 0;
                    NodeArray[j].cmpTransform.local.translateZ(L16_ScrollerCollide.Vector3Array[i].z);
                    if (i == 0 && j == 0)
                        L16_ScrollerCollide.hare.cmpTransform.local.translateZ(L16_ScrollerCollide.Vector3Array[L16_ScrollerCollide.hare.lastHitIndex].z);
                    // f.Debug.log("TRANSFORM" + Vector3Array[hare.lastHitIndex].y);
                }
                if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180) { // hare.cmpTransform.local.translation.x = hare.lastHit.x;
                    NodeArray[j].cmpTransform.local.translateZ(-L16_ScrollerCollide.Vector3Array[i].z);
                    L16_ScrollerCollide.hare.cmpTransform.local.translateZ(-L16_ScrollerCollide.hare.cmpTransform.local.translation.z);
                    if (rotation == 180) {
                        //hare.cmpTransform.local.rotateY(90);
                    }
                    // hare.cmpTransform.local.translation.z = 0;
                    // hare.cmpTransform.local.translateX(lastPos );
                    NodeArray[j].cmpTransform.local.translateX(L16_ScrollerCollide.Vector3Array[i].x);
                    if (i == 0 && j == 0) {
                        L16_ScrollerCollide.hare.cmpTransform.local.translateX(L16_ScrollerCollide.Vector3Array[L16_ScrollerCollide.hare.lastHitIndex].x);
                    }
                }
                // f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
                i++;
                // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
            }
        }
    }
    L16_ScrollerCollide.normalizeTransforms = normalizeTransforms;
    function createLevel() {
        let level = new L16_ScrollerCollide.f.Node("Level");
        level.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        L16_ScrollerCollide.floor = new L16_ScrollerCollide.Floor();
        L16_ScrollerCollide.floor.cmpTransform.local.scaleY(0.5);
        L16_ScrollerCollide.floor.cmpTransform.local.scaleX(1);
        L16_ScrollerCollide.floor.cmpTransform.local.translateX(0);
        L16_ScrollerCollide.floor.cmpTransform.local.translateY(0);
        L16_ScrollerCollide.floor.cmpTransform.local.translateZ(0);
        FloorArray.push(L16_ScrollerCollide.floor);
        level.appendChild(L16_ScrollerCollide.floor);
        //For Fixed Starting Platform
        L16_ScrollerCollide.Vector3Array[0] = new L16_ScrollerCollide.f.Vector3(FloorArray[0].cmpTransform.local.translation.x, FloorArray[0].cmpTransform.local.translation.y, FloorArray[0].cmpTransform.local.translation.z);
        L16_ScrollerCollide.floor.cmpTransform.local.translateZ(-L16_ScrollerCollide.Vector3Array[0].y);
        createCoin((FloorArray[0].cmpTransform.local.translation));
        let platformNumber = L16_ScrollerCollide.levelData[0].PlatformNumber;
        let fixedDistance = L16_ScrollerCollide.levelData[0].FixedDistance;
        let lastPlatform = new L16_ScrollerCollide.f.Vector3();
        lastPlatform = new L16_ScrollerCollide.f.Vector3(L16_ScrollerCollide.floor.cmpTransform.local.translation.x, L16_ScrollerCollide.floor.cmpTransform.local.translation.y, L16_ScrollerCollide.floor.cmpTransform.local.translation.z);
        for (let i = 1; i <= platformNumber - 1; i++) {
            L16_ScrollerCollide.floor = new L16_ScrollerCollide.Floor();
            L16_ScrollerCollide.floor.cmpTransform.local.scaleY(0.5);
            L16_ScrollerCollide.floor.cmpTransform.local.scaleX(1);
            L16_ScrollerCollide.floor.cmpTransform.local.translateY(i);
            let randomAxis = (Math.random() * 2);
            if (randomAxis >= 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    L16_ScrollerCollide.floor.cmpTransform.local.translateZ(Math.random() * 10);
                    L16_ScrollerCollide.floor.cmpTransform.local.translateX(lastPlatform.x + fixedDistance);
                }
                if (PosNeg < 1) {
                    L16_ScrollerCollide.floor.cmpTransform.local.translateZ(Math.random() * -10);
                    L16_ScrollerCollide.floor.cmpTransform.local.translateX(lastPlatform.x + fixedDistance);
                }
            }
            if (randomAxis < 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    L16_ScrollerCollide.floor.cmpTransform.local.translateX(Math.random() * 10);
                    L16_ScrollerCollide.floor.cmpTransform.local.translateZ(lastPlatform.z + fixedDistance);
                }
                if (PosNeg < 1) {
                    L16_ScrollerCollide.floor.cmpTransform.local.translateX(Math.random() * -10);
                    L16_ScrollerCollide.floor.cmpTransform.local.translateZ(lastPlatform.z + fixedDistance);
                }
            }
            FloorArray.push(L16_ScrollerCollide.floor);
            level.appendChild(L16_ScrollerCollide.floor);
            lastPlatform = new L16_ScrollerCollide.f.Vector3(L16_ScrollerCollide.floor.cmpTransform.local.translation.x, L16_ScrollerCollide.floor.cmpTransform.local.translation.y, L16_ScrollerCollide.floor.cmpTransform.local.translation.z);
            L16_ScrollerCollide.Vector3Array[i] = new L16_ScrollerCollide.f.Vector3(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.y, FloorArray[i].cmpTransform.local.translation.z);
            L16_ScrollerCollide.floor.cmpTransform.local.translateZ(-L16_ScrollerCollide.Vector3Array[i].z);
            createCoin((FloorArray[i].cmpTransform.local.translation));
        }
        let skybox = new L16_ScrollerCollide.Skybox();
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(0, 50, -30);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        skybox.cmpTransform.local.rotateY(90);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(30, 50, 0);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        skybox.cmpTransform.local.rotateY(-90);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(-30, 50, 0);
        L16_ScrollerCollide.game.appendChild(skybox);
        skybox = new L16_ScrollerCollide.Skybox();
        skybox.cmpTransform.local.rotateY(180);
        skybox.cmpTransform.local.scale(new L16_ScrollerCollide.f.Vector3(100, 100, 100));
        skybox.cmpTransform.local.translation = new L16_ScrollerCollide.f.Vector3(0, 50, 30);
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
    async function getJsonLevelData() {
        let response = await fetch("Assets/LevelData.json");
        let offer = await response.text();
        //await Promise.all(offer);
        L16_ScrollerCollide.levelData = JSON.parse(offer);
        build();
    }
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Main.js.map