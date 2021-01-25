let Parser = require('rss-parser');
let parser = new Parser();
const fetch = require('node-fetch');

function getActivity(rssFeedObject, days ){
    const p3 = new Promise((resolve, reject) => {
    console.log("getActivity")
    keys = Object.keys(rssFeedObject)
    results = []
    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() - days);
    promises = []
    keys.forEach(function (key){
        if (rssFeedObject[key] !== ''){
            p1 = new Promise ((resolve, reject) => {
                    fetch(rssFeedObject[key])
                    .then(response => response.text())
                    .then(str => parser.parseString(str))
                    .then(feed => {
                        feed.items.forEach(function(entry) {
                            feedTimeISO = new Date(entry.isoDate)
                            diff = feedTimeISO.getTime() - date_ob.getTime()
                            if (diff > 0){
                                console.log("changed sooner then " + days + " ago")
                            }else {
                                console.log("has not changed in the last "+ days)
                                resolve(key)
                            }
                        })
            
                    }).catch ((error) => {
                        reject(error)
                    })
            })
            promises.push(p1)
        }else {
            reject()
        }
    })

    Promise.all(promises).then((values)=> {
        results = values
        resolve(values)
    }).catch(error => {
        console.log(error)
    })
})
return p3

}

module.exports = { getActivity };