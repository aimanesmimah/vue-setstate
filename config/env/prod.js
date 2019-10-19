var chalk= require('chalk')
var UglifyJsPlugin= require('uglifyjs-webpack-plugin')
var {resolveApp} = require('../helpers')


module.exports= function(config){
    console.log(chalk.red('environment ==> production'))

    config.entry= ['babel-polyfill',resolveApp('lib/index.js')],
    config.output= {
        filename: 'vue-setstate.min.js',
        path: resolveApp('dist'),
        library :'VueSetstate',
        libraryTarget : 'umd',
        //globalObject: 'this'
    }

    config.mode= 'production'
    config.plugins.push(new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
            mangle: true,
            safari10: true,
        }
    }))
}