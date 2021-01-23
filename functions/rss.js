let Parser = require('rss-parser');
let parser = new Parser();

function getActivity(rssFeedObject, days ){
    console.log("getActivity")
    keys = Object.keys(rssFeedObject)
    console.log(keys)
    let date_ob = new Date();
    keys.forEach( function (key){
        console.log(key)
        console.log(rssFeedObject[key])
    //     (async () => {

    // //         let feed = await parser.parseURL(rssFeedObject[key]);
    // //         console.log(feed.title);
          
    // //         feed.items.forEach(item => {
    // //         //   console.log(item.title + ':' + item.link)
    // //         });
          
    //       })();
    // let parser = new RSSParser();
        parser.parseURL(rssFeedObject[key], function(err, feed) {
        if (err) throw err;
        console.log(feed.title);
        feed.items.forEach(function(entry) {
            console.log(entry.title + ':' + entry.link);
            console.log(entry.pubDate)
            console.log(entry.isoDate)
            console.log(date_ob.toISOString())
        })
        })
    })
}

module.exports = { getActivity };