export type TabId = 'chats' | 'contacts' | 'discover' | 'me'

export interface User {
  id: string
  name: string
  avatar: string
  remark?: string
  signature?: string
  region?: string
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  text: string
  timestamp: number
  type: 'text' | 'system'
}

export interface Chat {
  id: string
  type: 'private' | 'group'
  title: string
  avatar: string
  memberIds: string[]
  lastMessageId?: string
  unread: number
  pinned?: boolean
  muted?: boolean
}

export interface MomentComment {
  id: string
  userId: string
  text: string
}

export interface Moment {
  id: string
  userId: string
  text: string
  images: string[]
  timestamp: number
  likes: string[]
  comments: MomentComment[]
}
