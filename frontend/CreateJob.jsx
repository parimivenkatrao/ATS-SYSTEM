import { useState } from 'react'
import api from './api'
import { useNavigate } from 'react-router-dom'

export default function CreateJob() {
    const [title, setTitle] = useState('')
    const [skills, setSkills] = useState('')
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const nav = useNavigate()

    const create = async () => {
        if (!title.trim() || !skills.trim()) {
            setMessage('Please fill in all fields')
            setMessageType('error')
            return
        }
        try {
            let r = await api.post('jobs/create/', { title, required_skills: skills })
            setId(r.data.id)
            setMessage('Job created successfully!')
            setMessageType('success')
            setTitle('')
            setSkills('')
        } catch (error) {
            console.error('Error creating job:', error)
            setMessage('Error creating job')
            setMessageType('error')
        }
    }

    return (<div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px' }}>
        <div className="container">
            <div className="nav-bar">
                <h1>Recruiter Dashboard</h1>
                <div className="nav-buttons">
                    <button className="secondary" onClick={() => nav('/')}>Home</button>
                    <button onClick={() => nav('/notifications')}>Notifications</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                <div className="card">
                    <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Create New Job</h2>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input placeholder="e.g., Software Engineer" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Required Skills</label>
                        <textarea placeholder="e.g., Django,MySQL,JavaScript, React, TypeScript, Node.js" value={skills} onChange={e => setSkills(e.target.value)} rows="4" />
                    </div>
                    <button onClick={create} style={{ width: '100%' }}>Create Job</button>
                    {message && <div className={`alert alert-${messageType}`} style={{ marginTop: '15px' }}>{message}</div>}
                </div>

                {id && <div className="card">
                    <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Job Created Successfully</h2>
                    <p style={{ color: '#6b7280', marginBottom: '15px' }}>Job ID: <strong>{id}</strong></p>
                    <p style={{ color: '#6b7280', marginBottom: '15px' }}>Title: <strong>{title}</strong></p>
                    <button onClick={() => nav('/candidates/' + id)} style={{ width: '100%', marginBottom: '10px' }}>View Candidates</button>
                    <button className="secondary" onClick={() => { setId(''); setTitle(''); setSkills(''); }} style={{ width: '100%' }}>Create Another</button>
                </div>}
            </div>
        </div>
    </div>)
}