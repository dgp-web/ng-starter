const path = require('path');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;

const distDirectory = './wwwroot';

module.exports = {

    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },

    stats: "errors-only",

    context: __dirname,

    output: {
        path: path.join(__dirname, distDirectory),
        filename: '[name].js'
    },

};
