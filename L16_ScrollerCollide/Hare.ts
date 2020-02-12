// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerCollide {
  import f = FudgeCore;

  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    JUMP = "Jump"
  }
  export enum DIRECTION {
    LEFT, RIGHT
  }


  export class Hare extends f.Node {
    private static sprites: Sprite[];
    private static speedMax: f.Vector2 = new f.Vector2(1.5, 5); // units per second
    private static gravity: f.Vector2 = f.Vector2.Y(-3  );
    // private action: ACTION;
    // private time: f.Time = new f.Time();
    public speed: f.Vector3 = f.Vector3.ZERO();
    public lastHitIndex: number; 


    constructor(_name: string = "Hare") {
      super(_name);
      this.addComponent(new f.ComponentTransform());

      for (let sprite of Hare.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);
        
        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );

        this.appendChild(nodeSprite);
      }

      this.show(ACTION.IDLE);
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_txtImage: f.TextureImage): void {
      Hare.sprites = [];
      let sprite: Sprite = new Sprite(ACTION.WALK);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 2308, 13, 20), 6,   new f.Vector2(1,0), 30, f.ORIGIN2D.BOTTOMCENTER);
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1352, 15, 19), 15, new f.Vector2(1,0), 30, f.ORIGIN2D.BOTTOMCENTER);
      Hare.sprites.push(sprite);
    }

    public show(_action: ACTION): void {
      if (_action == ACTION.JUMP)
        return;
      for (let child of this.getChildren())
        child.activate(child.name == _action);
      // this.action = _action;
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {

      
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          break;
        case ACTION.WALK:
          let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);

          if(_direction == DIRECTION.RIGHT)
          {
            this.speed.x = Hare.speedMax.x;
          }

          if(_direction == DIRECTION.LEFT)
          {
            this.speed.x = Hare.speedMax.x * -1;
          }

          //this.speed.x = Hare.speedMax.x; // * direction;
          //this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
          
         
          break;
        case ACTION.JUMP:
          this.speed.y =4;
          break;
      }
      this.show(_action);
    }

    private update = (_event: f.Eventƒ): void => {
      this.broadcastEvent(new CustomEvent("showNext"));

      let timeFrame: number = f.Loop.timeFrameGame / 1000;
      this.speed.y += Hare.gravity.y * timeFrame;
      let distance: f.Vector3 = f.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);

      
      this.checkCollision();
    }
  
    private checkCollision(): void {
      
      let i = 0;
      for (let floor of level.getChildren()) {
        

        let rotation: number = (<Floor>floor).getFloorRotation();
        let rect: f.Rectangle = new f.Rectangle();
        let CharacterCollider: f.Vector2;

        if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180) 
          {
            rect = (<Floor>floor).getRectWorld0Degreas();
            CharacterCollider = this.cmpTransform.local.translation.toVector2();
          }
        else if(rotation == 90 || rotation == -90)
          {
             rect = (<Floor>floor).getRectWorld90Degreas();
            CharacterCollider = new f.Vector2(this.mtxWorld.translation.z, this.mtxWorld.translation.y);
                   
          }
       
        
        //console.log(rect.toString());
        
        let hit: boolean = rect.isInside(CharacterCollider);
        if (hit) {
          f.Debug.log(CharacterCollider.x);
          
          //this.lastHit =  new f.Vector3((<Floor>floor).mtxWorld.translation.x, (<Floor>floor).mtxWorld.translation.y , (<Floor>floor).mtxWorld.translation.z);
          this.lastHitIndex = i;

     
        let translation: f.Vector3 = this.cmpTransform.local.translation;
        translation.y = rect.y;
        this.cmpTransform.local.translation = translation;
        this.speed.y = 0;
        
      }
      i++;
    }
  }
}


}
