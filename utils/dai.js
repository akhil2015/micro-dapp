const EthereumTx = require('ethereumjs-tx').Transaction
const {PROVIDER,CHAIN,DAI_CONTRACT_ADDRESS} = require("../config")
const {DAI_ABI} = require('../abis/daiABI')
const WEB3 = require("web3")
const web3 = new WEB3(PROVIDER)

const gasPriceGwei = 25
const gasLimit = 1500000


async function sendFunds(from,to,amount){    
    const nonce = await web3.eth.getTransactionCount(from.address)
    console.log("fetched nonce is ",nonce)
    const daiToken = new web3.eth.Contract(DAI_ABI);
    daiToken.options.address = DAI_CONTRACT_ADDRESS;
    const data = daiToken.methods.transfer(to, amount).encodeABI();
    const txParams = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
        gasLimit: web3.utils.toHex(gasLimit),
        to: receiver,
        data:data,
        value: 0x0,
    }
    const tx = new EthereumTx(txParams,{ chain:CHAIN})
    tx.sign(Buffer.from(from.secret,'hex'))
    const serializedTx = tx.serialize()
    const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex') )
    return receipt
}
async function generateKeypair(){
    const creds = web3.eth.accounts.create()
    return {
        address:creds.address,
        secret:creds.privateKey
    }
}
module.exports = {
    sendFunds,
    generateKeypair
}