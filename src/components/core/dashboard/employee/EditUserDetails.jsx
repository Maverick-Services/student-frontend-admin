import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { AddUser } from './AddUser';
import { ROLE } from '../../../../utils/constants';

export const EditUserDetails = () => {

  const {empId} = useParams();
  const {employees,setEmployees,user,editUser,setUser,setEditUser,loading,setLoading} = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState : {errors}
  } = useForm();

  const fetchUserDetails = ()=>{
    setLoading(true);
    // console.log(userId);
    // const result = null;
    const result = employees?.filter(em => em?._id == empId)[0];

    // const result = {
    //   name: "Abhay",
    //   email: "abhaygupta.kiit@gmail.com",
    //   phoneNo: "8700381153",
    //   role: ROLE.EMPLOYEE
    // }

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
    return <p>Loading ......</p>
  }

  return (
    <div className='w-full h-full'>
      {
        editUser && user && 
        <AddUser user={user} editUser={editUser}/>
      }
    </div>
  )
}
