<template>
  <div class="register-container">
    <div class="reg-box">
      <div class="title-box"></div>
      <el-form ref="form" :model="form" :rules="rulesObj" >
  <el-form-item prop="username">
    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input placeholder="请输入密码"  v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item prop="repassword">
    <el-input  placeholder="请再次确认密码" v-model="form.repassword"></el-input>
  </el-form-item>
    <el-button class="regbutton" type="primary" @click="registerFn">立即注册</el-button>
    <el-link type="info" @click="$router.push('/login')">去登录</el-link>
</el-form>
    </div>
  </div>
</template>
<script>
import {registerAPI} from '@/api'
export default {
  components: {},
  name: "",
  props: [],
  data() { 
    const morepassword=(rule,value,callback)=>{
           if(value!==this.form.password){
            callback(new Error('两次输入的密码不一致'))
           }else {
            callback()
           }
    }
    return {
     
      form:{
         username: "",
         password: "",
         repassword: "",
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
          repassword:[{required: true,message:'请确认密码',trigger: 'blur'},
        {
          validator:morepassword,trigger: 'blur'
        }
        ]
      },
    };
  },
  methods: {
    registerFn(){
        this.$refs.form.validate(async valid=>{
       
          if(valid){  
            const {data:res}=await registerAPI(this.form)
            // 这里的$message 是饿了么ui提供的严格弹窗提示
            if(res.code!==0)
            return this.$message.error(res.message)
            this.$message.success(res.message)
            this.$router.push('/login')
          }else{
            return false
          }
        })
    },
    
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
.register-container{
  height: 100%;
  width: 100%;
  background:url('@/../../../assets/login_bg.jpg') center;
  background-size:cover;
}
.reg-box {
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
.regbutton {
  width: 100%;

}
}

</style>