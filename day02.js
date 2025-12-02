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

function splitStr(str, size){
	if (str == null || size < 1) return [];
	return str.match(new RegExp('.{1,' + size + '}', 'g'));
}

const elemsEqual = arr => arr.every( e => e === arr[0] );

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let segments = file.split(',')
	
	let ranges = [];
	for(let i = 0; i < segments.length; i++){
		let spl = segments[i].split('-');
		if(spl.length != 2) continue;
		ranges.push({s:Number(spl[0].trim()), e:Number(spl[1].trim())});
	}
	
	let res_a = 0;
	let res_b = 0;
	for(let i = 0; i < ranges.length; i++){
		let r = ranges[i];
		for(let j = r.s; j <= r.e; j++){
			let js = ""+j;
			
			if((js.length % 2 == 0) && js.substr(0,js.length/2) == js.substr(js.length/2)) res_a += j;

			let match = false;
			for(let k = 1; !match && k <= js.length/2; k++){
				if(elemsEqual(splitStr(js, k))) match = true;
			}
			if(match) res_b += j;
		}
	}
	
	console.log("A) Sum of invalid product IDs is: "+res_a);
	console.log("B) Sum of invalid product IDs is: "+res_b);
	
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
