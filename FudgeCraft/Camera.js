"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var ƒ = FudgeCore;
    class Camera extends ƒ.Node {
        constructor() {
            super("Camera");
            this.addComponent(new ƒ.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[ƒ.KEYBOARD_CODE.NUMPAD2] = { rotation: ƒ.Vector3.Z(-1) };
            controls[ƒ.KEYBOARD_CODE.NUMPAD8] = { rotation: ƒ.Vector3.Z(1) };
            controls[ƒ.KEYBOARD_CODE.NUMPAD4] = { rotation: ƒ.Vector3.Y(-1) };
            controls[ƒ.KEYBOARD_CODE.NUMPAD6] = { rotation: ƒ.Vector3.Y(1) };
            controls[ƒ.KEYBOARD_CODE.NUMPAD1] = { translation: ƒ.Vector3.Y(1) };
            controls[ƒ.KEYBOARD_CODE.NUMPAD7] = { translation: ƒ.Vector3.Y(-1) };
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
    FudgeCraft.Camera = Camera;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Camera.js.map