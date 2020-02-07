"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    L16_ScrollerCollide.f = FudgeCore;
    L16_ScrollerCollide.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerCollide.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let viewport = new L16_ScrollerCollide.f.Viewport();
    L16_ScrollerCollide.cameraRot = new L16_ScrollerCollide.Camera();
    L16_ScrollerCollide.hitbox = new L16_ScrollerCollide.Hitbox();
    let hare;
    let ParentCamNode = new L16_ScrollerCollide.f.Node("ParentCamNode");
    let CamNode = new L16_ScrollerCollide.f.Node("CamNode");
    let RotNode = new L16_ScrollerCollide.f.Node("RotNode");
    let hareGlobal = new L16_ScrollerCollide.f.Node("HareGlobal");
    let CamZoom = new L16_ScrollerCollide.f.Node("CamZoom");
    let cam = new L16_ScrollerCollide.f.ComponentCamera;
    let control = new L16_ScrollerCollide.Control();
    let FloorArray;
    let Vector2Array;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new L16_ScrollerCollide.f.TextureImage();
        txtHare.image = img;
        L16_ScrollerCollide.Hare.generateSprites(txtHare);
        L16_ScrollerCollide.Floor.generateSprites(txtHare);
        hareGlobal.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        control.cmpTransform.local.translateY(5);
        RotNode.appendChild(control);
        L16_ScrollerCollide.f.RenderManager.initialize(true, false);
        L16_ScrollerCollide.game = new L16_ScrollerCollide.f.Node("Game");
        hare = new L16_ScrollerCollide.Hare("Hare");
        L16_ScrollerCollide.level = createLevel();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.level);
        hareGlobal.appendChild(hare);
        L16_ScrollerCollide.game.appendChild(hareGlobal);
        hare.appendChild(L16_ScrollerCollide.hitbox);
        CamZoom.addComponent(cam);
        CamZoom.addComponent(new L16_ScrollerCollide.f.ComponentTransform);
        L16_ScrollerCollide.cameraRot.appendChild(CamZoom);
        //cameraRot.appendChild(hareGlobal);
        control.cmpTransform.local.translateY(5);
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.cameraRot);
        let cmpCamera = new L16_ScrollerCollide.f.ComponentCamera();
        cam.pivot.translateZ(24);
        CamNode.addComponent(cmpCamera);
        CamNode.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        cmpCamera.pivot.lookAt(L16_ScrollerCollide.f.Vector3.ZERO());
        cmpCamera.backgroundColor = L16_ScrollerCollide.f.Color.CSS("aliceblue");
        CamNode.addComponent(cmpCamera);
        ParentCamNode.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        CamNode.cmpTransform.local.rotateX(90);
        ParentCamNode.appendChild(CamNode);
        viewport.initialize("Viewport", L16_ScrollerCollide.game, cam, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerCollide.f.Loop.start(L16_ScrollerCollide.f.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L16_ScrollerCollide.f.KEYBOARD_CODE.W && _event.type == "keydown")
            hare.act(L16_ScrollerCollide.ACTION.JUMP);
        let mtxHare;
        let camtransformation = L16_ScrollerCollide.Camera.camtransformations[_event.code];
        if (camtransformation) {
            cammove(camtransformation);
            let mtxContainer = hare.cmpTransform.local;
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_RIGHT]) {
                hare.cmpTransform.local.rotateY(90);
                for (let floor of L16_ScrollerCollide.level.getChildren()) {
                    floor.cmpTransform.local.rotateY(90);
                    let LowerLeftx = floor.cmpTransform.local.translation.x - floor.cmpTransform.local.scaling.x;
                    let LowerLefty = floor.cmpTransform.local.translation.y - floor.cmpTransform.local.scaling.y;
                    let LowerLeftz = floor.cmpTransform.local.translation.z - floor.cmpTransform.local.scaling.z;
                    //let a: f.Vector3 = new f.Vector3(floor.cmpTransform.local.translation.z, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.x);
                    // f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
                    //floor.cmpTransform.local.translation = a;
                }
                //level.cmpTransform.local.rotateY(90);
            }
            let i = 0;
            if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.ARROW_LEFT]) {
                hare.cmpTransform.local.rotateY(-90);
                for (let floor of L16_ScrollerCollide.level.getChildren()) {
                    floor.cmpTransform.local.rotateY(-90);
                    floor.cmpTransform.local.translateX(-Vector2Array[i].x);
                    L16_ScrollerCollide.f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
                    i++;
                    // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
                }
                //f.Debug.log(cameraRot.cmpTransform.local.translation);
            }
        }
        viewport.draw();
    }
    function processInput() {
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.A]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            //f.Debug.log("x" + hare.mtxWorld.translation.x);
            //f.Debug.log("y" + hare.mtxWorld.translation.y);
            // f.Debug.log("z" + hare.mtxWorld.translation.z);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.D]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.RIGHT);
            //f.Debug.log("x" + hare.mtxWorld.translation.x);
            //  f.Debug.log("y" + hare.mtxWorld.translation.y);
            //f.Debug.log("z" + hare.mtxWorld.translation.z);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.f.KEYBOARD_CODE.SPACE]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            return;
        }
        hare.act(L16_ScrollerCollide.ACTION.IDLE);
    }
    function cammove(_transformation) {
        let animationSteps = 5;
        let fullRotation = 90;
        // let fullTranslation: number = 1;
        let move = {
            rotation: _transformation.rotation ? L16_ScrollerCollide.f.Vector3.SCALE(_transformation.rotation, fullRotation) : new L16_ScrollerCollide.f.Vector3()
            //translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
        };
        control.cmpTransform.local.rotateX(move.rotation.x);
        control.cmpTransform.local.rotateY(move.rotation.y);
        control.cmpTransform.local.rotateZ(move.rotation.z);
        //control.cmpTransform.local.translation = move.translation;      
        move.rotation.scale(1 / animationSteps);
        L16_ScrollerCollide.f.Time.game.setTimer(10, animationSteps, function () {
            L16_ScrollerCollide.cameraRot.move(move);
            // f.RenderManager.update();
            viewport.draw();
        });
    }
    function createLevel() {
        let level = new L16_ScrollerCollide.f.Node("Level");
        level.addComponent(new L16_ScrollerCollide.f.ComponentTransform());
        FloorArray = [];
        /*
        let floor: Floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(6);
        floor.appendChild(hitbox);
        level.appendChild(floor);
        f.Debug.log(hitbox);
    */
        let floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(0);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(0);
        FloorArray.push(floor);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(4);
        floor.cmpTransform.local.translateY(4);
        floor.cmpTransform.local.translateZ(2);
        FloorArray.push(floor);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(-2);
        floor.cmpTransform.local.translateY(4);
        floor.cmpTransform.local.translateZ(6);
        FloorArray.push(floor);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(3);
        floor.cmpTransform.local.translateY(2);
        floor.cmpTransform.local.translateZ(2);
        FloorArray.push(floor);
        level.appendChild(floor);
        /*
            floor = new Floor();
            floor.cmpTransform.local.scaleY(0.3);
            floor.cmpTransform.local.translateX(-3);
            floor.cmpTransform.local.translateY(0);
            floor.cmpTransform.local.translateZ(3);
            
            level.appendChild(floor);
        */
        /*
        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.translateX(4);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(6);
        level.appendChild(floor);
        */
        Vector2Array = [];
        for (let i = 0; i <= FloorArray.length - 1; i++) {
            Vector2Array[i] = new L16_ScrollerCollide.f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
        }
        /*
            floor = new Floor();
            floor.cmpTransform.local.scaleY(0.3);
            floor.cmpTransform.local.scaleX(7);
            floor.cmpTransform.local.translateY(0.2);
            floor.cmpTransform.local.translateX(1.5);
            floor.cmpTransform.local.translateZ(6);
            level.appendChild(floor);
        
            floor = new Floor();
            floor.cmpTransform.local.scaleY(0.3);
            floor.cmpTransform.local.scaleX(20);
            floor.cmpTransform.local.translateY(0.2);
            floor.cmpTransform.local.translateX(6);
            floor.cmpTransform.local.translateZ(1.2);
            level.appendChild(floor);
            
        
            floor = new Floor();
            floor.cmpTransform.local.scaleY(1);
            floor.cmpTransform.local.scaleX(1);
            floor.cmpTransform.local.translateZ(1);
            
            level.appendChild(floor);
        */
        // hareGlobal.cmpTransform.local.translateZ(6);
        //hareGlobal.cmpTransform.local.translateX(-.5);
        L16_ScrollerCollide.f.Debug.log(level);
        //f.Debug.log(Floor);
        /*
            let tower: f.Node = new f.Node("Tower");
            tower.addComponent(new f.ComponentTransform());
            tower.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
            tower.addComponent(new f.ComponentMesh(new f.MeshSprite()));
            tower.cmpTransform.local.scale(new f.Vector3(50,50,50));
            tower.cmpTransform.local.translation = new f.Vector3(0,0,-30);
            game.appendChild(tower);
        
            let tower1: f.Node = new f.Node("Tower1");
            tower1.addComponent(new f.ComponentTransform());
            tower1.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
            tower1.addComponent(new f.ComponentMesh(new f.MeshSprite()));
            tower1.cmpTransform.local.rotateY(90);
            tower1.cmpTransform.local.scale(new f.Vector3(50,50,50));
            tower1.cmpTransform.local.translation = new f.Vector3(0,30,0);
            game.appendChild(tower1);
        
            let tower2: f.Node = new f.Node("Tower2");
            tower2.addComponent(new f.ComponentTransform());
            tower2.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
            tower2.addComponent(new f.ComponentMesh(new f.MeshSprite()));
            tower2.cmpTransform.local.rotateY(-90);
            tower2.cmpTransform.local.scale(new f.Vector3(50,50,50));
            tower2.cmpTransform.local.translation = new f.Vector3(0,-30,0);
            game.appendChild(tower2);
        
            let tower3: f.Node = new f.Node("Tower3");
            tower3.addComponent(new f.ComponentTransform());
            tower3.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
            tower3.addComponent(new f.ComponentMesh(new f.MeshSprite()));
            tower3.cmpTransform.local.rotateY(180);
            tower3.cmpTransform.local.scale(new f.Vector3(50,50,50));
            tower3.cmpTransform.local.translation = new f.Vector3(0,0,30);
            game.appendChild(tower3);
        
        
             x = hareGlobal.cmpTransform.local.translation.x;
             y = hareGlobal.cmpTransform.local.translation.y;
             z = hareGlobal.cmpTransform.local.translation.z;
        */
        return level;
    }
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Main.js.map