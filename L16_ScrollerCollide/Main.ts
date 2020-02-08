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
    export let cameraRot: Camera = new Camera();
    export let hitbox: Hitbox = new Hitbox();


    let hare: Hare;

    let ParentCamNode = new f.Node("ParentCamNode");
    let CamNode = new f.Node("CamNode");
    let RotNode: f.Node = new f.Node("RotNode");
    let hareGlobal: f.Node = new f.Node("HareGlobal");


    let CamZoom: f.Node = new f.Node("CamZoom");
    let cam: f.ComponentCamera = new f.ComponentCamera;


    let control: Control = new Control();

    let FloorArray: Floor[];
    let Vector2Array: f.Vector2[];
    let lastPos: number;


    function test(): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
        let img: HTMLImageElement = document.querySelector("img");
        let txtHare: f.TextureImage = new f.TextureImage();


        txtHare.image = img;
        Hare.generateSprites(txtHare);
        Floor.generateSprites(txtHare);

        hareGlobal.addComponent(new f.ComponentTransform());


        control.cmpTransform.local.translateY(5);
        RotNode.appendChild(control);

        f.RenderManager.initialize(true, false);
        game = new f.Node("Game");
        hare = new Hare("Hare");
        level = createLevel();
        game.appendChild(level);
        hareGlobal.appendChild(hare);

        game.appendChild(hareGlobal);

        hare.appendChild(hitbox);


        CamZoom.addComponent(cam);
        CamZoom.addComponent(new f.ComponentTransform);
        cameraRot.appendChild(CamZoom);
        // cameraRot.appendChild(hareGlobal);


        control.cmpTransform.local.translateY(5);

        game.appendChild(cameraRot);


        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();

        cam.pivot.translateZ(24);

        CamNode.addComponent(cmpCamera);
        CamNode.addComponent(new f.ComponentTransform());

        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

        CamNode.addComponent(cmpCamera);
        ParentCamNode.addComponent(new f.ComponentTransform());
        CamNode.cmpTransform.local.rotateX(90);

        ParentCamNode.appendChild(CamNode);


        viewport.initialize("Viewport", game, cam, canvas);
        viewport.draw();

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 10);

        function update(_event: f.Eventƒ): void {
            processInput();

            viewport.draw();

            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == f.KEYBOARD_CODE.W && _event.type == "keydown") 
            hare.act(ACTION.JUMP);
        

        let mtxHare: f.Matrix4x4;
        let camtransformation: CamTransformation = Camera.camtransformations[_event.code];


        if (camtransformation) {
            cammove(camtransformation);

            let mtxContainer: f.Matrix4x4 = hare.cmpTransform.local;

            if (keysPressed[f.KEYBOARD_CODE.ARROW_RIGHT]) {
                normalizeTransforms(90);


                // level.cmpTransform.local.rotateY(90);
            }

            
            if (keysPressed[f.KEYBOARD_CODE.ARROW_LEFT]) {

                normalizeTransforms(-90);
                /*
            hare.cmpTransform.local.rotateY(-90);

              for (let floor of level.getChildren()) {

                floor.cmpTransform.local.rotateY(-90);

                
              
                let rotation = floor.cmpTransform.local.rotation.y;

                if (rotation == 90  || rotation == -90)
                  {
                    floor.cmpTransform.local.translateX(-Vector2Array[i].x);

                    lastPos.x = hare.cmpTransform.local.translation.x;
                    hare.cmpTransform.local.translateX(-hare.cmpTransform.local.translation.x);
                    floor.cmpTransform.local.translateZ(Vector2Array[i].y);
                  }

                if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180)
                  {
                     floor.cmpTransform.local.translateZ(-Vector2Array[i].y);
                     hare.cmpTransform.local.translateZ(-hare.cmpTransform.local.translation.z);
                     hare.cmpTransform.local.translateX(lastPos.x);
                     floor.cmpTransform.local.translateX(Vector2Array[i].x);
                  }
                
                f.Debug.log("rot" + floor.cmpTransform.local.rotation.y); 
                i++;

              // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
              }
              
              
              //f.Debug.log(cameraRot.cmpTransform.local.translation);
              */
            }


        }

        viewport.draw();
    }

    function processInput(): void {

        f.Debug.log("x" + hare.mtxWorld.translation.x);
             f.Debug.log("y" + hare.mtxWorld.translation.y);
             f.Debug.log("z" + hare.mtxWorld.translation.z);

        if (keysPressed[f.KEYBOARD_CODE.A]) {
            hare.act(ACTION.WALK, DIRECTION.LEFT);
           
            return;
        }
        if (keysPressed[f.KEYBOARD_CODE.D]) {
            hare.act(ACTION.WALK, DIRECTION.RIGHT);
            // f.Debug.log("x" + hare.mtxWorld.translation.x);
            // f.Debug.log("y" + hare.mtxWorld.translation.y);
            // f.Debug.log("z" + hare.mtxWorld.translation.z);
            return;
        }

        if (keysPressed[f.KEYBOARD_CODE.SPACE]) {
            hare.act(ACTION.JUMP, DIRECTION.UP);

            return;
        }

        hare.act(ACTION.IDLE);
    }


    function cammove(_transformation: Transformation): void {

        let animationSteps: number = 5;
        let fullRotation: number = 90;
        // let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? f.Vector3.SCALE(_transformation.rotation, fullRotation) : new f.Vector3()
            // translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
        };
        control.cmpTransform.local.rotateX(move.rotation.x);
        control.cmpTransform.local.rotateY(move.rotation.y);
        control.cmpTransform.local.rotateZ(move.rotation.z);
        // control.cmpTransform.local.translation = move.translation;
        move.rotation.scale(1 / animationSteps);

        f.Time.game.setTimer(10, animationSteps, function (): void {
            cameraRot.move(move);

            // f.RenderManager.update();
            viewport.draw();
        });
    }

    function normalizeTransforms(rotDirection: number) {
      hare.cmpTransform.local.rotateY(rotDirection);

      let i = 0;
      for (let floor of level.getChildren()) {

        floor.cmpTransform.local.rotateY(rotDirection);

        
      
        let rotation = floor.cmpTransform.local.rotation.y;

        if (rotation == 90  || rotation == -90)
          {
            
            floor.cmpTransform.local.translateX(-Vector2Array[i].x);

            //lastPos = hare.cmpTransform.local.translation.x;
            
            hare.cmpTransform.local.translateX(-hare.cmpTransform.local.translation.x);
            //hare.cmpTransform.local.translation.x = 0;
            
            floor.cmpTransform.local.translateZ(Vector2Array[i].y);
            
            if(i == 0)
            hare.cmpTransform.local.translateZ(Vector2Array[hare.lastHitIndex].y);
            
            f.Debug.log("TRANSFORM" + Vector2Array[hare.lastHitIndex].y);
          }

        if (rotation > -40 && rotation < 40 || rotation == 180 || rotation == -180)
          {
              
            //hare.cmpTransform.local.translation.x = hare.lastHit.x;
             floor.cmpTransform.local.translateZ(-Vector2Array[i].y);

             hare.cmpTransform.local.translateZ(-hare.cmpTransform.local.translation.z);
             //hare.cmpTransform.local.translation.z = 0;
             //hare.cmpTransform.local.translateX(lastPos );
             floor.cmpTransform.local.translateX(Vector2Array[i].x);
             
             if(i == 0)
             hare.cmpTransform.local.translateX(Vector2Array[hare.lastHitIndex].x);
          }
        
        f.Debug.log("rot" + floor.cmpTransform.local.rotation.y); 
        i++;

      // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
      }


      
    }


    function createLevel(): f.Node {
        let level: f.Node = new f.Node("Level");
        level.addComponent(new f.ComponentTransform());


        FloorArray = [];


        /*
    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.scaleX(1);
    floor.cmpTransform.local.translateY(0);
    floor.cmpTransform.local.translateZ(6);
    floor.appendChild(hitbox);
    level.appendChild(floor);
    f.Debug.log(hitbox);
*/

        let floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(0);
        floor.cmpTransform.local.translateY(0);
        floor.cmpTransform.local.translateZ(0);
        FloorArray.push(floor);

        level.appendChild(floor);


        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(4);
        floor.cmpTransform.local.translateY(4);
        floor.cmpTransform.local.translateZ(2);
        FloorArray.push(floor);

        level.appendChild(floor);


        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(-2);
        floor.cmpTransform.local.translateY(4);
        floor.cmpTransform.local.translateZ(6);
        FloorArray.push(floor);

        level.appendChild(floor);


        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);
        floor.cmpTransform.local.translateX(3);
        floor.cmpTransform.local.translateY(2);
        floor.cmpTransform.local.translateZ(2);
        FloorArray.push(floor);

        level.appendChild(floor);

        /*
    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.translateX(-3);
    floor.cmpTransform.local.translateY(0);
    floor.cmpTransform.local.translateZ(3);
    
    level.appendChild(floor);
*/
        /*
    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.translateX(4);
    floor.cmpTransform.local.translateY(0);
    floor.cmpTransform.local.translateZ(6);
    level.appendChild(floor);
    */


        Vector2Array = [];

        for(let i = 0; i <= FloorArray.length - 1; i++) {
            Vector2Array[i] = new f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
        }

        let i = 0;

        for(let floor of level.getChildren()) {
            floor.cmpTransform.local.translateZ(-Vector2Array[i].y);
            i++;
        }


        /*
    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.scaleX(7);
    floor.cmpTransform.local.translateY(0.2);
    floor.cmpTransform.local.translateX(1.5);
    floor.cmpTransform.local.translateZ(6);
    level.appendChild(floor);

    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.scaleX(20);
    floor.cmpTransform.local.translateY(0.2);
    floor.cmpTransform.local.translateX(6);
    floor.cmpTransform.local.translateZ(1.2);
    level.appendChild(floor);
    

    floor = new Floor();
    floor.cmpTransform.local.scaleY(1);
    floor.cmpTransform.local.scaleX(1);
    floor.cmpTransform.local.translateZ(1);
    
    level.appendChild(floor);
*/
        // hareGlobal.cmpTransform.local.translateZ(6);
        // hareGlobal.cmpTransform.local.translateX(-.5);
        f.Debug.log(level);


        // f.Debug.log(Floor);
        /*
    let tower: f.Node = new f.Node("Tower");
    tower.addComponent(new f.ComponentTransform());
    tower.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
    tower.addComponent(new f.ComponentMesh(new f.MeshSprite()));
    tower.cmpTransform.local.scale(new f.Vector3(50,50,50));
    tower.cmpTransform.local.translation = new f.Vector3(0,0,-30);
    game.appendChild(tower);

    let tower1: f.Node = new f.Node("Tower1");
    tower1.addComponent(new f.ComponentTransform());
    tower1.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
    tower1.addComponent(new f.ComponentMesh(new f.MeshSprite()));
    tower1.cmpTransform.local.rotateY(90);
    tower1.cmpTransform.local.scale(new f.Vector3(50,50,50));
    tower1.cmpTransform.local.translation = new f.Vector3(0,30,0);
    game.appendChild(tower1);

    let tower2: f.Node = new f.Node("Tower2");
    tower2.addComponent(new f.ComponentTransform());
    tower2.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
    tower2.addComponent(new f.ComponentMesh(new f.MeshSprite()));
    tower2.cmpTransform.local.rotateY(-90);
    tower2.cmpTransform.local.scale(new f.Vector3(50,50,50));
    tower2.cmpTransform.local.translation = new f.Vector3(0,-30,0);
    game.appendChild(tower2);

    let tower3: f.Node = new f.Node("Tower3");
    tower3.addComponent(new f.ComponentTransform());
    tower3.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
    tower3.addComponent(new f.ComponentMesh(new f.MeshSprite()));
    tower3.cmpTransform.local.rotateY(180);
    tower3.cmpTransform.local.scale(new f.Vector3(50,50,50));
    tower3.cmpTransform.local.translation = new f.Vector3(0,0,30);
    game.appendChild(tower3);


     x = hareGlobal.cmpTransform.local.translation.x;
     y = hareGlobal.cmpTransform.local.translation.y;
     z = hareGlobal.cmpTransform.local.translation.z;
*/
        return level;
    }
}
