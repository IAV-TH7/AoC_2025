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

function worker(bfrag, remaining, result=0){
	let pos = -1;
	for(let j = 9; j >= 1; j--){
		pos = bfrag.indexOf(j);
		if(pos < 0 || pos + (remaining-1) >= bfrag.length) continue;
		result = (10*result)+j;
		break;
	}
	return (remaining > 1 ? worker(bfrag.slice(pos+1), remaining-1, result) : result);
}

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let lines = file.split('\n')

	let banks=[];
	for(let i = 0; i < lines.length; i++){
		if(lines[i].length<3) continue; // ignore (near-)empty lines etc.
		let b = lines[i].trim().split('');
		banks.push(b.map(Number));
	}
	
	let res_a = 0;
	let res_b = 0;
	for(let i = 0; i < banks.length; i++){
		res_a += worker(banks[i], 2);
		res_b += worker(banks[i], 12);
	}
	console.log("A) Sum of max voltages is: "+res_a);
	console.log("B) Sum of max voltages is: "+res_b);
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
