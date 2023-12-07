let fs = require('fs');

const day = '6';

function getData(lines){
    let data = new Array();
    let times = new Array();
    let distances = new Array();
    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        
        let parts = line.substring(10).trim().split('   ');
        if(x==0){
            times = parts;
        }
        if(x==1){
            distances = parts;
        }
    }
    for (let x = 0; x < times.length; x++) {
        data.push([times[x].trim(),distances[x].trim()])
    }
    return data;
}

const getWays = (race) => {
    let ways = 0;
    const time = Number(race[0]);
    const distance = Number(race[1]);
    for (let i = 1; i <= Math.floor(time / 2); i++) {
        if((time - i) * i > distance){
            // console.log(`Encontrado para ${i} ${(time - i) * i} > ${distance}`);
            ways++;
        }
        if(i%10000 == 0)
            console.log(i);
    }
    return (time % 2 == 0) ? (ways * 2) - 1 : (ways * 2);
}


function part1() {
    const data1 = fs.readFileSync('./example1.txt','utf-8');
    // const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const races = getData(lines);

    console.log(races);

    
    let total = 1;
    for (let i = 0; i < races.length; i++) {
        const race = races[i];
        total *= getWays(race);
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${total}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const races = getData(lines);

    console.log(races);

    
    let total = 1;
    let newTime = '',newDistance = '';
    
    for (let i = 0; i < races.length; i++) {
        newTime += races[i][0];
        newDistance += races[i][1];
    }
    let newRace = [newTime,newDistance];
    console.log(newRace);
    total = getWays(newRace);

    console.log(`The solution for Day ${day} - Part 2 is: ${total}`);
};





function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();