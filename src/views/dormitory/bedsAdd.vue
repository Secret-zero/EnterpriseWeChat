<template>
  <div class="wrap" id="wrap">
    <div class='list'>
      <ul>
        <li>
          <div class='title'>组织名称</div>
          <div class='content'>{{result.FNumber}}</div>
        </li>
        <li>
          <div class='title'>宿舍楼号</div>
          <div class='content'>{{result.FName}}</div>
        </li>
        <li>
          <div class='title'>宿舍楼层</div>
          <div class='content'>{{result.FTypeName}}</div>
        </li>
        <li>
          <div class='title'>房间编号</div>
          <div class='content'>{{result.FModel}}</div>
        </li>
        <li>
          <div class='title'>全码编号</div>
          <div class='content'>{{result.FQty}}</div>
        </li>
        <li>
          <div class='title'>房间类型</div>
          <div class='content'>{{result.FPrice}}</div>
        </li>
        <li>
          <div class='title'>房间等级</div>
          <div class='content'>{{result.FOrgVal}}</div>
        </li>
        <li>
          <div class='title'>房间朝向</div>
          <div class='content'>{{result.FProduceDate}}</div>
        </li>
        <li>
          <div class='title'>窗户朝向</div>
          <div class='content'>{{result.FGuaranteePeriod}}月</div>
        </li>
        <li>
          <div class='title'>是否有阳台</div>
          <div class='content'>{{result.FVender}}</div>
        </li>
        <li>
          <div class='title'>卫生间</div>
          <div class='content'>{{result.FbuyDate}}</div>
        </li>
        <li>
          <div class='title'>宿管员及电话</div>
          <div class='content'>{{result.FRevicedate}}</div>
        </li>
        <li>
          <div class='title'>家具配置</div>
          <div class='content'>{{result.FOrganizeName}}</div>
        </li>
        <li>
          <div class='title'>房间面积（平方）</div>
          <div class='content'>{{result.CustodianCode}}</div>
        </li>
        <li>
          <div class='title'>房间单价（元/平方）</div>
          <div class='content'>{{result.CustodianName}}</div>
        </li>
        <li>
          <div class='title'>房间月租金</div>
          <div class='content'>{{result.FLiableEmpName}}</div>
        </li>
        <li>
          <div class='title'>床铺数量</div>
          <div class='content'>{{result.FDeptName}}</div>
        </li>
        <li>
          <div class='title'>备注</div>
          <div class='content'>{{result.FDeptName}}</div>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
import { JDGetAssestByFInterID, upLoadImg } from '@/api/getData'
import { mapState } from 'vuex'
import { XButton, Alert } from 'vux'
import $ from 'jquery'
import { userInfo } from 'os';
export default {
  data() {
    return {
      result: '',
      fileList: [],
      upLoadImgList: []
		};
  },
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      userInfo1: state => state.mutations.userInfo
    })
  },
  components: {
    XButton
  },
  mounted() {
    console.log(this.userInfo1)
    this.getInfo()
	},
	methods: {
    addPic() {
      $('input[type=file]').trigger('click')
      return false
    },
    async imgChange(e) {
      let imgBroadcastListBase64 = []
      if (!e.target.files.length) return ;
      let array = Object.keys(e.target.files).map(key=> e.target.files[key]) // 对象转数组
      if (array.length > 5) {
        array = array.filter((item, index) => {
          if (index < 5) {
            return item
          }
        })
      }
      let fileList = array.map(async (item, index) => {
        let res = await this.uploadImgToBase64(item)
        return res.result
      })
      for (const textPromise of fileList) {
        imgBroadcastListBase64.push(await textPromise)
      }
      if (this.fileList.length + imgBroadcastListBase64.length > 5) { // 如果 超过五张则提示超过五张 不得上传
        this.$vux.alert.show({
          title: '注意',
          content: '最多可上传五张图片',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
        return 
      }
      this.fileList = [...this.fileList, ...imgBroadcastListBase64] // 合并数组
      
      // if (array.length === 1 && this.fileList.length <4) {
      //   this.fileList = [...this.fileList, ...imgBroadcastListBase64]
      // } else {
      //   this.fileList = imgBroadcastListBase64
      // }
    },
    async upLoadImg() {
      let form = {
        FCheckInterID: this.result.FCheckInterID,
        EmpCode: this.userInfo1[0].Fnumber,
        Pictures: []
      }
      form.Pictures = this.fileList.map((item) => {
        return {photo: item.replace(/.*;base64,/, '')}
      })
      form.Pictures = JSON.stringify(form.Pictures)
      console.log(form)
      let res = await upLoadImg(form)
      console.log(res)
      this.$vux.toast.text(res)
    },
    async getInfo() {
      let data = await JDGetAssestByFInterID({FInterID: this.$route.query.FInterID})
      console.log(data)
      this.result = JSON.parse(data)
    }
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.InventoryBox{
  margin-bottom: @rem*20;
  width: 100%;
  background: white;
  padding: @rem*10;
  .startInventory{
    background: #ae0401;
    color: white;
    height: @rem*80;
    width: 60%;
    margin: 0 auto;
  }
}
.mr10{
  margin-right:@rem*10
}
.weui-btn, .weui-btn{
  margin-top: 0 !important;
  line-height: @rem*60 !important;
}
.imgList{
  padding: @rem*10;
  background: white;
  display: flex;
  flex-wrap: wrap;
  div{
    margin-top: @rem*10;
    width: 24%;
    margin-right: 1.2%;
    &:nth-child(4n){
      margin-right: 0;
    }
    img{
      height: @rem*160;
      display: block;
      width: 100%;
    }
  }
}
.list{
  ul{
    li{
      display: flex;
      justify-content: space-between;
      background: white;
      padding: @rem*20;
      border-bottom: 1px solid #f5f5f5;
      .title{
        color: #666;
        font-size: @rem*32;
        display: flex;
        align-items:center;
      }
      .content{
        font-size: @rem*32;
        color: #333;
        .xbutton{
          width: @rem* 220;
          height: @rem*80;
        }
      }
    }
  }
}
</style>