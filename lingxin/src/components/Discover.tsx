import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Camera, Heart, MessageCircle, ChevronRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { CURRENT_USER_ID } from '../data/demo'

export function Discover() {
  const {
    moments,
    users,
    me,
    toggleMomentLike,
    addMomentComment,
    publishMoment,
  } = useApp()
  const [showComposer, setShowComposer] = useState(false)
  const [draft, setDraft] = useState('')
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [openComment, setOpenComment] = useState<string | null>(null)

  const onPublish = (e: FormEvent) => {
    e.preventDefault()
    publishMoment(draft)
    setDraft('')
    setShowComposer(false)
  }

  return (
    <div className="page page--discover">
      <header className="page-header page-header--plain">
        <h2>发现</h2>
        <button
          type="button"
          className="icon-btn"
          aria-label="发朋友圈"
          onClick={() => setShowComposer(true)}
        >
          <Camera size={20} />
        </button>
      </header>

      <button type="button" className="moments-entry" onClick={() => setShowComposer(true)}>
        <div className="moments-entry__cover">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80"
            alt=""
          />
          <div className="moments-entry__me">
            <strong>{me.name}</strong>
            <img src={me.avatar} alt="" />
          </div>
        </div>
      </button>

      <div className="menu-row">
        <span>朋友圈</span>
        <ChevronRight size={16} />
      </div>

      <div className="moments">
        {moments.map((moment) => {
          const author = users[moment.userId]
          const liked = moment.likes.includes(CURRENT_USER_ID)
          return (
            <article key={moment.id} className="moment">
              <img className="moment__avatar" src={author.avatar} alt="" />
              <div className="moment__body">
                <strong>{author.name}</strong>
                <p>{moment.text}</p>
                {moment.images.length > 0 && (
                  <div
                    className={`moment__grid ${
                      moment.images.length === 1 ? 'is-single' : ''
                    }`}
                  >
                    {moment.images.map((src) => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                )}
                <div className="moment__meta">
                  <time>
                    {formatDistanceToNow(moment.timestamp, {
                      addSuffix: true,
                      locale: zhCN,
                    })}
                  </time>
                  <div className="moment__actions">
                    <button
                      type="button"
                      className={liked ? 'is-liked' : ''}
                      onClick={() => toggleMomentLike(moment.id)}
                      aria-label="点赞"
                    >
                      <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenComment((id) => (id === moment.id ? null : moment.id))
                      }
                      aria-label="评论"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>

                {(moment.likes.length > 0 || moment.comments.length > 0) && (
                  <div className="moment__social">
                    {moment.likes.length > 0 && (
                      <div className="moment__likes">
                        <Heart size={12} fill="currentColor" />
                        {moment.likes.map((id) => users[id]?.name).join('、')}
                      </div>
                    )}
                    {moment.comments.map((c) => (
                      <div key={c.id} className="moment__comment">
                        <em>{users[c.userId]?.name}</em>：{c.text}
                      </div>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {openComment === moment.id && (
                    <motion.form
                      className="moment__composer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={(e) => {
                        e.preventDefault()
                        addMomentComment(moment.id, commentDrafts[moment.id] ?? '')
                        setCommentDrafts((prev) => ({ ...prev, [moment.id]: '' }))
                        setOpenComment(null)
                      }}
                    >
                      <input
                        value={commentDrafts[moment.id] ?? ''}
                        onChange={(e) =>
                          setCommentDrafts((prev) => ({
                            ...prev,
                            [moment.id]: e.target.value,
                          }))
                        }
                        placeholder="说点什么..."
                        autoFocus
                      />
                      <button type="submit">发送</button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </article>
          )
        })}
      </div>

      <AnimatePresence>
        {showComposer && (
          <motion.div
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              className="sheet__panel"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onSubmit={onPublish}
            >
              <header>
                <button type="button" onClick={() => setShowComposer(false)}>
                  取消
                </button>
                <strong>发朋友圈</strong>
                <button type="submit" className="sheet__publish">
                  发表
                </button>
              </header>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="这一刻的想法..."
                rows={6}
                autoFocus
              />
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
