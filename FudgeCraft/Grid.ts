namespace FudgeCraft {
    export class GridElement {
        public cube: Cube;

        constructor(_cube: Cube = null) {
            this.cube = _cube;
        }
    }

    

    export class Grid extends Map<string, GridElement> { // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
            this.push(ƒ.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.RED, ƒ.Vector3.ZERO())));
            //this.push(ƒ.Vector3.ZERO(), new GridElement(new Cube(CUBE_TYPE.RED, new ƒ.Vector3(0,0,1))));
        }

        push(_position: ƒ.Vector3, _element: GridElement = null): void {
            let key: string = this.toKey(_position);
            this.set(key, _element);
            //ƒ.Debug.log(_element);

            ƒ.Debug.log(_element.cube.getComponent(ƒ.ComponentMaterial));
           

            let type: CUBE_TYPE;
            type = Fragment.getRandomEnum(CUBE_TYPE);
            ƒ.Debug.log(type);
            

            //_element.cube.name = "Green";
            if (_element) {
                game.appendChild(_element.cube);
                // ƒ.Debug.log(_element.cube.cmpTransform.local.translation);
            }
        }

        

        pull(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            return element;
        }

        checkForFragment(_position: ƒ.Vector3): boolean {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            
         
            if (element != undefined)
                return true;
            else
                return false;

        }


        pop(_position: ƒ.Vector3): GridElement {
            let key: string = this.toKey(_position);
            let element: GridElement = this.get(key);
            this.delete(key);

            if (element)
                game.removeChild(element.cube);

            return element;
        }

        toKey(_position: ƒ.Vector3): string {
            let position: ƒ.Vector3 = _position.map(Math.round);
            let key: string = position.toString();
            return key;
        }

        clearLayer(layerDepth: number): void {



            for (let x: number = -layerDepth; x <= layerDepth; x++) {
                for (let y: number = -layerDepth; y <= layerDepth; y++) {
                    for (let z: number = -layerDepth; z <= layerDepth; z++) {
                        if (x == layerDepth || x == -layerDepth || y == layerDepth || y == -layerDepth || z == layerDepth || z == -layerDepth) {

                            this.pop(new ƒ.Vector3(x, y, z));
                        }
                    }
                }
            }
        }
        findExecutingFragmentPiece(_position: ƒ.Vector3): void {
            let positionArray: number[] = new Array();
           // ƒ.Debug.log("Block");

            positionArray = [_position.x, _position.y, _position.z];

            for (let i = 0; i <= positionArray.length - 1; i++) {
               // ƒ.Debug.log( i +"    "+ positionArray[i]);

                if (positionArray[i] > 0.5 || positionArray[i] < -0.5){
                
                this.checkLayerForCompletion(positionArray[i]);
            }
        }



        }

        checkLayerForCompletion(layerDepth: number): void {

            layerDepth =  Math.round(layerDepth);
            ƒ.Debug.log("layerdepth: " + layerDepth);

            let isOccupied: boolean[] = new Array();


            for (let x: number = -layerDepth; x <= layerDepth; x++) {
                for (let y: number = -layerDepth; y <= layerDepth; y++) {
                    for (let z: number = -layerDepth; z <= layerDepth; z++) {
                        if (x == layerDepth || x == -layerDepth || y == layerDepth || y == -layerDepth || z == layerDepth || z == -layerDepth) {
                            isOccupied[x + y + z] = this.checkForFragment(new ƒ.Vector3(x, y, z));
                          //  ƒ.Debug.log(isOccupied);
                          if(layerDepth== 1){
                                let mat: ƒ.ComponentMaterial = _element.cube.getComponent(ƒ.ComponentMaterial);
                                mat.material.setCoat(new ƒ.CoatColored(ƒ.Color.GREEN));
                          }
                            
                            if (isOccupied[x + y + z] == false) {                               
                                return;
                            }
                        }
                    }
                }
            }
            this.clearLayer(layerDepth);
        }



        /*
        iterateTroughLayer(): void {
    
            let layerDepth = 2;
    
    
            let layerDepthArr: number[] = [
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth,
                layerDepth
            ];
            let layerDepthArrMinus: number[] = [
                - layerDepth, - layerDepth, - layerDepth, - layerDepth, - layerDepth, - layerDepth, - layerDepth, - layerDepth, - layerDepth
            ];
    
            for (let i = 0; i < layerDepth; i++) {
    
                for (let axis = 0; axis <= 2; axis++) {
                    let XArray: number[] = [
                        0,
                        1,
                        0,
                        0,
                        -1,
                        1,
                        -1,
                        1,
                        -1
                    ];
                    let YArray: number[] = [
                        0,
                        1,
                        0,
                        0,
                        -1,
                        1,
                        -1,
                        1,
                        -1
                    ];
                    // let ZArray : number[] = [0,1,0,0,-1,1,-1,1,-1];
                    let ZArray: number[] = [
                        0,
                        0,
                        1,
                        -1,
                        0,
                        1,
                        -1,
                        -1,
                        1
                    ];
    
                    let XArray1: number[] = [
                        0,
                        1,
                        0,
                        0,
                        -1,
                        1,
                        -1,
                        1,
                        -1
                    ];
                    let YArray1: number[] = [
                        0,
                        1,
                        0,
                        0,
                        -1,
                        1,
                        -1,
                        1,
                        -1
                    ];
                    // let ZArray1 : number[] = [0,1,0,0,-1,1,-1,1,-1];
                    let ZArray1: number[] = [
                        0,
                        0,
                        1,
                        -1,
                        0,
                        1,
                        -1,
                        -1,
                        1
                    ];
    
    
                    if (axis == 0) {
                        XArray = layerDepthArr;
                        XArray1 = layerDepthArrMinus;
                    }
                    if (axis == 1) {
                        YArray = layerDepthArr;
                        YArray1 = layerDepthArrMinus;
                    }
                    if (axis == 2) {
                        ZArray = layerDepthArr;
                        ZArray1 = layerDepthArrMinus;
                    }
    
                    for (let gridPoint = 0; gridPoint <= 8; gridPoint++) {
    
                        if (axis == 0) {
                            if (gridPoint <= 4) 
                                this.pop(new ƒ.Vector3(XArray[gridPoint] + i, YArray[gridPoint] + i, ZArray[gridPoint] + i));
                            
    
                            this.pop(new ƒ.Vector3(XArray1[gridPoint] + i, YArray1[gridPoint] + i, ZArray1[gridPoint] + i));
                            if (gridPoint > 4) 
                                this.pop(new ƒ.Vector3(XArray[gridPoint] + i, YArray[gridPoint] - i, ZArray[gridPoint] - i));
                            
                            this.pop(new ƒ.Vector3(XArray1[gridPoint] + i, YArray1[gridPoint] - i, ZArray1[gridPoint] - i));
                        }
                        if (axis == 1) {
                            if (gridPoint <= 4) 
                                this.pop(new ƒ.Vector3(XArray[gridPoint] + i, YArray[gridPoint] + i, ZArray[gridPoint] + i));
                            
    
                            this.pop(new ƒ.Vector3(XArray1[gridPoint] + i, YArray1[gridPoint] + i, ZArray1[gridPoint] + i));
                            if (gridPoint > 4) 
                                this.pop(new ƒ.Vector3(XArray[gridPoint] + i, YArray[gridPoint] - i, ZArray[gridPoint] - i));
                            
                            this.pop(new ƒ.Vector3(XArray1[gridPoint] + i, YArray1[gridPoint] - i, ZArray1[gridPoint] - i));
                        }
    
                        if (axis == 2) {
                            if (gridPoint <= 4) 
                                this.pop(new ƒ.Vector3(YArray[gridPoint] + i, XArray[gridPoint] + i, ZArray[gridPoint] + i));
                            
                            this.pop(new ƒ.Vector3(YArray1[gridPoint] + i, XArray1[gridPoint] + i, ZArray1[gridPoint] + i));
    
                            if (gridPoint > 4) 
                                this.pop(new ƒ.Vector3(YArray[gridPoint] + i, XArray[gridPoint] - i, ZArray[gridPoint] - i));
                            
                            this.pop(new ƒ.Vector3(YArray1[gridPoint] + i, XArray1[gridPoint] - i, ZArray1[gridPoint] - i));
                        }
    
                    }
                }
            }
        }
    
    
        */
        /*
            for(let i = 0; i < layerDepth; i++){
                    {
                    //+X
                    this.pop(new ƒ.Vector3(layerDepth+i,0+i,0+i));
                    this.pop(new ƒ.Vector3(layerDepth+i,1+i,0+i));
                    this.pop(new ƒ.Vector3(layerDepth+i,0+i,1+i));
                    this.pop(new ƒ.Vector3(layerDepth+i,0+i,-1+i));
                    this.pop(new ƒ.Vector3(layerDepth+i,-1+i,0+i));
    
                    this.pop(new ƒ.Vector3(layerDepth+i,1-i,1-i));
                    this.pop(new ƒ.Vector3(layerDepth+i,-1-i,-1-i));
                    this.pop(new ƒ.Vector3(layerDepth+i,1-i,-1-i));
                    this.pop(new ƒ.Vector3(layerDepth+i,-1-i,1-i));
                    //-X
                    this.pop(new ƒ.Vector3(-layerDepth+i,0+i,0+i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,1+i,0+i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,0+i,1+i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,0+i,-1+i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,-1+i,0+i));
    
                    this.pop(new ƒ.Vector3(-layerDepth+i,1-i,1-i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,-1-i,-1-i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,1-i,-1-i));
                    this.pop(new ƒ.Vector3(-layerDepth+i,-1-i,1-i));
                    
    
                    //+Y
                    this.pop(new ƒ.Vector3(0+i,layerDepth+i,0+i));
                    this.pop(new ƒ.Vector3(1+i,layerDepth+i,0+i));
                    this.pop(new ƒ.Vector3(0+i,layerDepth+i,1+i));
                    this.pop(new ƒ.Vector3(0+i,layerDepth+i,-1+i));
                    this.pop(new ƒ.Vector3(-1+i,layerDepth+i,0+i));
    
                    this.pop(new ƒ.Vector3(1+i,layerDepth-i,1-i));
                    this.pop(new ƒ.Vector3(-1+i,layerDepth-i,-1-i));
                    this.pop(new ƒ.Vector3(1+i,layerDepth-i,-1-i));
                    this.pop(new ƒ.Vector3(-1+i,layerDepth-i,1-i));
    
                    //-Y
                    this.pop(new ƒ.Vector3(0+i,-layerDepth+i,0+i));
                    this.pop(new ƒ.Vector3(1+i,-layerDepth+i,0+i));
                    this.pop(new ƒ.Vector3(0+i,-layerDepth+i,1+i));
                    this.pop(new ƒ.Vector3(0+i,-layerDepth+i,-1+i));
                    this.pop(new ƒ.Vector3(-1+i,-layerDepth+i,0+i));
    
                    this.pop(new ƒ.Vector3(1+i,-layerDepth-i,1-i));
                    this.pop(new ƒ.Vector3(-1+i,-layerDepth-i,-1-i));
                    this.pop(new ƒ.Vector3(1+i,-layerDepth-i,-1-i));
                    this.pop(new ƒ.Vector3(-1+i,-layerDepth-i,1-i));
    
    
                    //+Z
                    this.pop(new ƒ.Vector3(0+i,0+i,layerDepth+i));
                    this.pop(new ƒ.Vector3(1+i,0+i,layerDepth+i));
                    this.pop(new ƒ.Vector3(0+i,1+i,layerDepth+i));
                    this.pop(new ƒ.Vector3(0+i,-1+i,layerDepth+i));
                    this.pop(new ƒ.Vector3(-1+i,0+i,layerDepth+i));
    
                    this.pop(new ƒ.Vector3(1+i,1-i,layerDepth-i));
                    this.pop(new ƒ.Vector3(-1+i,-1-i,layerDepth-i));
                    this.pop(new ƒ.Vector3(1+i,-1-i,layerDepth-i));
                    this.pop(new ƒ.Vector3(-1+i,1-i,layerDepth-i));
    
                    //-Z
                    this.pop(new ƒ.Vector3(0+i,-0+i,-layerDepth+i));
                    this.pop(new ƒ.Vector3(1+i,-0+i,-layerDepth+i));
                    this.pop(new ƒ.Vector3(0+i,-1+i,-layerDepth+i));
                    this.pop(new ƒ.Vector3(0+i,-1+i,-layerDepth+i));
                    this.pop(new ƒ.Vector3(-1+i,0+i,-layerDepth+i));
    
                    this.pop(new ƒ.Vector3(1+i,1-i,-layerDepth-i));
                    this.pop(new ƒ.Vector3(-1+i,-1-i,-layerDepth-i));
                    this.pop(new ƒ.Vector3(1+i,-1-i,-layerDepth-i));
                    this.pop(new ƒ.Vector3(-1+i,1-i,-layerDepth-i));
                    
                }
            }
        }*/
    }
}
