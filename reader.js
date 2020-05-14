const csv = require('csv-parser');
const fs = require('fs');


const read = (file,key) => {
	let results;
	const inStream = new Promise((res,rej) => {
		if(key) {
		results = {};
		fs.createReadStream(file)
			.pipe(csv())
			.on('data', (row) => { results[row[key]] = row })
			.on('end', () => { res(results) });
		} else {
		results = [];
		fs.createReadStream(file)
			.pipe(csv())
			.on('data', (row) => { results.push(row) })
			.on('end', () => { res(results) })
		}
	})
	.then(() => { console.log(results) });
}