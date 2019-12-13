"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    FudgeCraft.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    FudgeCraft.game = new FudgeCraft.ƒ.Node("FudgeCraft");
    FudgeCraft.grid = new FudgeCraft.Grid();
    FudgeCraft.cameraRot = new FudgeCraft.Camera();
    let CamZoom = new FudgeCraft.ƒ.Node("CamZoom");
    let cam = new FudgeCraft.ƒ.ComponentCamera;
    let control = new FudgeCraft.Control();
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        FudgeCraft.ƒ.RenderManager.initialize(true);
        FudgeCraft.ƒ.Debug.log("Canvas", canvas);
        CamZoom.addComponent(cam);
        CamZoom.addComponent(new FudgeCraft.ƒ.ComponentTransform);
        FudgeCraft.cameraRot.appendChild(CamZoom);
        FudgeCraft.game.appendChild(FudgeCraft.cameraRot);
        //cam.pivot.translate(new ƒ.Vector3(0, 0, -10));
        //cam.pivot.lookAt(ƒ.Vector3.ZERO());
        cam.pivot.translate(new FudgeCraft.ƒ.Vector3(4, 6, 20));
        cam.pivot.lookAt(FudgeCraft.ƒ.Vector3.ZERO());
        cam.backgroundColor = FudgeCraft.ƒ.Color.WHITE;
        let cmpLight = new FudgeCraft.ƒ.ComponentLight(new FudgeCraft.ƒ.LightDirectional(FudgeCraft.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new FudgeCraft.ƒ.Vector3(0.5, 1, 0.8));
        FudgeCraft.game.addComponent(cmpLight);
        let cmpLightAmbient = new FudgeCraft.ƒ.ComponentLight(new FudgeCraft.ƒ.LightAmbient(FudgeCraft.ƒ.Color.DARK_GREY));
        FudgeCraft.game.addComponent(cmpLightAmbient);
        viewport = new FudgeCraft.ƒ.Viewport();
        viewport.initialize("Viewport", FudgeCraft.game, cam, canvas);
        FudgeCraft.ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        FudgeCraft.game.appendChild(control);
        FudgeCraft.ƒ.Debug.log(FudgeCraft.game);
        viewport.draw();
        FudgeCraft.ƒ.Debug.log("Game", FudgeCraft.game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        if (_event.code == FudgeCraft.ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        if (_event.code == FudgeCraft.ƒ.KEYBOARD_CODE.NUMPAD7) {
            CamZoom.cmpTransform.local.translateX(1);
            cam.pivot.translateZ(-5);
            cam.pivot.lookAt(FudgeCraft.ƒ.Vector3.ZERO());
        }
        let transformation = FudgeCraft.Control.transformations[_event.code];
        if (transformation) {
            move(transformation);
        }
        let camtransformation = FudgeCraft.Camera.camtransformations[_event.code];
        if (camtransformation) {
            cammove(camtransformation);
        }
        // ƒ.RenderManager.update();
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? FudgeCraft.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new FudgeCraft.ƒ.Vector3(),
            translation: _transformation.translation ? FudgeCraft.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new FudgeCraft.ƒ.Vector3()
        };
        let timers = FudgeCraft.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        FudgeCraft.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function cammove(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        // let fullTranslation: number = 1;
        let move = {
            rotation: _transformation.rotation ? FudgeCraft.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new FudgeCraft.ƒ.Vector3(),
        };
        control.cmpTransform.local.rotateY(move.rotation.y);
        //control.cmpTransform.local.translation = move.translation;
        move.rotation.scale(1 / animationSteps);
        FudgeCraft.ƒ.Time.game.setTimer(10, animationSteps, function () {
            FudgeCraft.cameraRot.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = FudgeCraft.Fragment.getRandom();
        control.cmpTransform.local = FudgeCraft.ƒ.Matrix4x4.IDENTITY;
        control.cmpTransform.local.translateX(4);
        control.setFragment(fragment);
    }
    FudgeCraft.startRandomFragment = startRandomFragment;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Main.js.map