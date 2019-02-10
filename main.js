const fs=require("fs")
const path=require("path")
const util=require("util")
const Rss=require("rss")

let dataFolder=process.argv[2]
if(dataFolder===undefined){
	console.log(`please show me the folder!`)
	process.exit(0)
}
let pageOneData=JSON.parse(fs.readFileSync(path.normalize(dataFolder+path.sep+"list"+path.sep+"1.json"),"utf-8"))
let config=require(`./config.js`)

const getContent=(article)=>{
	let content=config.fullText?JSON.parse(fs.readFileSync(path.normalize(dataFolder+path.sep+"article"+path.sep+article.name+".json"),"utf-8")).content:article.preview
	content=content.replace(/src="([^"]*)"/g,(str,src)=>`src="${config.srcUrl(src)}"`)
	return content
}

let feed=new Rss({title:config.title,
	description:config.description,
	feed_url:config.feedUrl,
	site_url:config.siteUrl,
	generator:"pikablog.rssmaker",
	pubDate:new Date()})

for(let article of pageOneData){
	feed.item({title:article.title,
		description:getContent(article),
		url:config.articleUrl(article),
		categories:article.tag,
		date:article.time})
}

fs.appendFileSync(path.normalize(dataFolder+path.sep+"feed.rss"),feed.xml({indent:"\t"}),{encoding:"utf-8"})