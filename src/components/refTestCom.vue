<template>
  <div>
    <p>{{ msg }}</p>
    <el-button @click="callback">子组件通信父组件</el-button>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import {
  ref,
  getCurrentInstance
} from 'vue';

export default {
  name: 'refTest',
  setup(props, context) {
    const { ctx } = getCurrentInstance();

    let msg = ref('子组件')
    
    function showMessage() {
      ElMessage.success('hello ref!');
      msg.value = '父组件调用子组件方法';
    }

    const callback = () => {
      // 子组件回调父组件
      // 以下两种方法都行
      // context.emit('callback', 'child to father')
      ctx.$emit('callback', 'child to father')
    }

    return {
      msg,
      showMessage,
      callback
    }
  }
}
</script>
