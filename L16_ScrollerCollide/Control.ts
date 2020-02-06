namespace L16_ScrollerCollide {
  import f = FudgeCore;

  export interface Transformation {
      translation?: f.Vector3;
      rotation?: f.Vector3;
  }

  export interface Transformations {
      [keycode: string]: Transformation;
  }

  export class Control extends f.Node {
    public static transformations: Transformations = Control.defineControls();
   

    constructor() {
        super("Control");
        this.addComponent(new f.ComponentTransform());
    }

    public static defineControls(): Transformations {
      let controls: Transformations = {};
      controls[f.KEYBOARD_CODE.ARROW_UP] = { rotation: f.Vector3.X(-1) };
      controls[f.KEYBOARD_CODE.ARROW_DOWN] = { rotation: f.Vector3.X(1) };
      controls[f.KEYBOARD_CODE.ARROW_LEFT] = { rotation: f.Vector3.Y(-1) };
      controls[f.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: f.Vector3.Y(1) };
      controls[f.KEYBOARD_CODE.W] = { translation: f.Vector3.Z(-1) };
      controls[f.KEYBOARD_CODE.S] = { translation: f.Vector3.Z(1) };
      controls[f.KEYBOARD_CODE.A] = { translation: f.Vector3.X(-1) };
      controls[f.KEYBOARD_CODE.D] = { translation: f.Vector3.X(1) };
      controls[f.KEYBOARD_CODE.SHIFT_LEFT] = controls[f.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: f.Vector3.Y(1) };
      controls[f.KEYBOARD_CODE.CTRL_LEFT] = controls[f.KEYBOARD_CODE.CTRL_RIGHT] = { translation: f.Vector3.Y(-1) };
      return controls;
  }
 

  }

    

}
