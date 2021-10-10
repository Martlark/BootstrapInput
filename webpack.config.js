const webpack = require('webpack');
const path = require('path');
const entry = require('webpack-glob-entry');

module.exports = (env) => {
    console.log(env || 'production');
    return {
        mode: (env && env.development) || 'production',
        devtool:
            'eval-source-map',
        entry: {
            index: './src/index.jsx',
            example: './src/example.jsx',
        },
        output:
            {
                filename:
                    '[name].js',
                sourceMapFilename: "[name].js.map",
                path: path.resolve(__dirname, 'dist'),
                libraryTarget: 'commonjs2'
            }
        ,
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.jsx?/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: ["@babel/preset-react", '@babel/preset-env', {
                            plugins:
                                ["@babel/plugin-proposal-class-properties"]
                        },
                        ]
                    }
                }]
        },
        performance: {
            hints: false
        }, devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            index: 'index.html'
        },
        optimization: {
            minimize: false
        },
        watchOptions: {
            ignored: ['**/*.js', 'node_modules/**']
        }
    }
};

