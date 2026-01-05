<template>
  <div class="layer-switcher">
    <button 
      class="switcher-btn" 
      :class="{ active: activeLayer === 'whiteboard' }"
      @click="switchLayer('whiteboard')"
      title="Switch to Whiteboard"
    >
      <span class="btn-icon">📋</span>
      <span class="btn-text">Board</span>
    </button>
    <button 
      class="switcher-btn" 
      :class="{ active: activeLayer === 'code-editor' }"
      @click="switchLayer('code-editor')"
      title="Switch to Code Editor"
    >
      <span class="btn-icon">💻</span>
      <span class="btn-text">Code</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Track current active layer
const activeLayer = ref('whiteboard');

/**
 * Switch to specified layer
 * @param {string} layerId - Layer ID to activate ('whiteboard' | 'code-editor')
 */
function switchLayer(layerId) {
  // Get Board component instance from TCIC SDK
  const boardComponent = window.TCIC?.SDK?.instance?.getComponent('board-component');
  
  if (boardComponent) {
    const boardInstance = boardComponent.getVueInstance();
    // Call Board component internal API to switch layer
    const success = boardInstance.activateLayer(layerId);
    
    if (success) {
      activeLayer.value = layerId;
      console.log('[LayerSwitcher] Switched to layer:', layerId);
    } else {
      console.warn('[LayerSwitcher] Failed to switch layer:', layerId);
    }
  } else {
    // Fallback: update local state even if SDK not available (for demo purposes)
    activeLayer.value = layerId;
    console.log('[LayerSwitcher] SDK not available, local state updated to:', layerId);
  }
}

onMounted(() => {
  console.log('[LayerSwitcher] Component mounted');
});
</script>

<style>
.layer-switcher {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.switcher-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  min-width: 56px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.switcher-btn:hover {
  background: #f5f5f5;
  border-color: #bbb;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.switcher-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}

.switcher-btn.active:hover {
  background: #40a9ff;
  border-color: #40a9ff;
}

.btn-icon {
  font-size: 20px;
  line-height: 1;
}

.btn-text {
  font-size: 11px;
  font-weight: 500;
}
</style>