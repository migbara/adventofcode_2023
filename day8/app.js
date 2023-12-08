let fs = require('fs');

const day = '8';

function getData(lines){
    let data = [];
    let path = '', start = '';
    let map = new Map();
    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        
        if(x==0){
            path = line;
        }
        else if(line!=''){
            let parts = line.split(' = ');
            let key = parts[0];
            let dest = parts[1].replace(/[()]/g,"").split(", ");
            // console.log(key,dest);
            map.set(key,[dest[0],dest[1]]);
            if(x==2){
                start = key;
            }
        }
    }
    data = { path, map, start };
    return data;
}

function findPath(data,pos,key){
    pos = pos % data.path.length;
    let dir = data.path.substring(pos,pos+1);
    // console.log("DIR " + dir, "POS " + pos, "KEY " + key);
    let mov = (dir == 'L') ? 0 : 1; 
    // console.log(data.map.get(key)[mov]);
    if(data.map.get(key)[mov] == 'ZZZ' ){        
        // console.log("FIN");
        return 1;
    }
    else{
        // console.log("Buscamos el siguiente");
        return 1 + findPath(data,(pos+1),data.map.get(key)[mov]);
    }
}


function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    // const data1 = fs.readFileSync('./example2.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let data = getData(lines);

    // console.log(data);

    let pos = 0;
    var total = 0;
    // var path = [];
    // total = findPath(data,pos,data.start);
    key = 'AAA';
    while (key != 'ZZZ'){
        pos = pos % data.path.length;
        let dir = data.path.substring(pos,pos+1);
        // console.log("DIR " + dir, "POS " + pos, "KEY " + key);
        let mov = (dir == 'L') ? 0 : 1; 
        // console.log(data.map.get(key)[mov]);
        key = data.map.get(key)[mov];        
        pos++;
        total++;

        if(total % 10000000 == 0){
            console.log(total);
            console.log("DIR " + dir, "POS " + pos, "KEY " + key);
        }
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${total}`);
};

const allEndingZ = (keys) => {
    let result = true;
    //console.log(keys);
    keys.forEach((element) => {
        // console.log(element.substring(2,3));
        result = result && (element.substring(2,3) == 'Z'); 
    });
    return result;
};

function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        var t = y;
        y = x % y;
        x = t;
   }
   return x;
}

function lcm_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
        return false;
    return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}
 



function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    // const data1 = fs.readFileSync('./example2.txt','utf-8');
    // const data1 = fs.readFileSync('./example3.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let data = getData(lines);

    // console.log(data);

    let pos = 0;
    var total = 0;
    // var path = [];
    // total = findPath(data,pos,data.start);

    let keys = [];

    data.map.forEach((element,key) => {
        // console.log(key);
        if(key.substring(2,3) == 'A')
            keys.push(key)
    });

    // console.log(keys);

    //brute force, impossible
    // while (!allEndingZ(keys)){
    //     pos = pos % data.path.length;
    //     let dir = data.path.substring(pos,pos+1);
    //     let mov = (dir == 'L') ? 0 : 1; 
    //     for (let i = 0; i < keys.length; i++) {
    //         let key = data.map.get(keys[i])[mov];
    //         // console.log("DIR " + dir, "POS " + pos, "KEY " + key);
    //         // console.log(data.map.get(key)[mov]);
    //         keys[i] = key;
    //     }
    //     pos++;
    //     total++;

    //     if(total % 10000000 == 0){
    //         console.log(total);
    //         console.log(keys);
    //     }
    // }

    let steps = [];

    keys.forEach( element => {
        total = 0;
        let key = element;
        while (key.substring(2,3) != 'Z'){
            pos = pos % data.path.length;
            let dir = data.path.substring(pos,pos+1);
            let mov = (dir == 'L') ? 0 : 1; 

            key = data.map.get(key)[mov];
            // console.log("DIR " + dir, "POS " + pos, "KEY " + key);
            // console.log(data.map.get(key)[mov]);

            pos++;
            total++;
        }
        steps.push(total);
    });

    // console.log(steps);

    //Find the steps foreach one
    //And then calculate the lowest common multiple of all of them

    // console.log(keys);

    // let mcm = lcm_two_numbers(1, 16043); // => 360360
    // console.log(mcm);

    let mcm = 1;
    // let mcm = smallestCommons(steps);
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        mcm = lcm_two_numbers(mcm, step);
        // console.log(mcm);
    };
    

    console.log(`The solution for Day ${day} - Part 2 is: ${mcm}`);
};




function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();