
const fs = require('fs');

const allUsers = {
	2112: {
		name: 'Mishy Jari',
		punch: false,
		openPunch: {},
	}
};
const readPunchFile = () => {
	return fs.readFileSync('./punches.md', 'utf8')
}
const punchLog = {
	newPunchKey: function() {
		let i = 0;
		while (this[i]) {i++}
		return i;
	},
	readPunchFile: fs.readFileSync('./punches.md', 'utf8')
}

const timeAsNum = () => {
	const hours = new Date().getHours();
	const minutes = Math.round(new Date().getMinutes()/60*100);
	return hours + minutes/100;
}

const openShift = (id) => {
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();
	if (allUsers[id].punch) {
		return 'Shift already opened for user ' + id;
	} else {
		allUsers[id].punch = timeAsNum();
		allUsers[id].openPunch = {
			id: id,
			name: allUsers[id].name,
			date: date,
			timeIn: time
		}
	}
}

const closeShift = (id) => {
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();
	if (!allUsers[id].punch) {
		return 'No shift open for user ' + id;
	} else {
		const netHours = Math.round((timeAsNum() - allUsers[id].punch)*10)/10;
		const inStr = allUsers[id].openPunch.timeIn;
		allUsers[id].punch = false;
		const punchId = punchLog.newPunchKey();
		punchLog[punchId] = {
			id: id,
			name: allUsers[id].name,
			date: date,
			timeIn: inStr,
			timeOut: time,
			shiftHours: netHours,
		}
		fs.appendFile('./punches.md', 
			punchId + ' = ' + util.inspect(punchLog[punchId]) + ', ', 
			err => { if (err) { throw err }})
	}
	allUsers[id].openPunch = {}
}

console.log(punchLog)
