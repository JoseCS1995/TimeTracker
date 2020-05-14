
const fs = require('fs');


const sysTime = new Date();
console.log(sysTime);

const UsersObj = {};

const User = (id,name) => {
	Object.assign(UsersObj,{[id]:{userName:name,punchStatus:false}});
	console.log(`New User Creation Successful!\n${name} added with ID# ${id}\nRun commitUsers() to add this user to the file .users`);;
};

User(2112,'Annalise Velasquez');

const userAuth = (id) => {
	const userId = Number(id);
	let auth = false;
	if (UsersObj[userId]) 
		{auth = true; 
		console.log(`User ID# ${userId} found with name ${UsersObj[userId].userName}`); return auth; }
	else if (!UsersObj[id]) 
		{ console.log(`No user found with number ${userId}!`); return auth }
	else { console.log('auth error') };
};

const togglePunch = (id) => {
	const userId = Number(id);
	UsersObj[userId].punchStatus = !UsersObj[userId].punchStatus;
	console.log(`User ${userId} Punched In: ${UsersObj[userId].punchStatus}`);
};

const PunchHistory = {};

const newPunch = (id) => {
	const userId = Number(id);
	togglePunch(userId);
	if (UsersObj[userId].punchStatus)
		{ Object.assign(PunchHistory, {[userId]: ['IN', sysTime]});
	        fs.appendFile('.punchLog', JSON.stringify({[userId]: ['IN', sysTime]}), function(err){ if(err){console.log(err)} console.log('success')})}

	else { Object.assign(PunchHistory, {[userId]: ['OUT', sysTime]}) ;
              fs.appendFile('.punchLog', JSON.stringify({[userId]: ['OUT', sysTime]}), function(err){ if(err){console.log(err)} console.log('success')})}
};

const commitUsers = () => {
	fs.writeFile('.users', JSON.stringify(UsersObj), function(err){ if(err){console.log(err)} console.log('success')} ); 
};




console.log(`This is the backbone for a time clock system.\n
Users can be added to the UsersObj object with User().\n
userAuth() returns a boolean as to whether the user number exists.\n
newPunch() assigns an object for each punch to the PunchHistory object.\n\n`);

/*
 
//Syntax for adding new users as follows (punchStatus defaults to false)
User(2112,'Annalise Velasquez');

//Returns full user info object by number
console.log(UsersObj[2112]);

//Returns user name as string
console.log(UsersObj[2112].userName);

//Returns punch Status as boolean
console.log(UsersObj[2112].punchStatus);

*/

