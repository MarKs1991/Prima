"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    var f = FudgeCore;
    class Floor extends f.Node {
        constructor() {
            super("Floor");
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(Floor.material));
            let cmpMesh = new f.ComponentMesh(Floor.mesh);
            let nodeSprite = new L16_ScrollerCollide.NodeSprite("FloorSprite", Floor.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            //nodesprite
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            this.show();
        }
        static generateSprites(_txtImage) {
            Floor.sprites = [];
            let sprite = new L16_ScrollerCollide.Sprite("FloorSprite");
            // sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 20, 20, 150), 1, ƒ.Vector2.ZERO(), 30, ƒ.ORIGIN2D.BOTTOMCENTER);
            sprite.generateByGrid(_txtImage, f.Rectangle.GET(19, 420, 129, 34), 1, f.Vector2.ZERO(), 30, f.ORIGIN2D.TOPCENTER);
            Floor.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "FloorSprite");
        }
        getRectWorld0Degreas() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            let pivot = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        getRectWorld90Degreas() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.z - topleft.z, bottomright.y - topleft.y);
            rect.position = new f.Vector2(this.cmpTransform.local.translation.z - .5, this.cmpTransform.local.translation.y);
            //this.cmpTransform.local.translateZ(rect.position.x);
            // this.cmpTransform.local.translateY(rect.position.y);
            rect.size = size;
            return rect;
        }
        getFloorRotation() {
            let rotation = this.cmpTransform.local.rotation.y;
            return rotation;
        }
        rotateCollider() {
            f.Debug.log("xs: " + this.cmpTransform.local.translation.z);
            let rect = new f.Rectangle(4, 4, 22, 5);
            rect.height = this.cmpTransform.local.scaling.y;
            rect.width = this.cmpTransform.local.scaling.x;
            f.Debug.log(rect.x);
            return rect;
        }
    }
    Floor.mesh = new f.MeshSprite();
    Floor.material = new f.Material("Floor", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("blue", 0.5)));
    Floor.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    L16_ScrollerCollide.Floor = Floor;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Floor.js.map