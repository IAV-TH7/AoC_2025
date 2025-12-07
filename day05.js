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

function ranges_getSize(ranges){
	let res = 0;
	for(let i=0; i < ranges.length; i++){
		res += (ranges[i].end-ranges[i].start)+1;
	}
	return res;
}

function ranges_clean(ranges){
	let cleaned = [];
	for(let i=0; i < ranges.length; i++){ // iterate each current item
		let r = ranges[i];
		let skip = false;
		let newrgs = [];
		for(let j = 0; !skip && newrgs.length == 0 && j < cleaned.length; j++){ // compare with item clean so far
			let c = cleaned[j];

			if(r.end < c.start || r.start > c.end) continue; // r ends before c or starts after c
			
			else if(r.start >= c.start && r.end <= c.end) skip=true; // r is part of c --> discard r
			
			else if(r.start < c.start && r.end > c.end){ // r exceeds c at both ends --> split r
				newrgs.push({start: r.start, end:c.start-1});
				newrgs.push({start: c.end+1, end:r.end});
			}
			
			else if(r.start < c.start && (r.end >= c.start && r.end <= c.end)) newrgs.push({start: r.start, end:c.start-1}); // r exceeds c at front end --> keep start of r
			
			else if((r.start >= c.start && r.start <= c.end) && r.end > c.end) newrgs.push({start: c.end+1, end:r.end}); // r exceeds c at back end --> keep end of r
		}
		
		if(newrgs.length > 0){
			for(let j = 0; j < newrgs.length; j++) {
				cleaned.push(newrgs[j]);
			}
		}
		else if(!skip) cleaned.push(r);
	}

	return cleaned;
}

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let lines = file.split('\n')

	// parse ranges of fresh ingredients
	let i = 0;
	let fresh=[];
	for(; i < lines.length; i++){
		if(!lines[i].trim()) break;
		let b = lines[i].split('-');
		if(b.length == 2) fresh.push({start:Number(b[0].trim()), end:Number(b[1].trim())});
	}
	let c0 = ranges_getSize(fresh, "0");

	// parse available ingredients
	let available=[];
	for(; i < lines.length; i++){
		if(!lines[i].trim()) continue;
		available.push(Number(lines[i].trim()));
	}
	
	// part a: count available ingredients which are fresh
	let res_a=0;
	for(let i = 0; i < available.length; i++){
		for(let j=0;j < fresh.length; j++){
			if(available[i]>=fresh[j].start && available[i]<=fresh[j].end){
				res_a++;
				break;
			}
		}
	}
	console.log("A: "+res_a);
	
	// part b: count total number of fresh ingredients (by reducing redundant ranges)
	let res_b = 0;
	let cleaned = fresh;
	let res_prev = 0;
	do{
		cleaned = ranges_clean(cleaned);
		res_prev = res_b;
		res_b = ranges_getSize(cleaned, "1");
	}
	while(res_b != res_prev);
	
	console.log("B: "+res_b);
	
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
