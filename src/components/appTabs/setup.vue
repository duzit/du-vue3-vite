<template>
  <div class="setup" ref="refSetup">
    <h3>computed</h3>
    <p>computed: {{ readonlyComputed }}</p>
    <p>
      <span>{{ wirteableComputed }}</span>
      <el-button @click="changeCopmuted">改变computed</el-button>
    </p>
    <h3>watch</h3>
    <p>{{ countWatch }}</p>
    <el-button @click="add">watch ref</el-button>
    <p>{{ reactiveWatch.age }}</p>
    <el-button @click="addAge">watch reactive</el-button>
    <h3>watchEffect</h3>
    <p>{{ effectValue }}</p>
    <el-button @click="changeEffect">watchEffect ref</el-button>
  </div>
</template>

<script>
import { 
  defineComponent, 
  ref,
  computed,
  watch,
  reactive,
  watchEffect,
  onMounted
} from 'vue';
import { ElMessage } from 'element-plus';
export default defineComponent({
  name: 'setup',
  setup(props) {
    const refSetup = ref(null);
    onMounted(() => {
      // 获取 DOM
      console.log(refSetup.value, 'ref');
    })

    const name = ref('hello');
    const name2 = ref('hello');
    // 只读的 computed 
    const readonlyComputed = computed(() => `${name.value} world.`)
    // 可读写
    let wirteableComputed = computed({
      get: () => `${name2.value} wirteable`,
      set: (val) => {
        name2.value = `${val}:::`
      } 
    })

    function changeCopmuted() {
      // 需要 .value
      wirteableComputed.value = 'moto modify'
    }

    // 监听ref 第三个参数 是对象 设置对应的属性
    let countWatch = ref(1);
    watch(
      countWatch,
      (countWatch, old) => { // 第一个参数不能命名为 new 可能是关键字的原因
        console.log(countWatch, old, 'watch ref');
        ElMessage.warning('watch ref!')
      },
      {
        immediate: false,
        deep: true
      }
    )

    function add() {
      countWatch.value++;
    }

    // 监听 reactive
    const reactiveWatch = reactive({
      name: 'Hello',
      age: 12
    });

    watch(
      () => reactiveWatch.age,
      (newChange, old) => {
        console.log(newChange, old, 'reactive watch');
        ElMessage.warning('watch reactive!')
      }
    )

    function addAge() {
      reactiveWatch.age++;
    }

    // 监听多个值
    watch(
      [countWatch, () => reactiveWatch.age],
      ([new1, new2], [old1, old2]) => {
        setTimeout(() => {
          ElMessage.warning('watch several value.')
        }, 10);
      }
    )

    // watchEffect 
    /**
     * 1. 不需要传入依赖
     * 2. 每次初始化组件 都会执行回调函数获取依赖
     * 3. 无法获取原值 只能获取变化后的值
     */
    let effectValue = ref(0)

    const stop = watchEffect(
      () => {
        doSomething(effectValue.value);
      }
    )

    // 停止监听
    // stop();

    function doSomething(param) {
      ElMessage.warning(`effectValue: ${param}`);
    }

    function changeEffect() {
      effectValue.value++;
    }

    return {
      refSetup,
      readonlyComputed,
      wirteableComputed,
      changeCopmuted,
      countWatch, 
      add,
      reactiveWatch,
      addAge,
      effectValue,
      changeEffect
    }
  }
})
</script>