"use strict";
/*namespace L16_ScrollerCollide {
  //export import f = FudgeCore;
  

    

  window.addEventListener("load", test);


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
          
          //f.Debug.log("TRANSFORM" + Vector2Array[hare.lastHitIndex].y);
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
      
      //f.Debug.log("rot" + floor.cmpTransform.local.rotation.y);
      i++;

    // hare.mtxWorld.translateX(-hare.mtxWorld.translation.x);
    }


    
  }
  

  function createLevel(): f.Node {
      let level: f.Node = new f.Node("Level");
      
   
      level.addComponent(new f.ComponentTransform());


      FloorArray = [];

      let floor = new Floor();
      floor.cmpTransform.local.scaleY(0.3);
      floor.cmpTransform.local.scaleX(1);
      floor.cmpTransform.local.translateX(0);
      floor.cmpTransform.local.translateY(0);
      floor.cmpTransform.local.translateZ(0);
      FloorArray.push(floor);

      level.appendChild(floor);
      
/*
     
*/
/*
      let lastPlatform: f.Vector3 = new f.Vector3();
      for(let i = 2; i <= 40; i++)
      {
        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.3);
        floor.cmpTransform.local.scaleX(1);

        floor.cmpTransform.local.translateY(i);

        let randomAxis = (Math.random() * 2);
        
        if(randomAxis >= 1){
          let PosNeg = (Math.random() * 2);
          if(PosNeg >= 1)
            {
            floor.cmpTransform.local.translateZ(Math.random()*10);
            floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);
            
            }
          if(PosNeg < 1)
            {
            floor.cmpTransform.local.translateZ(Math.random()*-10);
            floor.cmpTransform.local.translateX(lastPlatform.z + 3.5);
            }
        }

        if(randomAxis < 1){
          let PosNeg = (Math.random() * 2);
          if(PosNeg >= 1)
            {
            floor.cmpTransform.local.translateX(Math.random()*10);
            floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
            }
          if(PosNeg < 1)
            {
            floor.cmpTransform.local.translateX(Math.random()*-10);
            floor.cmpTransform.local.translateZ(lastPlatform.z + 3.5);
            }
          }

        FloorArray.push(floor);

        level.appendChild(floor);

        lastPlatform = new f.Vector3(floor.cmpTransform.local.translation.x, floor.cmpTransform.local.translation.y, floor.cmpTransform.local.translation.z);
      }

        
      Vector2Array = [];

      for(let i = 0; i <= FloorArray.length - 1; i++) {
          Vector2Array[i] = new f.Vector2(FloorArray[i].cmpTransform.local.translation.x, FloorArray[i].cmpTransform.local.translation.z);
      }

      let i = 0;

      for(let floor of level.getChildren()) {
          floor.cmpTransform.local.translateZ(-Vector2Array[i].y);
          i++;
      }







      


      return level;

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


 
*/
/*
}
function createCollectables(): f.Node {

let collectorAble: f.Node = new f.Node("collectorAble");

let coin = new Coin();
  coin.cmpTransform.local.scaleY(1);
  coin.cmpTransform.local.scaleX(1);
  coin.cmpTransform.local.translateX(0);
  coin.cmpTransform.local.translateY(1);
  coin.cmpTransform.local.translateZ(0);
  collectorAble.appendChild(coin);

  return collectorAble;
}

}
*/ 
//# sourceMappingURL=Level.js.map