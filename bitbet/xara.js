//require all libraries
var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof'),
	SHA256 = require("crypto-js/sha256"),
	Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;


var NONCE_SIZE = 32;
//to be changed for input, random generation
var aliceValue = 0, bobValue = 1;
var aliceRandom='2345', bobRandom='7878';
var aliceCommit = SHA256(aliceRandom)+'', bobCommit = SHA256(bobRandom)+'';
var alicePublicKeyHash=0x4567, bobPublicKeyHash=0x1212;
console.log("Declerations ok\n"); 

// return bitcoin script for constant
function data(v) {
    var value=v+'';
    var res = (sizeof.sizeof(value));
    return (res/4 + ' 0x' + value );
}
console.log("Declarations ok\n");
//console.log(data(bobRandom));
//inputScript
var inputScript = Script(data(bobRandom));//+' '+data(aliceRandom));
console.log();

//outputScript
var scriptPubKey = [
	//'OP_2DUP',
	//'OP_SHA256',
    //data(aliceCommit),
    //'OP_EQUALVERIFY',
    'OP_SHA256',
    data(bobCommit),
    'OP_EQUALVERIFY',
    'OP_1'
];

var outputScript = Script(scriptPubKey.join(' '));
console.log(inputScript+' '+outputScript);

var verified = Interpreter().verify(inputScript,outputScript);

//final verification
if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}
