import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { AddUser } from './AddUser';
import { ROLE } from '../../../../utils/constants';
import { fetchCompleteUserDetails } from '../../../../services/operations/userAPI';
import { ShowUserDetails } from './ShowUserDetails';
import { Spinner } from '../../../common/Spinner';

export const EditUserDetails = () => {

  const {empId} = useParams();
  const {user,editUser,setUser,setEditUser,loading,setLoading,token} = useContext(AuthContext);
  const [showUserDetails, setShowUserDetails] = useState(true);

  const fetchUserDetails = async()=>{
    setLoading(true);

    const result = await fetchCompleteUserDetails({userId:empId},token);

    if(result){
      setUser(result);
      setEditUser(true);
    }
    setLoading(false);
  }

  useEffect(()=>{
    // console.log(editUser)
    if(empId){
      fetchUserDetails();
    }
  },[empId])


  if(loading){
    return <Spinner/>
  }

  return (
    <div className='w-full h-full'>
      {
        showUserDetails && user &&
        <ShowUserDetails user={user} showUserDetails={showUserDetails} setShowUserDetails={setShowUserDetails} />
      }

      {
        !showUserDetails &&
        editUser && user && 
        <AddUser user={user} editUser={editUser}/>
      }
    </div>
  )
}
