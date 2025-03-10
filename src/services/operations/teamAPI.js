import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { teamEndpoints } from "../apis";


const {
    CREATE_TEAM_API,
    EDIT_TEAM_API,
    FETCH_ALL_TEAMS_API,
    FETCH_COMPLETE_TEAM_DETAILS_API
} = teamEndpoints

export const createTeam = async(formData,token)=>{
    let toastId = toast.loading("Creating Team")
    try {
        
        const response = await apiConnector(
            "POST",
            CREATE_TEAM_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("CREATE_TEAM_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("CREATE_TEAM_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const editTeamDetails = async(formData,token)=>{
    let toastId = toast.loading("Editing Team")
    try {
        
        const response = await apiConnector(
            "PUT",
            EDIT_TEAM_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("EDIT_TEAM_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("EDIT_TEAM_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const fetchAllTeams = async(token)=>{
    try {
        
        const response = await apiConnector(
            "GET",
            FETCH_ALL_TEAMS_API,
            null,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_ALL_TEAMS_API_RESPONSE:",response);
        toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_ALL_TEAMS_API_ERROR:",err);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}

export const fetchCompleteTeamDetails = async(formData,token)=>{
    let toastId = toast.loading("fetching details");
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_TEAM_DETAILS_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        toast.dismiss(toastId);
        // console.log("FETCH_COMPLETE_TEAM_DETAILS_API_RESPONSE",response);
        return response?.data?.data;

    } catch (err) {
        console.log("FETCH_COMPLETE_TEAM_DETAILS_API_ERROR",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}
