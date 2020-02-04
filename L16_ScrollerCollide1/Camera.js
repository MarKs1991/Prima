"use strict";
var L16_ScrollerCollide1;
(function (L16_ScrollerCollide1) {
    var ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        constructor() {
            super("Camera");
            this.addComponent(new ƒ.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[ƒ.KEYBOARD_CODE.ARROW_LEFT] = { rotation: ƒ.Vector3.Y(-.5) };
            controls[ƒ.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: ƒ.Vector3.Y(.5) };
            return controls;
        }
        move(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            //let camChild: ƒ.Node[] = this.getChildrenByName("CamZoom");
            // let mtxFragment: ƒ.Matrix4x4 = camChild[0].cmpTransform.local;
            mtxContainer.rotate(_transformation.rotation, true);
            //mtxFragment.translate(_transformation.translation);
        }
    }
    Camera.camtransformations = Camera.defineControls();
    L16_ScrollerCollide1.Camera = Camera;
})(L16_ScrollerCollide1 || (L16_ScrollerCollide1 = {}));
//# sourceMappingURL=Camera.js.map