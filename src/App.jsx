import Layout from './components/Layout'
export default function App() {
  const user = JSON.parse(localStorage.getItem('USER'))
  
  if(user === null){
    // redirect to login
    window.location.pathname = "/login"; 
    return
  }
  
  return(
    <Layout />
  )
}