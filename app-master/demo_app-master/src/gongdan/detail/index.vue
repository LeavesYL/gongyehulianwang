<template>
    <div>
      <!-- <button @click="goBack" class="icon-button">
        <i class="fas fa-arrow-left"></i>
      </button> -->
      <div class="tabItem">
      <el-page-header @back="goBack" content="详情页面">
</el-page-header>
        <!-- <button @click="showConfirmDialog" class="icon-button"> -->
        <!-- <i class="fas fa-edit"></i> -->
      <!-- </button> -->
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <van-field v-model="FormData1.taskt" label="任务类型" readonly />
      <van-field v-model="FormData1.ft" label="发现时间" readonly />
      <van-field v-model="FormData1.taskdetail" label="任务详情" readonly />
      <van-field v-model="FormData1.name" v-if="FormData1.zt=='待审核'||level=='主管'" label="设备名称" readonly />
      <van-field v-model="FormData1.position" v-if="FormData1.zt=='待审核'||level=='主管'" label="设备地址" readonly />
      <van-field v-model="FormData1.taskp" label="产线信息" readonly />
      <van-field v-model="FormData1.zt" label="状态" readonly />
      <van-field v-model="FormData1.zy" v-if="FormData1.zt=='待审核'||FormData1.zt=='待处理'||FormData1.zt=='处理中'||level=='主管'" label="上报组员" readonly />
      <van-field v-model="FormData1.bz" v-if="FormData1.zt=='待审核'||FormData1.zt=='待处理'||FormData1.zt=='处理中'" label="分配人员" readonly />
      <van-field v-model="FormData1.zy" v-if="FormData1.zt=='待审核'||FormData1.zt=='待处理'||FormData1.zt=='处理中'" label="处理人员" readonly />
      <van-field v-model="FormData1.fptime" v-if="FormData1.zt=='待审核'||FormData1.zt=='待处理'||FormData1.zt=='处理中'" label="分配时间" readonly />
      <van-field v-model="FormData1.cltime" v-if="FormData1.zt=='待审核'||FormData1.zt=='处理中'" label="处理时间" readonly />
      <button class="submit-button" v-if="level!='主管'" @click="submit()">编辑</button>
      <!-- 弹窗显示 -->
      <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>{{ context }}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="queding">确 定</el-button>
  </span>
