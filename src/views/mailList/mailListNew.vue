<template>
  <div class="wrap" id="wrap">
    <div class="search">
      <div class="box">
        <input placeholder="搜索" v-model="keyWord" @change="changeKeyWord('0')">
      </div>
 			<div style="text-align:center">
        <x-button mini type="primary" @click.native="changeKeyWord('1')">部门精确查询</x-button>
 			</div>
     
			
    </div>
    <div class="personList">
      <div class="zimu" v-for="(item,index) in letter" :key="index">
        {{item}}
        <ul v-for="(personalContactInfoObject,index) in personalContactInfoModel" :key="index">
          <li
            class="person"
            v-if="personalContactInfoObject.prefixletter==item"
            @click="toInfo(personalContactInfoObject.contact_id)"
          >
            <div class="name">{{personalContactInfoObject.contact_name}}</div>
            <div class="content">{{personalContactInfoObject.group_name}}-{{personalContactInfoObject.post_name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  JDGetPeasonalContactInfoNew,
  JDGetPeasonalContactLetterNew
} from "@/api/getData";
import { mapState } from 'vuex'
import { Popup, XButton } from "vux";
import $ from "jquery";
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      personalContactInfoModel: [],
      personalContactInfoObject: {
        contact_id: 758,
        contact_name: "艾小兰",
        email: "xiaolan@goldemperor.com",
        group_name: "金帝人力资源课",
        mobile_full: "13587421352",
        mobile_short: "651352",
        organize_name: "金帝集团股份有限公司(测试库)",
        phone_full: "",
        phone_short: "77767",
        post_name: "绩效副课长",
        prefixletter: "A"
      },
      letter: [],
      keyWord: "",
      arr: []
    };
	},
	computed: {
    ...mapState({
      userInfo: state => state.mutations.userInfo
    })
  },
  directives: {},
  components: {
    Popup,
    XButton
  },
  mounted() {
		this.keyWord=this.userInfo[0].FDepartmentName
    this.GetPeasonalContactInfoNew();
  },
  methods: {
    toInfo(val) {
      this.$router.push({
        path: "/mailList/mailListinfoNew",
        query: {
          contact_id: val
        }
      });
    },
    look() {
      this.$router.push({ path: "/QRcode" });
    },
    log() {},
    invitation() {
      this.$router.push({ path: "/invitation" });
    },
    close() {},
    init() {},
    async GetPeasonalContactInfoNew() {
      //2.获取通讯录信息
      let data = await JDGetPeasonalContactInfoNew({
				KeyWord: this.keyWord,
				Flag:"1"
      });
			//this.$store.commit('SET_USERINFO', eval(data))
			
      this.personalContactInfoModel = eval(data);

      //1.获取通讯录信息字母列表
      let letterA = await JDGetPeasonalContactLetterNew({
				KeyWord: this.keyWord,
				Flag:"1"
			});
      
      for (var i = 0; i < eval(letterA).length; i++) {
        this.letter.push(eval(letterA)[i].letter);
      }
     
      this.$nextTick(() => {
        this.init();
      });
    },
    async changeKeyWord(Flag) {
      let data = await JDGetPeasonalContactInfoNew({
				KeyWord: this.keyWord,
				Flag:Flag
			});
			console.info(eval(data).length);
			if(eval(data).length>500){
				 this.$vux.toast.text('返回数据超过500个，请填写搜索条件');
				 return;
			}
      this.personalContactInfoModel = eval(data);
      this.arr = [];
      for (var i = 0; i < eval(data).length; i++) {
        this.arr.push(eval(data)[i].prefixletter.toUpperCase());
      }
      this.letter = Array.from(new Set(this.arr));
      this.$nextTick(() => {
        this.init();
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.search {
  background: white;
  padding: @rem*20;
  .box {
    width: @rem*690;
    height: @rem*72;
    background-color: #ffffff;
    border-radius: 18px;
    border: solid 1px #e6e6e6;
    display: flex;
    justify-content: center;
    input {
      width: 92%;
      border: none;
      text-align: center;
    }
  }
}
.personList {
  .zimu {
    padding: @rem*20;
    background: #f5f5f5;
    color: #aa0000;
    font-size: @rem*28;
  }
  ul {
    li {
      background: white;
      padding: @rem*20;
      border-bottom: 1px solid #f5f5f5;
      .name {
        color: #333;
        font-size: @rem*32;
      }
      .content {
        font-size: @rem*24;
        color: #999;
        .mt10;
      }
    }
  }
}
</style>
