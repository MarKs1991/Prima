"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    var ƒ = FudgeCore;
    class Control extends ƒ.Node {
        constructor() {
            super("Control");
            this.addComponent(new ƒ.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[ƒ.KEYBOARD_CODE.ARROW_UP] = { rotation: ƒ.Vector3.X(-1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_DOWN] = { rotation: ƒ.Vector3.X(1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_LEFT] = { rotation: ƒ.Vector3.Y(-1) };
            controls[ƒ.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: ƒ.Vector3.Y(1) };
            controls[ƒ.KEYBOARD_CODE.W] = { translation: ƒ.Vector3.Z(-1) };
            controls[ƒ.KEYBOARD_CODE.S] = { translation: ƒ.Vector3.Z(1) };
            controls[ƒ.KEYBOARD_CODE.A] = { translation: ƒ.Vector3.X(-1) };
            controls[ƒ.KEYBOARD_CODE.D] = { translation: ƒ.Vector3.X(1) };
            controls[ƒ.KEYBOARD_CODE.SHIFT_LEFT] = controls[ƒ.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: ƒ.Vector3.Y(1) };
            controls[ƒ.KEYBOARD_CODE.CTRL_LEFT] = controls[ƒ.KEYBOARD_CODE.CTRL_RIGHT] = { translation: ƒ.Vector3.Y(-1) };
            return controls;
        }
    }
    Control.transformations = Control.defineControls();
    L16_ScrollerCollide.Control = Control;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Control.js.map