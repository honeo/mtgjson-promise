# mtgjson-promise
* [honeo/mtgjson-promise](https://github.com/honeo/mtgjson-promise)  
* [mtgjson-promise](https://www.npmjs.com/package/mtgjson-promise)


## なにこれ
[MTG JSON](http://mtgjson.com/)で配布されている最新の.jsonファイルを取得・パースしてObjectで返す。  
ｖ4.6.0で動作確認。


## 使い方
```bash
$ npm i mtgjson-promise
```
```js
const mtgjsonP = require('mtgjson-promise');


// get: AllPrintings.json
const {data, etag} = await mtgjsonP.AllPrintings();

data.ELD.cards[269].name; // "Oko, Thief of Crowns"
```


## API
取得対象のファイルはconfig.jsonを参照。  
書庫ファイルには未対応。


## ChangeLog

### v2 => v3
MTGJSONの仕様変更に対応。  
APIを取得ファイルごとのメソッドに変更。


## Respect
* [mtgjson/mtgjson: MTGJSON repository for Magic Cards](https://github.com/mtgjson/mtgjson)
* [mtgjson - npm](https://www.npmjs.com/package/mtgjson)
