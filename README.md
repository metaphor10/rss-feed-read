# rss-feed-read
you need to run the code:

npm install 

node bin/www


and then you can run a curl like so

curl --location --request POST 'http://localhost:3000/api/v1/companies' \
--header 'Content-Type: application/json' \
--data-raw '{
    "rss": {
        "joerogan": "http://joeroganexp.joerogan.libsynpro.com/rss",
        "1619": "https://rss.art19.com/1619"
    },
    "days": 1
}'

rss - is for the object with the name as field and url as value

and days is for number of days back that had updates to rss field

