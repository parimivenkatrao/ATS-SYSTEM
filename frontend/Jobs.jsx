import {useState} from 'react'
import api from './api'
import {useNavigate} from 'react-router-dom'

export default function CreateJob(){
const [title,setTitle]=useState('')
const [skills,setSkills]=useState('')
const [id,setId]=useState('')
const nav=useNavigate()

const create=async()=>{
try {
  let r=await api.post('jobs/create/',{title,required_skills:skills})
  setId(r.data.id)
} catch (error) {
  console.error('Error creating job:', error)
}
}

return(<div>
<input placeholder="title" onChange={e=>setTitle(e.target.value)}/>
<input placeholder="skills" onChange={e=>setSkills(e.target.value)}/>
<button onClick={create}>create</button>
<button onClick={()=>nav('/candidates/'+id)}>candidates</button>
<button onClick={()=>nav('/notifications')}>notifications</button>
</div>)
}
