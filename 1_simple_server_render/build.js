import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import koa from './koa'
import middleware from './middleware'
const dir = eval('__dirname'), //编译时不执行，运行时在共同环境执行。
    port = 8080,
    maxAge = 86000,
    gzip = true,
    viewsPath = path.resolve(dir, '../views'),
    staticPath = path.resolve(dir, '../client'),
    log = console.log

log('views path:', viewsPath)
log('static path:', staticPath)
log('static cache age:', maxAge, 'milliseconds')
log(gzip ? 'gzip able' : 'gzip disable')

koa.use(views(viewsPath, {map: {html: 'ejs'}}))//页面模板配置
koa.use(serve(staticPath, { //静态资源配置
    maxage: maxAge,
    gzip: gzip
}))
koa.use(middleware)
koa.listen(port || 8080)
console.log(`\n Open up http://localhost:${port}/ in your browser.\n`)
