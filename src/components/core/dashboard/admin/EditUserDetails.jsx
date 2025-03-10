import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { AddAdmin } from './AddUser';
import { ROLE } from '../../../../utils/constants';

export const EditAdminDetails = () => {

  const {userId} = useParams();
  const {user,editUser,setUser,setEditUser,loading,setLoading} = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState : {errors}
  } = useForm();

  const fetchUserDetails = (userId)=>{
    setLoading(true);
    // console.log(userId);
    // const result = null;

    const result = {
      name: "Abhay",
      email: "abhaygupta.kiit@gmail.com",
      phoneNo: "8700381153",
      role: ROLE.EMPLOYEE
    }

    if(result){
      setUser(result);
      setEditUser(true);
    }
    setLoading(false);
  }

  useEffect(()=>{
    // console.log(editUser)
    if(userId){
        fetchUserDetails(userId);
    }
  },[userId])


  if(loading){
    return <p>Loading ......</p>
  }

  return (
    <div className='w-full h-full'>
      {
        editUser && user && 
        <AddAdmin/>
      }
    </div>
  )
}
