import path from 'path'
import fs from 'fs'
import marked from 'marked'

const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}

export function md() {
  return {
    configureServer: [ // 开发
      async({ app }) => {
        // koa
        app.use(async(ctx, next) => {
          if (ctx.path.endsWith('.md')) {
            ctx.type = 'js'
            const filePath = path.join(process.cwd(), ctx.path)
            ctx.body = mdToJs(fs.readFileSync(filePath).toString())
          } else {
            await next()
          }
        })
      }
    ],
    transforms: [{ // 用于rollup // 插件 build  
      test: context => context.path.endsWith('.md'),
      transform: ({ code }) => mdToJs(code)
    }]
  }
}