</el-dialog>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
  export default {
    name: 'CKdetails',
    data() {
      return {
        FormData:[],
        FormData1:{
        id:"",
        name:"",
        position:"",
        taskdetail:'',
         taskcharge:'',
         fptime:"",
           cltime:"",
         st:"",
         ft:"",
         et:"",
         taskt: "",
         taskp:"",
         api_data: [],
         format_data: [],
         zt:"",
         gz:"",
         bz:"",
         zy:"",
        },
        level:"",

        centerDialogVisible: false,                 //弹窗显示
        context:"",                                 //弹窗显示内容


        ID:"",
        // tasktype: '运维任务',
        // time: '2024-06-03 11:19:51',
        // details: '这是一个任务详情',
        // sname: '这是设备名称',
        // saddress: '这是产线地址',
        // chanxianxx: '这是产线信息',
        // state: '状态',
        // pname: '上报组员'
        formid:'',
        path:''
      };
    },created(){
      this.load()
      this.level=localStorage['level']
      console.log(localStorage['level'],this.level)
    },
    methods: {
      load(){
            // this.FormData=JSON.parse(this.getFormByUId(this.uid))
            console.log("router--data:",this.$route.query.par)
            this.formid = this.$route.query.par;
            this.getFormByUId(this.formid)
            // console.log("4444",this.FormData)
        },
        async getFormByUId(formId) {
        // console.log(this)
        // let _this = this
        let innerData = []
        let ApiParam = {
          method: 'GET',
          url: 'http://10.112.16.136:8018/cloudForm/getFormById/' +formId,
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
          // console.log(res.data.data)
          // 初步处理-获取核心数据
          innerData =JSON.stringify(res.data.data)
          console.log(innerData)
        //   console.log("111",this.FormData)
          this.FormData=JSON.parse(innerData)
          console.log("222",this.FormData)
          // this.FormData=Array.from(this.FormData)
          // console.log("333",this.FormData)
          // let arr=Array.from(this.FormData)
          // console.log('ss',arr)
          // console.log("11",arr.form)
          this.FormData1=this.FormData.form
          console.log(this.FormData1)
          // 具体处理逻辑------>
          
          // <-------具体处理逻辑
        })
          // 根据组件需求处理数据
        return innerData
      },
      submit(){
        this.centerDialogVisible=true
        if(localStorage['level']=="工长"&&this.FormData1.zt=="待审核")
       {
        // console.log("工长",localStorage)
        this.context="确定审核通过这项任务吗"
       }
       else if(localStorage['level']=="工长"&&this.FormData1.zt=="待分配")
       {
        console.log("工长,daifenp",localStorage)
        this.context="确定要操作这项任务"
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="待分配")
       {
        // console.log("班长",localStorage)
        this.context="确定要操作这项任务"
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="待处理")
       {
        // console.log("班长",localStorage)
        this.context="确定要开始处理这项任务吗"
        this.FormData1.cltime=this.currentTime()
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="处理中")
       {
        // console.log("班长",localStorage)
        this.context="确定处理完成这项任务吗"
       }
       else if(localStorage['level']=="组员"&&this.FormData1.zt=="待处理")
       {
        // console.log("组员",localStorage)
        this.context="确定要开始处理这项任务吗"
       }
       else if(localStorage['level']=="组员"&&this.FormData1.zt=="处理中")
       {
        // console.log("组员",localStorage)
        this.context="确定处理完成这项任务吗"
       }
       else{

       }
        //this.$router.push({ path: '/user', query:e});
        // console.log(e)
      },

      queding(){
        if(localStorage['level']=="工长"&&this.FormData1.zt=="待审核")
       {
        console.log("工长",localStorage)
        this.context="确定审核通过这项任务吗"
         this.FormData1.zt="已完成"
         this.path='/gongdanguanli'
         
       }
       else if(localStorage['level']=="工长"&&this.FormData1.zt=="待分配")
       {
        console.log("工长,daifenp",localStorage)
        this.context="确定要操作这项任务"
        
        this.path='/fenpei'
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="待分配")
       {
        console.log("班长",localStorage)
        this.context="确定要操作这项任务"
        this.path='/fenpei'
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="待处理")
       {
        console.log("班长",localStorage)
        this.context="确定要开始处理这项任务吗"
        this.FormData1.cltime=this.currentTime()
        this.FormData1.zt="处理中"
        this.path='/gongdanguanli'
       }
       else if(localStorage['level']=="班长"&&this.FormData1.zt=="处理中")
       {
        console.log("班长",localStorage)
        this.context="确定处理完成这项任务吗"
        this.FormData1.zt="待审核"
        this.path='/gongdanguanli'
       }
       else if(localStorage['level']=="组员"&&this.FormData1.zt=="待处理")
       {
        console.log("组员",localStorage)
        this.context="确定要开始处理这项任务吗"
        this.FormData1.cltime=this.currentTime()
        this.FormData1.zt="处理中"
        this.path='/gongdanguanli'
       }
       else if(localStorage['level']=="组员"&&this.FormData1.zt=="处理中")
       {
        console.log("组员",localStorage)
        this.context="确定处理完成这项任务吗"
        this.FormData1.zt="待审核"
        this.path='/gongdanguanli'
       }
       else{

       }
        console.log("label",this.formid)
        this.$emit('fenpei',this.formid)
        this.putform(this.formid)
        this.$router.push({
        path: this.path,
        query: {
         par:this.formid
    }
      })

      },
      


      async putform(formId){
          let ApiParam = {
          method: 'PUT',
          url: 'http://10.112.16.136:8018/cloudForm/updateFormById' ,
          params: {
            form:JSON.stringify(this.FormData1),
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
       	// this.FormData.ft = strDate;
        return strDate
        console.log("strDate",strDate);
},




      goBack() {
        this.$router.push({
        path: '/gongdanguanli',
      })
        console.log('go back');
        // 你的返回逻辑
      },},
  };
  </script>
  <style scoped>
  .submit-button {
  background-color: #4960d4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}
  </style>