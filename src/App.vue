<template>
  <div id="main">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane 
        :label="tab.label"
        :name="tab.name"
        v-for="(tab, index) of tabs" 
        :key="index">
      </el-tab-pane>
    </el-tabs>
    <component 
      :is='activeTab' 
      :props-obj="propsObj" 
      :foo="foo"
      class="component"
      @callback="callback">
    </component>

    <router-view></router-view>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  defineComponent,
  onBeforeMount,
  onMounted
} from 'vue';

import setupTab from './components/appTabs/setup.vue';
import reactiveTab from './components/appTabs/reactive.vue';
import refTab from './components/appTabs/ref.vue';
import globalConfig from './components/appTabs/globalConfig.vue';

export default defineComponent({
  name: 'App',
  components: {
    setupTab,
    reactiveTab,
    refTab,
    globalConfig
  },
  created() {
    // console.log(ele, 'created');
  },
  setup(props) {
    const propsObj = {
      title: 'hello',
      name: 'li',
      age: 12
    }

    let foo = ref('foo app');

    let ele = document.getElementById('main');
    console.log(ele, 'setup'); // null

    onBeforeMount(() => {
      ele = document.getElementById('main');
      console.log(ele, 'on before mount'); // null
    })

    onMounted(() => {
      ele = document.getElementById('main');
      console.log(ele, 'on mounted'); // main
    })

    const tabs = reactive([
      {
        name: 'setupTab',
        label: 'Setup'
      },
      {
        name: 'reactiveTab',
        label: 'Reactive'
      },
      {
        name: 'refTab',
        label: 'Ref'
      },
      {
        name: 'globalConfig',
        label: '全局配置'
      }
    ]);

    const activeTab = ref('setupTab');

    const handleClick = (v) => {
      console.log(activeTab.value, 'cb v');
    }

    const callback = (param) => {
      foo = param;
    }

    return {
      tabs,
      activeTab,
      handleClick,
      propsObj,
      foo,
      callback
    }
  }
})
</script>