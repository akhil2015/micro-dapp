const dotenv = require("dotenv") 
dotenv.config()

const config = {
    PORT:process.env.PORT,
    PROVIDER:process.env.PROVIDER,
    CHAIN:'rinkeby',
    DAI_CONTRACT_ADDRESS:""
}
module.exports =  config
