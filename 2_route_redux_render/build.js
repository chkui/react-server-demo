import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import koa from './koa'
import store from './middleware/store'
import entry from './middleware/entry'
const dir = eval('__dirname'), //编译时不执行，运行时在打包之后的环境获取相对位置
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

//页面模板
koa.use(views(viewsPath, {map: {html: 'ejs'}}))
//静态资源管理， js、css等
koa.use(serve(staticPath, {
    maxage: maxAge,
    gzip: gzip
}))
koa.use(store)
koa.use(entry)
koa.listen(port || 8080)
console.log(`\n Open up http://localhost:${port}/ in your browser.\n`)
