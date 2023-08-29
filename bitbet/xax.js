var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof');
var SHA256 = require("crypto-js/sha256");
var SHA1 = require("crypto-js/sha1");
var NONCE_SIZE = 32;

var Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;

var aliceValue = 0, bobValue = 1, aliceRandom=0x2345, bobRandom=0x7878;
var aliceCommit = SHA1(aliceRandom), bobCommit = SHA256(bobRandom);

//var number = 0x57777be39549c4016436afda65d2330e;
console.log(aliceCommit+'');


//var inputScript = Script('OP_PUSHDATA1 0x01 0x10');
//var inputScript = Script('2 0x2345');
var kotopoulo= 0x1NaTVwXDDUJaXDQajoa9MqHhz4uTxtgK14
console.log(sizeof.sizeof(kotopoulo.toString(16)));

//var inputScript = Script('1NaTVwXDDUJaXDQajoa9MqHhz4uTxtgK14');

//var inputScript = Script('1 0x01');

console.log(inputScript);

//var inputScript = Script('OP_PUSHDATA1 0x10 0x'+number.toString(16));

var scriptPubKey = [
   'OP_SHA1 ', 
'0x14 0xd2f75e8204fedf2eacd261e2461b2964e3bfd5be ',          
//'0x14 0x9844f81e1408f6ecb932137d33bed7cfdcf518a3 ',          
//'0x14 0x5fc55899820b57729e139232a04fdf9c3d428f5f ',          
//'0x14 0xbbdb5cfe950c88e60a18aaeceed4213b3810dbfc ',          
//   'OP_EQUALVERIFY ',
//'OP_DROP ',
'0x14 0xd2f75e8204fedf2eacd261e2461b2964e3bfd5be ',          
'OP_EQUALVERIFY ',
'0x14 0xd2f75e8204fedf2eacd261e2461b2964e3bfd5be ',          
'OP_EQUALVERIFY ',
//'OP_DROP ',
//'OP_DROP ',
   'OP_1 ',
   'OP_1'
];

var outputScript = Script(scriptPubKey.join(''));
console.log(inputScript+' '+outputScript);
//var outputScript = Script('OP_16 OP_EQUAL');
var verified = Interpreter().verify(inputScript,outputScript);

//var verified = Interpreter().verify('', 'OP_DROP');

if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}
                  
