# pikablog.rssmaker
Generate rss file for pikablog.

## Usage

Generate data folder from the pikablog source, and then:
```
node main.js [data folder]
```
only articles in the first page will be put into the feed file

## Config.js

```js
module.exports={
	title,//title of your site
	description,//site description
	feedUrl,//feed url
	siteUrl,//site url
	articleUrl,//function to generate article url
	fullText,//whether feed include fulltext
	srcUrl,//function to generate url for img
}
```