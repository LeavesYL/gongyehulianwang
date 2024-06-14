<template class="tabBox">

    <div class="tabItem">
      <el-page-header @back="goBack" content="详情页面">
</el-page-header>
      <!-- Tabs 标签页:分隔内容上有关联但属于不同类别的数据集合。 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待分配" name="second"></el-tab-pane>
        <el-tab-pane label="待处理" name="third"></el-tab-pane>
        <el-tab-pane label="处理中" name="fourth"></el-tab-pane>
        <el-tab-pane label="待审核" name="fifth"></el-tab-pane>
        <el-tab-pane label="已完成" name="sixth"></el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script>
    import Ctoptab from './Ctoptab.vue';
  export default {
name:'tabs',
components:{Ctoptab},
    // 数据区域
    data() {
      return {
        activeName: 'first'
      }
    },
    // 组件初始化前的准备操作，在此处执行
    created() {
      // 事件监听，this.$bus.$on事件一般在此处定义
  
      // 初始数据载入
  
    },
    // 组件初始化后需要进行的操作，在此处执行
    mounted() {
      // 组件渲染，传递参数，this.$bus.$emit
  
    },
    // JS方法
    methods: {
      handleClick(tab, event) {
        console.log(tab, event,this.activeName);
        this.$emit('changestate',this.activeName)
      },
      goBack(){
        this.$router.push({
         path: '/homePage',

      })
        console.log('go back');
      }
    }
  }
  </script>
  
  <style scoped>
  .tabBox{
    width: 100%;
    text-align: center;
  }
  .tabItem{
    width: 100%;
    text-align: center;
  }
  </style>
  