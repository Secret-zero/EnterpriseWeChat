<template>
	<div class="wrap" id="wrap">
        <div class='mask' @click='closeMask'>
            <div>
                <img src='../../static/images/qidu/popup.jpg'>
            </div>
        </div>
	</div>
</template>

<script>
import wx from '@/mixins/wechat'
import { Swiper, SwiperItem } from 'vux'
import $ from 'jquery'
export default {
	// mixins: [wx],
	data () {
		return {
            
		}
	},
	components: {
        
	},
	mounted () {
        
	},
	methods: {
        closeMask () {
            this.$emit('closeMask', false)
        }
	}
}
</script>

<style lang="less" scoped>
    @import '~@/assets/less/main.less';
    .mask{position: fixed;background: rgba(0, 0, 0, .5);width: 100%;height: 100%;left: 0;right: 0;top: 0;z-index:8888;
        >div{z-index: 8889;position: absolute;left: 32%;top: 30%;
            .wh(@rem*300,@rem*300);
            img{.wh(100%, 100%)}
        }
    }
</style>
