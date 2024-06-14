<template>
    <div>
        <div class="header">
      <button @click="goBack" class="icon-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="title">
        <slot></slot>
      </div>
      <button @click="showConfirmDialog" class="icon-button">
        <i class="fas fa-edit"></i>
      </button>
    </div>
      <van-field v-model="tasktype" label="任务类型" readonly />
      <van-field v-model="time" label="发现时间" readonly />
      <van-field v-model="details" label="任务详情" readonly />
      <van-field v-model="sname" label="设备名称" readonly />
      <van-field v-model="saddress" label="设备地址" readonly />
      <van-field v-model="chanxianxx" label="产线信息" readonly />
      <van-field v-model="state" label="状态" readonly />
      <van-field v-model="pname" label="上报组员" readonly />
      <van-field v-model="fpname" label="分配人员" readonly />
      <van-field v-model="clname" label="处理人员" readonly />
      <van-field v-model="fptime" label="分配时间" readonly />
      <van-field v-model="cltime" label="处理时间" readonly />
    </div>
  </template>
  
  <script>
  import { Dialog } from 'vant';
    import axios from 'axios';
  export default {
    name: 'CKdetails',
    data() {
      return {
        tasktype: '运维任务',
        time: '2024-06-03 11:19:51',
        details: '这是一个任务详情',
        sname: '这是设备名称',
        saddress: '这是产线地址',
        chanxianxx: '这是产线信息',
        state: '状态',
        pname: '上报组员',
        fpname:'分配人员',
        clname:'处理人员',
        fptime:'分配时间',
        cltime:'处理时间'
      };
    },
    methods: {
      goBack() {
        // 你的返回逻辑
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
    }
  };
  </script>
  <style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5; /* 可根据需要更改背景颜色 */
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
</style>