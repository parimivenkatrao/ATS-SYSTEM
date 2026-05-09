import {useState,useEffect} from 'react'
import api from './api'
import {useParams,useNavigate} from 'react-router-dom'

export default function Candidates(){
const {id}=useParams()
const [list,setList]=useState([])
const [filteredList,setFilteredList]=useState([])
const [minScore,setMinScore]=useState(0)
const [currentPage,setCurrentPage]=useState(1)
const itemsPerPage=10
const nav=useNavigate()

const fetch=async()=>{
try {
  let r=await api.get('candidates/'+id+'/')
  setList(r.data)
  setFilteredList(r.data)
} catch (error) {
  console.error('Error fetching candidates:', error)
}
}

useEffect(()=>{fetch()},[id])

useEffect(()=>{
  const filtered=list.filter(c=>c.score>=minScore)
  setFilteredList(filtered)
  setCurrentPage(1)
},[minScore,list])

const totalPages=Math.ceil(filteredList.length/itemsPerPage)
const startIdx=(currentPage-1)*itemsPerPage
const paginatedList=filteredList.slice(startIdx,startIdx+itemsPerPage)

const getScoreBadgeClass=score=>{
  if(score>=80) return 'score-high'
  if(score>=60) return 'score-medium'
  return 'score-low'
}

return(<div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight:'100vh', padding:'20px'}}>
<div className="container">
<div className="nav-bar">
<h1>Candidates for Job #{id}</h1>
<div className="nav-buttons">
<button className="secondary" onClick={()=>nav('/create-job')}>Create Job</button>
<button onClick={()=>nav('/browse-jobs')}>Browse Jobs</button>
<button onClick={()=>nav('/notifications')}>Notifications</button>
</div>
</div>

<div className="card">
<div className="filter-bar">
<label>Minimum Score:</label>
<input type="number" min="0" max="100" value={minScore} onChange={e=>setMinScore(Number(e.target.value))}/>
<span style={{color:'#6b7280'}}>Showing {filteredList.length} of {list.length} candidates</span>
</div>

{filteredList.length===0?
<div style={{textAlign:'center', padding:'40px', color:'#6b7280'}}>
<p>No candidates match the selected criteria</p>
</div>:
<>
<table>
<thead>
<tr>
<th>Candidate Name</th>
<th>Email</th>
<th>Skills</th>
<th>Match Score</th>
</tr>
</thead>
<tbody>
{paginatedList.map((c,i)=>(
<tr key={i}>
<td><strong>{c.candidate_name||'N/A'}</strong></td>
<td style={{color:'#667eea'}}>{c.candidate_email||'N/A'}</td>
<td style={{fontSize:'13px', color:'#6b7280'}}>{c.skills}</td>
<td><span className={`score-badge ${getScoreBadgeClass(c.score)}`}>{c.score.toFixed(1)}%</span></td>
</tr>
))}
</tbody>
</table>

{totalPages>1 && <div className="pagination">
<button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}>Previous</button>
<span>Page {currentPage} of {totalPages}</span>
<button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}>Next</button>
</div>}
</>
}
</div>
</div>
</div>)
}
