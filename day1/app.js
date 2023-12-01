let fs = require('fs');

const numberFromFirstLastnumericChars = (cad) => {
    let first = -1;
    let last = -1;
    for (let index = 0; index < cad.length; index++) {
        if(!isNaN(cad[index])){
            last = Number(cad[index]);
            if(first==-1)
                first = Number(cad[index]);
        }
    }
    return first == -1 && last == -1 ? 0 : first * 10 + last;
};

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const cadenas = data1.split('\r\n');

    let sum = 0;

    for (let index = 0; index < cadenas.length; index++) {

        const number = numberFromFirstLastnumericChars(cadenas[index].trim());

        console.log(number);

        sum+=number;

    }
    console.log(`The solution for Day 1 - Part 1 is: ${sum}`);
};

const convertString = (cad) => {
    //Replace numbers spelled out with letters with itselfs

    //Important: letters can be commons to many words, ie: oneight must be 18, or eightwo must be 82

    const textNumbers = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
                            '0': '0', '1': '1', '2': '2', '3': '3', '4':'4', '5':'5', '6':'6', '7':'7', '8':'8', '9':'9'
                        };

    // let result = cad.replaceAll(/one|two|three|four|five|six|seven|eight|nine/gi, function (x) {
    //     return textNumbers[x];
    // });

    result = '';

    for (let index = 0; index < cad.length; index++) {
        const element = cad.substring(index);
        for(textNumber in textNumbers){
            if(element.startsWith(textNumber))
                result += textNumbers[textNumber];
        }
    }

    return result;
};

function part2() {
    // const data2 = fs.readFileSync('./example2.txt','utf-8');
    const data2 = fs.readFileSync('./data1.txt','utf-8');
    
    const cadenas = data2.split('\r\n');

    let sum = 0;

    for (let index = 0; index < cadenas.length; index++) {

        const cadena = convertString(cadenas[index].trim());
        const number = numberFromFirstLastnumericChars(cadena);

        console.log(cadenas[index], cadena, number);

        sum+=number;

    }
    console.log(`The solution for Day 1 - Part 2 is: ${sum}`);
};

function main(){

    console.log("DAY 1");

    // part1();

    part2();
};

main();