<template>
  <div class="reactive">
    <p>age: {{ obj.age }}</p>
    <el-button type="primary" @click="add">Add</el-button>
    <p>shallowReactive</p>
    <p>{{ shallowReactiveObj.a }}</p>
    <p>{{ shallowReactiveObj.first.b }}</p>
    <p>{{ shallowReactiveObj.first.second.c }}</p>
    <el-button type="primary" @click="changeFirst">changeFirst</el-button>
    <el-button type="primary" @click="changeSecond">changeSecond</el-button>

    <p>{{ `${refName}:${reactiveAge}` }}</p>
  </div>
</template>

<script>
import {
  reactive,
  shallowReactive,
  ref
} from 'vue';
export default {
  name: 'reactive',
  setup(props) {
    const obj = reactive({
      name: 'Ben',
      age: 20
    })

    function add() {
      obj.age++;
      console.log(obj, 'obj');
    }

    // shallowReactive 性能优化的api 如果有多个层级 则只有第一层的数据是响应式的
    const shallowReactiveObj = shallowReactive({
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3
        }
      }
    })

    console.log(shallowReactiveObj, 'shallowReactiveObj'); // 响应式
    console.log(shallowReactiveObj.first, 'shallowReactiveObj'); // 非响应式
    console.log(shallowReactiveObj.first.second, 'shallowReactiveObj'); // 非响应式

    function changeFirst() {
      shallowReactiveObj.a = 7;
    }

    function changeSecond() {
      shallowReactiveObj.first.b = 8;
      shallowReactiveObj.first.second.c = 9;
    }

    // 在 reactive 对象中 访问ref创建的响应式数据
    let refName = ref('hello');
    // 通过 reactive 获取 ref 创建的值时，不需要使用 .value
    let personObj = reactive({
      reactiveAge: 12,
      refName
    });

    return {
      obj,
      add,
      shallowReactiveObj,
      changeFirst,
      changeSecond,
      ...personObj
    }
  }
}
</script>