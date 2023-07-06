<template>
  <div class="register-container">测试文本</div>
</template>
<script>
import {registerAPI} from '@/api'
export default {
  components: {},
  name: "",
  props: [],
  data() {
    return {};
  },
  methods: {
    async registers()
    {
      const res=await registerAPI()
      console.log(res)
    }
  },
  computed: {},
  watch: {},
  created() {
    this.registers()
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
</style>