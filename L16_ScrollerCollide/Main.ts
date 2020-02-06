/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerCollide {
  export import f = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;
  
  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
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


  let x;
  let y; 
  let z;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtHare: f.TextureImage = new f.TextureImage();
    
    txtHare.image = img;
    Hare.generateSprites(txtHare);


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
  //cameraRot.appendChild(hareGlobal);
        

  control.cmpTransform.local.translateY(5);

  game.appendChild(cameraRot);

    


    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    
    cam.pivot.translateZ(20);
  
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
            
          if (keysPressed[f.KEYBOARD_CODE.ARROW_RIGHT]){
            hare.cmpTransform.local.rotateY(90);
            for (let floor of level.getChildren()) {
              floor.cmpTransform.local.rotateY(90);

            
              
        
              let LowerLeftx = floor.cmpTransform.local.translation.x - floor.cmpTransform.local.scaling.x;
              let LowerLefty = floor.cmpTransform.local.translation.y - floor.cmpTransform.local.scaling.y;
              let LowerLeftz = floor.cmpTransform.local.translation.z - floor.cmpTransform.local.scaling.z;

              //let a: f.Vector3 = new f.Vector3(floor.cmpTransform.local.translation.z, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.x);
             // f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
          
              //floor.cmpTransform.local.translation = a;

            f.Debug.log(LowerLeftx);
            f.Debug.log(LowerLefty);
            f.Debug.log(LowerLeftz);
            }

           
            //level.cmpTransform.local.rotateY(90);
            }
          if (keysPressed[f.KEYBOARD_CODE.ARROW_LEFT]){
              hare.cmpTransform.local.rotateY(-90);
              for (let floor of level.getChildren()) {
                floor.cmpTransform.local.rotateY(-90);
                
               f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
          
              }
              
              //f.Debug.log(cameraRot.cmpTransform.local.translation);
              }
        
         
           }

        viewport.draw();
}

  function processInput(): void {
  if (keysPressed[f.KEYBOARD_CODE.A]) {
      hare.act(ACTION.WALK, DIRECTION.LEFT);
      f.Debug.log("x" + hare.cmpTransform.local.translation.x);
      f.Debug.log("y" + hare.cmpTransform.local.translation.y);
      f.Debug.log("z" + hare.cmpTransform.local.translation.z);
      return;
  }
  if (keysPressed[f.KEYBOARD_CODE.D]) {
      hare.act(ACTION.WALK, DIRECTION.RIGHT);
      f.Debug.log("x" +hare.cmpTransform.local.translation.x);
      f.Debug.log("y" +hare.cmpTransform.local.translation.y);
      f.Debug.log("z" +hare.cmpTransform.local.translation.z);
      return;
  }

  if (keysPressed[f.KEYBOARD_CODE.SPACE]) {
    hare.act(ACTION.WALK, DIRECTION.UP);
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
        //translation: _transformation.translation ? f.Vector3.SCALE(_transformation.translation, fullTranslation) : new f.Vector3()
    };
    control.cmpTransform.local.rotateX(move.rotation.x);
    control.cmpTransform.local.rotateY(move.rotation.y);
    control.cmpTransform.local.rotateZ(move.rotation.z);
    //control.cmpTransform.local.translation = move.translation;      
    move.rotation.scale(1 / animationSteps);

    f.Time.game.setTimer(10, animationSteps, function (): void {
        cameraRot.move(move);
        
        // f.RenderManager.update();
        viewport.draw();
    });
}
  function createLevel(): f.Node {
    let level: f.Node = new f.Node("Level");
    level.addComponent(new f.ComponentTransform());

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
    floor.cmpTransform.local.translateX(0);
    floor.cmpTransform.local.translateY(0);
    floor.cmpTransform.local.translateZ(6);
    
    f.Debug.log("Z" + floor.cmpTransform.local.translation.z);
    level.appendChild(floor);
/*
    floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.translateX(3);
    floor.cmpTransform.local.translateY(0);
    floor.cmpTransform.local.translateZ(3);
    
    level.appendChild(floor);
    
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
    hareGlobal.cmpTransform.local.translateZ(6);
    //hareGlobal.cmpTransform.local.translateX(-.5);
    f.Debug.log(level);


    
 

    //f.Debug.log(Floor);
/*
    let tower: f.Node = new f.Node("Tower");
    tower.addComponent(new f.ComponentTransform());
    tower.addComponent(new f.ComponentMaterial(new f.Material("Tower", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red", 0.5)))));
    tower.addComponent(new f.ComponentMesh(new f.MeshCube()));
    tower.cmpTransform.local.scale(new f.Vector3(10,10,10));
    level.appendChild(tower);
*/

     x = hareGlobal.cmpTransform.local.translation.x;
     y = hareGlobal.cmpTransform.local.translation.y;
     z = hareGlobal.cmpTransform.local.translation.z;

    return level;
  }
}