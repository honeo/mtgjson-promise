/*
	☆(ゝω･)v
*/

// Mod
const mtgjsonP = require('./');

mtgjsonP({extra:true}).then( (json)=>{
	console.log(Object.keys(json), 'done');
}).catch(console.error);
