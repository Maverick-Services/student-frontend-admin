import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { toast } from 'react-hot-toast';

const {
    ADMIN_LOGIN_API
} = authEndpoints;

export async function adminLogin(formData,navigate,setAdmin,setToken){
    let toastId = toast.loading("Logging In")
    try {
        
        const response = await apiConnector(
            "POST",
            ADMIN_LOGIN_API,
            formData
        );

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        // console.log("ADMIN_LOGIN_API_RESPONSE:",response);
        setAdmin(response?.data?.data?.user);
        setToken(response?.data?.data?.token);
        
        toast.dismiss(toastId);
        navigate('/dashboard/profile');
        toast.success(response?.data?.message);       
        
    } catch (err) {
        console.log("ADMIN_LOGIN_API_ERROR:",err);
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message || err?.message);
    }
}

export function logout(navigate,setAdmin,setToken){
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
}