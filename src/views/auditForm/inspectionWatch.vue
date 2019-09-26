<template>
  <div>
    <div class="block">
      <span class="demonstration">默认 Hover 指示器触发</span>
      <viewer :images="Picturelist" style="height: 270px;">
        <el-carousel height="270px">
          <el-carousel-item v-for="(item,index) in Picturelist" :key="index">
            <img :src="item.Photo"/>
          </el-carousel-item>
        </el-carousel>
      </viewer>
    </div>
    <ul class="mt20">
      <li>
        <div class="title">点击图片查看大图</div>
        <div class="content"></div>
      </li>
      <li>
        <div class="title">稽查结果：</div>
        <div class="content">{{IncomingMessage.FInspectionResult}}</div>
      </li>
      <li>
        <div class="title">稽查人员：</div>
        <div class="content">{{IncomingMessage.FInspector}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Confirm, XButton, Tabbar, TabbarItem, TransferDomDirective as TransferDom } from "vux";
import { JDGetIncomingMessage, JDSigning, JDAbnormalUpload } from "@/api/getData";
import $ from 'jquery'
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      IncomingMessage: {},
      Items: [],
      Picturelist: [],
      showCheck: false,
      showException: false
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    XButton,
    Tabbar,
    TabbarItem
  },
  mounted() {
    this.getIncomingMessage();
  },
  methods: {
    async getIncomingMessage() {
      let data = await JDGetIncomingMessage({
        FInterID: this.$route.query.FInterID
      });
      this.Items = data.Items;
      this.Picturelist = data.Picturelist;
      this.IncomingMessage = data;
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
@import "~@/assets/less/main.less";
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
ul {
  background: white;
  li {
    padding: @rem*20;
    display: flex;
    justify-content: space-between;
    font-size: @rem*32;
    border-bottom: 1px solid #eee;
    .title {
      color: #666;
    }
    input {
      border: none;
      text-align: right;
    }
    .content {
      color: #333;
      display: flex;
      align-items: center;
      i {
        color: #666;
        font-size: @rem*30;
      }
      .look {
        width: @rem*120;
        height: @rem*60;
        line-height: @rem*60;
        color: white;
        border-radius: 5px;
        text-align: center;
        .bisColor(#d93309, #aa0000);
      }
    }
  }
}
.button {
  width: 95%;
  margin: @rem*20;
}
</style>
