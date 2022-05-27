module.exports = {
    //关闭eslint语法
    lintOnSave: false,
    devServer: {
        //添加代理服务器
        proxy: {
            '/api': {
                //设置服务器地址
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },
}