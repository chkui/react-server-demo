'use strict';
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from './app'

async function middleware(ctx, next) {
    console.log('url:', ctx.url)
    if(ctx.url === '/'){
        const dom = renderToString(<App/>)
        await ctx.render('index', {
            root: dom
        })
    }else {
        return next();
    }
}

module.exports = middleware
module.exports.default = module.exports
