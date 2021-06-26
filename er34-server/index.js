const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const BOORU = "https://rule34.xxx";
global.logger = new (require('./logger.js'))

app.use(cors());

app.get('/images', (req, res) => {
    logger.debug(req.query.tag);
    fetch(`${BOORU}/index.php?page=dapi&s=post&q=index&json=1&tags=${req.query.tag}`).then(res => res.json()).then(json => {
        res.send(json);
    })
    
})

app.get('/image', (req, res) => {
    fetch(req.query.url).then(response => {
        if(response.headers.get('content-type').startsWith('text/html')) {
            return response.text()
        } else response.body.pipe(res);
    }).then(text => {
        if(text) {
            let $ = cheerio.load(text);
            
            fetch($("#image")[0].attribs.src).then(imgRes => {
                imgRes.body.pipe(res);
            })
        }
    })
})

app.listen(1334, () => {
    logger.info("Listening in port 1334");
});