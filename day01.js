const fs = require('fs');

function ReadFile(path, cod, print_err=true){
	let result = null;
	try{
		result = fs.readFileSync(path, cod);
	}
	catch(err) {
		if(print_err) console.error(err);
	}
	return result;
}

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let lines = file.split('\n')

	let cmds=[];
	for(let i = 0; i < lines.length; i++){
		if(lines[i].length<2) continue; // ignore (near-)empty lines etc.
		let str = lines[i].trim();
		cmds.push({dir:str.charAt(0), amt:Number(str.substr(1))});
	}

	let res_a = 0;
	let res_b = 0;
	let pos = 50;
	for(let i = 0; i < cmds.length; i++){
		for(let j = 0; j < cmds[i].amt; j++){
			pos += ((cmds[i].dir=='R') ? 1 : -1);
			if(pos == -1) pos = 99;
			if(pos == 100) pos = 0;
			if(pos==0) res_b++;
		}
		if(pos == 0) res_a++;
	}
	
	console.log("A) Amount of 0 positions reached: "+res_a);
	console.log("B) Amount of 0 positions reached and passed: "+res_b);
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
