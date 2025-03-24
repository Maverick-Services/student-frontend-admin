import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllTeams } from "../../../../services/operations/teamAPI";
import { Spinner } from "../../../common/Spinner";
import { createUser, editUserDetails } from "../../../../services/operations/userAPI";
import { CLASSES, ROUTES } from "../../../../utils/constants";
import { ROLE } from "../../../../utils/constants";
import { getRandomId } from "../../../../utils/randomIdGenerator";
import LayoutProvider from "../../../common/LayoutProvider";

export const AddUser = ({ user, editUser, setShowUserDetails, showUserDetails }) => {

  const navigate = useNavigate();
  const { token, setLoading, loading, setEmployees, teams, setTeams } = useContext(AuthContext);
  const [currentRoute, setCurrentRoute] = useState(ROUTES[0]);

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
      // fetchTeams();
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
        // const result = await editUserDetails(reqBody, token);
        const result = null;
        if (result) {
          navigate("/dashboard/student");
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

    // const response = await createUser(data, token);
    const response = {...data, _id:getRandomId()};
    // console.log(response)
    if (response) {
      setEmployees(prev => (
        [
          ...prev,
          response
        ]
      ))
      let allClasses = teams;
      let classIndex = allClasses?.findIndex(cl => cl?._id === response?.class);
      allClasses[classIndex]?.students?.push(response?._id);
      setTeams(allClasses);
      localStorage.setItem("classes",JSON.stringify(allClasses));
      // console.log("User created Successfully", response);
      navigate('/dashboard/student');
    }
  };

  if(loading || !teams)
    return <Spinner/>
  
  // console.log(teams)

  return (
    <LayoutProvider heading={'Manage Students'}>
      <motion.div
        /** Framer Motion On-Load Animation */
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
      >
        {/* Heading */}
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1C398E]">{editUser ? "Edit" : "Add"} Student</h1>
          {
            editUser && <button
              onClick={() => setShowUserDetails(!showUserDetails)}
              className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
            >
              Cancel
            </button>
          }
        </div>

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

          {/* Fathers Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Father's Name</label>
            <input
              type="text"
              {...register("fatherName", { required: true })}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
            />
          </div>

          {/* Mothers Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium">Mother's Name</label>
            <input
              type="text"
              {...register("motherName", { required: true })}
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
              {...register("phoneNumber", { required: true })}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
            />
          </div>

          {/* Class */}
          {
            !editUser && 
            <div className="flex flex-col gap-1">
              <label className="w-40 font-medium text-gray-700">Class</label>
              <select
                // onChange={stepInputChangeHandler}
                {...register("class",{required:true})}
                defaultValue={teams && teams[0]?._id}
                name="class"
                id="class"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
              >
                {
                  teams &&
                  teams.map(cl=>{
                    return <option key={cl?._id} value={cl?._id}>
                        {cl?.class_name} - Fee: Rs.{cl?.fee}
                    </option>
                  })
                }
              </select>
            </div>
          }

          {/* ROUTE */}
          {
            // !editUser &&
            <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Route</label>
            <select
              {...register("route",{
              required:{
                  value:true,
                  message:"Route is required"
              }
              })}
              defaultValue={currentRoute}
              onChange={(e) => setCurrentRoute(e.target.value)}
              name="route"
              id="route"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
            >
              {
                ROUTES.map((rt,index)=>{
                    return <option key={index} value={rt?.route}>
                          {rt?.route} - Fee: Rs.{rt?.fee}
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
    </LayoutProvider>
  );
};
