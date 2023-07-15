<template>
  <div class="login-container">
    <div class="log-box">
      <div class="title-box"></div>
      <el-form ref="form" :model="loginform" :rules="rulesObj" >
  <el-form-item prop="username">
    <el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input placeholder="请输入密码"  v-model="loginform.password"></el-input>
  </el-form-item>
    <el-button class="logbutton" type="primary" @click="loginFn">登录</el-button>
    <el-link type="info" @click="$router.push('/register')">注册</el-link>
</el-form>
    </div>
  </div>
</template>
<script>
import {loginAPI} from '@/api'
export default {
  components: {},
  name: "",
  props: [],
  data() {
    return {
      loginform:{
        username: "",
        password: ""
      },
      rulesObj:{
            username:[
              {required: true,message:'请输入用户名',trigger:'blur'},
            {
              pattern:/^[a-zA-Z0-9]{1,10}$/,
              message:'用户名必须是1-10的大小写字母数字',
              trigger:'blur'
            }
          ],
          password:[
            {required: true,message:'请输入密码',trigger:'blur'},
            {
              pattern:/^\S{6,15}$/,
              message:'密码必须是6-15的非空字符',
              triiger:'blur'
            }
          ],
    }};
  },
  methods: {
    loginFn(){
      this.$refs.form.validate(async valid=>{
       if(valid){  
         const {data:res}=await loginAPI(this.loginform)
         // 这里的$message 是饿了么ui提供的严格弹窗提示
         if(res.code!==0){
         return this.$message.error(res.message)}
         this.$message.success(res.message)
         this.$store.commit('dotoken',res.token)
       }else{
         return false
       }
     })
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
.login-container{
  height: 100%;
  width: 100%;
  background:url('@/../../../assets/login_bg.jpg') center;
  background-size:cover;
}
.log-box {
  padding:0 30px;
  width: 400px;
  height: 335px;
  background-color: #fff;
  border-radius:3px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  .title-box {
         height: 60px;
         background: url('../../assets/login_title.png') no-repeat center;
}
.logbutton {
  width: 100%;
}
}
</style>