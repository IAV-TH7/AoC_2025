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

function solve_a(input){
	// remove multi-spacing not to influence splitting result
	let len_prev = 0;
	do{
		len_prev = input.length;
		input=input.replace("  "," ");
	}
	while(input.length != len_prev);

	// split into numeric arrays (except operations)
	let arr=[];
	let lines = input.split('\n')
	line_len = -1;
	for(let i = 0; i < lines.length; i++){
		let l = lines[i].trim();
		if(!l) break;
		let b = l.split(' ');
		arr.push(isNaN(Number(b[0]) )? b : b.map(Number));
		if(line_len < 0) line_len = b.length;
		else if (b.length != line_len) return -1;
	}

	// solve tasks, add up results
	let res = 0;
	for(let i = 0; i < line_len; i++){
		let op = arr[arr.length-1][i];
		let ires = (op=='*'?1:0);
		for(let j = 0; j < arr.length-1; j++){
			if(op == '+') ires += arr[j][i];
			else if(op == '*') ires *= arr[j][i];
		}
		res += ires;
	}
	return res;
}

function solve_b(input){
	// split into lines
	lines = input.split('\n')
	let n_lines = 0;
	for(let i = 0; i < lines.length; i++){
		if(!lines[i].trim()) break;
		if(i > 0 && lines[i].length != lines[i-1].length) return -1;
		n_lines++;
	}
	
	// solve tasks column-wise, add up results
	let res = 0;
	let op = null;
	let ires = -1;
	for(let c = 0; c < lines[0].length; c++){
		// proceed to next task if column has an operation sign in last line
		if(lines[n_lines-1][c] != ' '){
			op = lines[n_lines-1][c];
			if(ires >= 0) res += ires; // take result from previous operation
			ires = (op=='*'?1:0); // prepare result for oncoming operation
		}

		// concatenate number from current column		
		let col_num = "";
		for(let l = 0; l < n_lines-1; l++){
			if(lines[l][c] != " ") col_num += lines[l][c];
		}
		
		// perform current operation
		if(col_num){
			if(op == '+') ires += Number(col_num);
			else if(op == '*') ires *= Number(col_num);
		}
		
	}
	// don't forget to consider result from last round
	if(ires >= 0) res += ires;

	return res;
}


function Advent_Main(filename){
	let file = ReadFile("./"+filename, { encoding: 'utf8', flag: 'r' }, true);
	
	let res_a = solve_a(file);
	console.log("A: "+res_a);

	let res_b = solve_b(file);
	console.log("B: "+res_b);
}

if(process.argv.length > 2) Advent_Main(process.argv[2]);
else console.log(1, "Filename missing");
