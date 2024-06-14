<template class="cardABox">
  <div>
  <Cmenu v-on:changestate="getstate"></Cmenu>
  <!-- 全部 -->
<div v-if="this.activityid==='first'">
  <el-card v-for="form in apiData" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
  <!-- 待分配 -->

  <div v-else-if="this.activityid==='second'">
    <el-card v-for="form in DFP" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="'dfp'+index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
  <!-- 待处理 -->

  <div v-else-if="this.activityid==='third'">
    <el-card v-for="form in DCL" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="'dcl'+index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
  <!-- 处理中 -->

  <div v-else-if="this.activityid==='fourth'">
    <el-card v-for="form in CLZ" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="'clz'+index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
  <!-- 待审核 -->

  <div v-else-if="this.activityid==='fifth'">
    <el-card v-for="form in DSH" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="'dsh'+index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
  <!-- 已完成  -->

  <div v-else-if="this.activityid==='sixth'">
    <el-card v-for="form in YWC" :key="form.ID" class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
          <span>{{form.type}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="toEdit(form)">详情</el-button>
        </div>
        <div class="text item">
          <el-descriptions :column="1">
            <template v-for="(col, index) in form.details">
              <el-descriptions-item
                  v-if="col.display"
                  :key="'ywc'+index"
                  :label="col.label"
                  :span="col.span"
              >{{ col.value }}
              </el-descriptions-item>
            </template></el-descriptions></div>
      </el-card></div>
      
    </div>
    
  </template>
  
  <script>
  import axios from 'axios'
  import Cmenu from './Cmenu.vue'
  export default {
    name: 'CardA',
    components:{
Cmenu
    },
    data() {
      return {
        QB:[],
        DFP:[],
        DCL:[],
        DSH:[],
        CLZ:[],
        YWC:[],
        activityid:'first',
        label:['111','222'],
        FormData:[],
        uid:'2021210197',
        FormData1:{
          name:"",
            position:"",
           taskdetail:'',
           taskcharge:'',
           st:"",
           et:"",
           ft:"",
           taskt: "",
           taskp:"",
           api_data: [],
           fptime:"",
           cltime:"",
           format_data: [],
           zt:"",
           gz:"",
           bz:"",
           zy:"",
        },
        apiData:[{
            ID:'0',
            type: '', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}],
                apiData1:{
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]},
        
      }
    },
    created() {
        this.load()
        this.handle()
        this.sortApidata()
    },
    mounted(){
      this.sortApidata()
      console.log(this.label)
    },
    methods: {
      handler(item) {
        this.$message('操作')
        console.log(item)
      },
      load(){
            // this.FormData=JSON.parse(this.getFormByUId(this.uid))
            this.getFormByUId(this.uid)
            console.log("4444",this.FormData)
        },
        async getFormByUId(Userid) {
        // console.log(this)
        let _this = this
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
          // console.log("222",this.FormData)
          this.FormData=Array.from(this.FormData)
          console.log("333",this.FormData)
          let arr=Array.from(this.FormData)
          console.log("123",arr[38].form.zt)
          for (let i=0,j=0;i<=arr.length;i++){
          if(arr[i].form.zt==="待审核"){                                             //待审核
            var apiData2={
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}
            this.apiData.push(apiData2)
            console.log("api[j]:",this.apiData[j])
            this.apiData[j].type="待审核"
            this.apiData[j].details[0].value=arr[i].id
            this.apiData[j].details[1].value=arr[i].form.name
            this.apiData[j].details[2].value=arr[i].form.position
            this.apiData[j].details[3].value=arr[i].form.taskp
            this.apiData[j].details[4].value=arr[i].form.taskdetail
            this.DSH.push(this.apiData[j])
            j++
            console.log("待审核",this.apiData)
          }
          else if(arr[i].form.zt==="待分配"){                                                  //待分配
            // let data=this.apiData
            var apiData2={
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}
            this.apiData.push(apiData2)
            console.log("api[j]:",this.apiData[j])
            this.apiData[j].type="待分配"
            this.apiData[j].details[0].value=arr[i].id
            this.apiData[j].details[1].value=arr[i].form.name
            this.apiData[j].details[2].value=arr[i].form.position
            this.apiData[j].details[3].value=arr[i].form.taskp
            this.apiData[j].details[4].value=arr[i].form.taskdetail
            this.DFP.push(this.apiData[j])
            console.log("待分配",this.apiData)
            j++
            console.log(this.DFP,j)
          }
          else if(arr[i].form.zt==="待处理"){                                              //待处理
            var apiData2={
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}
            this.apiData.push(apiData2)
            console.log("api[j]:",this.apiData[j])
            this.apiData[j].type="待处理"
            this.apiData[j].details[0].value=arr[i].id
            this.apiData[j].details[1].value=arr[i].form.name
            this.apiData[j].details[2].value=arr[i].form.position
            this.apiData[j].details[3].value=arr[i].form.taskp
            this.apiData[j].details[4].value=arr[i].form.taskdetail
            this.DCL.push(this.apiData[j])
            j++
            console.log("待处理")
          }
          else if(arr[i].form.zt==="处理中"){                                                        //处理中
            var apiData2={
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}
            this.apiData.push(apiData2)
            console.log("api[j]:",this.apiData[j])
            this.apiData[j].type="处理中"
            this.apiData[j].details[0].value=arr[i].id
            this.apiData[j].details[1].value=arr[i].form.name
            this.apiData[j].details[2].value=arr[i].form.position
            this.apiData[j].details[3].value=arr[i].form.taskp
            this.apiData[j].details[4].value=arr[i].form.taskdetail
            this.CLZ.push(this.apiData[j])
            j++
            console.log("处理中")
          }
          else if(arr[i].form.zt==="已完成"){                                                //已完成
            var apiData2={
                  ID:'0',
                  type: '待审核', details:
                [
                  {
                    label: '工单号',
                    value: '20240430',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备名称',
                    value: 'bb',
                    span: 1,
                    display: true
                  },
                  {
                    label: '设备地址',
                    value: 'aa',
                    span: 1,
                    display: true
                  },
                  {
                    label: '产线信息',
                    value: '',
                    span: 2,
                    display: false
                  },
                  {
                    label: '维护描述',
                    value: 'cc',
                    span: 2,
                    display: true
                  }
                ]}
            this.apiData.push(apiData2)
            console.log("api[j]:",this.apiData[j])
            this.apiData[j].type="已完成"
            this.apiData[j].details[0].value=arr[i].id
            this.apiData[j].details[1].value=arr[i].form.name
            this.apiData[j].details[2].value=arr[i].form.position
            this.apiData[j].details[3].value=arr[i].form.taskp
            this.apiData[j].details[4].value=arr[i].form.taskdetail
            this.YWC.push(this.apiData[j])
            j++
            console.log("已完成")
          }
          if (i==arr.length-1) {
            console.log("i:",i,arr.length-1)
            this.apiData.pop()
          }
          else{
            console.log("无状态")
          }
        }

          // 具体处理逻辑------>
          
          // <-------具体处理逻辑
        })
          // 根据组件需求处理数据
        return innerData
      },
      handle(){
        console.log("4444",this.FormData)
        let arr=Array.from(this.FormData)
        console.log("111",arr)
        // console.log("11",arr.find(v=>v.form.st===data).form)
        // this.FormData1=arr.find(v=>v.form.st).form
        // console.log("data1",this.FormData1)

      },



      //路由待规划，跳转至编辑界面，测试数据可获取，传递数据类型为Apidata数据中的对象
      toEdit(e){
        console.log("label",e.details[0].value)
        this.$emit('detail',e.details[0].value)
        this.$router.push({
        path: '/detail',
        query: {
        par:e.details[0].value
    }
      })
        //this.$router.push({ path: '/user', query:e});
        console.log(e)
      },
      //父子组件传参
      getstate(value){
        this.activityid=value
        console.log(this.activityid)
      },
      //给Api数据分类
      sortApidata(){
        
        for(let i=this.DFP.length-1;i>=0;i=i-1){
          this.DFP.pop(this.DFP[i])
        }
        for(let i=this.DSH.length-1;i>=0;i=i-1){
          this.DSH.pop(this.DSH[i])
        }
        for(let i=this.DCL.length-1;i>=0;i=i-1){
          this.DCL.pop(this.DCL[i])
        }
        for(let i=this.CLZ.length-1;i>=0;i=i-1){
          this.CLZ.pop(this.CLZ[i])
        }
        for(let i=this.YWC.length-1;i>=0;i=i-1){
          this.YWC.pop(this.YWC[i])
        }
        for (let i=0;i<=this.apiData.length;i++){
          if(this.apiData[i].type==="待审核"){
            this.DSH.push(this.apiData[i])
          }
          else if(this.apiData[i].type==="待分配"){
            this.DFP.push(this.apiData[i])
          }
          else if(this.apiData[i].type==="待处理"){
            this.DCL.push(this.apiData[i])
          }
          else if(this.apiData[i].type==="处理中"){
            this.CLZ.push(this.apiData[i])
          }
          else if(this.apiData[i].type==="已完成"){
            this.YWC.push(this.apiData[i])
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .cardABox {
    width: 100%;
    text-align: center;
  }
  .cardAItem {
    width: 100%;
    margin-top: 3%;
  }
  .box-card {
    width: 100%;
    margin-bottom: 2%;
    border-radius: 3%;
  }
  .text {
    font-size: 10%;
    margin: 3%;
  }
  .item {
    margin-bottom: 4%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
  </style>
  