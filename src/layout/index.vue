<template>
  <div class="index-container">
    <el-container style="height: 500px">
      <el-header height="70px">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="left-right">
            <div>
              <el-menu-item index="1"
                ><img src="../assets/logo.png" alt=""
              /></el-menu-item>
            </div>
            <div class="top-buttom">
              <el-submenu index="2">
                <template slot="title"
                  ><img src="../assets/head.png" alt="" />个人中心</template
                >
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="3" @click="quitFn">退出</el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-header>
      <el-container class="bottom">
        <el-aside width="200px">
          <div class="user-box">
            <img :src="user_pic" alt="" v-if="user_pic" />
            <img src="../assets/logo.png" alt="" v-else />
            <span>欢迎{{ nickname || username }}</span>
          </div>
          <el-menu
            default-active="/home"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
          >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
            <el-submenu index="/topic">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item index="/topic1">
              <i class="el-icon-s-data"></i>
              <span slot="title">文章1</span>
            </el-menu-item>
            <el-menu-item index="/topic2">
              <i class="el-icon-s-order"></i>
              <span slot="title">文章2</span>
            </el-menu-item>
            </el-submenu>
            <el-submenu index="/my">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item index="/my1">
              <i class="el-icon-s-data"></i>
              <span slot="title">中心1</span>
            </el-menu-item>
            <el-menu-item index="/my2">
              <i class="el-icon-s-order"></i>
              <span slot="title">中心2</span>
            </el-menu-item>
            </el-submenu>
      
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  name: "",
  props: [],
  data() {
    return {};
  },
  methods: {
    quitFn() {
      this.$confirm("此操作将退出登录, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$store.commit("dotoken", "");
          this.$store.commit("saveuser", {});
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    //侧边组件的办法
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  computed: {
    ...mapGetters(["username", "nickname", "user_pic"]),
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
.el-menu {
  height: 100%;
  border-bottom: 0;
}
.left-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.top-buttom {
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
}
.index-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
//让顶部两侧紧贴
.el-header {
  padding: 0;
}
//左侧用户栏
.el-aside {
  background-color: #23262e;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}

.el-aside {
  height: 895px;
}
</style>