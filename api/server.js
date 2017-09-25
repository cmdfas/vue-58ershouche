const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')

const app = express()

app.get('/pn:id',(req,res,next)=>{

	var pn = parseInt(req.params.id)

	var url = 'http://sy.58.com/ershouche/pn' + pn

	//用superagent去抓取内容
	superagent.get(url).end((err,sres)=>{
		//常规错误处理
		if(err){
			return next(err)
		}

		//sres.text 里存储着网页html的内容，把它交给cheerio.load之后
		//就可以得到jquery的接口变量 我们习惯地将它命名为 $
		let $ = cheerio.load(sres.text);
		let items = []
		$('.car_list .car_list_less').each(function(idx,element){
			var $el = $(element)
			var $els = $el.children()
			//id
			var $tid = $el.attr('data-entid')
			//href
			var $href = $els.eq(0).find('a').attr('href')
			//imgurl
			var $imgurl = $els.eq(0).find('img').attr('src')
			//title
			var $temp = $els.eq(1).find('.tit_icon')
			if($temp){
				$temp.remove()
			}
			var $title = $els.eq(1).find('.info_tit').text().trim()
			//info
			var $param1 = $els.eq(1).find('.info_param').children().eq(0).text()
			var $param2 = $els.eq(1).find('.info_param').children().eq(1).text()
			var $param3 = $els.eq(1).find('.info_param').children().eq(2).text()
			var $param4 = $els.eq(1).find('.info_param').children().eq(3).text()
			//price
			var $temp1 = $els.eq(2).find('span')
			if($temp1){
				$temp1.remove()
			}
			var $price = $els.eq(2).find('h3').text()

			var obj = {
				tid:$tid,
				href:$href,
				imgurl:$imgurl,
				title:$title,
				info:[
					{
						year:$param1,
						mileage:$param2,
						displacement:$param3,
						mode:$param4
					}
				],
				price:$price
			}

			// console.log($(this))
			items.push(obj)
		})



		console.log(items)
		res.header("Access-Control-Allow-Origin", "*")
		res.json(items)

	})

})

app.get('/d/pr-:start-:end/pg-:page',function(req,res,next){
	console.log(req.params)

	var prStart = parseInt(req.params.start)
	var prEnd = parseInt(req.params.end)
	var page = parseInt(req.params.page)
	
	var url = 'http://sy.58.com/ershouche/pn'+ page +'/pve_5864_'+ prStart +'_'+ prEnd +'/'
	
	//用superagent去抓取内容
	superagent.get(url).end((err,sres)=>{
		//常规错误处理
		if(err){
			return next(err)
		}

		//sres.text 里存储着网页html的内容，把它交给cheerio.load之后
		//就可以得到jquery的接口变量 我们习惯地将它命名为 $
		let $ = cheerio.load(sres.text);
		let items = []
		$('.car_list .car_list_less').each(function(idx,element){
			var $el = $(element)
			var $els = $el.children()
			//id
			var $tid = $el.attr('data-entid')
			//href
			var $href = $els.eq(0).find('a').attr('href')
			//imgurl
			var $imgurl = $els.eq(0).find('img').attr('src')
			//title
			var $temp = $els.eq(1).find('.tit_icon')
			if($temp){
				$temp.remove()
			}
			var $title = $els.eq(1).find('.info_tit').text().trim()
			//info
			var $param1 = $els.eq(1).find('.info_param').children().eq(0).text()
			var $param2 = $els.eq(1).find('.info_param').children().eq(1).text()
			var $param3 = $els.eq(1).find('.info_param').children().eq(2).text()
			var $param4 = $els.eq(1).find('.info_param').children().eq(3).text()
			//price
			var $temp1 = $els.eq(2).find('span')
			if($temp1){
				$temp1.remove()
			}
			var $price = $els.eq(2).find('h3').text()

			var obj = {
				tid:$tid,
				href:$href,
				imgurl:$imgurl,
				title:$title,
				info:[
					{
						year:$param1,
						mileage:$param2,
						displacement:$param3,
						mode:$param4
					}
				],
				price:$price
			}

			// console.log($(this))
			items.push(obj)
		})



		console.log(items)
		res.header("Access-Control-Allow-Origin", "*")
		res.json(items)

	})

	
})


app.get('/d/pid-:id',function(req,res,next){
	console.log(req.params)

	var pid = parseInt(req.params.id)

	var url = 'http://sy.58.com/ershouche/'+ pid +'x.shtml'
	
	//用superagent去抓取内容
	superagent.get(url).end((err,sres)=>{
		//常规错误处理
		if(err){
			return next(err)
		}

		//sres.text 里存储着网页html的内容，把它交给cheerio.load之后
		//就可以得到jquery的接口变量 我们习惯地将它命名为 $
		let $ = cheerio.load(sres.text);
		let items = []

		var $title = $('.title_p').text()
		var $price = $('.jiage').eq(0).text()
		var $p1 = $('.lcsp_info').find('li').eq(0).find('span').eq(0).text()
		var $p2 = $('.lcsp_info').find('li').eq(1).find('span').eq(0).text()
		var $p3 = $('.lcsp_info').find('li').eq(2).find('span').eq(0).text()
		var $p4 = $('.lcsp_info').find('li').eq(3).find('span').eq(0).text()
		// console.log($title,$price,$p1,$p2,$p3,$p4)
		var $imgList =[]
		$('#img1div').find('img.bigimg').each(function(idx,element){
			$el = $(element)
			// console.log(idx)
			if(idx === 0){
				// console.log($el.attr('src'))
				$imgList.push($el.attr('src'))
			}else{
				// console.log($el.attr('data-original'))
				$imgList.push($el.attr('data-original'))
			}
			
		})
		
		var obj = {
			pid: pid,
			title: $title,
			price: $price,
			year:$p2,
			mileage:$p1,
			displacement:$p3.split('/')[0],
			mode:$p3.split('/')[1],
			standard:$p4,
			imgList:$imgList
		}

		

		console.log(obj)
		res.header("Access-Control-Allow-Origin", "*")
		res.json(obj)

	})

	
})


app.listen(3001,()=>{
	console.log('d...')
})