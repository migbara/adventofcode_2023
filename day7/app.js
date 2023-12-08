let fs = require('fs');

const day = '7';

function getData(lines){
    let data = [];
    for (let x = 0; x < lines.length; x++) {
        const line = lines[x];
        
        let parts = line.split(' ');
        let hand = parts[0];
        let bid = parts[1];
        // let order = 0;

        let play = {hand, bid, type: 0}; //, order};

        data.push(play);
    }
    return data;
}

const handValue = (hand,mode) => {
    let numbers = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    if(mode=='J')
        numbers = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    // let cards = new Map();
    let type = 0;
    let pairs= 0, threes = 0;
    let regex;
    numbers.forEach(n => {
        if(mode=='J'){
            regex = new RegExp(`[^${n}J]`,"g");
        }
        else{
            regex = new RegExp(`[^${n}]`,"g");
        }
        let amount = hand.hand.replace(regex, "").length;
        // cards.set(number,amount);
        // cards.set(n,amount);
        if(amount==5){
            type = 6;//poker 5
        }
        if(amount==4){
            type = Math.max(type,5);
        }
        if(amount==3){
            type = Math.max(type,3);//Can be 3 or 4 
            threes++;
        }
        if(amount==2){
            type = Math.max(type,1);//Can be 1 or 2
            pairs++;
        }
        // console.log(hand.hand,n,amount,type);
    });
    if(type==3 && (pairs==1 || threes==2)){//only for mode J (JJ335 must be full house, 4, now is 3 beacuse result is 2 threes)
        type=4;
    }
    if(type==1 && pairs==2){
        type=2;
    }
    hand.type = type;
    return type;
}


function sortHands(a,b){
    const numbers = {'A':12, 'K':11, 'Q':10, 'J':9, 'T':8, '9':7, '8':6, '7':5, '6':4, '5':3, '4':2, '3':1, '2':0};
    if(handValue(a) > handValue(b)){
        // console.log('A > B');
        // console.log(a,handValue(a),b,handValue(b));
        return 1;
    }
    else if(handValue(a) == handValue(b)){
        // console.log('A = B');
        // console.log(a,handValue(a),b,handValue(b));
        let i = 0;
        while(i<a.hand.length){
            if(numbers[a.hand.substring(i,i+1)] > numbers[b.hand.substring(i,i+1)] ){
                // console.log('A = B Mirando cartas A > B ', i);
                // console.log(a,numbers[a.hand.substring(i,i+1)],b,numbers[b.hand.substring(i,i+1)]); 
                return 1;
            }
            else if(numbers[a.hand.substring(i,i+1)] < numbers[b.hand.substring(i,i+1)]){
                // console.log('A = B Mirando cartas A < B', i);
                // console.log(a,numbers[a.hand.substring(i,i+1)],b,numbers[b.hand.substring(i,i+1)]);
                return -1;
            }
            i++;
        }
        // console.log('A ==== B');
        // console.log(a,handValue(a),b,handValue(b));
        return 1;
    }
    else{
        // console.log('A < B');
        // console.log(a,handValue(a),b,handValue(b));
        return -1;
    }
}

function sortHandsPart2(a,b){
    const numbers = {'A':12, 'K':11, 'Q':10, 'T':9, '9':8, '8':7, '7':6, '6':5, '5':4, '4':3, '3':2, '2':1, 'J':0};
    if(handValue(a,'J') > handValue(b,'J')){
        // console.log('A > B');
        // console.log(a,handValue(a,'J'),b,handValue(b,'J'));
        return 1;
    }
    else if(handValue(a,'J') == handValue(b,'J')){
        // console.log('A = B');
        // console.log(a,handValue(a,'J'),b,handValue(b,'J'));
        let i = 0;
        while(i<a.hand.length){
            if(numbers[a.hand.substring(i,i+1)] > numbers[b.hand.substring(i,i+1)] ){
                // console.log('A = B Mirando cartas A > B ', i);
                // console.log(a,numbers[a.hand.substring(i,i+1)],b,numbers[b.hand.substring(i,i+1)]); 
                return 1;
            }
            else if(numbers[a.hand.substring(i,i+1)] < numbers[b.hand.substring(i,i+1)]){
                // console.log('A = B Mirando cartas A < B', i);
                // console.log(a,numbers[a.hand.substring(i,i+1)],b,numbers[b.hand.substring(i,i+1)]);
                return -1;
            }
            i++;
        }
        // console.log('A ==== B');
        // console.log(a,handValue(a,'J'),b,handValue(b,'J'));
        return 1;
    }
    else{
        // console.log('A < B');
        // console.log(a,handValue(a,'J'),b,handValue(b,'J'));
        return -1;
    }
}


function part1() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let hands = getData(lines);

    // console.log(hands);

    let sortedHands = hands.sort(sortHands);

    // console.log(sortedHands);

    let total = 0;
    for (let i = 0; i < sortedHands.length; i++) {
        const hand = sortedHands[i];
        total += hand.bid * (i+1);
    }

    console.log(`The solution for Day ${day} - Part 1 is: ${total}`);
};


function part2() {
    // const data1 = fs.readFileSync('./example1.txt','utf-8');
    const data1 = fs.readFileSync('./data1.txt','utf-8');

    const lines = data1.split('\r\n');

    let hands = getData(lines);

    // console.log(hands);

    let sortedHands = hands.sort(sortHandsPart2);

    // console.log(sortedHands);

    let total = 0;
    for (let i = 0; i < sortedHands.length; i++) {
        const hand = sortedHands[i];
        total += hand.bid * (i+1);
    }

    console.log(`The solution for Day ${day} - Part 2 is: ${total}`);
};




function main(){

    console.log(`DAY ${day}`);

    part1();

    part2();
};

main();