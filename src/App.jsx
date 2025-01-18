import Layout from './components/Layout'
import {Navigate} from 'react-router-dom'
export default function App() {
  const user = JSON.parse(localStorage.getItem('USER'))
  
  if(user === null){
    // redirect to login
    return <Navigate to="/login" replace/>
  }
  
  return(
    <Layout />
  )
}