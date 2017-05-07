module.exports = {
    entry: ['./app/index.js','./app/videos.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }]
    },
    devServer: {
        port: 3000,
        contentBase: './build',
        inline: true
    }
}