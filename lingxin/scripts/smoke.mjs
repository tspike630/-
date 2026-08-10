import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const log = []

try {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForSelector('.login__btn')
  log.push('login page: ok')

  await page.click('.login__btn')
  await page.waitForSelector('.chat-list')
  log.push('login click: ok')

  await page.click('.chat-row')
  await page.waitForSelector('.chat-room')
  log.push('open chat: ok')

  const before = await page.locator('.bubble--theirs').count()
  await page.fill('.composer input', '你好呀')
  await page.click('.send-btn')
  await page.waitForTimeout(200)
  const mine = await page.locator('.bubble--mine').filter({ hasText: '你好呀' }).count()
  if (mine < 1) throw new Error('sent message not found')
  log.push('send message: ok')

  await page.waitForFunction(
    (prev) => document.querySelectorAll('.bubble--theirs').length > prev,
    before,
    { timeout: 5000 },
  )
  log.push('auto-reply: ok')

  await page.click('.chat-room__header .icon-btn')
  await page.waitForSelector('.chat-list')
  log.push('back nav: ok')

  await page.click('.tabbar__item:nth-child(2)')
  await page.waitForSelector('.contact-list')
  log.push('contacts tab: ok')

  await page.click('.tabbar__item:nth-child(3)')
  await page.waitForSelector('.moments')
  log.push('discover tab: ok')

  await page.click('.tabbar__item:nth-child(4)')
  await page.waitForSelector('.me-hero')
  log.push('me tab: ok')

  console.log('PASS\n' + log.join('\n'))
} catch (err) {
  console.error('FAIL\n' + log.join('\n'))
  console.error(String(err))
  await page.screenshot({ path: '/tmp/lingxin-fail.png', fullPage: true })
  process.exitCode = 1
} finally {
  await browser.close()
}
