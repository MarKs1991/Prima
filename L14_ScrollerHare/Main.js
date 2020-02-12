"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerHare;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerHare) {
    var ƒ = FudgeCore;
    var Sprite = L14_ScrollerFoundation.Sprite;
    var NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let sprite;
    let root;
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        sprite = new Sprite("Hare");
        //sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(0, 2308, 13, 20), 6,   new ƒ.Vector2(1,0), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
        //sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(0, 2137, 16, 22), 43,   ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
        sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(0, 2899, 24, 24), 8, new ƒ.Vector2(8, 8), 30, ƒ.ORIGIN2D.TOPCENTER);
        ƒ.RenderManager.initialize(true, false);
        root = new ƒ.Node("Root");
        let mtxHare;
        let hare;
        hare = new NodeSprite("Hare0", sprite);
        hare.setFrameDirection(1);
        root.appendChild(hare);
        hare = new NodeSprite("Hare1", sprite);
        mtxHare = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(0));
        mtxHare.scaleX(-1);
        hare.addComponent(new ƒ.ComponentTransform(mtxHare));
        root.appendChild(hare);
        hare = new NodeSprite("Hare2", sprite);
        mtxHare = ƒ.Matrix4x4.IDENTITY;
        hare.addComponent(new ƒ.ComponentTransform(mtxHare));
        root.appendChild(hare);
        hare = new NodeSprite("Hare3", sprite);
        mtxHare = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-1));
        hare.addComponent(new ƒ.ComponentTransform(mtxHare));
        root.appendChild(hare);
        hare.activate(false);
        for (let child of root.getChildren())
            child.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            // ƒ.Debug.log(frame);
            // root.showFrameNext();
            root.broadcastEvent(new CustomEvent("showNext"));
            root.getChildren()[3].cmpTransform.local.rotateY(5);
            mtxHare = root.getChildren()[2].cmpTransform.local;
            mtxHare.translateX(0.1);
            // ƒ.Debug.log(mtxHare.translation.toString());
            if (mtxHare.translation.x > 2) {
                mtxHare.translation = ƒ.Vector3.X(-2);
                root.getChildren()[3].activate(!root.getChildren()[3].isActive);
            }
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(L14_ScrollerHare || (L14_ScrollerHare = {}));
//# sourceMappingURL=Main.js.map