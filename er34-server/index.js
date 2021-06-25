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
    fetch(`${BOORU}/index.php?page=post&s=list&tags=${req.query.tag}`).then(res => res.text()).then(async html => {
        const $ = cheerio.load(html);
        let response = [];
        /*await Promise.all($("img.preview").filter((_, node) => node.name == 'img').map(async (_, img) => {
            //console.log(img)
            let req = await fetch(`${BOORU}/${img.parent.attribs.href}`);
            let hqImg = await req.text();
            let $img = cheerio.load(hqImg)
            let image = $img("#image")[0]
            response.push({style: img.attribs.style || "", thumbnail: img.attribs.src, tags: img.attribs.alt, link: img.parent.attribs.href, full: image ? image.attribs.src : null});
            
            
        }))*/
        for await(img of $("img.preview").filter((_, node) => node.name == 'img')) {
            
            img.attribs.src = img.attribs.src.split("?")[0]
            logger.debug(img.attribs.src);
            let req = await fetch(`${BOORU}/${img.parent.attribs.href}`/*, {headers: {cookie: 'resize-original=1;'}}*/);
            let hqImg = await req.text();
            let $img = cheerio.load(hqImg)
            let image = $img("#image")[0]
            if(image) image.attribs.src = image.attribs.src/*.split('/').join('/').split("?")[0]*/
            /*console.log(image.attribs.src.split('//'))
            console.log(image.attribs.src.split('//').join('/')[0].split("?"))
            console.log(image.attribs.src.split('//').join('/'))*/

            response.push({style: img.attribs.style || "", thumbnail: img.attribs.src, tags: img.attribs.alt, link: img.parent.attribs.href, full: image ? image.attribs : {width: null, height: null}});
            
        }
        res.send(response);
        
    })
    
})

app.listen(1334, () => {
    logger.info("Listening in port 1334");
});