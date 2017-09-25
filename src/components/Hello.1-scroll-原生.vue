<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
      <ul>
        <li v-for="i in data">
          
          <a href="#" class="list-image-box">
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
          </a>
        </li>
      </ul>


    </div>
    
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: null
    }
  },
  // methods : {
  //   fetchDate () {
  //   var me = this
  //   console.log('is Created')
  //   this.$ajax.get('http://localhost:3001/')
  //     .then(function (response) {
  //       console.log(response)
  //       if (response.status === 200) {
  //         me.data = response.data
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  //   }
  // }
  created: function () {
    var me = this
    console.log('is Created')
    this.$ajax.get('http://localhost:3001/')
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          me.data = response.data
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    // 设置一个开关来避免重负请求数据
    let sw = true
    // 注册scroll事件并监听
    window.addEventListener('scroll', function () {
      // 判断是否滚动到底部
      console.log('document.body.scrollTop::', document.body.scrollTop)
      console.log('window.innerHeight::', window.innerHeight)
      console.log('document.body.offsetHeight', document.body.offsetHeight)
      if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        // 如果开关打开则加载数据
        if (sw === true) {
          // 将开关关闭
          sw = false
          me.$ajax.get('http://localhost:3001/')
            .then(function (response) {
              // 将新获取的数据push到vue中的data，就会反应到视图中
              response.data.forEach(function (val, index) {
                me.data.push(val)
              })
              // 数据更新完毕，将开关打开
              sw = true
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  max-width: 320px;
  margin: 0 auto;
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
}
</style>
