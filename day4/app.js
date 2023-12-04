let fs = require('fs');

const day = '4';

function getData(lines){
    let cards = [];

    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        const parts = line.split(' | ');
        const parts2 = parts[0].replaceAll('  ',' ').split(': ');
        const wining = parts2[1].replaceAll('  ',' ').split(' ');
        const numbers = parts[1].replaceAll('  ',' ').split(' ');

        let card = { n: x+1, wining, numbers, commons: []};

        cards.push(card);
    }
    return cards;
}

function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const cards = getData(lines);

    // console.log(cards);

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        for (let k = 0; k < card.numbers.length; k++) {
            const number = card.numbers[k];
            if(card.wining.includes(number)){
                // if(card.commons==undefined)
                //     card.commons = [];
                card.commons.push(number);
            }
        }
        // if(card.commons!=undefined)
        if(card.commons.length>0)
            card.points = Math.pow(2,(card.commons.length-1));
        else
            card.points = 0;
    }

    // console.log(cards);

    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        sum += card.points;
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${sum}`);
};

function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    const cards = getData(lines);

    // console.log(cards);

    const instances = new Map();
        

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        instances.set(card.n, 1);
        for (let k = 0; k < card.numbers.length; k++) {
            const number = card.numbers[k];
            if(card.wining.includes(number)){
                // if(card.commons==undefined)
                //     card.commons = [];
                card.commons.push(number);
            }
        }
        // if(card.commons!=undefined)
        if(card.commons.length>0)
            card.points = Math.pow(2,(card.commons.length-1));
        else
            card.points = 0;
    }

    // console.log(cards);
    
    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        // if(card.commons!=undefined){
            let act = instances.get(i+1);
            for (let j = 0; j < card.commons.length; j++) {
                let sig = instances.get(i+2+j);
                instances.set(i+2+j, sig+act);
            }
        // }
        sum += act;
    }
    // console.log([...instances]);
    
    console.log(`The solution for Day ${day} - Part 2 is: ${sum}`);
};





function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();