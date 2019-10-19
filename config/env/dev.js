var chalk= require('chalk')
var VueLoaderPlugin= require('vue-loader/lib/plugin')
var {resolveApp}= require('../helpers')

module.exports= function(config){
    console.log(chalk.blue('environment ==> development'))

    config.entry= ['babel-polyfill',resolveApp('App.js')]
    config.output= {
        filename: 'bundle.js',
        path: resolveApp('build')
    }

    config.devtool= '#source-map'
    config.mode= 'development'
    config.plugins.push(new VueLoaderPlugin())
    config.devServer = {
        contentBase: resolveApp() ,
        port: 4000,
        historyApiFallback: true,
        open: true,
        publicPath: '/build/'
    }

}