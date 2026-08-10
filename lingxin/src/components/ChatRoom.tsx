import { format } from 'date-fns'
import { ChevronLeft, MoreHorizontal, Smile, Mic, PlusCircle } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { CURRENT_USER_ID } from '../data/demo'

export function ChatRoom() {
  const {
    activeChatId,
    chats,
    users,
    closeChat,
    getChatMessages,
    sendMessage,
  } = useApp()
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const chat = chats.find((c) => c.id === activeChatId)
  const list = activeChatId ? getChatMessages(activeChatId) : []

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [list.length, activeChatId])

  if (!chat) return null

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    sendMessage(text)
    setText('')
  }

  return (
    <div className="chat-room">
      <header className="chat-room__header">
        <button type="button" className="icon-btn" onClick={closeChat} aria-label="返回">
          <ChevronLeft size={24} />
        </button>
        <div className="chat-room__title">
          <strong>{chat.title}</strong>
          {chat.type === 'group' && <span>{chat.memberIds.length} 人</span>}
        </div>
        <button type="button" className="icon-btn" aria-label="更多">
          <MoreHorizontal size={22} />
        </button>
      </header>

      <div className="chat-room__msgs">
        <AnimatePresence initial={false}>
          {list.map((msg, idx) => {
            const mine = msg.senderId === CURRENT_USER_ID
            const user = users[msg.senderId]
            const prev = list[idx - 1]
            const showTime =
              !prev || msg.timestamp - prev.timestamp > 5 * 60_000

            return (
              <div key={msg.id}>
                {showTime && (
                  <div className="msg-time">
                    {format(msg.timestamp, 'HH:mm')}
                  </div>
                )}
                <motion.div
                  className={`bubble-row ${mine ? 'is-mine' : ''}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22 }}
                >
                  {!mine && <img className="bubble-avatar" src={user?.avatar} alt="" />}
                  <div className="bubble-stack">
                    {chat.type === 'group' && !mine && (
                      <span className="bubble-name">{user?.name}</span>
                    )}
                    <div className={`bubble ${mine ? 'bubble--mine' : 'bubble--theirs'}`}>
                      {msg.text}
                    </div>
                  </div>
                  {mine && <img className="bubble-avatar" src={user?.avatar} alt="" />}
                </motion.div>
              </div>
            )
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <form className="composer" onSubmit={onSubmit}>
        <button type="button" className="icon-btn" aria-label="语音">
          <Mic size={22} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入消息"
          aria-label="消息内容"
        />
        <button type="button" className="icon-btn" aria-label="表情">
          <Smile size={22} />
        </button>
        {text.trim() ? (
          <button type="submit" className="send-btn">
            发送
          </button>
        ) : (
          <button type="button" className="icon-btn" aria-label="更多功能">
            <PlusCircle size={22} />
          </button>
        )}
      </form>
    </div>
  )
}
