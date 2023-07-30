import * as BABYLON from "babylonjs";

export default class WavingVertexPluginMaterial extends BABYLON.MaterialPluginBase {
  _isEnabled:boolean = false;

  constructor(material:BABYLON.Material) {
    super(material, "WavingVertex", 200, { WAVINGVERTEX: false });

  }
  get isEnabled() {
    return this._isEnabled;
  }

  set isEnabled(enabled) {
    if (this._isEnabled === enabled) {
      return;
    }
    this._isEnabled = enabled;
    this.markAllDefinesAsDirty();
    this._enable(this._isEnabled);
  }
  prepareDefines(defines: BABYLON.MaterialDefines, _scene: BABYLON.Scene, _mesh: BABYLON.AbstractMesh) {
    defines["WAVINGVERTEX"] = true;
  }


  getClassName() {
    return "WavingVertexPluginMaterial";
  }
  getUniforms(){
    return {
      // first, define the UBO with the correct type and size.
      ubo: [{ name: "time", size: 1, type: "float" }],
      vertex: `#ifdef WAVINGVERTEX
                    uniform float time;
                #endif`,
    };    
  }
  bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, _scene: BABYLON.Scene, _engine: BABYLON.Engine, _subMesh: BABYLON.SubMesh):void {
    if (this._isEnabled) {
      const time=performance.now() * 0.001;
      uniformBuffer.updateFloat("time", time);
    }
  }  

  getCustomCode(shaderType: string):BABYLON.Nullable<{
    [pointName: string]: string;
}> {
    if (shaderType === "vertex") {
      return {
        CUSTOM_VERTEX_UPDATE_POSITION: `
        positionUpdated+=normalUpdated*(sin(time*2.0+positionUpdated.y*10.0)*0.25);
        `,
      };
    }
    if (shaderType === "fragment") {
    }
    return null;
  }
}