namespace L16_ScrollerCollide {
  import ƒ = FudgeCore;

  export interface Transformation {
      translation?: ƒ.Vector3;
      rotation?: ƒ.Vector3;
  }

  export interface Transformations {
      [keycode: string]: Transformation;
  }

  export class Control extends ƒ.Node {
    public static transformations: Transformations = Control.defineControls();
   

    constructor() {
        super("Control");
        this.addComponent(new ƒ.ComponentTransform());
    }

    public static defineControls(): Transformations {
      let controls: Transformations = {};
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
