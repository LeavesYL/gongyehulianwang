<!-- src/App.vue -->
<template>

    <div>
     <top-bar-index :top-bar-text="topBarText" :is-show-back="isShowBack" :is-show-button="isShowButton" :button-text="buttonText"></top-bar-index>
     
     <div style="margin-top: 56px;margin-bottom: 49px">
        <functionalBar></functionalBar>
      </div>
     <tab-bar-simulator v-if="isShowTabBar" :config-bar-data="configBarData"></tab-bar-simulator>
      </div>
    </template>
    <script>
    import functionalBar from '../../functionalBar/index.vue';
    import TopBarIndex from "../../topBar";
    import TabBarSimulator from "../../tabBar/TabBarSimulator";
    export default {
      name: "wode",
      components:{functionalBar,TopBarIndex,TabBarSimulator},
      data() {
        return {
        topBarText: '我的',
        isShowBack: false,
        isShowButton: false,
        buttonText: '',
        isShowTabBar: true,
        configBarData: [
        {text: '首页', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/homePage'},
        {text: '任务', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/renwu'},
        {text: '通知', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg")},
        {text: '我的', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/wode'},
      ]
         
        }
      },
      // 钩子函数
      mounted() {
      },
      // 方法区
      methods: {
  
        // 用用户的id去获取表单
  
        
  
        
  
  
      }
    }
  
    
    </script>
    