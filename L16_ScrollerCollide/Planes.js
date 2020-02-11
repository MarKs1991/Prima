"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    var f = FudgeCore;
    class Planes extends L16_ScrollerCollide.Hare {
        static generateSprites(_txtImage) {
            L16_ScrollerCollide.Hare.sprites = [];
            let sprite = new L16_ScrollerCollide.Sprite(L16_ScrollerCollide.ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 2308, 13, 20), 6, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            L16_ScrollerCollide.Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(L16_ScrollerCollide.ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1352, 15, 19), 15, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            // sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1464, 19, 21), 48, new f.Vector2(1,0), 30, f.ORIGIN2D.BOTTOMCENTER);
            L16_ScrollerCollide.Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(L16_ScrollerCollide.ACTION.JUMP);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 261, 23, 24), 7, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            L16_ScrollerCollide.Hare.sprites.push(sprite);
        }
    }
    L16_ScrollerCollide.Planes = Planes;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Planes.js.map