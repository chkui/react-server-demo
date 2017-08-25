module.exports = {
    apps: [
        {
            //名称
            name: 'react-server-render',
            //要启动的文件路径
            script: './3_compress_ensure_render/dist/server/server.js',
            /**设定进程
             *0或'max'表示启用与cpu核心对应的进程.
             *-1表示启动比cpu核心少一个的进程
             *其他具体数字表示指定进程数目
             **/
            instances: 0,
            /**
             * 模式.
             * cluster：集群
             *
             */
            exec_mode: 'cluster',
            //环境配置
            env: {
                NODE_ENV: 'production'
            },
            //日志时间格式
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            //指定日志输出位置，Linux下注意权限问题
            out_file: './logs/out.log',
            error_file: './logs/err.log'
        },
    ]
}
