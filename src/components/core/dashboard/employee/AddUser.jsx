import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ROLE } from "../../../../utils/constants";
import { fetchAllTeams } from "../../../../services/operations/teamAPI";
import { Spinner } from "../../../common/Spinner";
import { createUser, editUserDetails } from "../../../../services/operations/userAPI";

export const AddUser = ({ user, editUser }) => {

  const navigate = useNavigate();
  const { token, setLoading, loading } = useContext(AuthContext);
  const [teams,setTeams] = useState([]);
  const [currentRole, setCurrentRole] = useState(ROLE.EMPLOYEE);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchTeams = async()=>{
    setLoading(true);
    const result = await fetchAllTeams(token);
    if(result){
      setTeams(result);
    }
    
    setLoading(false);
  }

  useEffect(() => {
    if (editUser) {
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("phoneNo", user?.phoneNo);
    }else{
      fetchTeams();
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      user?.name !== currentValues?.name ||
      user?.email !== currentValues?.email ||
      user?.phoneNo !== currentValues?.phoneNo
    );
  };

  const userFormSubmitHandler = async(data) => {
    if (editUser) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        let reqBody = {
          userId: user?._id,
        };

        if (currentValues?.name !== user?.name)
          reqBody = { ...reqBody, name: data?.name };
        if (currentValues?.email !== user?.email)
          reqBody = { ...reqBody, email: data?.email };
        if (currentValues?.phoneNo !== user?.phoneNo)
          reqBody = { ...reqBody, phoneNo: data?.phoneNo };

        // console.log("edit", reqBody);
        const result = await editUserDetails(reqBody, token);
        if (result) {
          navigate("/dashboard/users");
        }
        return;
      } else {
        alert("No Changes Made So far");
        return;
      }
    }

    data = {
      ...data,
    };

    // console.log(data)
    const response = await createUser(data, token);
    if (response) {
      // console.log("User created Successfully", response);
      navigate('/dashboard/users');
    }
  };

  if(loading || !teams)
    return <Spinner/>

  return (
    <motion.div
      /** Framer Motion On-Load Animation */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#1C398E] mb-4">
        {editUser ? "Edit" : "Add"} User Profile
      </h1>

      {/* Form */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(userFormSubmitHandler)}
      >
        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Email Field */}
        {
          !editUser &&
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
            />
          </div>
        }

        {/* Phone Number Field */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-600 font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNo", { required: true })}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          />
        </div>

        {/* Role */}
        {
          !editUser &&
          <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">User Role</label>
          <select
            {...register("role",{
            required:{
                value:true,
                message:"Role is required"
            }
            })}
            defaultValue={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            name="role"
            id="role"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
          >
            {
              Object.values(ROLE).map((rl,index)=>{
                  return <option key={index} value={rl}>
                          {rl}
                      </option>
              })
            }
          </select>
        </div>
        }

        {/* Team */}
        {
          !editUser && currentRole !== ROLE.ADMIN &&
          <div className="flex flex-col gap-1">
            <label className="w-40 font-medium text-gray-700">Team</label>
            <select
              // onChange={stepInputChangeHandler}
              {...register("team",{required:true})}
              defaultValue={teams && teams[0]?._id}
              name="team"
              id="team"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
            >
              {
                teams &&
                teams.map(tm=>{
                  return <option key={tm?._id} value={tm?._id}>
                      {tm?.teamName}
                  </option>
                })
              }
            </select>
          </div>
        }

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1C398E] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#142A6E] transition"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};
