const path = require('path')

module.exports = {
    runtimeCompiler: true,
    outputDir: path.resolve(__dirname, '../public'),
    devServer: {
        proxy: {
            "api": {
                target: 'http://localhost:3000',
                changeOrigin: true,                
                logLevel: "debug",
            }
        }
    }
}