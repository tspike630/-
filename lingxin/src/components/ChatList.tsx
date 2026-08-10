import { format, isToday, isYesterday } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Plus, Search } from 'lucide-react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

function formatChatTime(ts: number) {
  const d = new Date(ts)
  if (isToday(d)) return format(d, 'HH:mm')
  if (isYesterday(d)) return '昨天'
  return format(d, 'M月d日', { locale: zhCN })
}

export function ChatList() {
  const { chats, messages, searchQuery, setSearchQuery, openChat } = useApp()

  const rows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return chats
      .filter((c) => !q || c.title.toLowerCase().includes(q))
      .map((chat) => {
        const last = messages.find((m) => m.id === chat.lastMessageId)
        return { chat, last }
      })
      .sort((a, b) => {
        if (a.chat.pinned !== b.chat.pinned) return a.chat.pinned ? -1 : 1
        return (b.last?.timestamp ?? 0) - (a.last?.timestamp ?? 0)
      })
  }, [chats, messages, searchQuery])

  return (
    <div className="page">
      <header className="page-header">
        <h2>灵信</h2>
        <button type="button" className="icon-btn" aria-label="发起聊天">
          <Plus size={20} />
        </button>
      </header>

      <div className="search-bar">
        <Search size={16} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索"
          aria-label="搜索聊天"
        />
      </div>

      <ul className="chat-list">
        {rows.map(({ chat, last }) => (
          <li key={chat.id}>
            <button type="button" className="chat-row" onClick={() => openChat(chat.id)}>
              <div className="avatar-wrap">
                <img src={chat.avatar} alt="" />
                {chat.unread > 0 && <i className="badge badge--dot">{chat.unread}</i>}
              </div>
              <div className="chat-row__body">
                <div className="chat-row__top">
                  <strong>
                    {chat.title}
                    {chat.pinned && <em className="pin">置顶</em>}
                  </strong>
                  <time>{last ? formatChatTime(last.timestamp) : ''}</time>
                </div>
                <p>{last?.text ?? '暂无消息'}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
