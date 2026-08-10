import { UserPlus, UsersRound } from 'lucide-react'
import { contactSections } from '../data/demo'
import { useApp } from '../context/AppContext'

export function Contacts() {
  const { users, chats, openChat } = useApp()

  const openPrivate = (userId: string) => {
    const chat = chats.find(
      (c) => c.type === 'private' && c.memberIds.includes(userId),
    )
    if (chat) openChat(chat.id)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h2>通讯录</h2>
        <button type="button" className="icon-btn" aria-label="添加朋友">
          <UserPlus size={20} />
        </button>
      </header>

      <div className="contact-shortcuts">
        <button type="button" className="shortcut">
          <span className="shortcut__icon shortcut__icon--green">
            <UserPlus size={18} />
          </span>
          新的朋友
        </button>
        <button type="button" className="shortcut">
          <span className="shortcut__icon shortcut__icon--jade">
            <UsersRound size={18} />
          </span>
          群聊
        </button>
      </div>

      <div className="contact-list">
        {contactSections.map((section) => (
          <section key={section.letter}>
            <h3>{section.letter}</h3>
            <ul>
              {section.ids.map((id) => {
                const user = users[id]
                return (
                  <li key={id}>
                    <button type="button" className="contact-row" onClick={() => openPrivate(id)}>
                      <img src={user.avatar} alt="" />
                      <div>
                        <strong>{user.remark || user.name}</strong>
                        <span>{user.signature}</span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
