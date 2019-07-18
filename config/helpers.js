var path= require('path')
var fs= require('fs')

var APP_DIR= fs.realpathSync(process.cwd())
var APP_ROOT= ''

const resolveApp= (target)=> target ? path.resolve(APP_DIR,target): path.resolve(APP_DIR,APP_ROOT)

module.exports= {resolveApp}