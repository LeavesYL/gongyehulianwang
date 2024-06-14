<!-- 主管添加表单 -->
<template>
    <!-- 任务类型 -->
       <div>
        <div class="tabItem">
      <el-page-header @back="goBack" content="详情页面">
</el-page-header>
      </div>
   <van-field readonly clickable name="picker" :value="FormData.taskt" label="任务类型" placeholder="请选择任务类型"
    @click="showClassPicker1 = true"/> 
    <van-popup v-model="showClassPicker1" position="bottom">
    <van-picker show-toolbar :columns="tasktype" @confirm="tasktConfirm" @cancel="showClassPicker1 = false"
    /></van-popup>

    
    
    
    
   
   <div  v-if="level=='组员'||level=='班长'">
   <van-field v-model="fid" label="工单编号" readonly />
   <van-field v-model="FormData.ft" label="发现时间" readonly />
   <van-field readonly clickable name="picker3" :value="FormData.taskp" label="产线信息" placeholder="请选择产线信息"
    @click="showClassPicker4 = true"/> 
    <van-popup v-model="showClassPicker4" position="bottom">
    <van-picker show-toolbar :columns="taskposition" @confirm="taskpConfirm" @cancel="showClassPicker4 = false"
    />
   </van-popup>
   <van-cell-group>
        <van-field  v-model="FormData.position" placeholder="请输入设备位置"  label="设备位置" />
   </van-cell-group>
   <van-cell-group>
        <van-field  v-model="FormData.name" placeholder="请输入设备名称"  label="设备名称" />
   </van-cell-group>
   <van-cell-group>
        <van-field  v-model="FormData.taskdetail" placeholder="请输入问题描述"  label="问题描述" />
   </van-cell-group>
   <van-field v-model="user" label="上报员工" readonly /></div>
  


