import type { Chat, Message, Moment, User } from '../types'

export const CURRENT_USER_ID = 'me'

export const users: Record<string, User> = {
  me: {
    id: 'me',
    name: '陈晓舟',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Xiaozhou&backgroundColor=b6e3f4',
    signature: '慢慢来，比较快',
    region: '上海',
  },
  u1: {
    id: 'u1',
    name: '林夏',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=LinXia&backgroundColor=c0aede',
    remark: '林夏',
    signature: '今天也要好好吃饭',
    region: '杭州',
  },
  u2: {
    id: 'u2',
    name: '老周',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=LaoZhou&backgroundColor=ffd5dc',
    remark: '周工',
    signature: '代码能跑就是艺术',
    region: '深圳',
  },
  u3: {
    id: 'u3',
    name: '阿宁',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=ANing&backgroundColor=d1f4d1',
    signature: '周末去哪儿',
    region: '成都',
  },
  u4: {
    id: 'u4',
    name: '苏晚',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=SuWan&backgroundColor=ffdfbf',
    signature: '拍照记录日常',
    region: '北京',
  },
  u5: {
    id: 'u5',
    name: '产品小组',
    avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Product&backgroundColor=07c160',
    signature: '群聊',
    region: '',
  },
}

const now = Date.now()
const m = (mins: number) => now - mins * 60_000

export const initialChats: Chat[] = [
  {
    id: 'c1',
    type: 'private',
    title: '林夏',
    avatar: users.u1.avatar,
    memberIds: ['me', 'u1'],
    lastMessageId: 'm1-4',
    unread: 2,
    pinned: true,
  },
  {
    id: 'c2',
    type: 'group',
    title: '产品小组',
    avatar: users.u5.avatar,
    memberIds: ['me', 'u2', 'u3', 'u4'],
    lastMessageId: 'm2-3',
    unread: 5,
  },
  {
    id: 'c3',
    type: 'private',
    title: '周工',
    avatar: users.u2.avatar,
    memberIds: ['me', 'u2'],
    lastMessageId: 'm3-2',
    unread: 0,
  },
  {
    id: 'c4',
    type: 'private',
    title: '阿宁',
    avatar: users.u3.avatar,
    memberIds: ['me', 'u3'],
    lastMessageId: 'm4-1',
    unread: 0,
  },
  {
    id: 'c5',
    type: 'private',
    title: '苏晚',
    avatar: users.u4.avatar,
    memberIds: ['me', 'u4'],
    lastMessageId: 'm5-1',
    unread: 1,
  },
]

export const initialMessages: Message[] = [
  { id: 'm1-1', chatId: 'c1', senderId: 'u1', text: '晚上有空吗？想约你喝咖啡', timestamp: m(180), type: 'text' },
  { id: 'm1-2', chatId: 'c1', senderId: 'me', text: '可以啊，你定地方？', timestamp: m(175), type: 'text' },
  { id: 'm1-3', chatId: 'c1', senderId: 'u1', text: '武康路那家新开的怎么样', timestamp: m(12), type: 'text' },
  { id: 'm1-4', chatId: 'c1', senderId: 'u1', text: '七点半见？', timestamp: m(10), type: 'text' },

  { id: 'm2-1', chatId: 'c2', senderId: 'u2', text: '明天需求评审提前到十点', timestamp: m(90), type: 'text' },
  { id: 'm2-2', chatId: 'c2', senderId: 'u4', text: '收到，我把原型先发群里', timestamp: m(85), type: 'text' },
  { id: 'm2-3', chatId: 'c2', senderId: 'u3', text: '灵信这版聊天页动效不错 👍', timestamp: m(40), type: 'text' },

  { id: 'm3-1', chatId: 'c3', senderId: 'u2', text: '接口文档我更新了，你看下', timestamp: m(1440), type: 'text' },
  { id: 'm3-2', chatId: 'c3', senderId: 'me', text: '好的，晚上看', timestamp: m(1400), type: 'text' },

  { id: 'm4-1', chatId: 'c4', senderId: 'u3', text: '周末爬山吗？', timestamp: m(2880), type: 'text' },

  { id: 'm5-1', chatId: 'c5', senderId: 'u4', text: '发你几张昨天拍的照片', timestamp: m(60), type: 'text' },
]

export const initialMoments: Moment[] = [
  {
    id: 'mo1',
    userId: 'u1',
    text: '初春的风有点温柔，路边的玉兰都开了。',
    images: [
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
      'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80',
    ],
    timestamp: m(120),
    likes: ['u2', 'me'],
    comments: [
      { id: 'mc1', userId: 'u3', text: '好美！在哪里拍的' },
      { id: 'mc2', userId: 'u1', text: '武康路附近' },
    ],
  },
  {
    id: 'mo2',
    userId: 'u4',
    text: '新相机试拍，城市夜色真的很有层次。',
    images: ['https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80'],
    timestamp: m(400),
    likes: ['u1', 'u3'],
    comments: [{ id: 'mc3', userId: 'me', text: '光影绝了' }],
  },
  {
    id: 'mo3',
    userId: 'u2',
    text: '周五了，今晚不写代码，只写心情。',
    images: [],
    timestamp: m(800),
    likes: ['me', 'u4', 'u3'],
    comments: [],
  },
]

export const autoReplies: Record<string, string[]> = {
  u1: ['好呀～', '那到时候见！', '路上注意安全哦', '哈哈你真有意思'],
  u2: ['收到', '我这边同步一下', '晚点回你', '可以，按这个方案走'],
  u3: ['冲！', '周末见', '哈哈哈', '等你消息'],
  u4: ['照片稍后发你', '灵感来了～', '嗯嗯', '好可爱'],
}

export const contactSections = [
  { letter: 'A', ids: ['u3'] },
  { letter: 'L', ids: ['u1'] },
  { letter: 'S', ids: ['u4'] },
  { letter: 'Z', ids: ['u2'] },
]
