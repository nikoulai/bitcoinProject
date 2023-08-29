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
//var aliceCommit = SHA256('0x'+aliceRandom.toString(16)), bobCommit = SHA256(bobRandom);
var aliceCommit = SHA1(0x2345), bobCommit = SHA256(bobRandom);
var alicePublicKeyHash=0x4567, bobPublicKeyHash=0x1212;
var sig=0x1111, pk=0x4567, allegedBobRandom=0x1234, allegedAliceRandom=0x9090;

//var inputScript = Script('0x02 0x2345');
//var inputScript = Script('OP_PUSHDATA1 0x02 0x2345');
//var inputScript = Script('32 0x9844f81e1408f6ecb932137d33bed7cfdcf518a3 33 0x9844f81e1408f6ecb932137d33bed7cfdcf518a300');
var inputScript = Script('1 0x99 32 0x1234567812345678123456781234567812345678123456781234567812345678 32 0x1234567812345678123456781234567812345678123456781234567812345678');
console.log(inputScript);

var scriptPubKey = [
	//    'OP_2DUP',		//duplicate random numbers for hash checks
	//    'OP_SHA1',		//
	//    'OP_PUSHDATA1,		//
	//	'0x14 0xd2f75e8204fedf2eacd261e2461b2964e3bfd5be',				//data(aliceCommit),
	//	''+SHA1(0010001101000101),				//data(aliceCommit),
	//    ' OP_EQUALVERIFY'		//
	//    ' OP_EQUAL'		//
	//
	//console.log(scriptPubKey);	

	//	'OP_SHA256',			//
	//	data(bobCommit),		//	
	//	'OP_EQUALVERIFY',		//


	'OP_2DUP',
	'OP_EQUALVERIFY',
	'OP_2',
	'OP_PICK',
	'1 0x99',
	'OP_EQUALVERIFY',
	//	'OP_DROP',

	'OP_SIZE',	//calculate bytes of randomNumber
	'OP_NIP',	//discard the randomNumber
	'OP_SWAP',	//tranfer the secondNumber to the top 
	'OP_SIZE',	//	
	'OP_NIP',	//
	'OP_DUP',	//	


	'OP_16',	//
	'OP_SUB',	//	
	'OP_16',	//	
	'OP_SUB',	//
	//	'OP_0',		//check if the the one is 32B
	//	'OP_EQUAL',	//

	'OP_DUP',       //dup for the if 

	'OP_NOTIF', 	// if it is 0
	'OP_DROP',  
	'OP_ELSE', 	// if it is not 0
	'OP_1SUB', 	// check if is 1
	'OP_IF',
	'OP_RETURN', 	//fail////// 		
	'OP_ELSE',
	'OP_SWAP',  	// we want positive result 	
	'OP_ENDIF',	
	'OP_ENDIF',

	'OP_SUB',	//
	'OP_DUP',	//


	'OP_DEPTH',
	'OP_3',
	'OP_EQUALVERIFY',
	'OP_2DUP',

	'OP_DUP',
	'OP_0',
	'OP_EQUALVERIFY',

	'OP_EQUALVERIFY',
	'OP_2',
	'OP_PICK',
	'1 0x99',
	'OP_EQUALVERIFY',

	'OP_NOTIF',	//	

	'OP_DEPTH',
	'OP_2',
	'OP_EQUALVERIFY',
	'OP_2DUP',
	'OP_0',
	//	'1 0x99',
	'OP_EQUALVERIFY',
	'1 0x99',
	'OP_EQUALVERIFY',


	'OP_0',
	'OP_EQUALVERIFY',
	//	'OP_DROP', 	//

	'OP_DEPTH',
	'OP_1',
	'OP_EQUALVERIFY',
	'OP_DUP',
	'1 0x99',
	'OP_EQUALVERIFY',

	//	'OP_DUP',
	//	'OP_HASH160',
	//	'OP_RETURN',
	'1 0x99',
	'OP_DEPTH',
	'OP_2',
	'OP_EQUALVERIFY',
	'OP_2DUP',
	'1 0x99',
	'OP_EQUALVERIFY',
	'1 0x99',
	'OP_EQUALVERIFY',

	//data(alicePublicKeyHash),
	'OP_ELSE',
	'OP_1',
	'OP_EQUALVERIFY',
	//	'OP_DUP',
	//	'OP_HASH160',
	//	'1 0x02',
	'OP_RETURN',
	//data(bobPublicKeyHash),
	'OP_ENDIF',


	'OP_DEPTH',
	'OP_2',
	'OP_EQUALVERIFY',
	'OP_2DUP',
	'1 0x99',
	'OP_EQUALVERIFY',
	'1 0x99',
	'OP_EQUALVERIFY',

	//	'OP_DEPTH',
	//	'OP_2',
	//	'OP_EQUALVERIFY',
	//	'1 0x99',
	//	'OP_EQUALVERIFY',
	//	'1 0x99',




	//	'OP_EQUALVERIFY',

	//	'1 0x01',
	//	'1 0x20',
	'OP_DEPTH',
	'OP_2',
	'OP_EQUALVERIFY',

	//        'OP_2DUP',
	//	'1 0x99',
	'OP_EQUALVERIFY',
	//        '1 0x99',
	//        'OP_EQUALVERIFY'

		'OP_1',
	//	'OP_1',
	//	'OP_EQUALVERIFY',
	/*	'OP_CHECKSIG'
	 */	];

	console.log(scriptPubKey);

	var outputScript = Script(scriptPubKey.join(' '));
	//console.log(outputScript);
	console.log(inputScript);
	console.log(outputScript);
	//var outputScript = Script('OP_16 OP_EQUAL');
	var verified = Interpreter().verify(inputScript, outputScript);

	if (verified) {
		console.log('GOOD');
	}
else {
	console.log('BAD');
}
