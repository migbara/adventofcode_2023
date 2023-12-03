let fs = require('fs');

const day = '3';

function generateMap(lines){
    // const numbers = new Map();
    let numbers = [];
    let symbols = [];

    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        let n = {n: '', start: -1, end: -1, line: -1};
        // numbers.push(line.split(/[^0-9]+/));

        for (let i = 0; i < line.length; i++) {
            const char = line.substring(i,i+1);
            //if char is a number
            if(!isNaN(char)){
                //if n not exists
                if(n.start == -1){
                    n.n = char;
                    n.start = i;
                    n.line = x;
                }
                //If n exists
                else if(n.start != -1){
                    n.n += char;
                }
            }
            else {
                if(char!='.'){
                    symbols.push({symbol: char, line: x, pos: i, adjacents: []});
                }
                if(n.start != -1){
                    n.end = i-1;
                    numbers.push(n);
                    n = {n: '', start: -1, end: -1, line: -1};
                }
            }    
                
        }
        if(n.start != -1){
            n.end = line.length-1;
            numbers.push(n);
        }
    }
    return [numbers,symbols];
}

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const data = generateMap(lines);
    const numbers = data[0];
    const symbols = data[1];

    // console.log(numbers);
    // console.log(symbols);

    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        for (let j = 0; j < symbols.length; j++) {
            const symbol = symbols[j];
            
            if(symbol.line >=  number.line-1 && symbol.line <= number.line+1){
                if(symbol.pos >=  number.start-1 && symbol.pos <= number.end+1){
                    // console.log(`Number ${number.n} is part number`);
                    sum += Number(number.n);
                }
            }
        }
    }
    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const data = generateMap(lines);
    const numbers = data[0];
    const symbols = data[1];

    // console.log(numbers);
    // console.log(symbols);

    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        for (let j = 0; j < symbols.length; j++) {
            const symbol = symbols[j];
            
            if(symbol.line >=  number.line-1 && symbol.line <= number.line+1){
                if(symbol.pos >=  number.start-1 && symbol.pos <= number.end+1){
                    // console.log(`Number ${number.n} is adyacent to *`);
                    symbol.adjacents.push(number.n);
                }
            }
        }
    }
    // console.log(symbols);

    const productOfValues = (prod,value,index,array) => {
        return prod * value;
    }

    // now, search for gears (symbol * with 2 adjacents) y calculate the sum
    for (let index = 0; index < symbols.length; index++) {
        const symbol = symbols[index];
        if(symbol.symbol=='*' && symbol.adjacents.length == 2){
            let prod = 1;
            // for (let adj = 0; adj < symbol.adjacents.length; adj++) {
            //     const num = Number(symbol.adjacents[adj]);
            //     prod = prod * num;
            // }
            prod = symbol.adjacents.reduce(productOfValues);
            sum += prod;
        }
    }

    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};


function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();