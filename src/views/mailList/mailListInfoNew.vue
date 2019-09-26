<template>
  <div class="wrap" id="wrap">
    <div class="head">
      <div class="headImg">{{firstName}}</div>
      <div class="name">
        {{peasonalDetailInfoObject.contact_name}}
      </div>
      <div class="funList mt20">
        <div class="sms">
          <a :href='`sms:${peasonalDetailInfoObject.mobile_full}`'>
            <img src="../../assets/images/sms.png">
          </a>
        </div>
        <div class="tel">
          <a :href='`tel:${peasonalDetailInfoObject.mobile_full}`'>
            <img src="../../assets/images/tel.png">
          </a>
        </div>
      </div>
    </div>
    <div class="personInfo">
      <ul>
        <li>
          <div class="name">手机：</div>
          <div><a :href='`tel:${peasonalDetailInfoObject.mobile_full}`'>{{peasonalDetailInfoObject.mobile_full}}</a></div>
        </li>
        <li>
          <div class="name">短号：</div>
          <div><a :href='`tel:${peasonalDetailInfoObject.mobile_short}`'>{{peasonalDetailInfoObject.mobile_short}}</a></div>
        </li>
        <li>
          <div class="name">座机：</div>
          <div><a :href='`tel:${peasonalDetailInfoObject.phone_short}`'>{{peasonalDetailInfoObject.phone_short}}</a></div>
        </li>
        <li>
          <div class="name">组织：</div>
          <div>{{peasonalDetailInfoObject.organize_name}}</div>
        </li>
        <li>
          <div class="name">部门：</div>
          <div>{{peasonalDetailInfoObject.group_name}}</div>
        </li>
        <li>
          <div class="name">职务：</div>
          <div>{{peasonalDetailInfoObject.post_name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { JDGetPeasonalDetailInfoNew } from "@/api/getData";
export default {
  data() {
    return {
      peasonalDetailInfoObject:{},
      firstName:''
    };
  },
  directives: {},
  components: {},
  mounted() {
    this.getPeasonalDetailInfoNew()
  },
  methods: {
    look() {},
    log() {},
    invitation() {},
    close() {},
    init() {},
    async getPeasonalDetailInfoNew() {
      console.log(this.$route.query.contact_id);
      let data = await JDGetPeasonalDetailInfoNew({
        contact_id:this.$route.query.contact_id
      });
      console.log(data);
      console.log(eval(data));
      //this.$store.commit('SET_USERINFO', eval(data))
      this.peasonalDetailInfoObject = eval(data);
      this.firstName=this.peasonalDetailInfoObject.contact_name.substring(0,1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.space {
  display: inline-block;
  width: 1.5em;
}
.head {
  border-bottom: 1px solid #f5f5f5;
  background: white;
  padding: @rem*50 @rem*20;
  display: flex;
  flex-direction: column;
  align-items: center;
  .headImg {
    .wh(@rem*176, @rem*176);
    border-radius: 100%;
    background: #a09393;
    .v-flex;
    font-size: @rem*96;
    color: white;
    .mt20;
  }
  .name {
    font-size: @rem*48;
    color: #333;
    .mt20;
  }
  .funList {
    display: flex;
    width: @rem*220;
    justify-content: space-between;
    .sms,
    .tel {
      .wh(@rem*80, @rem*80);
      .bisColor(#d93309, #aa0000);
      .v-flex;
      border-radius: 100%;
    }
    .sms {
      img {
        .wh(@rem*46, @rem*44);
      }
    }
    .tel {
      img {
        .wh(@rem*36, @rem*42);
      }
    }
  }
}
.personInfo {
  ul {
    li {
      padding: @rem*20;
      display: flex;
      align-items: center;
      background: white;
      border-bottom: 1px solid #f5f5f5;
      .name {
        font-size: @rem*32;
        color: #666;
      }
    }
  }
}
</style>
