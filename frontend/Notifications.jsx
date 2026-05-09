import { useState, useEffect } from 'react'
import api from './api'
import { useNavigate } from 'react-router-dom'

export default function Notifications() {
    const [list, setList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8
    const nav = useNavigate()

    const load = async () => {
        try {
            let r = await api.get('notifications/')
            setList(r.data)
        } catch (error) {
            console.error('Error loading notifications:', error)
        }
    }

    useEffect(() => { load() }, [])

    const markAsRead = async (id) => {
        try {
            await api.patch(`notifications/${id}/`, { is_read: true })
            setList(list.map(n => n.id === id ? { ...n, is_read: true } : n))
        } catch (error) {
            console.error('Error marking notification:', error)
        }
    }

    const markAsUnread = async (id) => {
        try {
            await api.patch(`notifications/${id}/`, { is_read: false })
            setList(list.map(n => n.id === id ? { ...n, is_read: false } : n))
        } catch (error) {
            console.error('Error marking notification:', error)
        }
    }

    const totalPages = Math.ceil(list.length / itemsPerPage)
    const startIdx = (currentPage - 1) * itemsPerPage
    const paginatedList = list.slice(startIdx, startIdx + itemsPerPage)
    const unreadCount = list.filter(n => !n.is_read).length

    const formatDate = dateString => {
        const date = new Date(dateString)
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (<div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px' }}>
        <div className="container">
            <div className="nav-bar">
                <h1>Notifications {unreadCount > 0 && <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '14px', marginLeft: '10px' }}>{unreadCount}</span>}</h1>
                <div className="nav-buttons">
                    <button className="secondary" onClick={() => nav('/create-job')}>Create Job</button>
                    <button onClick={() => nav('/browse-jobs')}>Browse Jobs</button>
                    <button onClick={() => nav('/')}>Home</button>
                </div>
            </div>

            {list.length === 0 ?
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>No notifications yet</p>
                </div> :
                <>
                    <div>
                        {paginatedList.map(n => (
                            <div key={n.id} className="card" style={{ borderLeft: `4px solid ${n.is_read ? '#e5e7eb' : '#667eea'}`, background: n.is_read ? '#f9fafb' : 'white' }}>
                                <div className="card-header">
                                    <div>
                                        <p style={{ margin: 0, color: '#1f2937', fontWeight: '600' }}>{n.message}</p>
                                        <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '13px' }}>
                                            {n.created_at ? formatDate(n.created_at) : 'Just now'}
                                        </p>
                                    </div>
                                    <div>
                                        {!n.is_read ?
                                            <button className="secondary" onClick={() => markAsRead(n.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Mark Read</button> :
                                            <button className="secondary" onClick={() => markAsUnread(n.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Mark Unread</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                    </div>}
                </>
            }
        </div>
    </div>)
}
