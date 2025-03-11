import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllEmployees } from "../../../services/operations/userAPI";
import { Spinner } from "../../common/Spinner";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Employees = () => {
  
  const {token, loading, setLoading} = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async()=>{
    setLoading(true);
    const result = await fetchAllEmployees(token);
    if(result){
      setEmployees(result);
    }
   
    setLoading(false);
  }

  useEffect(()=>{
    fetchEmployees();
  },[]);


  if(loading || !employees)
    return <Spinner/>

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#1C398E]">All Employees</h1>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full w-full"
      >
        {employees && !employees.length ? (
          <motion.p variants={cardVariants} className="text-gray-600 text-lg text-center col-span-full">
            No Employees added yet
          </motion.p>
        ) : (
            employees?.map((em) => (
            <motion.div
              key={em?._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-start gap-3"
            >
              <Link to={`/dashboard/users/${em?._id}`}>
                <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 transition-all hover:shadow-xl">
                  <h3 className="text-lg font-semibold text-gray-800">Name: {em?.name}</h3>
                  <p className="text-gray-600">{em?.email}</p>
                  <p className="text-gray-600">Mobile No: {em?.phoneNo}</p>
                  <p className="text-gray-600">Team: {em?.team?.teamName}</p>
                  <p className="text-gray-600">
                    Tasks Assigned:{" "}
                    <span className="font-semibold text-[#1C398E]">{em?.tasks?.length}</span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Employees;