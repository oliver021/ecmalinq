// typing ypur code

/**
*@class
*@description The sample class
*/
export default class SampleClass{
	/**
	*@property msg {string}
	*@description simple msg
	*/
	protected msg: string;

	constructor(_msg: string){
		this.msg = _msg;
	}

	/**
	*@method
	*@description The sample method
	*/
	getMessage(){
		if(this.msg === undefined){
			throw new Error();
		}
		return this.msg;
	}

	/**
	*@method
	*@description The sample method to put message
	*/
	putMessage(_msg: string){
		this.msg = _msg;
	}
}

/**
*@function
*@description the factory sample class
*/
export function factoryClass(msg: string){
	if(msg.length < 1){
		throw "the message can be empty";
	}
	return new SampleClass(msg);
}