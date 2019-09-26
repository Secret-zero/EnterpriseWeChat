<template>
  <div class="wrap" id="wrap">
    <div>{{latlng.latitude}}, {{latlng.longitude}}</div>
    <!-- <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display:none;"
      scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=WKLBZ-KNK3V-EGPP4-UZOW2-FZGQ3-GUBPI&referer=web定位"
    ></iframe> -->
    <div class="funList">
      <ul>
        <li @click="getList(1), Punch = false">当月打卡记录</li>
        <li @click="getList(2), Punch = false">本年打卡记录</li>
        <li @click="Punch = true">开始打卡</li>
      </ul>
    </div>
    <div class="punchList" v-if="!Punch">
      <ul>
        <li v-for="(item, index) in recodeList" class="mt20" :key="index">
          <div class="time">打卡时间：{{item.addtime}}</div>
          <div class="place">打卡地点：{{item.address}}</div>
        </li>
      </ul>
    </div>
    <div class="punchContent" v-if="Punch">
      <div class="address mt20">
        <div class="name">地址</div>
        <div class="addContent">{{address}}</div>
      </div>
      <div class="address mt20">
        <div class="name">备注</div>
        <input placeholder="选填" v-model="remark">
      </div>
    </div>
    <div class="button" v-if="Punch">
      <x-button
        :gradients="['#d93309', '#aa0000']"
        style="width: 100%;"
        @click.native="confirm"
      >提交打卡</x-button>
    </div>
    <div class="map" v-show="Punch">
      <div class="title">地图信息</div>
      <div id="container" style="height:400px"></div>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
