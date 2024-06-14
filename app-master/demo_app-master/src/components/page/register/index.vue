<template class="registerBox">
  <div class="registerItem">
    <img
      src="http://10.112.16.136:8989/base-file/images/login.jpeg"
      style="display: inline; vertical-align: sub; width: 100%"
    />
    <div style="text-align: left">
      <h4>欢迎注册~</h4>
    </div>
    <el-form :model="ruleForm" class="form" status-icon :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <span slot="label">
          <i class="el-icon-user"/>
      	</span>
        <el-input style="width:85%" v-model.number="ruleForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
<!--      <el-form-item prop="age">-->
<!--        <span slot="label">-->
<!--          <i class="el-icon-user"/>-->
<!--      	</span>-->
<!--        <el-input style="width:85%" v-model.number="ruleForm.age" placeholder="请输入年龄"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item prop="sex">
        <span slot="label">
          <i class="el-icon-s-custom"/>
      	</span>
        <el-radio-group style="width:85%" v-model.number="ruleForm.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
     <el-form-item prop="phone">
       <span slot="label">
         <i class="el-icon-user"/>
     	</span>
       <el-input style="width:85%" v-model.number="ruleForm.phone" placeholder="请输入电话"></el-input>
     </el-form-item>
<!--      <el-form-item prop="email">-->
<!--        <span slot="label">-->
<!--          <i class="el-icon-user"/>-->
<!--      	</span>-->
<!--        <el-input style="width:85%" v-model.number="ruleForm.email" placeholder="请输入邮箱"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item prop="password">
        <span slot="label">
          <i class="el-icon-lock"/>
      	</span>
        <el-input type="password" style="width:85%" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <span slot="label">
          <i class="el-icon-s-check"/>
      	</span>
        <el-input type="password" style="width:85%" v-model="ruleForm.checkPass" placeholder="请再次输入密码" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item prop="level">
        <span slot="label">
          <i class="el-icon-s-check"/>
      	</span>
        <el-input style="width:85%" v-model="ruleForm.level" placeholder="请输入职务" ></el-input>
      </el-form-item>
      <el-form-item prop="secret">
        <span slot="label">
          <i class="el-icon-magic-stick"/>
      	</span>
        <el-input type="password" style="width:85%" v-model="ruleForm.secret" placeholder="请输入密钥(选填)" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <div>
      <span style="float: right;cursor: pointer">
        <el-button @click="toLogin" type="text">已注册，去登陆</el-button>
      </span>
    </div>
    <div class="button">
      <el-button type="primary" @click="submitForm">注册</el-button>
      <br><br>
      <el-button @click="toLogin">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    msg: String
  },
  data() {
    return {
      isRemember:true,
      ruleForm: {
        password: "",
        checkPass: '',
        name: "",
        // secret: '',
        // age: null,
        sex: null,
        level:"",
        phone: '',
        // email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        // age: [
        //   { required: true, message: '请输入年龄', trigger: 'blur' },
        // ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        // email: [
        //   { required: true, message: '请输入邮箱', trigger: 'blur' },
        // ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '请输入职位', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    // 提交函数，与Login的组件绑定
    // API的返回值{code:"...",data:{Token:"..."},}
    submitForm() {
      if(localStorage['username']===this.ruleForm.name)
      {
        console.log('11',localStorage)
        alert("用户名已存在");//如果用户名已存在则无法注册
      }
      else if(this.name==='')
      {
        alert("用户名不能为空");
      }
      else{//将新用户信息存储到localStorage
        localStorage.setItem('name',this.ruleForm.name);
        localStorage.setItem('password',this.ruleForm.password);
        localStorage.setItem('level',this.ruleForm.level);
        localStorage.setItem('phone',this.ruleForm.phone);
        // localStorage.setItem('mail',this.mail);
        // localStorage.setItem('tel',this.tel);
        // localStorage.setItem('s',"false");
        console.log("12.",localStorage)
        alert("注册成功");
        // this.$router.replace('/Login');//完成注册后跳转至登录页面
      }
      console.log(this)
      this.$router.push('/')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      // 注册跳转界面
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style scoped>
.registerBox {
  width: 100%;
  text-align: center;
}
.registerItem {
  width: 90%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 5%;
  text-align: center;
}
.button button {
  margin-top: 5%;
  width:80%
}
</style>
