import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Posts from '../components/profile/Posts'
import Signup from './Register'
const Home = () => {

    const user = useSelector((state)=>state.users.user)
  return (
    <div>
        {}
    </div>
  
  )
}

export default Home