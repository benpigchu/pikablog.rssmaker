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
console.log(util.inspect(pageOneData))
console.log(util.inspect(config))

let feed=new Rss({title:config.title,
	description:config.description,
	feed_url:config.feedUrl,
	site_url:config.siteUrl})

for(let article of pageOneData){
	feed.item({title:article.title,
		description:article.preview,
		url:config.articleUrl(article),
		categories:article.tag,
		date:article.time})
}

fs.appendFileSync(path.normalize(dataFolder+path.sep+"feed.rss"),feed.xml({indent:"\t"}),{encoding:"utf-8"})