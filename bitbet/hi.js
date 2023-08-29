var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js');
var Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;

//var inputscript = script('op_1');

var aliceValue = 0, bobValue = 1, aliceRandom=0x2345, bobRandom=0x7878;
var aliceCommit = SHA256(aliceRandom), bobCommit = SHA256(bobRandom);
var outputscript = script('op_15 op_add op_16 op_equal');

console.log((16).toString(16));
console.log(aliceCommit);
var verified = Interpreter().verify(inputScript, outputScript);
if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}
