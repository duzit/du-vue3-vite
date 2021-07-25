<template>
  <div>
    This is {{ home }}

    <el-button @click="goSetup()">go to setup</el-button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const home = 'Home!';

  const goSetup = () => {
    router.push('setup');
  }
</script>

<style scoped>

</style>