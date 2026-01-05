import { defineCustomElement } from 'vue';
import LayerSwitcherComponent from './LayerSwitcherComponent.ce.vue';
import CodeEditorElement from './CodeEditorElement.ce.vue';

// Import customCss.less - this will be extracted to a separate custom.css file
import './customCss.less';

/**
 * Custom Board Layer Demo for TCIC SDK
 * 
 * This demo shows how to:
 * 1. Define custom layer components (e.g., code editor)
 * 2. Define layer switcher tab component
 * 3. Register components as Custom Elements
 * 4. Configure SDK states for custom layers
 */

/**
 * Helper function to inject component styles into document head
 * This is needed when using shadowRoot: false with custom elements
 * @param {Object} component - Vue component with styles property
 * @param {string} id - Unique identifier for the style tag
 */
function injectStyles(component, id) {
  if (component.styles && component.styles.length > 0) {
    const styleId = `ce-styles-${id}`;
    // Avoid duplicate injection
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = component.styles.join('\n');
      document.head.appendChild(styleEl);
      console.log(`[CustomBoardLayer] Styles injected for: ${id}`);
    }
  }
}

// Inject styles for components (needed when shadowRoot: false)
injectStyles(LayerSwitcherComponent, 'layer-switcher');
injectStyles(CodeEditorElement, 'code-editor');

// Register Code Editor layer component
const CodeEditorCustomElement = defineCustomElement(CodeEditorElement, { shadowRoot: false });
customElements.define('code-editor', CodeEditorCustomElement);

// Register Layer Switcher tab component
const LayerSwitcherCustomElement = defineCustomElement(LayerSwitcherComponent, { shadowRoot: false });
customElements.define('layer-switcher', LayerSwitcherCustomElement);

console.log('[CustomBoardLayer] Custom elements registered: code-editor, layer-switcher');

const sdkInstance = TCIC.SDK.instance;

  // Configure custom layers list
  // Each layer needs a unique id and the registered component tag name
  const customLayersConfig = [
    {
      id: 'code-editor',        // Unique layer ID, used for activateLayer() calls
      component: 'code-editor'  // Custom element tag name registered above
    }
    // Add more custom layers here if needed
    // { id: 'document-viewer', component: 'doc-viewer' },
  ];

  // Inject custom layers configuration
  sdkInstance.setState('TStateCustomLayers', customLayersConfig);
  console.log('[CustomBoardLayer] TStateCustomLayers configured:', customLayersConfig);

  // Inject layer switcher tab component
  sdkInstance.setState('TStateLayerSwitcherTab', 'layer-switcher');
  console.log('[CustomBoardLayer] TStateLayerSwitcherTab configured: layer-switcher');

