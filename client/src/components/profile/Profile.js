import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getProfileRequest} from '../../redux/actions/profile'



const Profile = () => {
    
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfileRequest(auth.user.id))
    },[])

    return (
        <div>
            
        </div>
    )
}

export default Profile
