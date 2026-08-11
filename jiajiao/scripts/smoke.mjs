import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'

async function freePort() {
  return await new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(0, () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        reject(new Error('无法分配端口'))
        return
      }
      const { port } = address
      server.close(() => resolve(port))
    })
    server.on('error', reject)
  })
}

const port = await freePort()
const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: new URL('..', import.meta.url).pathname,
  stdio: ['ignore', 'pipe', 'pipe'],
})

let ready = false
preview.stdout.on('data', (chunk) => {
  const text = String(chunk)
  if (text.includes('Local:') || text.includes(String(port))) ready = true
})
preview.stderr.on('data', (chunk) => {
  const text = String(chunk)
  if (text.includes('Local:') || text.includes(String(port))) ready = true
})

for (let i = 0; i < 40 && !ready; i += 1) {
  await delay(250)
}

if (!ready) {
  preview.kill('SIGTERM')
  throw new Error('预览服务启动超时')
}

const res = await fetch(`http://127.0.0.1:${port}/`)
const html = await res.text()
preview.kill('SIGTERM')

if (!res.ok) throw new Error(`首页状态码异常: ${res.status}`)
if (!html.includes('高俊杰')) throw new Error('首页缺少品牌文案')
if (!html.includes('/assets/')) throw new Error('首页缺少构建资源引用')

console.log('smoke ok')
