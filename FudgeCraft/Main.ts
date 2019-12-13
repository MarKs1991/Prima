namespace FudgeCraft {
    export import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    export let game: ƒ.Node = new ƒ.Node("FudgeCraft");
    export let grid: Grid = new Grid();
    export let cameraRot: Camera = new Camera();
    let CamZoom: ƒ.Node = new ƒ.Node("CamZoom");
    let cam: ƒ.ComponentCamera = new ƒ.ComponentCamera;

    let control: Control = new Control();
    let viewport: ƒ.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        
        
        CamZoom.addComponent(cam);
        CamZoom.addComponent(new ƒ.ComponentTransform);
        cameraRot.appendChild(CamZoom);
        
        game.appendChild(cameraRot);
       

        //cam.pivot.translate(new ƒ.Vector3(0, 0, -10));
        //cam.pivot.lookAt(ƒ.Vector3.ZERO());


        cam.pivot.translate(new ƒ.Vector3(4, 6, 20));
        cam.pivot.lookAt(ƒ.Vector3.ZERO());
        cam.backgroundColor = ƒ.Color.WHITE;


        let cmpLight: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        let cmpLightAmbient: ƒ.ComponentLight = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
        game.addComponent(cmpLightAmbient);


        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cam, canvas);
        ƒ.Debug.log("Viewport", viewport);
        viewport.draw();

        startRandomFragment();
        game.appendChild(control);


        ƒ.Debug.log(game);

        viewport.draw();
        ƒ.Debug.log("Game", game);

        window.addEventListener("keydown", hndKeyDown);

       
    }

    function hndKeyDown(_event: KeyboardEvent): void {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();

            startRandomFragment();
        }

        if (_event.code == ƒ.KEYBOARD_CODE.NUMPAD7) {
            CamZoom.cmpTransform.local.translateX(1);
            cam.pivot.translateZ(-5);
        cam.pivot.lookAt(ƒ.Vector3.ZERO());
            
        }

      
        let transformation: Transformation = Control.transformations[_event.code];
        if (transformation) {
            move(transformation);
        }

        
        let camtransformation: CamTransformation = Camera.camtransformations[_event.code];
      
        if (camtransformation) {
            cammove(camtransformation);
        }
        
        


        // ƒ.RenderManager.update();
        viewport.draw();
    }

    function move(_transformation: Transformation): void {
        let animationSteps: number = 10;
        let fullRotation: number = 90;
        let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
            translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
        };

        let timers: ƒ.Timers = ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0) 
            return;
        

        let collisions: GridElement[] = control.checkCollisions(move);
        if (collisions.length > 0) 
            return;
        

        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);

      
        ƒ.Time.game.setTimer(10, animationSteps, function (): void {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
        
    }

    
    function cammove(_transformation: Transformation): void {

        let animationSteps: number = 10;
        let fullRotation: number = 90;
       // let fullTranslation: number = 1;
        let move: Transformation = {
            rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
            //translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
        };
    
        
        control.cmpTransform.local.rotateY(move.rotation.y);
        //control.cmpTransform.local.translation = move.translation;
                move.rotation.scale(1 / animationSteps);
        ƒ.Time.game.setTimer(10, animationSteps, function (): void {
            cameraRot.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }


    export function startRandomFragment(): void {
        let fragment: Fragment = Fragment.getRandom();
        
        control.cmpTransform.local = ƒ.Matrix4x4.IDENTITY;
        control.cmpTransform.local.translateX(4);
        control.setFragment(fragment);
        
        
    }
}
