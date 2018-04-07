/*
	mtgjsonもどき
		Promise API
		Extra番に対応
*/

// Mod
const fetch = require('isomorphic-fetch');
const fse = require('fs-extra');
const path = require('path');

// Var
const filename_normal = 'AllSets.json';
const filename_extra = 'AllSets-x.json';
const options_default = {
	extra: false
}

// Result
async function mtgjsonXP(_options={}){

	const options = Object.assign({}, options_default, _options)

	await fse.ensureDir('./cache/');
	const filename = options.extra ?
		filename_extra:
		filename_normal;
	const hasCacheFile = Promise.all([
		fse.exists(`./cache/${filename}.etag`),
		fse.exists(`./cache/${filename}`)
	]).then( (bool1, bool2)=>{
		return bool1 && bool2
	});
	const etag_cache = await fse.readFile(`./cache/${filename}.etag`, 'utf8').catch( (error)=>{
		return "null";
	});

	const response = await fetch(`http://mtgjson.com/json/${filename}`, {
		headers: {
			'if-none-match': etag_cache
		}
	});
	const etag_server = response.headers.get('etag');
	if( hasCacheFile && etag_server===etag_cache ){
		return fse.readJson(`./cache/${filename}`);
	}else{
		await fse.writeFile(`./cache/${filename}.etag`, etag_server, {
			encoding: 'utf8',
			flag: 'w'
		});
		const json = await response.json(); // 超重い
		await fse.writeJson(`./cache/${filename}`, json, {
			encoding: 'utf8',
			flag: 'w'
		});
		return json;
	}
}

module.exports = mtgjsonXP;
