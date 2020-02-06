//<reference types="../FUDGE/Build/FudgeCore.js"/> 
namespace L16_ScrollerCollide {
    import f = FudgeCore;
  
    export class Hitbox extends f.Node {
      private static mesh: f.MeshSprite = new f.MeshSprite();
      private static material: f.Material = new f.Material("Hitbox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("blue", 0.5)));
      private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
  
      public constructor(_name?: string) {

        if(_name){
          super(_name);
        }else{
          super("Hitbox");
        }
        this.addComponent(new f.ComponentTransform());
        this.addComponent(new f.ComponentMaterial(Hitbox.material));
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Hitbox.mesh);
        //cmpMesh.pivot.translateY(-0.5);
        cmpMesh.pivot = Hitbox.pivot;
        this.addComponent(cmpMesh); 
      }
  
      public getRectWorld(): f.Rectangle {
        let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
        let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
        let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);
        
        //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
        let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
        topleft.transform(mtxResult, true);
        bottomright.transform(mtxResult, true);
  
        let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
        rect.position = topleft.toVector2();
        rect.size = size;
  
        return rect;
      }

      public checkCollision(): boolean {

        for (let hitbox of level.getChildren()) {

          
          if (hitbox.name == "Hitbox") {
            f.Debug.log("test2");
            let hit: boolean = false;
            let rectOfThis: f.Rectangle = (<Hitbox>this).getRectWorld();
            let rectOfThat: f.Rectangle = (<Hitbox>hitbox).getRectWorld();
            let expansionRight: f.Vector2 = new f.Vector2(rectOfThat.size.x);
            let expansionDown: f.Vector2 = new f.Vector2(0 , rectOfThat.size.y);
            let topRight: f.Vector2 = f.Vector2.SUM(rectOfThat.position, expansionRight);
            let bottomLeft: f.Vector2 = f.Vector2.SUM(rectOfThat.position, expansionDown);
            let bottomRight: f.Vector2 = f.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
            f.Debug.log(topRight);
            f.Debug.log(bottomLeft);
            f.Debug.log(bottomRight);
            if (rectOfThis.isInside(rectOfThat.position)) {
              hit = true;
            } else if (rectOfThis.isInside(topRight)) {
              hit = true;
            } else if (rectOfThis.isInside(bottomLeft)) {
              hit = true;
            } else if (rectOfThis.isInside(bottomRight)) {
              hit = true;
            }

            if (hit) {
              f.Debug.log("HIT");
              return true;
            }
          } else {
            return false;
          }
          
        }
        return;
      }
    }
  }