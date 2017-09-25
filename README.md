# 一个vue2.x的练习项目

> 主要做了两个页面，List列表页，Info详情页。数据采用动态抓取58同城二手车的列表和详情页信息。UI有点简陋，以后慢慢做完善。

## 用到哪些技术和库

**前端**  
vue + vue-router + axios + vue-infinite-loading(无限下拉滚动组件) + swiper(轮播图组件)
**后端**
express + cheerio + superagent

## 安装运行

``` bash
git clone https://github.com/cmdfas/vue-58ershouche.git
cd vue-58ershouche
npm install || yarn install

cd api
node server.js 把后端抓取的服务跑起来

cd..  返回
npm run dev

```
## 总结

1.后端做了三个接口 

    - /pn:id  返回某页的数据
    - /d/pr-:start-:end/pg-:page 返回从:start(number)到:end(number)价格区间的二手车，:page为页数
    - /d/pid-:id 返回某个id的二手车详细数据

2.List组件通过axios发送ajax请求获取数据，拿到数据后更新在页面中。List组件通过<keep-alive>缓存数据并记录下用户的滚动位置，当用户从Info组件返回的时候，不会重新请求数据，同时滚动位置也不会发生变化。

3.Info组件简单的引用了一个swiper的轮播组件，通过ajax获取数据后，更新视图。