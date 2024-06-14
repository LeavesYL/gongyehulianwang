<template>
    <div class="top-tab">
      <button @click="goBack" class="icon-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="title">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopTab',
    methods: {
      goBack() {
        this.$router.back();
      },
    }
  }
  </script>
  
  <style scoped>
  .top-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
  }
  
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
  }
  
  .title {
    flex: 1;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
  }
  </style>
  