import { XButton } from "vux";
import { mapState } from "vuex";
import { JDGetAttendanceCard, JDAttendanceCard, mapApi, getQYSignature } from "@/api/getData";
import $ from "jquery";
// import wx from '@/mixins/wechat'
export default {
  data() {
    return {
      address: "",
      Punch: true,
      recodeList: [],
      location: "",
      remark: ""
      // height: ''
    };
  },
  // mixins: [wx],
  computed: {
    ...mapState({
      wxOpenId: state => state.mutations.wxOpenId,
      latlng: state => state.mutations.latlng
    })
  },
  components: {
    XButton
  },
  created() {
    //获取当前位置
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //         var mk = new BMap.Marker(r.point);
    //         getAddress(r.point);
    //     }else {
    //         alert('failed'+this.getStatus());
    //     }
    // });
    // //获取地址信息，设置地址label
    // function getAddress(point){
    //     var gc = new BMap.Geocoder();
    //     gc.getLocation(point, function(rs){
    //       console.log(rs)
    //         var addComp = rs.addressComponents;
    //         var address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber; //获取地址
    //         console.log(address);
    //     });
    // }
    // setTimeout(() => {
    //     var geolocation = new qq.maps.Geolocation("WKLBZ-KNK3V-EGPP4-UZOW2-FZGQ3-GUBPI", "web定位-捷点科技"); 
    //     var positionNum = 0;
    //     var options = {timeout: 8000}
    //     geolocation.getLocation(this.showPosition, this.showErr, options);
    //     // this.$store.commit('updateLoadingStatus', {isLoading: true})
    // }, 0)
  },
  watch: {
    latlng() {
      this.init(latlng.latitude, latlng.longitude)
    }
  },
  mounted() {
    var ua= window.navigator.userAgent.toLowerCase();
    if( (ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork') ){
        alert("企业微信客户端");
        this.getSignature2()
        setTimeout(() => {
          let _this = this
          let options = { // 传入一个回调函数 在微信位置接口调用成功的时候 调用该页面地图的api
            success (res) {
              _this.init(res)
            }
          }
          this.$store.commit('updateLoadingStatus', {isLoading: true})
          this.getQYlocation(options)
        }, 2000)
    }else if( ua.match(/micromessenger/i) == 'micromessenger' ){
        alert("微信客户端");
        this.getSignature()
        setTimeout(() => {
          let _this = this
          let options = { // 传入一个回调函数 在微信位置接口调用成功的时候 调用该页面地图的api
            success (res) {
              _this.init(res)
            }
          }
          _this.$store.commit('updateLoadingStatus', {isLoading: true})
          _this.getLocation(options)
        }, 2000)
    }
  },
  methods: {
    async getSignature2(callback) {
      let form = {
				url: location.href.split('#')[0],
				type: 1
      }
      let data = await getQYSignature(form)
      console.log('data', data)
      wx.config({
          beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
					timestamp: parseInt(data.timeStamp), // 必填，生成签名的时间戳
					nonceStr: data.nonceStr, // 必填，生成签名的随机串
					signature: data.sig, // 必填，签名，见附录1
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      });
      // wx.ready(() => {
			// 	if (callback) {
			// 		console.log(callback)
			// 		callback()
			// 	}
      // })
    },
    getQYlocation(options = {}) {
      wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log('success', res)
            // let res = 
            options.success(res)
            // Vue.$store.commit('SAVE_LOCATION', {lat: res.latitude, lng: res.longitude})
            // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            // var speed = res.speed; // 速度，以米/每秒计
            // var accuracy = res.accuracy; // 位置精度
          },
          fail: function(res) {
            console.log('error', res)
          }
        });
      
    },
    getLocationInfo(position) {
      var PI = 3.14159265358979324;
      var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      var x = position.longitude;
      var y = position.latitude;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);  
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);  
      var bdLon = z * Math.cos(theta) + 0.0065;  
      var bdLat = z * Math.sin(theta) + 0.006; 
      var point = new BMap.Point(bdLon, bdLat);
      var _this = this
      var geoc = new BMap.Geocoder();
        //  geoc.getLocation(baiduPoint, getCityByBaiduCoordinate);
        geoc.getLocation(point, function (rs) {
            console.log('rs', rs)
            _this.address = rs.address
            _this.$store.commit('updateLoadingStatus', {isLoading: false})
        });
    },
    async confirm() {
      try {
        if (!this.address) {
          this.$vux.toast.text("定位失败");
          return
        }
        let data = await JDAttendanceCard({
          FWeixinOpenID: this.wxOpenId,
          zuobiao: `${this.location.lng},${this.location.lat}`,
          address: this.address,
          beizhu: this.remark
        });
        this.Punch = false;
        this.getList(1);
        this.$vux.toast.text(data);
      } catch (error) {}
    },
    async init(position) {
      this.getLocationInfo(position)
      var center = new qq.maps.LatLng(position.latitude, position.longitude);
      this.map = new qq.maps.Map(document.getElementById("container"), {
        center: center,
        zoom: 13
      });
      var marker = new qq.maps.Marker({
        position: center,
        map: this.map
      });
      var anchor = new qq.maps.Point(0, 39),
        size = new qq.maps.Size(42, 68),
        origin = new qq.maps.Point(0, 0),
        markerIcon = new qq.maps.MarkerImage(
          "https://3gimg.qq.com/lightmap/api_v2/2/4/99/theme/default/imgs/marker.png",
          size,
          origin,
          anchor
        );
      marker.setIcon(markerIcon);
      var info = new qq.maps.InfoWindow({ map: this.map });
      let that = this;
      this.geocoder = new qq.maps.Geocoder({
        complete: function(result) {
          console.log("result", result);
          that.map.setCenter(result.detail.location);
          var marker = new qq.maps.Marker({
            map: that.map,
            position: result.detail.location
          });
        }
      });
    },
    showErr() {
      this.$store.commit('updateLoadingStatus', {isLoading: false})
    },
    async getList(FType) {
      try {
        this.recodeList = [];
        this.$store.commit("updateLoadingStatus", { isLoading: true });
        let data = await JDGetAttendanceCard({
          FWeixinOpenID: this.wxOpenId,
          FType: FType
        });
        this.recodeList = eval(data);
        this.$store.commit("updateLoadingStatus", { isLoading: false });
        console.log(data);
      } catch (error) {
        this.$store.commit("updateLoadingStatus", { isLoading: false });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/main.less";
.funList {
  background: white;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: @rem*124;
    li {
      width: 30%;
      height: @rem*68;
      text-align: center;
      line-height: @rem*68;
      color: white;
      border-radius: 5px;
      .bisColor(#d93309, #aa0000);
      margin-right: @rem*20;
    }
    li:nth-child(3) {
      margin-right: 0;
    }
  }
}
.punchList {
  ul {
    padding: @rem*20;
    li {
      background: white;
      padding: @rem*20;
      border-radius: 5px;
      .time {
        font-size: @rem*28;
        color: #666;
      }
      .place {
        .mt10;
        font-size: @rem*24;
        color: #666;
      }
    }
  }
}
.punchContent {
  .address {
    display: flex;
    justify-content: space-between;
    padding: @rem*20;
    background: white;
    .name {
      font-size: @rem*32;
      color: #666;
    }
    .addContent {
      font-size: @rem*32;
      color: #333;
    }
    input {
      border: none;
      text-align: right;
      font-size: @rem*32;
    }
  }
}
.button {
  padding: @rem*30;
}
.map {
  padding: @rem*20;
  background: white;
  .title {
    height: @rem*88;
    line-height: @rem*88;
    padding-left: @rem*20;
    font-size: @rem*32;
    color: #666;
  }
  .content {
    width: @rem*690;
    height: @rem*896;
    background: red;
    margin: 0 auto;
  }
}
#container {
  // height: @rem*800;
}
</style>
