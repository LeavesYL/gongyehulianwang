<template>
    <div>
      <van-field
        v-model="selectedDate"
        readonly
        clickable
        label="结束时间"
        placeholder="请选择结束时间"
        @click="showDatePicker"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
          v-model="chosenDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirmet"
          @cancel="onCancel"
        />
      </van-popup>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const selectedDate = ref('');
      const chosenDate = ref(new Date());
      const showPicker = ref(false);
      const minDate = new Date(new Date().getFullYear() - 10, 0, 1); // 最小可选日期为10年前的今天
      const maxDate = new Date(new Date().getFullYear() + 10, 11, 31); // 最大可选日期为10年后的今天
  
      const showDatePicker = () => {
        showPicker.value = true;
      };
  
      const onConfirm = (value) => {
        selectedDate.value = formatDate(value); // 将选择的日期格式化为字符串并赋值给输入框
        showPicker.value = false; // 隐藏日期选择器
      };
  
      const onCancel = () => {
        showPicker.value = false; // 隐藏日期选择器
      };
  
      // 将日期对象格式化为 'YYYY-MM-DD' 格式的字符串
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };
  
      return {
        selectedDate,
        showPicker,
        chosenDate,
        minDate,
        maxDate,
        showDatePicker,
        onConfirm,
        onCancel
      };
    },
    methods:{
      onConfirmet(value){
        // console.log(this.onConfirm)
        this.onConfirm(value);
        console.log(this.selectedDate)
        this.$emit('endtime',this.selectedDate)
      }
      }
  };
  </script>
  
  