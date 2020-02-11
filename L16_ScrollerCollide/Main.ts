// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerCollide {
    export import f = FudgeCore;
    export import Sprite = L14_ScrollerFoundation.Sprite;
    export import NodeSprite = L14_ScrollerFoundation.NodeSprite;

    window.addEventListener("load", test);
    interface KeyPressed {
        [code : string]: boolean;
    }

    let keysPressed: KeyPressed = {};
    let viewport: f.Viewport = new f.Viewport();

    export let game: f.Node;
    export let level: f.Node;
    export let collectorAble: f.Node;

    export let camera: Camera = new Camera();
    export let hitbox: Hitbox = new Hitbox();

    let coin: Coin;
    let floor: Floor;
    let hare: Hare;

    let FloorArray: Floor[] = [];
    let CoinArray: Coin[] = [];
    let Vector2Array: f.Vector2[] = [];


    let CamZoom: f.Node = new f.Node("CamZoom");
    let compCam: f.ComponentCamera = new f.ComponentCamera;
   

    function test(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtHare: f.TextureImage = new f.TextureImage();
        Sound.init();

        
        txtHare.image = img;
        Hare.generateSprites(txtHare);
        Floor.generateSprites(txtHare);
        Coin.generateSprites(txtHare);
        
        game = new f.Node("Game");
        hare = new Hare("Hare");


        collectorAble = createCollectables();
        game.appendChild(collectorAble);

        level = createLevel();
        game.appendChild(level);
        game.appendChild(hare);
        hare.appendChild(hitbox);


        CamZoom.addComponent(compCam);
        CamZoom.addComponent(new f.ComponentTransform);
        camera.appendChild(CamZoom);
        game.appendChild(camera);
        compCam.pivot.translateZ(30);
        

        f.RenderManager.initialize(true, false);
        viewport.initialize("Viewport", game, compCam, canvas);
        viewport.draw();

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);
        //Sound.playAtmo(2);

        function update(_event: f.Eventƒ): void {
            processInput();
            //compCam.pivot.translateY(hare.speed.y / 10);
            camera.cmpTransform.local.translation = new f.Vector3(hare.cmpTransform.local.translation.x, hare.cmpTransform.local.translation.y, hare.cmpTransform.local.translation.z);
            viewport.draw();
            

            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.W && _event.type == "keydown"){
            hare.act(ACTION.JUMP);
            Sound.play("jump");
        }
        let camtransformation: CamTransformation = Camera.camtransformations[_event.code];


        if (camtransformation) {
            cammove(camtransformation);

            let mtxContainer: f.Matrix4x4 = hare.cmpTransform.local;

            if (keysPressed[f.KEYBOARD_CODE.ARROW_RIGHT]) {
              Sound.play("rotation");
                normalizeTransforms(90);    
            }
            if (keysPressed[f.KEYBOARD_CODE.ARROW_LEFT]) {
              Sound.play("rotation");
                normalizeTransforms(-90);
               
            }
          }
        viewport.draw();
    }

    function processInput(): void {

        if (keysPressed[f.KEYBOARD_CODE.A]) {
          hare.act(ACTION.WALK, DIRECTION.LEFT);
            return;
        }
        if (keysPressed[f.KEYBOARD_CODE.D]) {
            hare.act(ACTION.WALK, DIRECTION.RIGHT);
            // f.Debug.log("x" + hare.mtxWorld.translation.x);
            // f.Debug.log("y" + hare.mtxWorld.translation.y);
            // f.Debug.log("z" + hare.mtxWorld.translation.z);
            //camera.cmpTransform.local.translation = new f.Vector3(hare.cmpTransform.local.translation.x, camera.cmpTransform.local.translation.y, hare.cmpTransform.local.translation.z);
            return;
        }
        hare.act(ACTION.IDLE);
    }


    function cammove(_transformation: Transformation): void {

        let animationSteps: number = 10;
        let fullRotation: number = 90;
       
        let move: Transformation = {
            rotation: _transformation.rotation ? f.Vector3.SCALE(_transformation.rotation, fullRotation) : new f.Vector3()
            //translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
        };
        //control.cmpTransform.local.rotateX(move.rotation.x);
        //control.cmpTransform.local.rotateY(move.rotation.y);
        //control.cmpTransform.local.rotateZ(move.rotation.z);
        //control.cmpTransform.local.translation = move.translation;
        move.rotation.scale(1 / animationSteps);

        f.Time.game.setTimer(10, animationSteps, function (): void {
            camera.move(move);


            f.RenderManager.update();
            viewport.draw();
        });
    }


    function normalizeTransforms(rotDirection: number) {
        hare.cmpTransform.local.rotateY(rotDirection);
        let NodeArray: f.Node[] = [floor, coin];
        let ParentArray = [FloorArray, CoinArray];

        for (let j = 0; j <= NodeArray.length - 1; j++) {

            let i = 0;

            
            for (NodeArray[j] of ParentArray[j]) 
              //for (let m = 0; m <= Vector2Array.length - 1; m++)
              {

                NodeArray[j].cmpTransform.local.rotateY(rotDirection);


                let rotation = NodeArray[j].cmpTransform.local.rotation.y;

                if (rotation == 90 || rotation == -90) {

                    NodeArray[j].cmpTransform.local.translateX(- Vector2Array[i].x);

                    // lastPos = hare.cmpTransform.local.translation.x;

                    hare.cmpTransform.local.translateX(- hare.cmpTransform.local.translation.x);
                    // hare.cmpTransform.local.translation.x = 0;

                    NodeArray[j].cmpTransform.local.translateZ(Vector2Array[i].y);

                    if (i == 0 && j == 0) 
                        hare.cmpTransform.local.translateZ(Vector2Array[hare.lastHitIndex].y);
                    


                    // f.Debug.log("TRANSFORM" + Vector2Array[hare.lastHitIndex].y);
                }

                if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180) { // hare.cmpTransform.local.translation.x = hare.lastHit.x;
                    NodeArray[j].cmpTransform.local.translateZ(- Vector2Array[i].y);

                    hare.cmpTransform.local.translateZ(- hare.cmpTransform.local.translation.z);
                    // hare.cmpTransform.local.translation.z = 0;
                    // hare.cmpTransform.local.translateX(lastPos );
                    NodeArray[j].cmpTransform.local.translateX(Vector2Array[i].x);

                    if (i == 0 && j == 0){ 
                        hare.cmpTransform.local.translateX(Vector2Array[hare.lastHitIndex].x);
                    }
                }

                // f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
                i++;

                // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
            }
        }
    }


    function createLevel(): f.Node {
        let level: f.Node = new f.Node("Level");


        level.addComponent(new f.ComponentTransform());


        // FloorArray = [];

        let floor = new Floor();
        floor.cmpTransform.local.scaleY(0.5);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(0);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(0);
        FloorArray.push(floor);

        level.appendChild(floor);


      //For Fixed Starting Platform
        Vector2Array[0] = new f.Vector2(FloorArray[0].cmpTransform.local.translation.x, FloorArray[0].cmpTransform.local.translation.z);
        floor.cmpTransform.local.translateZ(- Vector2Array[0].y);
        createCoin((FloorArray[0].cmpTransform.local.translation));
     
        let PlatformNumber = 21;


        let lastPlatform: f.Vector3 = new f.Vector3();

        lastPlatform = new f.Vector3(floor.cmpTransform.local.translation.x, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.z);

        for(let i = 1; i <= PlatformNumber - 1; i++) {
            floor = new Floor();
            floor.cmpTransform.local.scaleY(0.5);
            floor.cmpTransform.local.scaleX(1);

            floor.cmpTransform.local.translateY(i);

            let randomAxis = (Math.random() * 2);

            if (randomAxis >= 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    floor.cmpTransform.local.translateZ(Math.random() * 10);
                    floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);

                }
                if (PosNeg < 1) {
                    floor.cmpTransform.local.translateZ(Math.random() * -10);
                    floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);
                }
            }

            if (randomAxis < 1) {
                let PosNeg = (Math.random() * 2);
                if (PosNeg >= 1) {
                    floor.cmpTransform.local.translateX(Math.random() * 10);
                    floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
                }
                if (PosNeg < 1) {
                    floor.cmpTransform.local.translateX(Math.random() * -10);
                    floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
                }
            }

            FloorArray.push(floor);



            level.appendChild(floor);



            lastPlatform = new f.Vector3(floor.cmpTransform.local.translation.x, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.z);


            Vector2Array[i] = new f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);

            floor.cmpTransform.local.translateZ(- Vector2Array[i].y);

            createCoin((FloorArray[i].cmpTransform.local.translation));
            
            
        }


        // Vector2Array = [];
