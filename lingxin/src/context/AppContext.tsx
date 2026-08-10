import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  autoReplies,
  CURRENT_USER_ID,
  initialChats,
  initialMessages,
  initialMoments,
  users,
} from '../data/demo'
import type { Chat, Message, Moment, TabId, User } from '../types'

interface AppContextValue {
  loggedIn: boolean
  login: () => void
  logout: () => void
  me: User
  users: Record<string, User>
  chats: Chat[]
  messages: Message[]
  moments: Moment[]
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  activeChatId: string | null
  openChat: (chatId: string) => void
  closeChat: () => void
  sendMessage: (text: string) => void
  totalUnread: number
  getChatMessages: (chatId: string) => Message[]
  toggleMomentLike: (momentId: string) => void
  addMomentComment: (momentId: string, text: string) => void
  publishMoment: (text: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [chats, setChats] = useState(initialChats)
  const [messages, setMessages] = useState(initialMessages)
  const [moments, setMoments] = useState(initialMoments)
  const [activeTab, setActiveTab] = useState<TabId>('chats')
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const me = users[CURRENT_USER_ID]

  const totalUnread = useMemo(
    () => chats.reduce((sum, c) => sum + c.unread, 0),
    [chats],
  )

  const getChatMessages = useCallback(
    (chatId: string) =>
      messages
        .filter((m) => m.chatId === chatId)
        .sort((a, b) => a.timestamp - b.timestamp),
    [messages],
  )

  const openChat = useCallback((chatId: string) => {
    setActiveChatId(chatId)
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, unread: 0 } : c)),
    )
  }, [])

  const closeChat = useCallback(() => setActiveChatId(null), [])

  const sendMessage = useCallback(
    (text: string) => {
      if (!activeChatId || !text.trim()) return
      const trimmed = text.trim()
      const msg: Message = {
        id: uid('msg'),
        chatId: activeChatId,
        senderId: CURRENT_USER_ID,
        text: trimmed,
        timestamp: Date.now(),
        type: 'text',
      }

      setMessages((prev) => [...prev, msg])
      setChats((prev) => {
        const updated = prev.map((c) =>
          c.id === activeChatId ? { ...c, lastMessageId: msg.id } : c,
        )
        const target = updated.find((c) => c.id === activeChatId)
        const rest = updated.filter((c) => c.id !== activeChatId)
        return target ? [target, ...rest] : updated
      })

      const chat = chats.find((c) => c.id === activeChatId)
      if (!chat) return

      const peerId = chat.memberIds.find((id) => id !== CURRENT_USER_ID)
      if (!peerId || chat.type === 'group') {
        // group: pick a random member to reply after delay
        const others = chat.memberIds.filter((id) => id !== CURRENT_USER_ID)
        const replier = others[Math.floor(Math.random() * others.length)]
        const pool = autoReplies[replier] ?? ['收到']
        window.setTimeout(() => {
          const reply: Message = {
            id: uid('msg'),
            chatId: activeChatId,
            senderId: replier,
            text: pool[Math.floor(Math.random() * pool.length)],
            timestamp: Date.now(),
            type: 'text',
          }
          setMessages((prev) => [...prev, reply])
          setChats((prev) =>
            prev.map((c) =>
              c.id === activeChatId
                ? {
                    ...c,
                    lastMessageId: reply.id,
                    unread: activeChatId ? c.unread : c.unread + 1,
                  }
                : c,
            ),
          )
        }, 900 + Math.random() * 1200)
        return
      }

      const pool = autoReplies[peerId] ?? ['嗯嗯']
      window.setTimeout(() => {
        const reply: Message = {
          id: uid('msg'),
          chatId: activeChatId,
          senderId: peerId,
          text: pool[Math.floor(Math.random() * pool.length)],
          timestamp: Date.now(),
          type: 'text',
        }
        setMessages((prev) => [...prev, reply])
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeChatId ? { ...c, lastMessageId: reply.id } : c,
          ),
        )
      }, 800 + Math.random() * 1400)
    },
    [activeChatId, chats],
  )

  const toggleMomentLike = useCallback((momentId: string) => {
    setMoments((prev) =>
      prev.map((m) => {
        if (m.id !== momentId) return m
        const liked = m.likes.includes(CURRENT_USER_ID)
        return {
          ...m,
          likes: liked
            ? m.likes.filter((id) => id !== CURRENT_USER_ID)
            : [...m.likes, CURRENT_USER_ID],
        }
      }),
    )
  }, [])

  const addMomentComment = useCallback((momentId: string, text: string) => {
    if (!text.trim()) return
    setMoments((prev) =>
      prev.map((m) =>
        m.id === momentId
          ? {
              ...m,
              comments: [
                ...m.comments,
                { id: uid('cmt'), userId: CURRENT_USER_ID, text: text.trim() },
              ],
            }
          : m,
      ),
    )
  }, [])

  const publishMoment = useCallback((text: string) => {
    if (!text.trim()) return
    const moment: Moment = {
      id: uid('mo'),
      userId: CURRENT_USER_ID,
      text: text.trim(),
      images: [],
      timestamp: Date.now(),
      likes: [],
      comments: [],
    }
    setMoments((prev) => [moment, ...prev])
  }, [])

  const value: AppContextValue = {
    loggedIn,
    login: () => setLoggedIn(true),
    logout: () => {
      setLoggedIn(false)
      setActiveChatId(null)
      setActiveTab('chats')
    },
    me,
    users,
    chats,
    messages,
    moments,
    activeTab,
    setActiveTab,
    activeChatId,
    openChat,
    closeChat,
    sendMessage,
    totalUnread,
    getChatMessages,
    toggleMomentLike,
    addMomentComment,
    publishMoment,
    searchQuery,
    setSearchQuery,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
