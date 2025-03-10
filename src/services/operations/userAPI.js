import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userEndpoints } from "../apis";

const {
    FETCH_ALL_EMPLOYEES_API, //get
    CREATE_USER_API, // post
    EDIT_USER_API, //put
    DELETE_USER_API, // delete
    FETCH_COMPLETE_USER_DETAILS_API //post
} = userEndpoints;

export const createUser = async(formData,token)=>{
    let toastId = toast.loading("Creating User")
    try {
        
        const response = await apiConnector(
            "POST",
            CREATE_USER_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("CREATE_USER_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("CREATE_USER_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const editUserDetails = async(formData,token)=>{
    let toastId = toast.loading("Saving Changes");
    try {
        
        const response = await apiConnector(
            "PUT",
            EDIT_USER_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("EDIT_USER_API_RESPONSE:",response);
        toast.dismiss(toastId);
        toast.success(response?.data?.message);       
        return response?.data?.data;
        
    } catch (err) {
        console.log("EDIT_USER_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

export const fetchAllEmployees = async(token)=>{
    let toastId = toast.loading("fetching");
    try {
        const response = await apiConnector(
            "GET",
            FETCH_ALL_EMPLOYEES_API,
            null,
            {
                "Authorization":`Bearer ${token}`
            }
        )

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_ALL_EMPLOYEES_API_RESPONSE:",response);
        toast.dismiss(toastId);
        // toast.success(response?.data?.message);
        return response?.data?.data;
        
    } catch (err) {
        console.log("FETCH_ALL_EMPLOYEES_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message)
        return null;
    }
}

export const fetchCompleteUserDetails = async(formData,token)=>{
    let toastId = toast.loading("fetching details");
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_USER_DETAILS_API,
            formData,
            {
                "Authorization":`Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("FETCH_COMPLETE_USER_DETAILS_API_RESPONSE",response);
        toast.dismiss(toastId);
        return response?.data?.data;

    } catch (err) {
        console.log("FETCH_COMPLETE_USER_DETAILS_API_ERROR",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
        return null;
    }
}

// export const createStep = async(formData,token)=>{
//     let toastId = toast.loading("Creating Step")
//     try {
        
//         const response = await apiConnector(
//             "POST",
//             CREATE_STEP_API,
//             formData,
//             {
//                 "Authorization":`Bearer ${token}`
//             }
//         );

//         if(!response?.data?.success){
//             throw new Error(response?.data?.message);
//         }

//         // console.log("CREATE_STEP_API_RESPONSE:",response);
//         toast.dismiss(toastId);
//         toast.success(response?.data?.message);       
//         return response?.data?.data;
        
//     } catch (err) {
//         console.log("CREATE_STEP_API_ERROR:",err);
//         toast.dismiss(toastId);
//         toast.error(err?.response?.data?.message || err?.message);
//         return null;
//     }
// }
