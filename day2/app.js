let fs = require('fs');

const day = '2';

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const games = data1.split('\r\n');

    const maxNumberByColor = new Map();

    maxNumberByColor.set('red', 12);
    maxNumberByColor.set('green', 13);
    maxNumberByColor.set('blue', 14);

    // console.log([...maxNumberByColor]);

    let sum = 0;

    for (let index = 0; index < games.length; index++) {
        const parts = games[index].split(': ');
        const sets = parts[1].split('; ');
        const id = Number(parts[0].substring(5));

        let posible = true;
        let set = 0;
        while (posible && set < sets.length) {
            const cubes = sets[set].split(', ');
            let cube = 0;
            while (posible && cube < cubes.length) {
                const colors = cubes[cube].split(' ');
                
                const number = colors[0];
                const color = colors[1];
    
                // console.log(number, color, maxNumberByColor.get(color));
    
                if(number > maxNumberByColor.get(color)){
                    // console.log(`${id} is not possible because ${number} in ${color} > ${maxNumberByColor.get(color)}`);
                    posible = false;
                }

                cube++
            }

            set++;
        }
        if(posible){
            // console.log(`${id} is possible`);
            sum += id;
        }
    }
    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const games = data1.split('\r\n');

    let sum = 0;

    for (let index = 0; index < games.length; index++) {
        const parts = games[index].split(': ');
        const sets = parts[1].split('; ');
        const id = Number(parts[0].substring(5));

        const maxNumberByColor = new Map();
        maxNumberByColor.set('red', 0);
        maxNumberByColor.set('green', 0);
        maxNumberByColor.set('blue', 0);

        let set = 0;
        while (set < sets.length) {
            const cubes = sets[set].split(', ');
            let cube = 0;
            while (cube < cubes.length) {
                const colors = cubes[cube].split(' ');
                
                const number = colors[0];
                const color = colors[1];

                // console.log(number, color, maxNumberByColor.get(color));
                
                if(number > maxNumberByColor.get(color)){
                    // console.log(`${color} era ${maxNumberByColor.get(color)} y ahora pasa a ser ${number}`);
                    maxNumberByColor.set(color, Number(number));
                    // console.log([...maxNumberByColor]);
                }

                cube++
            }

            set++;
        }
        // console.log('red', maxNumberByColor.get('red'));
        // console.log('green', maxNumberByColor.get('green'));
        // console.log('blue', maxNumberByColor.get('blue'));
        // console.log([...maxNumberByColor]);
        const power = maxNumberByColor.get('red') * maxNumberByColor.get('green') * maxNumberByColor.get('blue');

        // console.log('power', power);
        sum += power;
    }
    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};


function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();