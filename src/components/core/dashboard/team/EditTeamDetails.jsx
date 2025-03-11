import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { AddTeam } from './AddTeam';
import { fetchCompleteTeamDetails } from '../../../../services/operations/teamAPI';
import { fetchAllEmployees } from '../../../../services/operations/userAPI';
import { ShowTeamDetails } from './ShowTeamDetails';

export const EditTeamDetails = () => {

  const {teamId} = useParams();
  const {token,team,editTeam,setTeam,setEditTeam,loading,setLoading} = useContext(AuthContext);
  const [employees, setEmployees] = useState(null);
  const [showTeamDetails, setShowTeamDetails] = useState(true);

  const fetchTeamDetails = async(teamId)=>{
    setLoading(true);

    const result = await fetchCompleteTeamDetails({teamId},token);

    if(result){
      setTeam(result);
      setEditTeam(true);
    }
    setLoading(false);
  }

  const fetchEmployees = async()=>{
    // setLoading(true);
    const result = await fetchAllEmployees(token);
    if(result){
      setEmployees(result);
    }
   
    // setLoading(false);
  }

  useEffect(()=>{
    // console.log(editUser)
    fetchEmployees();
    if(teamId){
        fetchTeamDetails(teamId);
    }
  },[teamId])


  if(loading){
    return <p>Loading ......</p>
  }

  return (
    <div className='w-full h-full'>
      {
        showTeamDetails && team && 
        <ShowTeamDetails team={team} showTeamDetails={showTeamDetails} setShowTeamDetails={setShowTeamDetails} />
      }
      {
        !showTeamDetails &&
        editTeam && team && employees &&
        <AddTeam team={team} editTeam={editTeam} employees={employees} />
      }
    </div>
  )
}
