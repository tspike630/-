import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import portrait from './assets/gao-junjie.jpg'
import './index.css'

const subjects = [
  {
    title: '数学',
    detail: '2024、2025 年全国一卷均稳定在 135 分左右，擅长把错题拆成可重复的解题路径。',
  },
  {
    title: '英语',
    detail: '成绩稳定 125+，重视词汇积累节奏与阅读理解的取分顺序，让分数不再忽高忽低。',
  },
  {
    title: '物理',
    detail: '稳定在 85 分左右，强调模型识别与受力分析，先抓主干分再冲击压轴。',
  },
  {
    title: '生物',
    detail: '裸分 80+，用知识框架串联细节，减少死记硬背带来的遗忘和丢分。',
  },
]

const methods = [
  {
    title: '先诊断，再开方',
    detail: '不是盲目刷题，而是先找丢分点：概念不清、计算失误，还是时间分配崩盘。',
  },
  {
    title: '从低分往上爬的体系',
    detail: '亲身经历过 559 到 623 的爬升，知道中段学生真正卡住的地方，也知道怎么一点点抬起来。',
  },
  {
    title: '可带走的学习习惯',
    detail: '每次课留下可执行的复习动作：错题回炉、限时训练、周复盘，让提分发生在课后。',
  },
]

const reviews = [
  {
    quote: '以前数学总在 90 分附近晃，跟俊杰哥学了一个月，月考直接到 118。他说清楚了我到底卡在哪一步。',
    name: '林同学',
    meta: '高二 · 数学',
  },
  {
    quote: '英语阅读老是读完没印象。他教我先抓题干再回原文，现在稳定 125 以上，不再靠运气。',
    name: '赵同学',
    meta: '高三 · 英语',
  },
  {
    quote: '物理一到大题就慌。他带着我练模型归类，现在中档题基本不丢，分数稳了很多。',
    name: '陈同学',
    meta: '高一 · 物理',
  },
]

const contacts = [
  { label: 'QQ', value: '2416807628' },
  { label: '微信', value: 'wxid_6zf43jv298pg22' },
]

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const input = document.createElement('textarea')
    input.value = text
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.left = '-9999px'
    document.body.appendChild(input)
    input.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(input)
    return ok
  }
}

export default function App() {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (value: string) => {
    const ok = await copyText(value)
    if (ok) {
      setCopied(value)
      window.setTimeout(() => setCopied(null), 1600)
    }
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top">
          高俊杰家教
        </a>
        <a className="nav-cta" href="#contact">
          预约试听
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-inner">
            <motion.p
              className="hero-brand"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              高俊杰
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              你是否也有着难以提分的痛苦？
            </motion.h1>
            <motion.p
              className="hero-lead"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              课听懂了，题还是不会做；越刷越慌，分数却停在原地。面向初一到高三，用走过低谷的方法，帮你一点点把分抬上去。
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <a className="btn-primary" href="#about">
                认识这位老师
              </a>
              <a className="btn-ghost" href="#contact">
                查看价格与联系方式
              </a>
            </motion.div>
            <div className="scroll-hint" aria-hidden="true">
              <span />
              下滑继续
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-inner">
            <Reveal>
              <p className="eyebrow">Introducing</p>
              <h2 className="section-title">认识高俊杰</h2>
              <p className="section-lead">
                大一新生，思沁高级中学复读经历。校内年纪排名长期稳定前五十；今年高考 623 分（发挥失常），也正因如此，更懂考场失利后的心态与复盘。
              </p>
            </Reveal>

            <div className="about-grid">
              <Reveal>
                <figure className="portrait-wrap">
                  <img
                    src={portrait}
                    alt="家教老师高俊杰肖像"
                    width={768}
                    height={1024}
                  />
                  <figcaption className="portrait-caption">高俊杰 · 数理英生家教</figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="about-copy">
                  <h3>从 559 爬到更高处的人，更适合带你走出瓶颈</h3>
                  <p>
                    2025 年高考成绩只有 559 分。那一年之后，他沉淀出一套从低分往上爬的学习体系：先稳住基础分，再攻中档题，最后才碰压轴。
                  </p>
                  <p>
                    擅长数学、英语、物理、生物，服务对象覆盖初一到高三。不是灌输标准答案，而是把「怎么学」交到学生手里。
                  </p>
                  <dl className="score-row">
                    <div className="score-item">
                      <dt>今年高考</dt>
                      <dd>623</dd>
                    </div>
                    <div className="score-item">
                      <dt>复读前高考</dt>
                      <dd>559</dd>
                    </div>
                    <div className="score-item">
                      <dt>校内排名</dt>
                      <dd>前五十</dd>
                    </div>
                    <div className="score-item">
                      <dt>授课年级</dt>
                      <dd>初一—高三</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section strengths" id="strengths">
          <div className="section-inner">
            <Reveal>
              <p className="eyebrow">Subjects</p>
              <h2 className="section-title">四科优势，看得见的分数底气</h2>
              <p className="section-lead">
                用自己的成绩轨迹说话：稳定输出比偶尔爆发更重要，提分靠的是可复制的方法。
              </p>
            </Reveal>
            <ul className="subject-list">
              {subjects.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <li>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="section method" id="method">
          <div className="section-inner">
            <Reveal>
              <p className="eyebrow">Method</p>
              <h2 className="section-title">不是鸡血，是能落地的提分路径</h2>
              <p className="section-lead">
                走过低谷的人，更明白「听懂」和「考得出」中间隔着什么。
              </p>
            </Reveal>
            <div className="method-steps">
              {methods.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article className="method-step">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="section-inner">
            <Reveal>
              <p className="eyebrow">Voices</p>
              <h2 className="section-title">学生们怎么说</h2>
              <p className="section-lead">
                真实课堂节奏的回响：讲清楚卡点，练到位动作，分数才会跟着动。
              </p>
            </Reveal>
            <ul className="review-list">
              {reviews.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.08}>
                  <li>
                    <figure>
                      <blockquote>「{item.quote}」</blockquote>
                      <figcaption>
                        <strong>{item.name}</strong>
                        {item.meta}
                      </figcaption>
                    </figure>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="section-inner">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">开始这一次提分对话</h2>
              <p className="section-lead">
                价格透明，沟通直接。先说清你的年级、短板科目和最近几次成绩，我们再一起排课。
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="price-block">
                <div className="price-tag">
                  <span className="amount">60</span>
                  <span className="unit">元 / 小时 · 初一至高三</span>
                </div>
                <ul className="contact-list">
                  {contacts.map((item) => (
                    <li key={item.label}>
                      <span className="label">{item.label}</span>
                      <span className="value">{item.value}</span>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => handleCopy(item.value)}
                      >
                        {copied === item.value ? '已复制' : '复制'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>高俊杰家教</strong>
        {' · '}数学 / 英语 / 物理 / 生物 · 欢迎初一到高三同学咨询
      </footer>
    </div>
  )
}
