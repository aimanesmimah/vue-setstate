var chalk  = require("chalk")

module.exports= function(config){
    console.log(chalk.blue('environment ==> test'))
    config.mode ="none"
}