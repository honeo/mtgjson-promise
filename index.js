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
const config = require('./config.json');

// Result
const mtgjsonP = Object.create(null);

for(let [key, value] of Object.entries(config.files) ){
	mtgjsonP[key] = function(){
		return downloader(value);
	}
}


/*
	DL
*/
async function downloader({name, isArchive}){

	await fse.ensureDir(
		path.join(__dirname, 'cache')
	);

	if( isArchive ){
		throw new Error('Unimplemented: Directory Files');
	}

	const hasCacheFile = Promise.all([
		fse.exists(
			path.join(__dirname, `cache/${name}.etag`)
		),
		fse.exists(
			path.join(__dirname, `cache/${name}`)
		)
	]).then( (bool1, bool2)=>{
		return bool1 && bool2
	});

	const etag_cache = await fse.readFile(
		path.join(__dirname, `cache/${name}.etag`),
		'utf8'
	).catch( (error)=>{
		return "null";
	});

	const response = await fetch(`${config.base}${name}`, {
		headers: {
			'if-none-match': etag_cache
		}
	});

	const etag_server = response.headers.get('etag');

	// キャッシュがあり、変更がなければそれを使う
	if( hasCacheFile && etag_server===etag_cache ){
		const json = await fse.readJson(
			path.join(__dirname, `cache/${name}`)
		);
		return {
			data: json,
			etag: etag_server
		}
	}else{
	// それ以外ならDL
		await fse.writeFile(
			path.join(__dirname, `cache/${name}.etag`),
			etag_server, {
				encoding: 'utf8',
				flag: 'w'
		});
		const json = await response.json(); // 超重い
		await fse.writeJson(
			path.join(__dirname, `cache/${name}`),
			json, {
				encoding: 'utf8',
				flag: 'w'
		});
		return {
			data: json,
			etag: etag_server
		}
	}
}



module.exports = mtgjsonP;
