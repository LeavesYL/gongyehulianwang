<template>
    <div>
      <div class="tabItem">
      <el-page-header @back="goBack" content="详情页面">
</el-page-header>
        <button @click="showConfirmDialog" class="icon-button">
        <i class="fas fa-edit"></i>
      </button>
      </div>
      <van-field v-model="FormData1.taskt" label="任务类型" readonly />
      <van-field v-model="FormData1.taskdetail" label="任务详情" readonly />
      <van-field v-model="FormData1.st" label="开始时间" readonly />
      <van-field v-model="FormData1.et" label="结束时间" readonly />
      <van-field v-model="FormData1.taskp" label="巡检产线" readonly />
      <van-field v-model="FormData1.gz" label="负责工长" readonly />
      <van-field v-model="FormData1.bz" v-if="level=='班长'" label="负责班组" readonly />
      <!-- 工长分配界面 -->
      <van-field
        readonly
        clickable
        v-if="level=='工长'"
        name="picker1"
        :value="FormData1.bz"
        label="负责班组"
        placeholder="请选择"
        @click="showClassPicker1 = true"
      />
      <van-popup v-model="showClassPicker1" v-if="level=='工长'" position="bottom">
        <van-picker show-toolbar :columns="rteams1" @confirm="tasktConfirmbz" @cancel="showClassPicker1 = false" />
      </van-popup>
      <!-- 班长分配界面 -->
      <van-field
        readonly
        clickable
        v-if="level=='班长'"
        name="picker1"
        :value="FormData1.zy"
        label="负责班组"
        placeholder="请选择"
        @click="showClassPicker1 = true"
      />
      <van-popup v-model="showClassPicker1" v-if="level=='班长'" position="bottom">
        <van-picker show-toolbar :columns="rteams2" @confirm="tasktConfirmzy" @cancel="showClassPicker1 = false" />
      </van-popup>
      <button class="submit-button" v-if="level!='主管'" @click="submit">完成</button>
    </div>
  </template>
  
  <script>
  import { Dialog } from 'vant';
  import axios from 'axios';
  export default {
    name: 'CKdetails',
    data() {
      return {
        FormData:[],
        FormData1:{
          name:"",
            position:"",
           taskdetail:'',
           taskcharge:'',
           st:"",
           et:"",
           ft:"",
           taskt: "",
           fptime:"",
           cltime:"",
           taskp:"",
           api_data: [],
           format_data: [],
           zt:"",
           gz:"",
           bz:"",
           zy:"",
        },
        level:"",
        showClassPicker1: false,                    
        // tasktype: '运维任务',
        // stime: '2024-06-03 11:19:51',
        // etime: '2024-06-03 11:19:52',
        // details: '这是一个任务详情',
        // rteam: '',
        // rpeople: '负责工长',
        rteams1: ['第一组', '第二组'], // 修正了数组元素的引号
        rteams2: ['组员1', '组员2'],
        // rteams3: ['第一组', '第二组'],
        // canxian: '花都新工厂-机加线',
        formid:''
      };
    },
    created(){
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


      goBack() {
        this.$router.push({
        path: '/detail',
      })
        console.log('go back');
        // 你的返回逻辑
      },
      showendtime(data){
            // this.FormData.et=data
            console.log("id:",this.FormData.et)
      },
      showConfirmDialog() {
      Dialog.confirm({
        title: '确认操作',
        message: '您确定要编辑吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          // 用户点击了确定按钮，执行编辑操作
          this.edit();
        })
        .catch(() => {
          // 用户点击了取消按钮，什么也不做
        });
    },
      tasktConfirmbz(v) {
        // this.rteam = v;
        this.FormData1.bz=v;
        console.log("负责班组：",this.FormData1.bz)
        this.showClassPicker1 = false;
      },
      tasktConfirmzy(v) {
        // this.rteam = v;
        this.FormData1.zy=v;
        console.log("负责组员：",this.FormData1.zy)
        this.showClassPicker1 = false;
      },



      submit(){
        this.centerDialogVisible = true
        this.FormData1.fptime=this.currentTime()
        if(localStorage['level']=="班长")
       {
        console.log("班长",localStorage)
         this.FormData1.fptime=this.currentTime()
         this.FormData1.zt="待处理"
       }
        this.putform(this.formid)
        
        this.$router.push({
        path: '/gongdanguanli',
      })
      },


      // 更新表单
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




    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #4960d4; /* 可根据需要更改背景颜色 */
  }
  
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  .title {
    flex-grow: 1;
    text-align: center;
  }
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
  