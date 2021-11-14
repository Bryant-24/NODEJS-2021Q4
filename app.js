const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function my_ciphering_cli(string, crypt) {

    let newString = '';
    let method = '';
    let shift = 0;

    switch(crypt.charAt(0)) {
        case 'C':
            method = 'Caesar';
            break;
        case 'A':
            method = 'Atbash';
            break;
        case 'R':
            method = ' ROT-8';
            break;
    }

    for (let i = 0; i < string.length; i++) {

        if (alphabet.indexOf(string[i].toUpperCase()) != -1) {
            const letterInArray = alphabet.indexOf(string[i].toUpperCase()); // 7
            const isUpperCaseLetter = alphabet[letterInArray] === string[i];
            if (method !== 'Atbash') {
                shift = method === 'Caesar' ? 1 : 8;
                if (crypt.charAt(1) === '1') {
                    let newLetter = alphabet[letterInArray+shift] ? alphabet[letterInArray+shift] : alphabet[shift - (alphabet.length - letterInArray)];
                    if (!isUpperCaseLetter) {
                        newLetter = newLetter.toLocaleLowerCase();
                    }
                    newString += newLetter;
                } else {
                    let newLetter = letterInArray-shift >= 0 ? alphabet[letterInArray-shift] : alphabet[alphabet.length - (shift - letterInArray)];
                    if (!isUpperCaseLetter) {
                        newLetter = newLetter.toLocaleLowerCase();
                    }
                    newString += newLetter;
                }
            } else {
                let newLetter = alphabet.reverse()[letterInArray];
                if (!isUpperCaseLetter) {
                    newLetter = newLetter.toLocaleLowerCase();
                }
                newString += newLetter;
            }
        } else {
            newString += string[i];
        }

    }

    return newString;
}


if (process.argv.length > 8 || process.argv.length <= 2) {
    console.log('Error!');
}

const configCount = process.argv.indexOf('-c') || process.argv.indexOf('--config');
const config = process.argv[configCount + 1];

const inputCount = process.argv.indexOf('-i') || process.argv.indexOf('--input');
const input = process.argv[inputCount + 1];

const outputCount = process.argv.indexOf('-o') || process.argv.indexOf('--output');
const output = process.argv[outputCount + 1];


var fs = require('fs');
var myReadShort = fs.createReadStream(input, 'utf8');
var myWriteShort = fs.createWriteStream(output, {flags: 'a'});

myReadShort.on('data', chunk => {
    config.split('-').forEach(crypt => {
        chunk = my_ciphering_cli(chunk, crypt);
    });
    
    myWriteShort.write(chunk);
});

myReadShort.on('error', error => {console.error(error.message)});
