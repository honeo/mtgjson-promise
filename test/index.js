
// Mod
const mtgjsonP = require('../');

// やっつけ
mtgjsonP.AllPrintings().then( ({data, etag})=>{
	if( data.ELD.cards[269].name==="Oko, Thief of Crowns" ){
		console.log('done');
	}else{
		throw new Error('test failed');
	}
});
