import { useNavigate } from 'react-router-dom'

export default function Login() {
    const nav = useNavigate()
    return (<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
            <h1 style={{ color: '#667eea', marginBottom: '10px', fontSize: '32px' }}>Applicant Tracking System</h1>
            <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>Manage Job Applications</p>
            <p style={{ color: '#374151', marginBottom: '25px', fontWeight: '600' }}>Select your role to continue:</p>
            <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                <button onClick={() => nav('/create-job')} style={{ padding: '15px', fontSize: '16px', background: '#667eea' }}>Recruiter Dashboard</button>
                <button onClick={() => nav('/browse-jobs')} style={{ padding: '15px', fontSize: '16px', background: '#764ba2' }}>Candidate Portal</button>
            </div>
        </div>
    </div>)
}
