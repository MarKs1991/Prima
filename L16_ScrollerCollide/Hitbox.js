"use strict";
//<reference types="../FUDGE/Build/FudgeCore.js"/> 
var L16_ScrollerCollide;
//<reference types="../FUDGE/Build/FudgeCore.js"/> 
(function (L16_ScrollerCollide) {
    var f = FudgeCore;
    class Hitbox extends f.Node {
        constructor(_name) {
            if (_name) {
                super(_name);
            }
            else {
                super("Hitbox");
            }
            this.addComponent(new f.ComponentTransform());
            this.addComponent(new f.ComponentMaterial(Hitbox.material));
            let cmpMesh = new f.ComponentMesh(Hitbox.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Hitbox.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            for (let hitbox of L16_ScrollerCollide.level.getChildren()) {
                if (hitbox.name == "Hitbox") {
                    f.Debug.log("test2");
                    let hit = false;
                    let rectOfThis = this.getRectWorld();
                    let rectOfThat = hitbox.getRectWorld();
                    let expansionRight = new f.Vector2(rectOfThat.size.x);
                    let expansionDown = new f.Vector2(0, rectOfThat.size.y);
                    let topRight = f.Vector2.SUM(rectOfThat.position, expansionRight);
                    let bottomLeft = f.Vector2.SUM(rectOfThat.position, expansionDown);
                    let bottomRight = f.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
                    f.Debug.log(topRight);
                    f.Debug.log(bottomLeft);
                    f.Debug.log(bottomRight);
                    if (rectOfThis.isInside(rectOfThat.position)) {
                        hit = true;
                    }
                    else if (rectOfThis.isInside(topRight)) {
                        hit = true;
                    }
                    else if (rectOfThis.isInside(bottomLeft)) {
                        hit = true;
                    }
                    else if (rectOfThis.isInside(bottomRight)) {
                        hit = true;
                    }
                    if (hit) {
                        f.Debug.log("HIT");
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            return;
        }
    }
    Hitbox.mesh = new f.MeshSprite();
    Hitbox.material = new f.Material("Hitbox", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("blue", 0.5)));
    Hitbox.pivot = f.Matrix4x4.TRANSLATION(f.Vector3.Y(-0.5));
    L16_ScrollerCollide.Hitbox = Hitbox;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Hitbox.js.map