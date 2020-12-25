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
    <component :is='activeTab'></component>
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

export default defineComponent({
  name: 'App',
  components: {
    setupTab,
    reactiveTab,
    refTab
  },
  created() {
    // console.log(ele, 'created');
  },
  setup(props) {
    console.log(props, 'props');

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
      }
    ]);

    const activeTab = ref('setupTab');

    const handleClick = (v) => {
      console.log(activeTab.value, 'cb v');
    }

    return {
      tabs,
      activeTab,
      handleClick
    }
  }
})
</script>