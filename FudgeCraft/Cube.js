"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    var ƒ = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
        CUBE_TYPE["MAGENTA"] = "Magenta";
        CUBE_TYPE["CYAN"] = "Cyan";
        CUBE_TYPE["GREY"] = "Grey";
    })(CUBE_TYPE = FudgeCraft.CUBE_TYPE || (FudgeCraft.CUBE_TYPE = {}));
    let a = new ƒ.Color(0, 0, 0, 0);
    class Cube extends ƒ.Node {
        constructor(_type, _position) {
            super("Cube." + _type);
            let cmpMesh = new ƒ.ComponentMesh(Cube.mesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.9));
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(Cube.materials.get(_type));
            this.addComponent(cmpMaterial);
            let cmpTransform = new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_position));
            this.addComponent(cmpTransform);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderFlat, new ƒ.CoatColored(a))],
                [CUBE_TYPE.GREY, new ƒ.Material(CUBE_TYPE.GREY, ƒ.ShaderFlat, new ƒ.CoatColored(a))]
            ]);
        }
    }
    Cube.mesh = new ƒ.MeshCube();
    Cube.materials = Cube.createMaterials();
    FudgeCraft.Cube = Cube;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Cube.js.map