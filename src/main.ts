
import BlackAndWhitePluginMaterial from './BlackAndWhitePluginMaterial';
import WavingVertexPluginMaterial from './WavingVertexPluginMaterial';
import './style.css'

import * as BABYLON from "babylonjs";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="renderCanvas">Hello!</canvas>
`

BABYLON.RegisterMaterialPlugin("BlackAndWhite", (material) => {
  new BlackAndWhitePluginMaterial(material);
  return null;
});
BABYLON.RegisterMaterialPlugin("WavingVertex", (material) => {
  new WavingVertexPluginMaterial(material);
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
  const sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 32}, scene);

  sphere1.position.y = 1;
  
  const sphereMaterial1 = new BABYLON.PBRMaterial("sphereMaterial", scene);
  sphereMaterial1.albedoColor = new BABYLON.Color3(1, 0, 1);
  sphereMaterial1.metallic=0.2;
  sphereMaterial1.roughness=0.3;
  
  sphere1.material=sphereMaterial1;
  // sphere1.material.onCompiled=(effect:BABYLON.Effect)=>{
  //   console.log("sphere1.material.onCompiled");
  //   console.log(effect._vertexSourceCode);
  //   console.log(effect._fragmentSourceCode);
  // }
  
}
{
  const sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
  sphere2.position.x = 2;

  sphere2.position.y = 1;
  
  const sphereMaterial2 = new BABYLON.PBRMaterial("sphereMaterial2", scene);
  sphereMaterial2.albedoColor = new BABYLON.Color3(1, 0, 1);
  sphereMaterial2.metallic=0.2;
  sphereMaterial2.roughness=0.3;
  const blackandwhite=sphereMaterial2.pluginManager?.getPlugin("BlackAndWhite");
  if(blackandwhite && blackandwhite instanceof BlackAndWhitePluginMaterial){
    blackandwhite.isEnabled=true;
  }
  
  sphere2.material=sphereMaterial2;
  // sphere2.material.onCompiled=(effect:BABYLON.Effect)=>{
  //   console.log("sphere2.material.onCompiled");
  //   console.log(effect._vertexSourceCode);
  //   console.log(effect._fragmentSourceCode);
  // }
  
}
{
  const sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere3", {diameter: 2, segments: 32}, scene);
  sphere3.position.x = -2;

  sphere3.position.y = 1;
  
  const sphereMaterial3 = new BABYLON.PBRMaterial("sphereMaterial3", scene);
  sphereMaterial3.albedoColor = new BABYLON.Color3(1, 0, 1);
  sphereMaterial3.metallic=0.2;
  sphereMaterial3.roughness=0.3;
  const wavingVertex=sphereMaterial3.pluginManager?.getPlugin("WavingVertex");
  if(wavingVertex && wavingVertex instanceof WavingVertexPluginMaterial){
    wavingVertex.isEnabled=true;
  }
  
  sphere3.material=sphereMaterial3;
  sphere3.material.onCompiled=(effect:BABYLON.Effect)=>{
    console.log("sphere3.material.onCompiled");
    console.log(effect._vertexSourceCode);
    console.log(effect._fragmentSourceCode);
  }
  
}




engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});


