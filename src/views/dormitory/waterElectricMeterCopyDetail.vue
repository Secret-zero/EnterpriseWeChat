<template>
  <div class="wrap" id="wrap">
    <div class="list" style="background: #e2e2e2;" >
      <ul>
        <li
				v-for="(item, index) in result"
				:key="index"
				class="mt20"
				:style="index%2 === 0 ? 'background: #00BFFF' : 'background: #fff'"
				>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">组织名称：</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">户号：</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">设备名称：</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">类型：</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo">楼号：</div>
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo">房间号：</div>
						</flexbox-item>
					</flexbox>
				</li>
      </ul>
    </div>
    <tabbar style="position:fixed;" class="tabber">
      <tabbar-item  selected>
        <span slot="label" >暂存</span>
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
import { XButton, Alert, Tabbar, TabbarItem, Flexbox, FlexboxItem } from 'vux'
import $ from 'jquery'
export default {
  data() {
    return {
      result: [{},{}],
      fileList: [],
      upLoadImgList: []
		};
  },
  components: {
    XButton, Alert, Tabbar, TabbarItem, Flexbox, FlexboxItem
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
    }
	}
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
.flex-demo {
	border-radius: 4px;
	background-clip: padding-box;
}
</style>