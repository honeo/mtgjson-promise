# mtgjson-promise
* [honeo/mtgjson-promise](https://github.com/honeo/mtgjson-promise)  
* [mtgjson-promise](https://www.npmjs.com/package/mtgjson-promise)


## なにこれ
[MTG JSON](http://mtgjson.com/)で配布されている最新の.jsonファイルを取得・パースしてObjectで返す。  


## 使い方
```bash
$ npm i mtgjson-promise
```
```js
const mtgjsonP = require('mtgjson-promise');


// AllSets.json
const {data, etag} = await mtgjsonP();

// or AllSets-x.json
const {data, etag} = await mtgjsonP({
	extra: true
});


data.AKH.cards[0].name; // "Angel of Sanctions"
```


## Respect
* [mtgjson/mtgjson: MTGJSON repository for Magic Cards](https://github.com/mtgjson/mtgjson)
* [mtgjson - npm](https://www.npmjs.com/package/mtgjson)
