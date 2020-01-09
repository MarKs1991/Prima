"use strict";
var L14_ScrollerFoundation;
(function (L14_ScrollerFoundation) {
    var ƒ = FudgeCore;
    window.addEventListener("load", test);
    let sprite;
    let root;
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        sprite = new L14_ScrollerFoundation.Sprite("Test");
        let rects = [
            new ƒ.Rectangle(0, 241, 16, 19),
            new ƒ.Rectangle(17, 241, 16, 19),
            new ƒ.Rectangle(34, 241, 16, 19),
            new ƒ.Rectangle(51, 241, 16, 19),
            new ƒ.Rectangle(68, 241, 16, 19),
            new ƒ.Rectangle(85, 241, 16, 19)
        ];
        sprite.generate(txtImage, rects, 16, ƒ.ORIGIN2D.BOTTOMCENTER);
        ƒ.RenderManager.initialize(true, false);
        root = new L14_ScrollerFoundation.NodeSprite("Root", sprite);
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
            root.showFrameNext();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(L14_ScrollerFoundation || (L14_ScrollerFoundation = {}));
//# sourceMappingURL=Test.js.map