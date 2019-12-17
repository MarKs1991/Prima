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
            this.push(FudgeCraft.ƒ.Vector3.ZERO(), new GridElement(new FudgeCraft.Cube(FudgeCraft.CUBE_TYPE.RED, FudgeCraft.ƒ.Vector3.ZERO())));
            //this.push(ƒ.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.RED, new ƒ.Vector3(0,0,1))));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            //ƒ.Debug.log(_element);
            FudgeCraft.ƒ.Debug.log(_element.cube.getComponent(FudgeCraft.ƒ.ComponentMaterial));
            let mat = _element.cube.getComponent(FudgeCraft.ƒ.ComponentMaterial);
            mat.material.setCoat(new FudgeCraft.ƒ.CoatColored(FudgeCraft.ƒ.Color.GREEN));
            let type;
            type = FudgeCraft.Fragment.getRandomEnum(FudgeCraft.CUBE_TYPE);
            FudgeCraft.ƒ.Debug.log(type);
            //_element.cube.name = "Green";
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
        clearLayer(layerDepth) {
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
        findExecutingFragmentPiece(_position) {
            let positionArray = new Array();
            // ƒ.Debug.log("Block");
            positionArray = [_position.x, _position.y, _position.z];
            for (let i = 0; i <= positionArray.length - 1; i++) {
                // ƒ.Debug.log( i +"    "+ positionArray[i]);
                if (positionArray[i] > 0.5 || positionArray[i] < -0.5) {
                    this.checkLayerForCompletion(positionArray[i]);
                }
            }
        }
        checkLayerForCompletion(layerDepth) {
            layerDepth = Math.round(layerDepth);
            FudgeCraft.ƒ.Debug.log("layerdepth: " + layerDepth);
            let isOccupied = new Array();
            for (let x = -layerDepth; x <= layerDepth; x++) {
                for (let y = -layerDepth; y <= layerDepth; y++) {
                    for (let z = -layerDepth; z <= layerDepth; z++) {
                        if (x == layerDepth || x == -layerDepth || y == layerDepth || y == -layerDepth || z == layerDepth || z == -layerDepth) {
                            isOccupied[x + y + z] = this.checkForFragment(new FudgeCraft.ƒ.Vector3(x, y, z));
                            //  ƒ.Debug.log(isOccupied);
                            if (isOccupied[x + y + z] == false) {
                                return;
                            }
                        }
                    }
                }
            }
            this.clearLayer(layerDepth);
        }
    }
    FudgeCraft.Grid = Grid;
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Grid.js.map