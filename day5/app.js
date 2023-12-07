let fs = require('fs');

const day = '5';

function getData(lines){
    // let almanac = {seeds: [], seedtosoil: [], soiltofertilizer: [], fertilizertowater: [], watertolight: [], lighttotemperature: [], temperaturetohumidty: [], humiditytolocation: []};
    let almanac = {seeds: [], data: new Map()};
    const modes = ['SXS','SXF','FXW','WXL','LXT','TXH','HXL'];
    modes.forEach(element => {
        almanac.data.set(element,[]);
    });
    // console.log(almanac);
    let parts = [];
    let mode = '';
    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        if(line!=''){
            if(x==0){
                almanac.seeds = line.substring(7).split(' ');
            }
            else if(line=='seed-to-soil map:'){
                mode = 'SXS';
            }
            else if(line=='soil-to-fertilizer map:'){
                mode = 'SXF';
            }
            else if(line=='fertilizer-to-water map:'){
                mode = 'FXW';
            }
            else if(line=='water-to-light map:'){
                mode = 'WXL';
            }
            else if(line=='light-to-temperature map:'){
                mode = 'LXT';
            }
            else if(line=='temperature-to-humidity map:'){
                mode = 'TXH';
            }
            else if(line=='humidity-to-location map:'){
                mode = 'HXL';
            }
            else{
                // console.log(line);
                let numbers = line.split(' ');
                let array = almanac.data.get(mode);
                array.push({dest: numbers[0], source: numbers[1], range: numbers[2]});
                // console.log(array);
                almanac.data.set(mode,array);
            }

        }

        
    }
    return almanac;
}

function convertNumber(number,mode,almanac){
    let arrayInfo = almanac.data.get(mode);

    convert = number;

    for (let i = 0; i < arrayInfo.length; i++) {
        let range = Number(arrayInfo[i].range);
        let dest = Number(arrayInfo[i].dest);
        let source = Number(arrayInfo[i].source);

        if((number >= source) && (number <= source + range - 1)){
            convert = number + dest - source;
        }
    }
    return convert;
}

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const almanac = getData(lines);

    // console.log(almanac);

    const modes = ['SXS','SXF','FXW','WXL','LXT','TXH','HXL'];

    let changes = almanac.seeds;
    for (let indexMode = 0; indexMode < modes.length; indexMode++) {
        const mode = modes[indexMode];
        for (let i = 0; i < changes.length; i++) {
            const number = Number(changes[i]);
            changes[i] = convertNumber(number,mode,almanac);
        }
        // console.log(changes);
    }

    let sum = Math.min(...changes);

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const almanac = getData(lines);

    // console.log(almanac);

    const modes = ['SXS','SXF','FXW','WXL','LXT','TXH','HXL'];

    //new seeds
    let newSeeds = [];
    let ant;
    for (let i = 0; i < almanac.seeds.length; i++) {
        const seed = Number(almanac.seeds[i]);
        if(i%2!=0){
            for (let j = 1; j < seed; j++) {
                newSeeds.push(ant + j);
            }
        }
        else{
            ant = seed;
            newSeeds.push(seed);
        }

    }
    // console.log(newSeeds);
    console.log("Ya tenemos newSeeds")

    almanac.seeds = newSeeds;

    let changes = almanac.seeds;
    for (let indexMode = 0; indexMode < modes.length; indexMode++) {
        const mode = modes[indexMode];
        for (let i = 0; i < changes.length; i++) {
            const number = Number(changes[i]);
            changes[i] = convertNumber(number,mode,almanac);
        }
        // console.log(changes);
    }

    let sum = Math.min(...changes);

    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};





function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();