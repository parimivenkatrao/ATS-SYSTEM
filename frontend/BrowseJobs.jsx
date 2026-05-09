import {useState,useEffect} from 'react'
import api from './api'
import {useNavigate} from 'react-router-dom'

export default function BrowseJobs(){
const [jobs,setJobs]=useState([])
const [filteredJobs,setFilteredJobs]=useState([])
const [searchTerm,setSearchTerm]=useState('')
const [selectedJob,setSelectedJob]=useState(null)
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [skills,setSkills]=useState('')
const [score,setScore]=useState(null)
const [message,setMessage]=useState('')
const [messageType,setMessageType]=useState('')
const [currentPage,setCurrentPage]=useState(1)
const itemsPerPage=5
const nav=useNavigate()

const fetchJobs=async()=>{
try {
  let r=await api.get('jobs/')
  setJobs(r.data)
  setFilteredJobs(r.data)
} catch (error) {
  console.error('Error fetching jobs:', error)
  setMessage('Error fetching jobs')
  setMessageType('error')
}
}

useEffect(()=>{fetchJobs()},[])

useEffect(()=>{
  const filtered=jobs.filter(job=>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())||
    job.required_skills.toLowerCase().includes(searchTerm.toLowerCase())
  )
  setFilteredJobs(filtered)
  setCurrentPage(1)
},[searchTerm,jobs])

const apply=async()=>{
if(!name.trim() || !email.trim() || !skills.trim()){
  setMessage('Please fill in all fields')
  setMessageType('error')
  return
}
try {
  let r=await api.post('apply/',{job:selectedJob.id,name,email,skills})
  setScore(r.data.score)
  setMessage(`Application submitted! Score: ${r.data.score}%`)
  setMessageType('success')
  setName('')
  setEmail('')
  setSkills('')
  setSelectedJob(null)
} catch (error) {
  console.error('Error applying:', error)
  setMessage('Error submitting application')
  setMessageType('error')
}
}

const totalPages=Math.ceil(filteredJobs.length/itemsPerPage)
const startIdx=(currentPage-1)*itemsPerPage
const paginatedJobs=filteredJobs.slice(startIdx,startIdx+itemsPerPage)

return(<div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight:'100vh', padding:'20px'}}>
<div className="container">
<div className="nav-bar">
<h1>Job Opportunities</h1>
<div className="nav-buttons">
<button className="secondary" onClick={()=>nav('/')}>Home</button>
<button onClick={()=>nav('/notifications')}>Notifications</button>
</div>
</div>

<div className="search-bar">
<input placeholder="Search jobs by title or skills..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
<button onClick={()=>setCurrentPage(1)}>Search</button>
</div>

{message && <div className={`alert alert-${messageType}`}>{message}</div>}

{filteredJobs.length===0?
<div className="card" style={{textAlign:'center', padding:'40px'}}>
<p style={{color:'#6b7280', fontSize:'16px'}}>No jobs available matching your search</p>
</div>:
<>
<div>
{paginatedJobs.map(job=>(
<div key={job.id} className="card" onClick={()=>setSelectedJob(job)} style={{cursor:'pointer'}}>
<div className="card-header">
<h3 className="card-title">{job.title}</h3>
<span style={{color:'#6b7280', fontSize:'14px', fontWeight:'600'}}>ID: {job.id}</span>
</div>
<p className="card-subtitle">Required Skills: <strong>{job.required_skills}</strong></p>
</div>
))}
</div>

{totalPages>1 && <div className="pagination">
<button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}>Previous</button>
<span>Page {currentPage} of {totalPages}</span>
<button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}>Next</button>
</div>}
</>
}

{selectedJob && 
<div className="modal-overlay" onClick={()=>setSelectedJob(null)}>
<div className="modal" onClick={e=>e.stopPropagation()}>
<h2 className="modal-header">Apply for: {selectedJob.title}</h2>
<p style={{color:'#6b7280', marginBottom:'20px'}}>Required Skills: <strong>{selectedJob.required_skills}</strong></p>

<div className="form-group">
<label>Full Name</label>
<input placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)}/>
</div>

<div className="form-group">
<label>Email Address</label>
<input type="email" placeholder="john@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
</div>

<div className="form-group">
<label>Your Skills (comma separated)</label>
<textarea placeholder="JavaScript, React, TypeScript..." value={skills} onChange={e=>setSkills(e.target.value)} rows="4"/>
</div>

{message && <div className={`alert alert-${messageType}`}>{message}</div>}

<div className="modal-footer">
<button className="secondary" onClick={()=>setSelectedJob(null)}>Cancel</button>
<button onClick={apply}>Submit Application</button>
</div>
</div>
</div>
}
</div>
</div>)
}