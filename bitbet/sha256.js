//require all libraries
var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof'),
//    SHA256 = require("crypto-js/sha256"),
    RIPEMD = require("crypto-js/ripemd160"),
    SHA1 = require("crypto-js/sha1"),
    NONCE_SIZE = 32,
    Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

function hash160(buffer) {
    return crypto.createHash('hash160').update(buffer).digest();
}

// return bitcoin script for constant
function data(v) {
    var value=v+'';
    var res = (sizeof.sizeof(value));
    return (res/4 + ' 0x' + value );
}


var num="123ABCDE";
//var num=n.toString(16);

var hashedNum=sha256(new Buffer(num, 'hex'));//turns it into hex string

console.log("num "+num);
//console.log(data(num));
console.log("hashedNum "+hashedNum);
//console.log(data(hashedNum));

//var inputScript = Script(data(num.toString(16)));
var inputScript = Script();
inputScript.add(new Buffer(num, 'hex'))
console.log(inputScript);

/*var scriptPubKey = [
	'OP_SHA256',
	data(pkh),
	'OP_EQUALVERIFY',
    'OP_1'
];
var outputScript = Script(scriptPubKey.join(' '));
*/

var outputScript= Script('OP_SHA256');
outputScript.add(new Buffer(hashedNum, 'hex'))
outputScript.add('OP_EQUALVERIFY')
outputScript.add('OP_1')
console.log(outputScript);

console.log(inputScript+' '+outputScript);
var verified = Interpreter().verify(inputScript,outputScript);


if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}

