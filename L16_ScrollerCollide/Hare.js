"use strict";
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    var f = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = L16_ScrollerCollide.ACTION || (L16_ScrollerCollide.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = L16_ScrollerCollide.DIRECTION || (L16_ScrollerCollide.DIRECTION = {}));
    class Hare extends f.Node {
        constructor(_name = "Hare") {
            super(_name);
            // private action: ACTION;
            // private time: f.Time = new f.Time();
            this.speed = f.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = f.Loop.timeFrameGame / 1000;
                this.speed.y += Hare.gravity.y * timeFrame;
                let distance = f.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
                this.collectCoins();
            };
            this.addComponent(new f.ComponentTransform());
            for (let sprite of Hare.sprites) {
                let nodeSprite = new L16_ScrollerCollide.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => {
                    _event.currentTarget.showFrameNext();
                }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Hare.sprites = [];
            let sprite = new L16_ScrollerCollide.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 2308, 13, 20), 6, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1352, 15, 19), 15, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            // sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 1464, 19, 21), 48, new f.Vector2(1,0), 30, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.JUMP);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(0, 261, 23, 24), 7, new f.Vector2(1, 0), 30, f.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
        }
        show(_action) {
            if (_action == ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    if (_direction == DIRECTION.RIGHT) {
                        this.speed.x = Hare.speedMax.x;
                    }
                    if (_direction == DIRECTION.LEFT) {
                        this.speed.x = Hare.speedMax.x * -1;
                    }
                    // this.speed.x = Hare.speedMax.x; // * direction;
                    // this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    this.cmpTransform.local.translateY(.1);
                    this.speed.y = 3.5;
                    break;
            }
            this.show(_action);
        }
        checkCollision() {
            let i = 0;
            for (let floor of L16_ScrollerCollide.level.getChildren()) {
                let rotation = floor.getFloorRotation();
                let rect = new f.Rectangle();
                let CharacterCollider;
                // use ZY Collider on 90/-90 Rotation
                if (rotation == 90 || rotation == -90) {
                    rect = floor.getRectWorld(rotation);
                    CharacterCollider = new f.Vector2(this.mtxWorld.translation.z, this.mtxWorld.translation.y);
                }
                else { // use XY Collider on 0/180 Rotation
                    rect = floor.getRectWorld(rotation);
                    CharacterCollider = this.cmpTransform.local.translation.toVector2();
                }
                // console.log(rect.toString());
                let hit = rect.isInside(CharacterCollider);
                if (hit) {
                    // f.Debug.log("current posX" + this.cmpTransform.local.translation.x);
                    // f.Debug.log("current posZ" + this.cmpTransform.local.translation.z);
                    // this.lastHit =  new f.Vector3((<Floor>floor).mtxWorl  d.translation.x, (<Floor>floor).mtxWorld.translation.y , (<Floor>floor).mtxWorld.translation.z);
                    this.lastHitIndex = i;
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
                i++;
            }
        }
        collectCoins() {
            for (let coin of L16_ScrollerCollide.collectorAble.getChildren()) {
                let rotation = coin.getCoinRotation();
                let rect = new f.Rectangle();
                let CharacterCollider;
                // use ZY Collider on 90/-90 Rotation
                if (rotation == 90 || rotation == -90) {
                    rect = coin.getRectWorld(rotation);
                    CharacterCollider = new f.Vector2(this.mtxWorld.translation.z, this.mtxWorld.translation.y);
                }
                else { // use XY Collider on 0/180 Rotation
                    rect = coin.getRectWorld(rotation);
                    CharacterCollider = this.cmpTransform.local.translation.toVector2();
                }
                // console.log(rect.toString());
                let hit = rect.isInside(CharacterCollider);
                if (hit) {
                    //f.Debug.log("HIT");
                }
            }
        }
    }
    Hare.speedMax = new f.Vector2(1.5, 5); // units per second
    Hare.gravity = f.Vector2.Y(-2);
    L16_ScrollerCollide.Hare = Hare;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Hare.js.map