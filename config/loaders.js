module.exports = function () {
    return [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
                presets: ['env', 'stage-2','es2015']
            }
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }
    ]
}