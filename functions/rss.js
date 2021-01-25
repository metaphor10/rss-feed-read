const Parser = require('rss-parser');

const parser = new Parser();
const fetch = require('node-fetch');

function getActivity(rssFeedObject, days) {
  const p3 = new Promise((resolve, reject) => {
    console.log('getActivity');
    const keys = Object.keys(rssFeedObject);
    let results = [];
    const dataOb = new Date();
    dataOb.setDate(dataOb.getDate() - days);
    const promises = [];
    keys.forEach((key) => {
      if (rssFeedObject[key] !== '') {
        const p1 = new Promise((resolve1, reject1) => {
          fetch(rssFeedObject[key])
            .then((response) => response.text())
            .then((str) => parser.parseString(str))
            .then((feed) => {
              feed.items.forEach((entry) => {
                const feedTimeISO = new Date(entry.isoDate);
                const diff = feedTimeISO.getTime() - dataOb.getTime();
                if (diff > 0) {
                  console.log(`changed sooner then ${days} ago`);
                } else {
                  console.log(`has not changed in the last ${days}`);
                  resolve1(key);
                }
              });
            })
            .catch((error) => {
              reject1(error);
            });
        });
        promises.push(p1);
      } else {
        reject();
      }
    });

    Promise.all(promises).then((values) => {
      results = values;
      resolve(results);
    }).catch((error) => {
      console.log(error);
    });
  });
  return p3;
}

module.exports = { getActivity };
