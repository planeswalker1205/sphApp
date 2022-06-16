const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    //关闭校验工具
    lintOnSave: false,
    devServer: {
        port: 8080,
        host: '127.0.0.1',
        // proxy: {
        //     '/api': {
        //         target: 'http://gmall-h5-api.atguigu.cn',
        //     }

        // }
    }
})