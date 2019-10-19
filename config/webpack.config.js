var webpack= require('webpack')
var loaders= require('./loaders')

var config= {
    resolve:{
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: loaders()
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}



switch (process.env.NODE_ENV) {
    case 'dev':
        require('./env/dev')(config)
        break;
    case 'prod':
        require('./env/prod')(config)
        break;
    case 'test':
        require('./env/test')(config)
    default:
        break;
}

module.exports= config