<template>
  <div class="setup" ref="refSetup">
    <h3>setup</h3>
    <p>props: {{ props.propsObj }}</p>
    <p>使用toRefs解构后的title：{{ title }}</p>
    <p>context.attrs.foo: {{ attrsFoo }}</p>
    <el-button @click="changeAttrs">change attrs</el-button>
    
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

    <h3>父子组件通信</h3>
    <el-button class="mt20" @click="clickByRef">父组件调用子组件方法</el-button>
    <ref-test-com ref="refTestCom" @callback="childCallback"></ref-test-com>

    <h3>readonly</h3>
    <p>{{ onlyReactive.num }}</p>
    <el-button @click="addOrg">addOrg</el-button>
    <p>{{ copyReadonly.num }}</p>
    <el-button @click="addReadonly">addReadonly</el-button>

    <el-button @click="goHome">go Home</el-button>
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
  onMounted,
  readonly,
  toRefs
} from 'vue';
import { ElMessage } from 'element-plus';
import refTestCom from '../refTestCom.vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'setup',
  components: {
    refTestCom
  },
  props: {
    propsObj: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    // 需在 props 中 引入传入的props 这里需要指定对应的属性propsObj
    /**
     * props 是响应式的 不能使用es6结构 会消除响应性
     * 解决方法：使用 toRefs 
     */
    console.log(props.propsObj, 'setup props');
    const { title } = toRefs(props.propsObj);

    const router = useRouter()

    /**
     * context
     * 普通js对象 可以使用解构 setup(props, { attrs, slots, emit })
     * 暴露三个组件的属性
     * context.attrs 非响应式对象 支持class style
     * context.slots 非响应式对象 
     * context.emit 方法
     * 
     */
    let attrsFoo = context.attrs.foo;
    console.log(context.attrs, 'attrs'); // foo
    console.log(context.attrs.class, 'attrs class'); // foo
    console.log(context.slots, 'slots');

    const refSetup = ref(null);
    const refTestCom = ref(null);

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

    // 调用子组件方法
    function clickByRef() {
      refTestCom.value.showMessage();
    }

    const childCallback = (param) => {
      ElMessage.success(`child msg: ${param}`);
    }

    // readonly
    const onlyReactive = reactive({
      num: 1
    });
    const copyReadonly = readonly(onlyReactive);

    const addOrg = () => {
      // 生效且是响应式的 会触发视图更新 且会影响 copyReadonly
      onlyReactive.num++;
    }
    const addReadonly = () => {
      // 不生效 且会有告警 Set operation on key "num" failed: target is readonly.
      copyReadonly.num++;
    }

    const changeAttrs = () => {
      // 这样是无效的
      context.emit('callback', 'foo setup')
    }

    const goHome = () => {
      router.push({
        path: 'home'
      })
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
      changeEffect,
      clickByRef,
      refTestCom,
      childCallback,
      onlyReactive,
      copyReadonly,
      addOrg,
      addReadonly,
      props,
      title,
      attrsFoo,
      changeAttrs,
      goHome
    }
  }
})
</script>