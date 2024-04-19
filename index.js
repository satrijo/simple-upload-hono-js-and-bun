import Index from './components'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { basicAuth } from 'hono/basic-auth'
import { Glob } from "bun";

const app = new Hono()
const glob = new Glob("**/*.{jpg,jpeg,png,gif,webp,svg}");

app.use('*', basicAuth({ username: 'aljabar', password: 'ci1994@' }))
app.use('/public/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
  let dataList = []
  for await (const file of glob.scan(".")) {
    dataList.push(file)
  }
  return c.html(<Index dataList={dataList} />)
})

app.get('/upload', (c) => {
  return c.redirect('/')
})

app.post('/upload', async (c) => {
  const body = await c.req.parseBody()
  const arrayBuffer = await body.image.arrayBuffer()

  const validFileTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ])

  const validateFileTypeImageOnly = (file) => validFileTypes.has(file.type)
  if (body.image) {
    if (validateFileTypeImageOnly(body.image)) {
      const randomId = Date.now()
      let data = Buffer.from(arrayBuffer)
      const path = 'public/images/'
      const save = path + randomId + '.jpeg'
      Bun.write(save, data)
      return c.redirect('/')
    } else {
      return c.json({ status: 'error', message: 'Invalid file type. Only images are allowed.' })
    }
  } else {
    return c.json({ status: 'error', message: 'No file uploaded.' })
  }
})


export default {
  fetch: app.fetch,
  port: 1994,
}
