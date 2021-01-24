let Parser = require('rss-parser');
var axios = require('axios');
let parser = new Parser();
const fetch = require('node-fetch');

function getActivity(rssFeedObject, days ){
    console.log("getActivity")
    keys = Object.keys(rssFeedObject)
    results = []
    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() - days);
    (async function loop() {
        for (key of keys) {
            fetch(rssFeedObject[key])
            .then(response => response.text())
            .then(str => parser.parseString(str))
            .then(feed => {
                console.log(feed.title)
                feed.items.forEach(function(entry) {
                    console.log(entry.title + ':' + entry.link);
                    console.log(entry.pubDate)
                    feedTimeISO = new Date(entry.isoDate)
                    diff = feedTimeISO.getTime() - date_ob.getTime()
                    if (diff > 0){
                        console.log("changed sooner then " + days + " ago")
                    }else {
                        console.log("has not changed in the last "+ days)
                        // console.log("date" + entry.pubDate)
                        console.log(key)
                        results.push(key)
                    }
                })

            })
        // })
            }
    })().then(function (){
        console.log("results1" + results)
        return results;
    });
        // keys.forEach(function (key){
        //     for await (key of keys) {
        //     fetch(rssFeedObject[key])
        //     .then(response => response.text())
        //     .then(str => parser.parseString(str))
        //     .then(feed => {
        //         console.log(feed.title)
        //         feed.items.forEach(function(entry) {
        //             console.log(entry.title + ':' + entry.link);
        //             console.log(entry.pubDate)
        //             feedTimeISO = new Date(entry.isoDate)
        //             diff = feedTimeISO.getTime() - date_ob.getTime()
        //             if (diff > 0){
        //                 console.log("changed sooner then " + days + " ago")
        //             }else {
        //                 console.log("has not changed in the last "+ days)
        //                 // console.log("date" + entry.pubDate)
        //                 console.log(key)
        //                 results.push(key)
        //             }
        //         })

        //     })
        // // })
        //     }
 
    // console.log("results1" + results)
    // return results;
}

module.exports = { getActivity };