import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login.jsx'
import CreateJob from './CreateJob.jsx'
import BrowseJobs from './BrowseJobs.jsx'
import Candidates from './Candidates.jsx'
import Notifications from './Notifications.jsx'

export default function App(){
return(<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/create-job" element={<CreateJob/>}/>
<Route path="/browse-jobs" element={<BrowseJobs/>}/>
<Route path="/candidates/:id" element={<Candidates/>}/>
<Route path="/notifications" element={<Notifications/>}/>
</Routes></BrowserRouter>)
}
