var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof');
var SHA256 = require("crypto-js/sha256");
var NONCE_SIZE = 32;

var Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;

var aliceValue = 0, bobValue = 1, aliceRandom=0x2345, bobRandom=0x7878;
var aliceCommit = SHA256(aliceRandom), bobCommit = SHA256(bobRandom);
var alicePublicKeyHash=0x4567, bobPublicKeyHash=0x1212;
var nikos=0x012345;
var sig=0x1111, pk=0x4567, allegedBobRandom=0x1234, allegedAliceRandom=0x9090;
console.log('OP_PUSHDATA1 1 '+nikos);

function data(value) {
    // return bitcoin script for constant
    //
    var hexv = value.toString(16);
    var aou = (sizeof.sizeof(hexv)/4);
    //return ('OP_PUSHDATA1 ' + ' 0x'+ aou.toString(16) + ' 0x' + hexv );
    return (aou + ' 0x' + hexv );
}
console.log(data(nikos));
//var inputScript = Script(data(sig)+' '+data(pk)+' '+data(allegedBobRandom)+' '+data(allegedAliceRandom));
/*var scriptPubKey = [
    'OP_2DUP',

    'OP_SHA256',
    data(aliceCommit),
    'OP_EQUALVERIFY',

    'OP_SHA256',
    data(bobCommit),
    'OP_EQUALVERIFY',

    'OP_SIZE',
    'OP_NIP',
    'OP_SWAP',
    'OP_SIZE',
    'OP_NIP',
    'OP_DUP',


    'OP_16',
    'OP_SUB',
    'OP_16',
    'OP_SUB',

    'OP_DUP',

    'OP_NOTIF', // if it is 0
    '    OP_DROP',
    'OP_ELSE', // if it is not 0
    '    OP_1SUB',
    '    OP_IF',
    '        OP_RETURN',
    '    OP_ELSE',
    '    OP_SWAP',
    '    OP_ENDIF',
    'OP_ENDIF',

    'OP_SUB',
    'OP_DUP',
    'OP_NOTIF',
    '    OP_DROP',
    '    OP_DUP',
    '    OP_HASH160',
    data(alicePublicKeyHash),
    'OP_ELSE',
    '    OP_1',
    '    OP_EQUALVERIFY',
    '    OP_DUP',
    '    OP_HASH160',
    data(bobPublicKeyHash),
    'OP_ENDIF',

    'OP_EQUALVERIFY',
    'OP_CHECKSIG'
];*/

//var outputScript = Script(scriptPubKey.join(' '));
//console.log(inputScript+outputScript);
//var outputScript = Script('OP_16 OP_EQUAL');
//var verified = Interpreter().verify(inputScript, outputScript);

/*if (verified) {
    console.log('GOOD');
}
else {
    console.log('BAD');
}*/
