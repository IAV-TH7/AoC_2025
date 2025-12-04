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

function isCoordValid(map,l,c){
	if(l<0 || l>=map.length) return false;
	if(c<0 || c>=map[l].length) return false;
	return true;
}
function isRemovable(map,l,c){
	if(!isCoordValid(map,l,c) || map[l][c]!='@') return false;
	let cnt = 0;
	if(isCoordValid(map,l-1,c-1) && map[l-1][c-1]=='@') cnt++;
	if(isCoordValid(map,l-1,c)   && map[l-1][c]  =='@') cnt++;
	if(isCoordValid(map,l-1,c+1) && map[l-1][c+1]=='@') cnt++;
	if(isCoordValid(map,l,c-1)   && map[l][c-1]  =='@') cnt++;
	if(isCoordValid(map,l,c+1)   && map[l][c+1]  =='@') cnt++;
	if(isCoordValid(map,l+1,c-1) && map[l+1][c-1]=='@') cnt++;
	if(isCoordValid(map,l+1,c)   && map[l+1][c]  =='@') cnt++;
	if(isCoordValid(map,l+1,c+1) && map[l+1][c+1]=='@') cnt++;
	return (cnt < 4);
}

function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	let lines = file.split('\n');

	let map=[];
	for(let i = 0; i < lines.length; i++){
		if(lines[i].length<3) continue; // ignore (near-)empty lines etc.
		map.push(lines[i].trim().split(''));
	}
	
	let result_a = 0;
	for(let i = 0; i < map.length; i++){
		for(let j = 0; j < map[i].length; j++){
			if(isRemovable(map,i,j)) result_a++;
		}
	}
	console.log("A: Initially movable rolls: "+result_a+".");
	
	let result_b = 0;
	while(true){
		let removed = 0;
		for(let i = 0; i < map.length; i++){
			for(let j = 0; j < map[i].length; j++){
				if(isRemovable(map,i,j)){
					map[i][j]='x';
					removed++;
				}
			}
		}
		if(removed>0) result_b+=removed;
		else break;
	}
	
	console.log("B: Finally removable rolls: "+result_b+".");
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
