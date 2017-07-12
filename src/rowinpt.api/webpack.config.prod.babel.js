import ExtractTextPlugin from "extract-text-webpack-plugin";
import Path from "path";
import Autoprefixer from "autoprefixer";

export default {
    resolve: {
        extensions: ["*", ".js"]
    },

    devtool: "source-map",

    context: Path.resolve(__dirname, "./App"),
    entry: { main: "./index.js" },
    output: {
        path: Path.resolve(__dirname, "./wwwroot/dist"),
        filename: "[name].js",
        publicPath: "/dist/"
    },

    plugins: [
        new ExtractTextPlugin("[name].css")
    ],

    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: "url-loader?name=[name].[ext]" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?limit=25000&name=[name].[ext]" },
            { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },

            {
                test: /(\.css|\.scss|\.sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [Autoprefixer]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                //so I can use @import in my custom styles that are relative to the /styles folder
                                includePaths: [Path.resolve(__dirname, "./App/styles")],
                            }
                        }
                    ]
                })
            }
        ]
    }
};
