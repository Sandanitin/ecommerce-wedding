import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }, [navigate])

  return null
}

export default Logout


