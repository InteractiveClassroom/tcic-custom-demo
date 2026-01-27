declare global {
  interface Window {
    TCIC: any; // 这里使用 any 类型，你可以根据实际情况定义更具体的类型
  }
}
export {};