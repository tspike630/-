import { AppProvider, useApp } from './context/AppContext'
import { Login } from './components/Login'
import { Shell } from './components/Shell'
import './index.css'

function Gateway() {
  const { loggedIn } = useApp()
  return loggedIn ? <Shell /> : <Login />
}

export default function App() {
  return (
    <AppProvider>
      <div className="viewport">
        <div className="ambient" aria-hidden>
          <div className="ambient__orb ambient__orb--1" />
          <div className="ambient__orb ambient__orb--2" />
          <div className="ambient__mesh" />
        </div>
        <aside className="brand-panel">
          <p className="brand-panel__mark">LINGXIN</p>
          <h1>灵信</h1>
          <p className="brand-panel__lead">
            类似微信的即时通讯体验：聊天、通讯录、朋友圈，一屏演示。
          </p>
          <ul>
            <li>私聊 / 群聊消息</li>
            <li>通讯录与未读角标</li>
            <li>朋友圈点赞评论</li>
          </ul>
        </aside>
        <Gateway />
      </div>
    </AppProvider>
  )
}
