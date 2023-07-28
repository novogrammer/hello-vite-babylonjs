
import './style.css'

import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Color3,  PBRMaterial } from 'babylonjs';

import BlackAndWhitePluginMaterial from "./BlackAndWhitePluginMaterial.ts";


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="renderCanvas">Hello!</canvas>
`

BABYLON.RegisterMaterialPlugin("BlackAndWhite", (material) => {
  (material as any).blackandwhite = new BlackAndWhitePluginMaterial(material);
  return (material as any).blackandwhite;
});


const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine = new Engine(canvas);

const scene = new Scene(engine);
scene.createDefaultEnvironment({
  groundColor:new Color3(0,1,0),
});

scene.debugLayer.show();

var camera = new ArcRotateCamera("camera1", 0, 0, 0, new Vector3(0, 5, -10), scene);

camera.setTarget(Vector3.Zero());

camera.attachControl(canvas, true);

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

light.intensity = 0.7;

const sphere = MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

sphere.position.y = 1;

const sphereMaterial = new PBRMaterial("sphereMaterial", scene);
sphereMaterial.albedoColor = new Color3(1, 0, 1);
sphereMaterial.metallic=0.2;
sphereMaterial.roughness=0.3;




sphere.material=sphereMaterial;




engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});