/*
        for(let i = 0; i <= FloorArray.length - 1; i++) {
            Vector2Array[i] = new f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
        }

        let i = 0;

        for(let floor of level.getChildren()) {
            floor.cmpTransform.local.translateZ(- Vector2Array[i].y);
            i++;
        }
*/
        //for(let m = 0; m <= PlatformNumber - 1; m++) {
            
        //}


        let tower: f.Node = new f.Node("Tower");
        tower.addComponent(new f.ComponentTransform());
        tower.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        tower.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        tower.cmpTransform.local.scale(new f.Vector3(100, 100, 100));
        tower.cmpTransform.local.translation = new f.Vector3(0, 0, -30);
        game.appendChild(tower);

        let tower1: f.Node = new f.Node("Tower1");
        tower1.addComponent(new f.ComponentTransform());
        tower1.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        tower1.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        tower1.cmpTransform.local.rotateY(90);
        tower1.cmpTransform.local.scale(new f.Vector3(100, 100, 100));
        tower1.cmpTransform.local.translation = new f.Vector3(30, 0, 0);
        game.appendChild(tower1);

        let tower2: f.Node = new f.Node("Tower2");
        tower2.addComponent(new f.ComponentTransform());
        tower2.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        tower2.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        tower2.cmpTransform.local.rotateY(-90);
        tower2.cmpTransform.local.scale(new f.Vector3(100, 100, 100));
        tower2.cmpTransform.local.translation = new f.Vector3(-30, 0, 0);
        game.appendChild(tower2);

        let tower3: f.Node = new f.Node("Tower3");
        tower3.addComponent(new f.ComponentTransform());
        tower3.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("#191970", 0.5)))));
        tower3.addComponent(new f.ComponentMesh(new f.MeshSprite()));
        tower3.cmpTransform.local.rotateY(180);
        tower3.cmpTransform.local.scale(new f.Vector3(100, 100, 100));
        tower3.cmpTransform.local.translation = new f.Vector3(0, 0, 30);
        game.appendChild(tower3);


        return level;

    }
    function createCollectables(): f.Node {

        let collectorAble: f.Node = new f.Node("collectorAble");


        return collectorAble;
    }

    function createCoin(Position: f.Vector3) {


        let coin = new Coin();
        coin.cmpTransform.local.scaleY(1);
        coin.cmpTransform.local.scaleX(1);
        coin.cmpTransform.local.translate(Position);
        coin.cmpTransform.local.translateY(1);
        collectorAble.appendChild(coin);

        CoinArray.push(coin);
    }


}