<div   v-if="level=='主管'">
   <!-- 任务详情 -->
   <van-cell-group>
        <van-field  v-model="FormData.taskdetail" placeholder="请输入任务详情"  label="任务详情" />
   </van-cell-group>
   
   <!-- 开始时间 -->  
   <start_time @starttime='showstarttime'></start_time>
   
   
   <!-- 结束时间 -->
   <end_time  @endtime='showendtime'></end_time>
   
   <!-- 巡检产线 -->
   <van-field readonly clickable name="picker3" :value="FormData.taskp" label="巡检产线" placeholder="请选择巡检产线"
    @click="showClassPicker4 = true"/> 
    <van-popup v-model="showClassPicker4" position="bottom">
    <van-picker show-toolbar :columns="taskposition" @confirm="taskpConfirm" @cancel="showClassPicker4 = false"
    />
   </van-popup>
   
   <!-- 负责人员 -->
   <van-field
        readonly
        clickable
        v-if="level=='主管'"                                                                                         
        name="picker1"
        :value="FormData.gz"
        label="负责工长"
        placeholder="请选择"
        @click="showClassPicker2 = true"
      />
      <van-popup v-model="showClassPicker2" v-if="level=='主管'" position="bottom">
        <van-picker show-toolbar :columns="rteams1" @confirm="tasktConfirmgz" @cancel="showClassPicker2 = false" />
      </van-popup> </div>
   <!-- <van-cell-group> -->
        <!-- <van-field  v-model="FormData.taskcharge" placeholder="请输入负责人员"  label="负责人员" /> -->
   <!-- </van-cell-group> -->
   <button @click="submit">提交</button>
   
       </div>
     </template>
     
     <script>
     import axios from 'axios'
     import { Picker } from 'vant'
     import start_time from './start_time.vue'
     import end_time from './end_time.vue'
   
     var tdata = [{label:"dataToChart",value:"form"},{label:"LineChart",value:"line"}]
     
     export default {
       components: {
     vanpicker:Picker,start_time,end_time
       },
       data () {
         return {
          FormData:{
            name:"",
            position:"",
           taskdetail:'',
           taskcharge:'',
           st:"",
           fptime:"",
           cltime:"",
           et:"",
           ft:"",
           taskt: "",
           taskp:"",
           api_data: [],
           format_data: [],
           zt:"",
           gz:"",
           bz:"",
           zy:"",
          },
          rteams1: ['工长1', '工长2'],
          rteams2: ['班长1', '班长2'],
          rteams3: ['组员1', '组员2'],
           taskdetail:'',
           taskcharge:'',
           showClassPicker1:false,
           showClassPicker2:false,
           showClassPicker4:false,
           st:"",
           ft:"",
           et:"",
           taskt: "",
           taskp:"",
           tasktype: [ '运维任务', '排班任务' ],
           taskposition:['花都新工厂-机加线','黄埔示范线'],
          //  api_data: [],
          //  format_data: [],
           api_data: [],
           format_data: [],
           uid:'2021210197',
           fid:'',
           level:"",
           user:""
         }
       },
       created(){
        this.user=localStorage['name']
        this.currentTime()
        this.Createform()
        this.getFormByUId(this.uid)
        // console.log("很高大卡车",this.fid)
        this.level=localStorage['level']
       },
       methods: {
           tasktConfirm(v) {
           this.taskt = v;
           this.FormData.taskt=v;
           this.showClassPicker1 = false;
          //  this.api_data+={v};
          // this.$set(this.api_data,"this",v);
          //  console.log(this.api_data)
          // console.log(this.taskt)
          console.log(this.FormData.taskt)
    },
           showstarttime(data){
            this.FormData.st=data
            // console.log(this.FormData.st)
           },
           showendtime(data){
            this.FormData.et=data
            console.log(this.FormData.et)
           },
           taskpConfirm(v) {
           this.FormData.taskp = v;
           this.showClassPicker4 = false;
          //  this.api_data={v};
           console.log(this.FormData)
    },

    // 获取表单
    async getFormByUId(Userid) {
        console.log(this)
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
          data: ApiParam.params,
          headers: ApiParam.headers
        }).then(res => {
          console.log(res)
          // 初步处理-获取核心数据
          innerData =  res.data.data
          console.log("id:",res.data.data[res.data.data.length-1].id)
          // 具体处理逻辑------>
          this.fid=res.data.data[res.data.data.length-1].id
          // <-------具体处理逻辑
        })
          // 根据组件需求处理数据
        return innerData
      },






         //上传表单
          async Createform(){
            console.log()
            
            console.log(this.FormData)
             let ApiParam = {
             method: 'POST',
             url: 'http://10.112.16.136:8018/cloudForm/save' ,
             params: {
               uid:'2021210197',
              //  form:"{\"formid\":\"999\"}",
              //  form :this.api_data,
               form:JSON.stringify(this.FormData),
               aaa:"bbb"
               
   
             },
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
             },
           } 
           console.log(ApiParam)
           // 实际请求
           await axios ({
             method: ApiParam.method,
             url: ApiParam.url,
             data: new URLSearchParams(ApiParam.params),
            //  data:ApiParam.params,
             headers: ApiParam.headers
           }).then(res => {
             console.log(res)
       })
   },
   submit(){
    if(localStorage['level']=="主管")
       {
        console.log("主管",localStorage)
         this.FormData.zt="待分配"
       } 
       else if(localStorage['level']=="组员")
       {
        console.log("组员",localStorage)
        this.FormData.zt="待分配"
       }
       else if(localStorage['level']=="班长")
       {
        console.log("班长",localStorage)
        this.FormData.zt="待分配"
       }
       else
       {
        console.log("错误--用户无level",localStorage)
        // this.FormData.zt="待审核"
       }
    this.putform(this.fid)
    this.$router.push({
        path: '/renwu',
      })

   },


        //更新表单
   async putform(formId){
          let ApiParam = {
          method: 'PUT',
          url: 'http://10.112.16.136:8018/cloudForm/updateFormById' ,
          params: {
            form:JSON.stringify(this.FormData),
            id:formId,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        // 实际请求
        await axios ({
          method: ApiParam.method,
          url: ApiParam.url,
          data: new URLSearchParams(ApiParam.params),
          headers: ApiParam.headers
        }).then(res => {
          console.log(res)
    })
},



         //删除表单
         async deleteform(formId){
          let ApiParam = {
          method: 'DELETE',
          url: 'http://10.112.16.136:8018/cloudForm/deleteFormById' ,
          params: {
            id:formId,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        // 实际请求
        await axios ({
          method: ApiParam.method,
          url: ApiParam.url,
          data: new URLSearchParams(ApiParam.params),
          headers: ApiParam.headers
        }).then(res => {
          console.log(res)
    })
},


   //获取当前时间
   currentTime() {
    var date = new Date();
    var year = date.getFullYear(); //月份从0~11，所以加一
    let month = date.getMonth();
    console.log("month",month);
    var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
    for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
            dateArr[i] = "0" + dateArr[i];
        }
    }
    var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
        //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
       	this.FormData.ft = strDate;
        console.log("strDate",strDate);
},
   goBack() {
        this.deleteform(this.fid)
        this.$router.push({
        path: '/renwu',
      })
        console.log('go back');
        // 你的返回逻辑
      },
   tasktConfirmgz(v) {
        // this.rteam = v;
        this.FormData.gz=v;
        console.log("负责班组：",this.FormData.gz)
        this.showClassPicker2 = false;
      },
       }
     }
     </script>
  
  
  
  
  