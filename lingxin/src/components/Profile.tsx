import {
  ChevronRight,
  Heart,
  QrCode,
  Settings,
  Wallet,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const rows = [
  { icon: Wallet, label: '服务', tone: 'amber' },
  { icon: Heart, label: '收藏', tone: 'rose' },
  { icon: QrCode, label: '名片与二维码', tone: 'sky' },
  { icon: Settings, label: '设置', tone: 'slate' },
]

export function Profile() {
  const { me, logout } = useApp()

  return (
    <div className="page page--me">
      <header className="me-hero">
        <img src={me.avatar} alt="" className="me-hero__avatar" />
        <div>
          <h2>{me.name}</h2>
          <p>灵信号：lingxin_{me.id}</p>
          <span>{me.signature}</span>
        </div>
      </header>

      <div className="me-list">
        {rows.map((row) => {
          const Icon = row.icon
          return (
            <button key={row.label} type="button" className="me-row">
              <span className={`me-row__icon tone-${row.tone}`}>
                <Icon size={18} />
              </span>
              <span className="me-row__label">{row.label}</span>
              <ChevronRight size={16} className="me-row__chev" />
            </button>
          )
        })}
      </div>

      <button type="button" className="logout-btn" onClick={logout}>
        退出登录
      </button>
    </div>
  )
}
