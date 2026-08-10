import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

export function Login() {
  const { login, me } = useApp()

  return (
    <div className="login">
      <div className="login__glow login__glow--a" />
      <div className="login__glow login__glow--b" />
      <motion.div
        className="login__card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="login__brand"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="login__logo" aria-hidden>
            <span />
          </div>
          <h1>灵信</h1>
          <p>把重要的人，留在身边</p>
        </motion.div>

        <div className="login__profile">
          <img src={me.avatar} alt={me.name} />
          <div>
            <strong>{me.name}</strong>
            <span>微信风格演示账号</span>
          </div>
        </div>

        <motion.button
          className="login__btn"
          type="button"
          onClick={login}
          whileTap={{ scale: 0.98 }}
        >
          进入灵信
        </motion.button>
        <p className="login__hint">本地演示 · 消息会自动回复</p>
      </motion.div>
    </div>
  )
}
