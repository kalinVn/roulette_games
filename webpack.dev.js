const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'development',
    devtool:'inline-source-map',
    experiments: {
		topLevelAwait: true,
	},
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                 test: /\.css$/i,
                use: [
                
                    {loader: "style-loader",options:{ } },
                    {loader: "css-loader",options:{ sourceMap: true} }
                ]
            }
        ]
    },
});