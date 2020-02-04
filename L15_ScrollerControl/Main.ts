/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L15_ScrollerControl {
  export import ƒ = FudgeCore;
  export import Sprite = L14_ScrollerFoundation.Sprite;
  export import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  let game: ƒ.Node;
  let hare: Hare;
  let collider: ƒ.Node;


  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtHare: ƒ.TextureImage = new ƒ.TextureImage();
    txtHare.image = img;
    Hare.generateSprites(txtHare);

    let rec = new ƒ.Rectangle;
    let rec1 = new ƒ.Rectangle;
    rec.position.x = 20;
    rec.position.y = 20;
    rec1.position.x = 19;
    rec1.position.y = 20;
    ƒ.Debug.log(rec.collides(rec1));

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    hare = new Hare("Hare");
    collider = new ƒ.Node("collider");
    game.appendChild(hare);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
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
  }

  function processInput(): void {
    if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
      hare.act(ACTION.WALK, DIRECTION.LEFT);
      ƒ.Debug.log(hare.cmpTransform.local.translation.x);
  ƒ.Debug.log(hare.cmpTransform.local.translation.y);
  ƒ.Debug.log(hare.cmpTransform.local.translation.z);
      return;
    }
    if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
      hare.act(ACTION.WALK, DIRECTION.RIGHT);
      ƒ.Debug.log(hare.cmpTransform.local.translation.x);
  ƒ.Debug.log(hare.cmpTransform.local.translation.y);
  ƒ.Debug.log(hare.cmpTransform.local.translation.z);
      return;
    }

    if (keysPressed[ƒ.KEYBOARD_CODE.SPACE]) {
      hare.act(ACTION.WALK, DIRECTION.UP);
      return;
    }

    hare.act(ACTION.IDLE);
  }
}