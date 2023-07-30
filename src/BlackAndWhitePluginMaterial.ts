import * as BABYLON from "babylonjs";

/**
 * Extend from MaterialPluginBase to create your plugin.
 */
export default class BlackAndWhitePluginMaterial extends BABYLON.MaterialPluginBase {
  _isEnabled:boolean = false;

  constructor(material:BABYLON.Material) {
    // the second parameter is the name of this plugin.
    // the third one is a priority, which lets you define the order multiple plugins are run. Lower numbers run first.
    // the fourth one is a list of defines used in the shader code.
    super(material, "BlackAndWhite", 200, { BLACKANDWHITE: false });

  }
  get isEnabled() {
    return this._isEnabled;
  }

  set isEnabled(enabled) {
    if (this._isEnabled === enabled) {
      return;
    }
    this._isEnabled = enabled;
    // when it's changed, we need to mark the material as dirty so the shader is rebuilt.
    this.markAllDefinesAsDirty();
    this._enable(this._isEnabled);
  }

  // Also, you should always associate a define with your plugin because the list of defines (and their values)
  // is what triggers a recompilation of the shader: a shader is recompiled only if a value of a define changes.
  prepareDefines(defines: BABYLON.MaterialDefines, _scene: BABYLON.Scene, _mesh: BABYLON.AbstractMesh) {
    defines["BLACKANDWHITE"] = true;
  }

  getClassName() {
    return "BlackAndWhitePluginMaterial";
  }

  getCustomCode(shaderType: string):BABYLON.Nullable<{
    [pointName: string]: string;
}> {
    if (shaderType === "fragment") {
      // we're adding this specific code at the end of the main() function
      return {
        CUSTOM_FRAGMENT_MAIN_END: `
                    float luma = gl_FragColor.r*0.299 + gl_FragColor.g*0.587 + gl_FragColor.b*0.114;
                    gl_FragColor = vec4(luma, luma, luma, 1.0);
                `,
      };
    }
    // for other shader types we're not doing anything, return null
    return null;
  }
}