let fs = require('fs');

const day = '8';

function getData(lines){
    let data = [];
    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        
        const parts = line.replaceAll(/[ ]/g,' ').split(' ');
        data.push(parts);
    }
    return data;
}

const todo0 = (line) => {
    // console.log(line);
    return line.join('').replaceAll('0','').length == 0;
}

const findValueFunction = lines => {
    let num = 0;
    let pile = [0];
    for (let index = lines.length - 1; index >= 0; index--) {
        const element = lines[index];
        // console.log(`sumando ${element[element.length - 1]} y ${pile[lines.length - 1 - index]}`);
        num = Number(element[element.length - 1]) + pile[lines.length - 1 - index];
        pile.push(num);
    }
    // console.log(pile);
    return num;
}

const findValueFunctionPart2 = lines => {
    let num = 0;
    let pile = [0];
    for (let index = lines.length - 1; index >= 0; index--) {
        const element = lines[index];
        // console.log(`sumando ${element[0]} y ${pile[lines.length - 1 - index]}`);
        num = Number(element[0]) - pile[lines.length - 1 - index];
        pile.push(num);
    }
    // console.log(pile);
    return num;
}

const findNextValue = (num, line) => {
    // console.log(line, num);

    let newline = line;
    let i = newline.length;
    let newlines = [];

    while(newline.length > 1 && !todo0(newline) && i > 0){
        let difs = [];
        newline.forEach( (element,index) => {
            if(newline[index+1] != undefined)
                difs.push(newline[index+1] - element);
        });
        // console.log(newline);
        newlines.push(newline);
        newline = difs;
        i--;
    }
    const value = findValueFunction(newlines);
    return num + value;
}

const findNextValuePart2 = (num, line) => {
    // console.log(line, num);

    let newline = line;
    let i = newline.length;
    let newlines = [];

    while(newline.length > 1 && !todo0(newline) && i > 0){
        let difs = [];
        newline.forEach( (element,index) => {
            if(newline[index+1] != undefined)
                difs.push(newline[index+1] - element);
        });
        // console.log(newline);
        newlines.push(newline);
        newline = difs;
        i--;
    }
    const value = findValueFunctionPart2(newlines);
    return num + value;
}


function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let data = getData(lines);

    // console.log(data);

    let total = 0;

    total = data.reduce(findNextValue, total);

    console.log(`The solution for Day ${day} - Part 1 is: ${total}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let data = getData(lines);

    // console.log(data);

    let total = 0;

    total = data.reduce(findNextValuePart2, total);

    console.log(`The solution for Day ${day} - Part 2 is: ${total}`);
};




function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();