const axios = require('axios')
const cheerio = require('cheerio')

const contentArray1 = []
exports.sciencenews = (req, res) => {
    for (var i = 1; i < 21; i++) {
        axios.get('https://www.sciencenews.org/topic/astronomy/page/' + i.toString())
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)

                //Webscrape
                $('.post-item-river__wrapper___2c_E-.with-image').each(function () {
                    const title = $(this).find('div > h3 > a').text().replace(/\s\s+/g, '');
                    const text = $(this).find('div > p').text().replace(/\s\s+/g, '');
                    const author = $(this).find('div > div > span > a').text();
                    const date = $(this).find('div > div > time').text();
                    const url = $(this).find('figure > a').attr('href');

                    //Populate the according array
                    contentArray1.push({
                        //siteInformation: Object.values(newspapersArray)[0],
                        title,
                        text,
                        author,
                        date,
                        url
                    })
                });
                res.json(contentArray1)
            }).catch((error) => console.log(error));
    }
}

const contentArray2 = []
exports.astronomy_com = (req, res) => {
    axios.get('https://www.astronomy.com/news')
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            //Webscrape
            $('.dataSection').each(function () {
                const title = $(this).find('div > div >div > h2 > a').text()
                const data = $(this).find('div:first').text()
                const text = $(this).find('div > div > div > div').text().replace(/\s\s+/g, '')
                const url = $(this).find('div > div > div > h2 > a').attr('href')

                //Populate the according array
                if (title !== '') {
                    contentArray2.push({
                        title,
                        data,
                        text,
                        url: 'https://www.astronomy.com' + url
                    })
                }
            })
        }).catch(error => console.log(error))
}