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
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld0Degreas() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(-0.5, 0.5, 0);
            let bottomright = new f.Vector3(0.5, -0.5, 0);
            f.Debug.log("x" + rect.x);
            f.Debug.log("y" + rect.y);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            //f.Debug.log("x" + rect.position.x);
            //f.Debug.log("y" + rect.position.y);
            rect.size = size;
            // f.Debug.log("x" + size.x);
            //f.Debug.log("y" + size.y);
            return rect;
        }
        getRectWorld90Degreas() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topleft = new f.Vector3(0, 0.5, -0.5);
            let bottomright = new f.Vector3(0, -0.5, 0.5);
            //let pivot: f.Matrix4x4 = this.getComponent(f.ComponentMesh).pivot;
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new f.Vector2(bottomright.z - topleft.z, bottomright.y - topleft.y);
            rect.position = new f.Vector2(this.cmpTransform.local.translation.z, this.cmpTransform.local.translation.y);
            rect.size = size;
            //f.Debug.log("x" + size.x);
            // f.Debug.log("y" + size.y);
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