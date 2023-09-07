<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option
                v-for="obj in cateList"
                :key="obj.id"
                :label="obj.cate_name"
                :value="obj.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="choseFn">筛选</el-button>
            <el-button type="info" size="small" @click="resetFn">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
           <el-link type="primary" @click="showDetailFn(scope.row.id)">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $dateformat(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="danger" size="mini" @click="removeFn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
  @size-change="handleSizeChangeFn"
  @current-change="handleCurrentChangeFn"
  :current-page.sync="q.pagenum"
  :page-sizes="[2, 3, 5, 10]"
  :page-size.sync="q.pagesize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total"
>
</el-pagination>
    </el-card>
    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogColseFn"
    >
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="obj in cateList"
              :key="obj.id"
              :label="obj.cate_name"
              :value="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            @change="contentChange"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../assets/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="onCoverChangeFn"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImgFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
  <h1 class="title">{{ artDetail.title }}</h1>

  <div class="info">
    <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
    <span>发布时间：{{ $dateformat(artDetail.pub_date) }}</span>
    <span>所属分类：{{ artDetail.cate_name }}</span>
    <span>状态：{{ artDetail.state }}</span>
  </div>
	
  <!-- 分割线 -->
  <el-divider></el-divider>
  
  <!-- 文章的封面 -->
  <img v-if="baseURL" :src="baseURL + artDetail.cover_img" alt="" />

  <!-- 文章的详情 -->
  <div v-html="artDetail.content" class="detail-box"></div>
</el-dialog>
  </div>
</template>
  
  <script>
import { getArtCateListAPI, uploadArticleAPI, getArtListAPI,getArtDetailAPI,delArticleAPI } from "@/api";
import {baseURL} from '@/utils/request'
import imgObj from "../../assets/avatar.jpg";
export default {
  name: "ArtList",
  data() {
    return {
      pubDialogVisible: false,
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
      },
      pubForm: {
        // 表单的数据对象
        title: "",
        cate_id: "",
        content: "",
        cover_img: "",
        state: "",
      },
      cateList: [],
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        cover_img: [
          { required: true, message: "请选择文章照片", trigger: "blur" },
        ],
      },
      artList: [],
      total: 0,
      artDetail:{},
      detailVisible:false,
      baseURL
    };
  },
  methods: {
    showPubDialogFn() {
      this.pubDialogVisible = true;
    },
    async handleClose(done) {
      const confirmResult = await this.$confirm(
        "此操作将导致文章信息丢失, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === "cancel") return;
      // 确认关闭
      done();
    },
    async getCateListFn() {
      const {
        data: { data: res },
      } = await getArtCateListAPI();
      this.cateList = res;
      console.log(this.cateList);
    },
    chooseImgFn() {
      this.$refs.iptFileRef.click();
    },
    onCoverChangeFn(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.pubForm.cover_img = null;
        this.$refs.imgRef.setAttribute("src", imgObj);
      } else {
        this.pubForm.cover_img = files[0];
        const url = URL.createObjectURL(files[0]);
        this.$refs.imgRef.setAttribute("src", url);
      }
      this.$refs.pubFormRef.validateField("cover_img");
    },
    pubArticleFn(str) {
      this.pubForm.state = str;
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          const fd = new FormData();
          fd.append("title", this.pubForm.title);
          fd.append("cate_id", this.pubForm.cate_id);
          fd.append("content", this.pubForm.content);
          fd.append("cover_img", this.pubForm.cover_img);
          fd.append("state", this.pubForm.state);
          const { data: res } = await uploadArticleAPI(fd);
          if (res.code !== 0) {
            this.pubDialogVisible = false;
            return this.$message.error(res.message);
          } else {
            this.pubDialogVisible = false;
            return this.$message.success(res.message);
          }
        } else {
          return false;
        }
      });
    },
    contentChange() {
      this.$refs.pubFormRef.validateField("content");
    },
    dialogColseFn() {
      this.$refs.pubFormRef.resetFields();
      this.pubForm.state = "";
      this.$refs.imgRef.setAttribute("src", imgObj);
      this.getArticleListFn()
    },
    //获取文章列表
    async getArticleListFn() {
      const { data: res } = await getArtListAPI(this.q);
      this.artList = res.data;
      this.total = res.total;
    },
    handleSizeChangeFn(sizes){
     this.q.pagesize=sizes
     this.q.pagenum=1
     this.getArticleListFn()
    },
    handleCurrentChangeFn(nowPage){
     this.q.pagenum=nowPage
     this.getArticleListFn()
    },
    choseFn(){
      this.q.pagesize=2
      this.q.pagenum=1
      this.getArticleListFn()
    },
    resetFn(){
      this.q.pagesize=2
      this.q.pagenum=1
      this.q.cate_id=''
      this.q.state=''
      this.getArticleListFn()
    },
   async showDetailFn(id){
      const {data:res}=await getArtDetailAPI(id)
      console.log(res);
      this.artDetail=res.data
      this.detailVisible=true
    },
    async removeFn(id){
      const {data:res}=await delArticleAPI(id)
      if (res.code !== 0) {
            return this.$message.error(res.message);
          } else {
            if(this.artList.length===1){
              if(this.q.pagenum)this.q.pagenum--
            }
           
            this.getArticleListFn()
            return this.$message.success(res.message);
    }

  }
  },
  created() {
    this.getCateListFn();
    this.getArticleListFn();
  },
};
</script>
  
  <style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

::v-deep .ql-editor {
  min-height: 300px;
}

.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>