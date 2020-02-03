namespace L16_ScrollerCollide {
  import ƒ = FudgeCore;


  export interface CamTransformation {
      translation?: ƒ.Vector3;
      rotation?: ƒ.Vector3;
  }

  export interface CamTransformations {
      [keycode: string]: CamTransformation;
  }

  export class Camera extends ƒ.Node {
      public static camtransformations: CamTransformations = Camera.defineControls();

   
      constructor() {
          super("Camera");
          this.addComponent(new ƒ.ComponentTransform());
          
   
      }

      public static defineControls(): CamTransformations {
          let controls: CamTransformations = {};

          controls[ƒ.KEYBOARD_CODE.NUMPAD2] = { rotation: ƒ.Vector3.Z(-1) };
          controls[ƒ.KEYBOARD_CODE.NUMPAD8] = { rotation: ƒ.Vector3.Z(1) };
          controls[ƒ.KEYBOARD_CODE.NUMPAD4] = { rotation: ƒ.Vector3.Y(-1) };
          controls[ƒ.KEYBOARD_CODE.NUMPAD6] = { rotation: ƒ.Vector3.Y(1) };
          controls[ƒ.KEYBOARD_CODE.NUMPAD1] = { translation: ƒ.Vector3.Y(1) };
          controls[ƒ.KEYBOARD_CODE.NUMPAD7] = { translation: ƒ.Vector3.Y(-1) };
          return controls;
      }

      public move(_transformation: CamTransformation): void {
          let mtxContainer: ƒ.Matrix4x4 = this.cmpTransform.local;
          //let camChild: ƒ.Node[] = this.getChildrenByName("CamZoom");
         // let mtxFragment: ƒ.Matrix4x4 = camChild[0].cmpTransform.local;
          mtxContainer.rotate(_transformation.rotation, true);
          //mtxFragment.translate(_transformation.translation);
          
      }

      

}
}
