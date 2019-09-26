<template>
  <div class="wrap" id="wrap">
    <div class='searchBox'>
      <div class='center'>
        <icon type="search" style="font-size: 14px;margin-right: 5px;"></icon>搜索
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from 'vux'
export default {
  // mixins: [wx],
  data() {
    return {};
  },
  components: {
    Icon
  },
  mounted() {},
  methods: {
    closeMask() {
      this.$emit("closeMask", false);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.searchBox{
  padding:  @rem*20;
  height: @rem*90;
  .v-flex;
  .center{
    background: white;
    color: #666;
    height: 100%;
    width: 100%;
    .v-flex;

  }
}
</style>
