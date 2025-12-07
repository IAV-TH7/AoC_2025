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

function trace(map, coord, spls){
	while(coord.l < map.length && map[coord.l][coord.c]!='^') coord.l++;
	if(coord.l >= map.length) return;
	let lbl = coord.l+"/"+coord.c;
	if(!spls.hasOwnProperty(lbl)){
	 	spls[lbl]="x";
		trace(map, {l:coord.l+1, c:coord.c-1}, spls) + trace(map, {l:coord.l+1, c:coord.c+1}, spls);
	}
}

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let lines = file.split('\n')

	// assemble map
	let map=[];
	for(let i = 0; i < lines.length; i++){
		if(lines[i].length<3) continue; // ignore (near-)empty lines etc.
		map.push(lines[i].trim().split(''));
	}
	
	// search start column
	let startcol = -1;
	for(let j = 0; startcol < 0 && j < map[0].length; j++){
		if(map[0][j]=='S') startcol = j;
	}
	
	// part a)
	let splitters={};
	trace(map, {l:0, c:startcol}, splitters);
	console.log("A) Result is: "+Object.keys(splitters).length);
	
	// part b) 
	for(let j = 0; j < map[0].length; j++){
		map[1][j] = (j==startcol ? 1 : 0); // initialize start line
	}
	
	for(let i = 3; i < map.length; i+=2){ // aggregate
		for(let j = 0; j < map[i].length; j++){
			if(map[i-1][j]=='^') map[i][j]=0;
			else map[i][j] = map[i-2][j] + (map[i-1][j-1]=='^'?map[i-2][j-1]:0) + (map[i-1][j+1]=='^'?map[i-2][j+1]:0);
		}
	}
	
	let res_b = 0; // add up results
	for(let i = 0; i < map[map.length-1].length; i++){
		res_b += map[map.length-1][i];
	}
	console.log("B) Result is: "+res_b);
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");

