namespace L16_ScrollerCollide {
  import f = FudgeCore;

  export class Floor extends f.Node {
    private static mesh: f.MeshSprite = new f.MeshSprite();
    private static material: f.Material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("blue", 0.5)));
    private static readonly pivot: f.Matrix4x4 = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    private static sprites: Sprite[];
    

    public constructor() {
      super("Floor");
      this.addComponent(new f.ComponentTransform());
      this.addComponent(new f.ComponentMaterial(Floor.material));
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Floor.mesh);

      let nodeSprite: NodeSprite = new NodeSprite("FloorSprite", Floor.sprites[0]);
      nodeSprite.activate(false);
      this.appendChild(nodeSprite);

      //nodesprite
      //cmpMesh.pivot.translateY(-0.5);
      cmpMesh.pivot = Floor.pivot;
      this.addComponent(cmpMesh);
      this.show();
    }

    public static generateSprites(_txtImage: f.TextureImage): void {
      Floor.sprites = [];
      let sprite: Sprite = new Sprite("FloorSprite");
      // sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 20, 20, 150), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(19, 420, 129, 34), 1, f.Vector2.ZERO(), 30, f.ORIGIN2D.TOPCENTER);
      Floor.sprites.push(sprite);
    }

    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == "FloorSprite");
    }

    public getRectWorld0Degreas(): f.Rectangle {

      let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);    
      let topleft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
      let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);
      
      let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
      let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: f.Vector2 = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();

      rect.size = size;

    
      return rect;
    }

    public getRectWorld90Degreas(): f.Rectangle {

      
      let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
      let topleft: f.Vector3 = new f.Vector3(-0.5 , 0.5, 0);
      let bottomright: f.Vector3 = new f.Vector3(0.5, -0.5, 0);
      
      //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
      let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: f.Vector2 = new f.Vector2(bottomright.z - topleft.z, bottomright.y - topleft.y);
      rect.position = new f.Vector2(this.mtxWorld.translation.z, this.mtxWorld.translation.y);
      
      rect.size = size;

 

      return rect;
    }

    public getFloorRotation(): number{
      let rotation: number =  this.cmpTransform.local.rotation.y; 
      return rotation;    
    }
    public rotateCollider(): f.Rectangle
    {

      f.Debug.log("xs: " + this.cmpTransform.local.translation.z);
      let rect: f.Rectangle = new f.Rectangle(4, 4, 22, 5);
      
      
      rect.height = this.cmpTransform.local.scaling.y;
      rect.width = this.cmpTransform.local.scaling.x;
      f.Debug.log(rect.x);
      
    

      return rect;
    }
  }
}