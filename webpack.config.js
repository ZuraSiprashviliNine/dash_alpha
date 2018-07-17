
const path = require('path');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index.js')
    },
    outpupt: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        }]
    }
};