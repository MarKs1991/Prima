"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    var f = FudgeCore;
    class Coin extends f.Node {
        //private static speedMax : f.Vector2 = new f.Vector2(1.5, 5); // units per second
        //private static gravity : f.Vector2 = f.Vector2.Y(-2);
        // private action: ACTION;
        // private time: f.Time = new f.Time();
        // public speed : f.Vector3 = f.Vector3.ZERO();
        // public lastHitIndex : number;
        constructor(_name = "Coin") {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
            };
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Coin.sprites) {
                let nodeSprite = new L16_ScrollerCollide.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => {
                    _event.currentTarget.showFrameNext();
                }, true);
                this.appendChild(nodeSprite);
            }
            this.show();
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Coin.sprites = [];
            let sprite = new L16_ScrollerCollide.Sprite("CoinSprite");
            // sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 20, 20, 150), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 2899, 24, 24), 7, new f.Vector2(0, 4), 30, f.ORIGIN2D.TOPCENTER);
            Coin.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "CoinSprite");
        }
    }
    L16_ScrollerCollide.Coin = Coin;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Coin.js.map