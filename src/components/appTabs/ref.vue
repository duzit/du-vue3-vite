<template>
  <div class="ref">
    <div class="ref-toRef">
      <div class="flex-align-center">
        <label>ref:</label>
        <el-input v-model="refValue"></el-input>
        <el-button class="ml10" type="primary" @click="refValueAdd">Add-ref</el-button>
      </div>
      <div class="flex-align-center mt20">
        <label>toRef:</label>
        <el-input v-model="toRefValue"></el-input>
        <el-button class="ml10" type="primary" @click="toRefValueAdd">Add-toRef</el-button>
      </div>
    </div>

    <div class="to-ref">
      <p>{{ state1.time }}</p>
      <el-button @click="addToRefReactive">AddToRef</el-button>
      <el-button @click="addReactiveToRef">AddReactive</el-button>
    </div>
  </div>
</template>

<script>
import {
  ref,
  isRef,
  toRef,
  reactive
} from 'vue';
export default {
  name: 'ref',
  setup(props) {
    const obj = { num: 1 };
    /**
     * ref 是对原数据的拷贝 不会影响到原始值 同时响应式数据改变后，视图 会 更新
     */
    let refValue = ref(obj.num);
    /**
     * toRef 是对原数据的引用，同时响应式数据改变后，视图 不会 更新
     */
    let toRefValue = toRef(obj, 'num');

    function refValueAdd() {
      refValue.value++;
      console.log(obj.num, 'obj.num'); // 原始数据不会改变
      console.log(refValue.value, 'refValue'); // 视图更新
      console.log(toRefValue.value, 'toRefValue'); // 不改变
    }

    function toRefValueAdd() {
      toRefValue.value++;
      console.log(obj.num, 'obj num'); // 原始数据会改变
      console.log(toRefValue.value, 'toRefValue'); // 视图不更新
    }

    // isRef() 判断某个值是否是 ref() 创建出来的对象
    const unRef = 'hello';
    const isRefValue = ref(12);
    console.log(isRef(unRef)); // false
    console.log(isRef(isRefValue)); // true

    // toRef 为源响应式对象上的属性 创建一个新的 ref， 保持对源对象的属性响应式连接
    const state1 = reactive({
      time: 1,
      age: 12
    });

    // 修改 timeRef 和 state1.time 都会触发视图更新 源数据会更新
    const timeRef = toRef(state1, 'time');
    timeRef.value++;
    console.log(state1.time, 'state1 time'); // 2

    state1.time++;
    console.log(timeRef.value, 'timeRef value'); // 3

    function addToRefReactive() {
      timeRef.value++;
    }

    function addReactiveToRef() {
      state1.time++;
    }

    return {
      refValue,
      toRefValue,
      refValueAdd,
      toRefValueAdd,
      state1,
      addToRefReactive,
      addReactiveToRef
    }
  }
}
</script>

<style>
  .ref .ref-toRef {
    display: inline-block;
  }
</style>