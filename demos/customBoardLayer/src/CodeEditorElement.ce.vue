<template>
  <div class="code-editor-layer">
    <div class="code-editor-header">
      <span class="header-title">📝 Code Editor Mode</span>
      <span class="header-hint">Custom Layer Demo</span>
    </div>
    <div class="code-editor-content">
      <textarea 
        v-model="code" 
        class="code-textarea"
        placeholder="Write your code here..."
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample code content
const code = ref(`// Welcome to Code Editor Layer
// This is a custom layer injected into Tencent Cloud Low-Code Interactive Classroom

function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');
`);
</script>

<style>
.code-editor-layer {
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  color: #d4d4d4;
  display: flex;
  flex-direction: column;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.code-editor-header {
  padding: 12px 16px;
  background: #333333;
  border-bottom: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.header-hint {
  font-size: 12px;
  color: #888;
}

.code-editor-content {
  flex: 1;
  padding: 0;
  overflow: hidden;
}

.code-textarea {
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  color: #d4d4d4;
  border: none;
  outline: none;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
}

.code-textarea::placeholder {
  color: #555;
}

.code-textarea:focus {
  background: #252526;
}
</style>