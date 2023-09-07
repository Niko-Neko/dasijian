<template>
  <div class="userinfo-container">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>基本资料</span>
  </div>
  <div>
    <el-form ref="userFormRef" :model="userform" :rules="userFormRules"  label-width="100px">
      <el-form-item label="登录名称" >
        <el-input v-model="userform.username" disabled></el-input> </el-form-item
    >
    <el-form-item label="用户昵称" prop="nickname">
    <el-input v-model="userform.nickname"></el-input>
  </el-form-item>
  <el-form-item label="用户邮箱" prop="email">
    <el-input v-model="userform.email"></el-input>
  </el-form-item>
  <el-form-item>
        <el-button type="primary" @click="submitFn">提交修改</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
 
</el-card>
    
  </div>
</template>
<script>
import {updateUserInfoAPI} from '@/api/index'
export default {
  components: {},
  name: "",
  props: [],
  data() {
    return {
        userform:{
            username:this.$store.state.userInfo.username,
            nickname:'',
            email: '',
        },
        userFormRules:{
            nickname:[
                {required:true,message:'请输入用户名',trigger:'blur'},
                {pattern:/^\S{1,10}$/,message:'昵称必须是1-10位的',trigger:'blur'}
            ],
        email:[
            {required:true,message:'请输入用户邮箱',trigger:'blur'},
            {type: 'email',message:'邮箱格式不正确',trigger:'blur'}
        ]
        },
    };
  },
  methods: {
    //提交校验
    submitFn(){
         this.$refs.userFormRef.validate(async valid=>{
          if(valid){
            console.log(this.userform)
            this.userform.id=this.$store.state.userInfo.id
            const {data:res}=await updateUserInfoAPI(this.userform)
            if(res.code!==0)
            return this.$message.error('更新信息失败')
            this.$message.success('更新成功')
            this.$store.dispatch('getUser')
            //这里他的后端接口没有更新用户数据 导致提交的名字无法更改
            this.userform.nickname=''
            this.userform.email=''
          }else {
            return false
          }
         })
    },
    //重置
    resetFn(){
      // this.userform.nickname=''
      // this.userform.email=''
      
      //el-form有提供重置表单的办法
      this.$refs.userFormRef.resetFields()
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
.el-form {
  width: 500px;
}
</style>