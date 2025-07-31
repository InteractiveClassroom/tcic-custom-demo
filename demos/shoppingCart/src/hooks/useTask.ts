import { onMounted, ref } from 'vue';

declare const TCIC: any; 
export default function useTask(
  taskId: string,
  onTaskUpdate?: (data: {type: string, payload: any}, taskInfo: any) => void
) {
  const sessionId = ref('');
  onMounted(() => {
    sessionId.value = `${TCIC.SDK.instance.getUserId()}_${Math.floor(Math.random() * 65535)}`;
    TCIC.SDK.instance.on(TCIC.TMainEvent.Task_Updated, (taskInfo) => {
      if (taskInfo.taskId !== taskId) {
        // 不属于当前任务
        return;
      }
      const data = JSON.parse(taskInfo.content);
      if (data.sessionId === sessionId.value) {
        // 不需要处理自己的任务
        return;
      }
      if (onTaskUpdate === undefined) {
        return;
      }
      onTaskUpdate(data, taskInfo);
    });
  });
  return {
    updateTask(data) {
      TCIC.SDK.instance.updateTask(taskId, JSON.stringify({
        trigger: TCIC.SDK.instance.getUserId(),
        sessionId: sessionId.value,
        ...data,
    }));
    },
  };
}
