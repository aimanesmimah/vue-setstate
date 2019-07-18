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
    plugins: [new webpack.ProgressPlugin()]
}



switch (process.env.NODE_ENV) {
    case 'dev':
        require('./env/dev')(config)
        break;
    case 'prod':
        require('./env/prod')(config)
        break;
    default:
        break;
}

module.exports= config