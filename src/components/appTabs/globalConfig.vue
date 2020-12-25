<template>
  <div>
    <p>{{ `version: ${version}` }}</p>
  </div>
</template>

<script>
import {
  getCurrentInstance
} from 'vue'

export default {
  name: 'globalConfig',
  setup(props) {
    const { ctx } = getCurrentInstance();
    const version = ctx && ctx.version;
    console.log(ctx, 1);

    return {
      version
    }
  }
}
</script>