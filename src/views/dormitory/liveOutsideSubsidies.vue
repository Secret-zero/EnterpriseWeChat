<template>
  <div class="wrap" id="wrap" style="padding-bottom: 50px;">
    <div class='list' >
      <ul>
        <li>
          <div class='title'>工号</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>姓名</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>性别</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>归属组织</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>归属组别</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>职务</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>入职日期</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>离职日期</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>原补助类型</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>现补助类型</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>原补助金额</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>现补助金额</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>上次生效日期</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>生效日期</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>失效日期</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>户籍地址</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>现住地址</div>
          <div class='content'></div>
        </li>
        <li>
          <div class='title'>备注</div>
          <div class='content'></div>
        </li>
				<li>
          <div class='title'>制单人</div>
          <div class='content'></div>
        </li>
				<li>
          <div class='title'>审核人</div>
          <div class='content'></div>
        </li>
      </ul>
    </div>
		<tabbar class="tabber" >
      <tabbar-item  selected>
        <span slot="label" @click="save">暂存</span>
      </tabbar-item>
      <tabbar-item >
        <span slot="label">修改</span>
      </tabbar-item>
      <tabbar-item >
        <span slot="label">提交</span>
      </tabbar-item>
    </tabbar>
	</div>
</template>

<script>
import { JDGetAssestByFInterID, upLoadImg } from '@/api/getData'
import { mapState } from 'vuex'
import { XButton, Alert , Tabbar, TabbarItem } from 'vux'
import $ from 'jquery'
export default {
  data() {
    return {
      result: '',
      fileList: [],
      upLoadImgList: []
		};
  },
  components: {
    XButton, Alert, Tabbar, TabbarItem
  },
  mounted() {
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
		save(){
			alert("save");
		}
	}
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
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
.tabber{
	position:fixed;background-color:#f7f7fa
}
</style>