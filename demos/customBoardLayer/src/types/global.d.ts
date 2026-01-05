/**
 * TCIC SDK Type Definitions
 */

interface BoardInstance {
  /** Switch to specified layer */
  activateLayer(layerId: string): boolean;
  /** Current active layer ID */
  activeLayerId: string;
}

interface BoardComponent {
  /** Get Vue component instance */
  getVueInstance(): BoardInstance;
}

interface TCICSDKInstance {
  /** Get component by name */
  getComponent(name: string): BoardComponent | null;
  /** Set SDK state */
  setState(stateName: string, value: unknown): void;
  /** Get SDK state */
  getState(stateName: string): unknown;
}

interface TCICSDK {
  instance: TCICSDKInstance;
}

interface TCICGlobal {
  SDK: TCICSDK;
}

declare global {
  interface Window {
    /** TCIC SDK global object */
    TCIC: TCICGlobal;
  }
}

export {};