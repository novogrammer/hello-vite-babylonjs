
import BlackAndWhitePluginMaterial from './BlackAndWhitePluginMaterial';
import './style.css'

import * as BABYLON from "babylonjs";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="renderCanvas">Hello!</canvas>
`

BABYLON.RegisterMaterialPlugin("BlackAndWhite", (material) => {
  new BlackAndWhitePluginMaterial(material);
  return null;
});


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine = new BABYLON.Engine(canvas);

const scene = new BABYLON.Scene(engine);
scene.createDefaultEnvironment({
  groundColor:new BABYLON.Color3(0,1,0),
});

scene.debugLayer.show();

var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 5, -10), scene);

camera.setTarget(BABYLON.Vector3.Zero());

camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

light.intensity = 0.7;

{
  const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

  sphere.position.y = 1;
  
  const sphereMaterial = new BABYLON.PBRMaterial("sphereMaterial", scene);
  sphereMaterial.albedoColor = new BABYLON.Color3(1, 0, 1);
  sphereMaterial.metallic=0.2;
  sphereMaterial.roughness=0.3;
  
  const blackandwhite=sphereMaterial.pluginManager?.getPlugin("BlackAndWhite");
  if(blackandwhite && blackandwhite instanceof BlackAndWhitePluginMaterial){
    blackandwhite.isEnabled=true;
  }
  sphere.material=sphereMaterial;
  sphere.material.onCompiled=(effect:BABYLON.Effect)=>{
    console.log(effect._vertexSourceCode);
    console.log(effect._fragmentSourceCode);
  }
  
}
{
  const sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
  sphere2.position.x = 2;

  sphere2.position.y = 1;
  
  const sphereMaterial2 = new BABYLON.PBRMaterial("sphereMaterial2", scene);
  sphereMaterial2.albedoColor = new BABYLON.Color3(1, 0, 1);
  sphereMaterial2.metallic=0.2;
  sphereMaterial2.roughness=0.3;
  
  sphere2.material=sphereMaterial2;
  
}








engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});


