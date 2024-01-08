import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import Posts from '../components/profile/Posts'
import Signup from './Signup'
const Home = () => {

    const user = useSelector((state)=>state.users.user)
  return (
    <div>
        {!user ?   <Posts /> : <Signup />}
    </div>
  
  )
}

export default Home