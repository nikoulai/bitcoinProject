//require all libraries
var Bitcore = require('bitcore'),
    crypto = require('crypto'),
    cryptoJS = require('crypto-js'),
    sizeof = require('sizeof'),
    sign = crypto.createSign('RSA-SHA256'),
    Script = Bitcore.Script,
    Interpreter = Bitcore.Script.Interpreter;

// return bitcoin script for constant
function data(v) {
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

//input variables
var NONCE_SIZE = 32;

var aliceValue = 0,
	bobValue = 0;

var aliceRandom=crypto.randomBytes(NONCE_SIZE+aliceValue),
	bobRandom=crypto.randomBytes(NONCE_SIZE+bobValue);

var alicePublicKey='03e3818b65bcc73a7d64064106a859cc1a5a728c4345ff0b641209fba0d90de6e9',
	bobPublicKey='02fa6faf6100b70e3bf68d3042629e8a84229b8772bbd68152c7e105b73873e255';
var sig='5505257860758037755141977487231352600043943020691402673714006379132893782474546289863482072942548450838449535351043033390698230087768288383338284288435833';

//transaction variables
var alicePublicKeyHash= hash160(new Buffer(alicePublicKey, 'hex')),
	bobPublicKeyHash= hash160(new Buffer(bobPublicKey, 'hex'));

var aliceCommit = sha256(new Buffer(aliceRandom, 'hex')),
	bobCommit = sha256(new Buffer(bobRandom, 'hex'));

var inputScript=Script();
inputScript.add(new Buffer(sig, 'hex'));
inputScript.add(new Buffer(bobPublicKey, 'hex'));
inputScript.add(new Buffer(bobRandom, 'hex'));
inputScript.add(new Buffer(aliceRandom, 'hex'));

//console.log(inputScript);


var outputScript= Script(
	'OP_EQUALVERIFY'+' '+

	'OP_SIZE'+' '+	//calculate bytes of randomNumber
	'OP_NIP'+' '+	//discard the randomNumber
	'OP_SWAP'+' '+	//tranfer the secondNumber to the top 
	'OP_SIZE'+' '+	//	
	'OP_NIP'+' '+	//
	'OP_DUP'+' '+	//	


	'1 0x'+NONCE_SIZE.toString(16)+' '+	//sub 32
	'OP_SUB'+' '+	//check if the the one is 32B
	'OP_DUP'+' '+   //dup for the if 

	'OP_NOTIF'+' '+	// if it is 0
	'OP_DROP'+' '+  
	'OP_ELSE'+' '+ 	// if it is not 0
	'OP_1SUB'+' '+ 	// check if is 1
	'OP_IF'+' '+
	'OP_RETURN'+' '+ //invalid 		

	'OP_ELSE'+' '+
	'OP_SWAP'+' '+  //we want positive result 	
	'OP_ENDIF'+' '+	
	'OP_ENDIF'+' '+


	'OP_SUB'+' '+	//sub min from max
	'OP_DUP'+' '+	//

	'OP_NOTIF'+' '+	//if equal Alice wins
	'OP_DROP'+' '+ 	//
	'OP_DUP'+' '+
	'OP_HASH160');

outputScript.prepend(new Buffer(bobCommit, 'hex'));
outputScript.prepend('OP_SHA256');
outputScript.prepend('OP_EQUALVERIFY');

outputScript.prepend(new Buffer(aliceCommit, 'hex'));
outputScript.prepend('OP_SHA256');
outputScript.prepend('OP_2DUP');//duplicate random numbers for hash checks

outputScript.add(new Buffer(alicePublicKeyHash, 'hex'));
outputScript.add('OP_ELSE');	//Bob wins if valid
outputScript.add('OP_1');
outputScript.add('OP_EQUALVERIFY');
outputScript.add('OP_DUP');
outputScript.add('OP_HASH160');
outputScript.add(new Buffer(bobPublicKeyHash, 'hex'));

outputScript.add('OP_ENDIF');
outputScript.add('OP_EQUALVERIFY');
outputScript.add('OP_CHECKSIG');
outputScript.add('OP_1');

console.log('#scriptSig');
console.log(inputScript);

console.log('#scriptPubKey');
console.log(outputScript);

// console.log(inputScript+' '+outputScript);

var verified = Interpreter().verify(inputScript, outputScript);
console.log('Transaction Validation Result:');

if (verified) {
	console.log('VALID');
}
else {
	console.log('INVALID');
}
