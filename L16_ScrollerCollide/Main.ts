/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L16_ScrollerCollide {
  export import ƒ = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;
  
  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  export let game: ƒ.Node;
  export let level: ƒ.Node;
  export let cameraRot: Camera = new Camera();
  

  
 
  let hare: Hare;

  let ParentCamNode = new ƒ.Node("ParentCamNode");
  let CamNode = new ƒ.Node("CamNode");
  let RotNode: ƒ.Node = new ƒ.Node("RotNode"); 
  
  

  let CamZoom: ƒ.Node = new ƒ.Node("CamZoom");
  let cam: ƒ.ComponentCamera = new ƒ.ComponentCamera;
  
  let control: Control = new Control();

  function test(): void {

   

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtHare: ƒ.TextureImage = new ƒ.TextureImage();
    txtHare.image = img;
    Hare.generateSprites(txtHare);

    

    control.cmpTransform.local.translateY(5);
    RotNode.appendChild(control);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    hare = new Hare("Hare");
    level = createLevel();
    game.appendChild(level);
    game.appendChild(hare);

    

    CamZoom.addComponent(cam);
    CamZoom.addComponent(new ƒ.ComponentTransform);
  cameraRot.appendChild(CamZoom);
        

  control.cmpTransform.local.translateY(5);

  game.appendChild(cameraRot);

    


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    
    cam.pivot.translateZ(20);
  
    CamNode.addComponent(cmpCamera);
    CamNode.addComponent(new ƒ.ComponentTransform());
    
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
    cmpCamera.pivot.rotateY(0);
    
    CamNode.addComponent(cmpCamera);
    ParentCamNode.addComponent(new ƒ.ComponentTransform());
    CamNode.cmpTransform.local.rotateX(90);

    ParentCamNode.appendChild(CamNode);
    


    
   
    viewport.initialize("Viewport", game, cam, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      processInput();

      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
    if (_event.code == ƒ.KEYBOARD_CODE.W && _event.type == "keydown")
      hare.act(ACTION.JUMP);

      let mtxHare: ƒ.Matrix4x4;
      let camtransformation: CamTransformation = Camera.camtransformations[_event.code];
      
        if (camtransformation) {
            cammove(camtransformation);
                
            
            let mtxContainer: ƒ.Matrix4x4 = hare.cmpTransform.local;
          
         ƒ.Debug.log(mtxContainer)
           }

        viewport.draw();
  }

  function processInput(): void {
    if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
      hare.act(ACTION.WALK, DIRECTION.LEFT);
      return;
    }
    if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
      hare.act(ACTION.WALK, DIRECTION.RIGHT);
      return;
    }

    hare.act(ACTION.IDLE);
  }


  function cammove(_transformation: Transformation): void {

    let animationSteps: number = 10;
    let fullRotation: number = 90;
   // let fullTranslation: number = 1;
    let move: Transformation = {
        rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3()
        //translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
    };

    
    control.cmpTransform.local.rotateX(move.rotation.x);
    control.cmpTransform.local.rotateY(move.rotation.y);
    control.cmpTransform.local.rotateZ(move.rotation.z);
    //control.cmpTransform.local.translation = move.translation;
            
    move.rotation.scale(1 / animationSteps);
    
    ƒ.Time.game.setTimer(10, animationSteps, function (): void {
        cameraRot.move(move);
        // ƒ.RenderManager.update();
        viewport.draw();
    });
}


  function createLevel(): ƒ.Node {
    let level: ƒ.Node = new ƒ.Node("Level");


    let floor: Floor = new Floor();
    floor.cmpTransform.local.scaleY(0.3);
    floor.cmpTransform.local.translateY(1.5);
    floor.cmpTransform.local.translateZ(6);
    level.appendChild(floor);

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
    floor.cmpTransform.local.translateZ(6);
    
    level.appendChild(floor);

    hare.cmpTransform.local.translateZ(6);
    hare.cmpTransform.local.translateX(6);
    hare.cmpTransform.local.rotateY(90);

    let tower: ƒ.Node = new ƒ.Node("Tower");
    tower.addComponent(new ƒ.ComponentTransform());
    tower.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("Tower", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("red", 0.5)))));
    tower.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube()));
    tower.cmpTransform.local.scale(new ƒ.Vector3(10,10,10));
    level.appendChild(tower);

    return level;
  }
}