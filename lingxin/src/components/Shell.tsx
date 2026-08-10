import { AnimatePresence, motion } from 'framer-motion'
import {
  Compass,
  MessageCircleMore,
  UserRound,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { TabId } from '../types'
import { ChatList } from './ChatList'
import { ChatRoom } from './ChatRoom'
import { Contacts } from './Contacts'
import { Discover } from './Discover'
import { Profile } from './Profile'

const tabs: { id: TabId; label: string; icon: typeof MessageCircleMore }[] = [
  { id: 'chats', label: '微信', icon: MessageCircleMore },
  { id: 'contacts', label: '通讯录', icon: Users },
  { id: 'discover', label: '发现', icon: Compass },
  { id: 'me', label: '我', icon: UserRound },
]

export function Shell() {
  const { activeTab, setActiveTab, activeChatId, totalUnread } = useApp()

  return (
    <div className="device">
      <div className="device__bezel">
        <div className="status-bar">
          <span>9:41</span>
          <span className="status-bar__notch" />
          <span className="status-bar__right">5G · 86%</span>
        </div>

        <div className="app-stage">
          <AnimatePresence mode="wait" initial={false}>
            {activeChatId ? (
              <motion.div
                key="room"
                className="stage-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              >
                <ChatRoom />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                className="stage-panel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {activeTab === 'chats' && <ChatList />}
                {activeTab === 'contacts' && <Contacts />}
                {activeTab === 'discover' && <Discover />}
                {activeTab === 'me' && <Profile />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!activeChatId && (
          <nav className="tabbar" aria-label="主导航">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`tabbar__item ${active ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tabbar__icon-wrap">
                    <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />
                    {tab.id === 'chats' && totalUnread > 0 && (
                      <i className="badge">{totalUnread > 99 ? '99+' : totalUnread}</i>
                    )}
                  </span>
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
