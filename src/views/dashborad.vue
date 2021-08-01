<template>
  <el-header class="header">
    <span>Vue3 Coding</span>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu @select="handleSelect">
        <el-menu-item 
          v-for="(item, index) in menus" :key="index"
          :index="item.path">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
  import menus from '../mock/menus'; //  引入的静态数据 不需要在 setup 中再次定义 直接 return
  import { useRouter } from 'vue-router';

  const route = useRouter();

  const handleSelect = (val) => {
    console.log(val);
    route.push(val);
  }
</script>

<style scoped>
  .header {
    height: 30px !important;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #f2f2f2;
  }
</style>