const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    resolve: {
        extensions: ["*", ".js"]
    },

    devtool: "eval-source-map",

    context: path.resolve(__dirname, "./App"),
    entry: { main: "./index.js" },
    output: {
        path: path.resolve(__dirname, "./wwwroot/dist"),
        filename: "[name].js",
        publicPath: "/dist/"
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ],

    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"] },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: "file-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: "file-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=[name].[ext]" },
            { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },

            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            //so I can use @import in my custom styles that are relative to the /styles folder
                            includePaths: [path.resolve(__dirname, "./App/styles")]
                        }
                    }
                ]
            }
        ]
    }
};
