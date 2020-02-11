namespace L16_ScrollerCollide {
  import f = FudgeCore;

  export class Planes extends Hare {

    public static generateSprites(_txtImage : f.TextureImage): void {
      Hare.sprites = [];
      let sprite: Sprite = new Sprite(ACTION.WALK);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 2308, 13, 20), 6, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1352, 15, 19), 15, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
      // sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1464, 19, 21), 48, new f.Vector2(1,0), 30, f.ORIGIN2D.BOTTOMCENTER);
      Hare.sprites.push(sprite);

      sprite = new Sprite(ACTION.JUMP);
      sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 261, 23, 24), 7, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
      Hare.sprites.push(sprite);
  }

  }
}