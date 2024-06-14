<template>
    <div>
        <top-bar-index :top-bar-text="topBarText" :is-show-back="isShowBack" :is-show-button="isShowButton" :button-text="buttonText"></top-bar-index>
        <div style="margin-top: 30px;margin-bottom: 49px">
            <div class="today-btn" @click="tianjia()">添加</div>
        </div>
      <div style="margin-top: 100px;margin-bottom: 49px">
        <el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''"  @click="handleClick()" >
      <div>{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</div>
      <div v-if="FormData.find(v=>v.form.st===data.day)"@click="handleClick(data.day)">{{ FormData.find(v=>v.form.st===data.day).form.taskt }}</div>
    </p>

  </template>
  
</el-calendar>
          <van-field v-model="FormData1.taskt" label="任务类型" readonly />
          <van-field v-model="FormData1.taskdetail" label="任务详情" readonly />
          <van-field v-model="FormData1.st" label="开始时间" readonly />
          <van-field v-model="FormData1.et" label="结束时间" readonly />
          <van-field v-model="FormData1.taskp" label="巡检产线" readonly />
          <!-- <van-field v-model="FormData1." label="负责工长" readonly /> -->
      </div>
      
      <tab-bar-simulator v-if="isShowTabBar" :config-bar-data="configBarData"></tab-bar-simulator>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import TopBarIndex from "../../topBar";
import TabBarSimulator from "../../tabBar/TabBarSimulator";
  export default {
    name: "calendar",
    components: { TabBarSimulator, TopBarIndex},
    data() {
      return {

        topBarText: '任务',
      isShowBack: false,
      isShowButton: true,
      buttonText: '',
      isShowTabBar: true,
      configBarData: [
        {text: '首页', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/homePage'},
        {text: '任务', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/renwu'},
        {text: '通知', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg")},
        {text: '我的', isHiddenBadge: true, src: require("../../../assets/common.svg"), srcActive: require("../../../assets/common.svg"),routerTo: '/wode'},
      ],
        // value: new Data(),
        FormData:[],
        FormData1:{
        id:"",
        taskdetail:'',
         taskcharge:'',
         st:"",
         ft:"",
         et:"",
         taskt: "",
         taskp:"",
         api_data: [],
         format_data: [],
         level:"",
        },
        uid:'2021210197',
      }
    },
    created() {
        this.load()
    },
    mounted() {
  
    },
    methods: {
        load(){
            // this.FormData=JSON.parse(this.getFormByUId(this.uid))
            this.getFormByUId(this.uid)
            console.log("4444",this.FormData)
        },
        async getFormByUId(Userid) {
        // console.log(this)
        // let _this = this
        let innerData = []
        let ApiParam = {
          method: 'GET',
          url: `http://10.112.16.136:8018/cloudForm/getAllFormByUid/`+Userid,
          params: {
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
        // 实际请求
        await axios ({
          method: ApiParam.method,
          url: ApiParam.url,
          data: new URLSearchParams(ApiParam.params),
        //   data: ApiParam.params,
          headers: ApiParam.headers
        }).then(res => {
        //   console.log(res.data.data)
          // 初步处理-获取核心数据
          innerData =JSON.stringify(res.data.data)
        //   console.log(innerData)
        //   console.log("111",this.FormData)
          this.FormData=JSON.parse(innerData)
          console.log("222",this.FormData)
          this.FormData=Array.from(this.FormData)
          console.log("333",this.FormData)
          // 具体处理逻辑------>
          
          // <-------具体处理逻辑
        })
          // 根据组件需求处理数据
        return innerData
      },
      handleClick(data){
        console.log("4444",this.FormData)
        let arr=Array.from(this.FormData)
        console.log('ss',arr)
        console.log("11",arr.find(v=>v.form.st===data.day).form)
        this.FormData1=arr.find(v=>v.form.st===data).form
        // if (this.FormData1.zt=="已完成") {
        //   this.FormData1={};
        // }
        console.log(this.FormData1.et)

      },
      tianjia(){
        this.$router.push({
        path: '/tianjia'
      })
      console.log("跳转")
      },

      
    }
  
  }
  </script>
  
  <style scoped>
  .today-btn{
		width: 70px;
		height: 50px;
		line-height: 20px;
		border-radius: 60px;
		background: #FFFFFF;
		box-sizing: border-box;
		border: 10px solid #EEEEEE;
		font-size: 25px;
		color: #666666;
		cursor: pointer;
		position:absolute;
		top:50px;
		right:7px;
	}
  </style>
  