<template>
  <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>二手车 WEB APP</h2>
      <div class="app-view">
        <ul>
          <li v-for="i in data">
            <router-link :class="list-image-box" :to="{ name: 'info', params: { id: i.tid }}">
              <div class="image">
                <img v-bind:src="i.imgurl" alt="">
              </div>
              <div class="list-detail-box">
                <p class="title">{{ i.title }}</p>
                <p class="basic">{{ i.info[0].year }}<span>|</span>{{ i.info[0].mileage }}
                </p>
                <div class="price-box">
                  <span class="price">{{ i.price }} <span>万</span></span>
                  <div class="tags-box">
                    <!-- <div class="tags"></div> -->
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <infinite-loading @infinite="fetchData" :distance="distance"></infinite-loading>
      </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'list',
  data () {
    return {
      msg: 'Author: 孙帅',
      data: [],
      distance: 1500,
      page: 1
    }
  },
  methods: {
    fetchData ($state) {
      // console.log(this.$route.params)
      var prStart = parseInt(this.$route.params.start)
      var prEnd = parseInt(this.$route.params.end)
      var me = this
      var url = ''
      if (!prStart && !prEnd) {
        url = 'http://localhost:3001/pn' + this.page
      } else {
        url = 'http://localhost/d/pr-' + prStart + '-' + prEnd + '/pg-' + this.page
      }
      console.log(url)
      this.$ajax.get(url)
        .then(function (response) {
          // console.log(response)
          if (response.status === 200) {
            response.data.forEach(function (element) {
              me.data.push(element)
            })
            $state.loaded()
            me.page++
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  min-width: 320px;
  margin: 0 auto;
}
.app-view {
  
}
h1, h2 {
  font-weight: normal;
}
p {
  margin: 0;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  height: 104px;
  padding: 10px 10px 0 0;
  background: #FFF;
  position: relative;
}
li .list-image-box {
  text-decoration: none;
  display: block;
  height: 94px;
  border-bottom: 1px solid #f5f5f5;
}
li .image {
  position: relative;
  float: left;
  width: 135px;
  height: 94px;
  background: #FFF;
}
li .image img {
  display: block;
  height: 83px;
  width: 125px;
}
li .list-detail-box {
  height: 93px;
  position: relative;
  margin-left: 135px;
}
li .title {
  font-size: 14px;
  line-height: 21px;
  color: #222;
  max-height: 42px;
  overflow: hidden;
}
li .basic {
  font-size: 12px;
  line-height: 18px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
li .basic span {
  font-size: 8px;
  padding: 0 5px;
  position: relative;
  top:-2px;
  color: #e1e1e1;
}
li .price-box {
  position: absolute;
  left: 0;
  bottom: 10px;
}
li .price-box .price {
  font-size: 18px;
  font-weight: 700;
  color: #fd521d;
  line-height: 24px;
  float: left;
  display: block;
  height: 20px;
}
li .price-box .price span {
  font-size: 12px;
  font-weight: 700;
  margin: 0 2px 0 4px;
}
li .price-box .tags-box {
  float: left;
  position: relative;
  top: 5px;
  margin-left: 5px;
}
li .price-box .tags-box .tags {
  font-size: 10px;
  text-align: center;
  padding: 0 2px;
  margin: 0 4px 0 0;
  float: left;
  border: 1px solid;
  height: 17px;
  line-height: 16px;
}
a {
  color: #42b983;
  text-decoration: none;
}
</style>
