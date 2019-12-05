"use strict";
var FudgeCraft;
(function (FudgeCraft) {
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    FudgeCraft.GridElement = GridElement;
    class Grid extends Map {
        constructor() {
            super();
            this.push(FudgeCraft.ƒ.Vector3.ZERO(), new GridElement(new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.GREY, FudgeCraft.ƒ.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element) {
                FudgeCraft.game.appendChild(_element.cube);
                // ƒ.Debug.log(_element.cube.cmpTransform.local.translation);
            }
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        checkForFragment(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            if (element != undefined)
                return true;
            else
                return false;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                FudgeCraft.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
        checkLayer() {
            let layerDepth = 1;
            let a = new Array(52);
            for (let i = 0; i < 1; i++) { // +X
                a[0] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 0 + i, 0 + i));
                a[1] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 1 + i, 0 + i));
                a[2] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 0 + i, 1 + i));
                a[3] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 0 + i, -1 + i));
                a[4] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, -1 + i, 0 + i));
                a[5] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 1 - i, 1 - i));
                a[6] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, -1 - i, -1 - i));
                a[7] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, 1 - i, -1 - i));
                a[8] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(layerDepth + i, -1 - i, 1 - i));
                // -X
                a[9] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 0 + i, 0 + i));
                a[8] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 1 + i, 0 + i));
                a[10] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 0 + i, 1 + i));
                a[11] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 0 + i, -1 + i));
                a[12] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, -1 + i, 0 + i));
                a[13] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 1 - i, 1 - i));
                a[14] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, -1 - i, -1 - i));
                a[15] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, 1 - i, -1 - i));
                a[16] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-layerDepth + i, -1 - i, 1 - i));
                // +Y
                a[17] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, layerDepth + i, 0 + i));
                a[18] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, layerDepth + i, 0 + i));
                a[19] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, layerDepth + i, 1 + i));
                a[20] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, layerDepth + i, -1 + i));
                a[21] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, layerDepth + i, 0 + i));
                a[22] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, layerDepth - i, 1 - i));
                a[23] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, layerDepth - i, -1 - i));
                a[24] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, layerDepth - i, -1 - i));
                a[25] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, layerDepth - i, 1 - i));
                // -Y
                a[26] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -layerDepth + i, 0 + i));
                a[27] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -layerDepth + i, 0 + i));
                a[28] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -layerDepth + i, 1 + i));
                a[29] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -layerDepth + i, -1 + i));
                a[30] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, -layerDepth + i, 0 + i));
                a[31] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -layerDepth - i, 1 - i));
                a[32] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, -layerDepth - i, -1 - i));
                a[33] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -layerDepth - i, -1 - i));
                a[34] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, -layerDepth - i, 1 - i));
                // +Z
                a[35] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, 0 + i, layerDepth + i));
                a[36] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, 0 + i, layerDepth + i));
                a[37] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, 1 + i, layerDepth + i));
                a[38] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -1 + i, layerDepth + i));
                a[39] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, 0 + i, layerDepth + i));
                a[40] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, 1 - i, layerDepth - i));
                a[41] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, -1 - i, layerDepth - i));
                a[42] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -1 - i, layerDepth - i));
                a[43] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, 1 - i, layerDepth - i));
                // -Z
                a[44] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -0 + i, -layerDepth + i));
                a[45] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -0 + i, -layerDepth + i));
                a[46] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -1 + i, -layerDepth + i));
                a[47] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(0 + i, -1 + i, -layerDepth + i));
                a[48] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, 0 + i, -layerDepth + i));
                a[49] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, 1 - i, -layerDepth - i));
                a[50] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, -1 - i, -layerDepth - i));
                a[51] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(1 + i, -1 - i, -layerDepth - i));
                a[52] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(-1 + i, 1 - i, -layerDepth - i));
            }
            for (let i = 0; i <= a.length; i++) {
                if (a[i] == false) {
                    FudgeCraft.ƒ.Debug.log("false");
                }
            }
        }
        clearLayer() {
            let layerDepth = 1;
            for (let x = -layerDepth; x <= layerDepth; x++) {
                for (let y = -layerDepth; y <= layerDepth; y++) {
                    for (let z = -layerDepth; z <= layerDepth; z++) {
                        if (x == layerDepth || x == -layerDepth || y == layerDepth || y == -layerDepth || z == layerDepth || z == -layerDepth) {
                            this.pop(new FudgeCraft.ƒ.Vector3(x, y, z));
                        }
                    }
                }
            }
        }
        checkLayerForCompletion() {
            FudgeCraft.ƒ.Debug.log("ff");
            let layerDepth = 1;
            let isOccupied = new Array();
            for (let x = -layerDepth; x <= layerDepth; x++) {
                for (let y = -layerDepth; y <= layerDepth; y++) {
                    for (let z = -layerDepth; z <= layerDepth; z++) {
                        if (x == layerDepth || x == -layerDepth || y == layerDepth || y == -layerDepth || z == layerDepth || z == -layerDepth) {
                            isOccupied[x + y + z] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(x, y, z));
                            if (isOccupied[x + y + z] == false) {
                                return;
                            }
                        }
                    }
                }
            }
            this.clearLayer();
        }
    }
    FudgeCraft.Grid = Grid;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Grid.js.map