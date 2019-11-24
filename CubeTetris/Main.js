"use strict";
var PongMaster;
(function (PongMaster) {
    var f = FudgeCore;
    let keysPressed = {};
    window.addEventListener("load", hndLoad);
    let viewport;
    let cmpLight = new f.ComponentLight(new f.LightDirectional(f.Color.WHITE));
    let ballColor = new f.Color(0, 1, 0, 0);
    let mtrBall = new f.Material("ballColor", f.ShaderFlat, new f.CoatColored(ballColor));
    let meshQuad = new f.MeshCube();
    let heroBlock = new f.Node("Hero0");
    let rodeIsland = new f.Node("rodeIsland");
    let cleveland = new f.Node("cleveland");
    let smasher = new f.Node("smasher");
    let smasher3d = new f.Node("smasher3d");
    let blueRicky = new f.Node("blueRicky");
    let orangeRicky = new f.Node("orangeRicky");
    let stableL = new f.Node("orangeRicky");
    let cornerBlock = new f.Node("cornerBlock");
    let blockMatrix;
    let playArea;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = createCubeTetris();
        f.Debug.log(blockMatrix);
        f.Debug.log(playArea);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translation = new f.Vector3(-8, 8, 35);
        cmpCamera.pivot.rotateX(-20);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function update(_event) {
        TesterInput();
        cleveland.cmpTransform.local.translateX(1);
        f.RenderManager.update();
        viewport.draw();
    }
    function TesterInput() {
        if (keysPressed[f.KEYBOARD_CODE.W]) {
            cornerBlock.cmpTransform.local.translate(new f.Vector3(0, 1, 0));
            updateFragmentPosition(cornerBlock.cmpTransform.local.translation);
            f.Debug.log(playArea);
        }
        if (keysPressed[f.KEYBOARD_CODE.S]) {
            cornerBlock.cmpTransform.local.translate(new f.Vector3(0, -1, 0));
            updateFragmentPosition(cornerBlock.cmpTransform.local.translation);
            f.Debug.log(playArea);
        }
        if (keysPressed[f.KEYBOARD_CODE.A]) {
            cornerBlock.cmpTransform.local.translate(new f.Vector3(0, 0, -1));
            updateFragmentPosition(cornerBlock.cmpTransform.local.translation);
            f.Debug.log(playArea);
        }
        if (keysPressed[f.KEYBOARD_CODE.D]) {
            cornerBlock.cmpTransform.local.translate(new f.Vector3(0, 0, 1));
            updateFragmentPosition(cornerBlock.cmpTransform.local.translation);
            f.Debug.log(playArea);
        }
        if (keysPressed[f.KEYBOARD_CODE.R]) {
            heroBlock.cmpTransform.local.rotateZ(90);
            rotateFragmentMatrix();
            f.Debug.log(heroBlock);
            keysPressed[f.KEYBOARD_CODE.R] = false;
        }
        // f.Debug.log(ball.cmpTransform.local.translation.x);
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function createCubeTetris() {
        let CubeTetris = new f.Node("CubeTetris");
        cmpLight.pivot.lookAt(new f.Vector3(0.5, 1, 0.8));
        CubeTetris.addComponent(cmpLight);
        initializePlayAreaMatrix();
        // ==========================================
        let heroBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(2, 3, 0)
        ];
        heroBlock = createBlock(heroBlockPosArray, heroBlock);
        CubeTetris.appendChild(heroBlock);
        // ==========================================
        let rodeIslandBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(3, 1, 0),
            new f.Vector3(3, 2, 0)
        ];
        rodeIsland = createBlock(rodeIslandBlockPosArray, rodeIsland);
        CubeTetris.appendChild(rodeIsland);
        // ==========================================
        let clevelandBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 2, 0)
        ];
        cleveland = createBlock(clevelandBlockPosArray, cleveland);
        CubeTetris.appendChild(cleveland);
        // ==========================================
        let smasherBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 0, 0)
        ];
        smasher = createBlock(smasherBlockPosArray, smasher);
        CubeTetris.appendChild(smasher);
        // ==========================================
        let smasher3dBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 0, 0),
            new f.Vector3(2, 0, 1),
            new f.Vector3(2, 1, 1),
            new f.Vector3(1, 1, 1),
            new f.Vector3(1, 0, 1)
        ];
        smasher3d = createBlock(smasher3dBlockPosArray, smasher3d);
        CubeTetris.appendChild(smasher3d);
        // ==========================================
        let blueRickyBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(1, 2, 0)
        ];
        blueRicky = createBlock(blueRickyBlockPosArray, blueRicky);
        CubeTetris.appendChild(blueRicky);
        // ==========================================
        let orangeRickyBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(3, 2, 0)
        ];
        orangeRicky = createBlock(orangeRickyBlockPosArray, orangeRicky);
        CubeTetris.appendChild(orangeRicky);
        // ==========================================
        let stableLBlockPosArray = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(1, 2, 0),
            new f.Vector3(0, 2, 0)
        ];
        stableL = createBlock(stableLBlockPosArray, stableL);
        CubeTetris.appendChild(stableL);
        // ==========================================
        let cornerBlockPosArray = [
            // new f.Vector3(2, 0, 0),
            new f.Vector3(2, 0, 1),
            new f.Vector3(2, 0, 2),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(2, 1, 1)
        ];
        cornerBlock = createBlock(cornerBlockPosArray, cornerBlock);
        CubeTetris.appendChild(cornerBlock);
        // ==========================================
        heroBlock.cmpTransform.local.translation = new f.Vector3(4, 0, 0);
        rodeIsland.cmpTransform.local.translation = new f.Vector3(-16, 0, 0);
        cleveland.cmpTransform.local.translation = new f.Vector3(-12, 0, 0);
        smasher.cmpTransform.local.translation = new f.Vector3(-8, 0, 0);
        smasher3d.cmpTransform.local.translation = new f.Vector3(-8, -5, 0);
        blueRicky.cmpTransform.local.translation = new f.Vector3(-4, 0, 0);
        orangeRicky.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        stableL.cmpTransform.local.translation = new f.Vector3(-20, 0, 0);
        cornerBlock.cmpTransform.local.translation = new f.Vector3(-20, -5, 0);
        cornerBlock.cmpTransform.local.rotateY(90);
        return CubeTetris;
    }
    function rotateFragmentMatrix() {
        let rotateMatrix = blockMatrix;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rotateMatrix[i][k][j] = blockMatrix[i][j][k];
                }
            }
        }
        f.Debug.log(rotateMatrix);
    }
    function updateFragmentPosition(fragmentPos) {
        let currentPosX = fragmentPos.x;
        let currentPosY = fragmentPos.y;
        let currentPosZ = fragmentPos.z;
        for (let i = currentPosX; i < currentPosX + 4; i++) {
            for (let j = currentPosY; j < currentPosY + 4; j++) {
                for (let k = currentPosZ; k < currentPosZ + 4; k++) {
                    playArea[i][j][k] = blockMatrix[i - currentPosX][j - currentPosY][k - currentPosZ];
                }
            }
        }
        f.Debug.log(playArea);
    }
    function initializePlayAreaMatrix() {
        playArea = [];
        for (let i = 0; i < 20; i++) {
            playArea[i] = [];
            for (let j = 0; j < 20; j++) {
                playArea[i][j] = [];
                for (let k = 0; k < 20; k++) {
                    playArea[i][j][k] = 0;
                }
            }
        }
        playArea[10][10][10] = 1;
    }
    function initializePlayAreaMap() {
    }
    // custom BlockGenerator
    function createBlock(blockPosArray, blockRoot) {
        blockRoot.addComponent(new f.ComponentTransform());
        blockMatrix = [];
        for (let i = 0; i < 4; i++) {
            blockMatrix[i] = [];
            for (let j = 0; j < 4; j++) {
                blockMatrix[i][j] = [];
                for (let k = 0; k < 4; k++) {
                    blockMatrix[i][j][k] = 0;
                }
            }
        }
        let blockArray = [];
        for (let i = 0; i < blockPosArray.length; i++) {
            blockArray[i] = new f.Node("Block" + "1");
            blockArray[i].addComponent(new f.ComponentMesh(meshQuad));
            blockArray[i].addComponent(new f.ComponentMaterial(mtrBall));
            blockArray[i].addComponent(new f.ComponentTransform());
            blockArray[i].cmpTransform.local.translation = blockPosArray[i];
            blockMatrix[blockPosArray[i].x][blockPosArray[i].y][blockPosArray[i].z] = 1;
            blockRoot.appendChild(blockArray[i]);
        }
        f.Debug.log(blockMatrix);
        return blockRoot;
    }
})(PongMaster || (PongMaster = {}));
//DREHUNG BESCHRÄNKEN
//FALL STOPPEN
//SEITLICHE BEWEGUNG 
//FALL STARTEN
//SEITLICHE BESCHRANKUNG BEZOGEN AUF DEN BESTEHENDEN CUBUS
//PLATZRESERVIERUNG 
//
//# sourceMappingURL=Main.js.map