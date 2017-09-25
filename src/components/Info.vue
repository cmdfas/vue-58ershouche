<template>
  <div class="info">
    <!-- {{ n }}  -->
     <swipe swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
      <div v-for="(isrc,index) in data.imgList" class="swiper-slide" slot="swiper-con">
        <img :src="isrc">
        <div></div>
        <h3>{{ index+1 }}</h3>
      </div>
    </swipe> 
     <ul>
      <li>{{ data.title }}</li>
      <li>价格：{{ data.price }}万元</li>
    </ul> 
    <button v-on:click="go()">返回</button>
  </div>
</template>

<script>
import swipe from './swipe/swipe.vue'

export default {
  name: 'info',
  data () {
    return {
      data: {}
    }
  },
  computed: {
    n () {
      console.log(this.$route.params)
      return this.$route.params.id
    }
  },
  created: function () {
    console.log('aj')
    var me = this
    this.$ajax.get('http://localhost:3001/d/pid-' + this.$route.params.id)
      .then(function (response) {
        console.log(response)
        me.data = response.data
        // console.log(me.data.title)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    go () {
      // this.$router.go(-1)
      window.history.back()
    }
  },
  components: {
    swipe
  }

}
</script>

<style scoped>
.info {
  width: 320px;
}
.info .swiper-container {
  width: 100%;
}
.info .swiper-slide {
  overflow: hidden;
}
.info .swiper-slide img{
  width: 320px;
}
</style>
