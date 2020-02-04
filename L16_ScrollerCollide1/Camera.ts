namespace L16_ScrollerCollide1 {
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

          
         
          controls[ƒ.KEYBOARD_CODE.ARROW_LEFT] = { rotation: ƒ.Vector3.Y(-.5)};
          controls[ƒ.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: ƒ.Vector3.Y(.5) };
      
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
