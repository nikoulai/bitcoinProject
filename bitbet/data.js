var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof');
//var SHA256 = require("crypto-js/sha256");
//var RIP = require("crypto-js/ripemd160");
var SHA1 = require("crypto-js/sha1");
var NONCE_SIZE = 32;
var Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;

function data(v) {
    // return bitcoin script for constant
    var value=v+'';
    var res = (sizeof.sizeof(value));
    return (res/4 + ' 0x' + value );
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

function hash160(buffer) {
    return crypto.createHash('ripemd160').update(sha256(buffer)).digest();
}

var pk="0450";
var pkh=hash160(new Buffer(pk, 'hex'));
console.log("pk "+pk);
console.log("pkh "+pkh);
console.log(data(pkh));

var inputScript = Script(data(pk));
console.log(inputScript);

/*var scriptPubKey = [
	'OP_HASH160',
	data(pkh),
	'OP_EQUALVERIFY OP_1'
];*/

var outputScript= Script('OP_HASH160');
outputScript.add(new Buffer(pkh, 'hex'))
outputScript.add('OP_EQUALVERIFY')
outputScript.add('OP_1')
console.log(outputScript);

//var outputScript = Script(scriptPubKey.join(' '));
console.log(inputScript+' '+outputScript);
var verified = Interpreter().verify(inputScript,outputScript);

//var verified = Interpreter().verify('', 'OP_DROP');

if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}

